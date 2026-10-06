#!/usr/bin/env bash
# Build the site and mirror _site/ to the UFBA FTP host (delete-mirror).
# Run from your machine with the UFBA VPN already connected.
#   _tools/deploy.sh       # build, show changes, confirm, upload
#   _tools/deploy.sh -y    # skip the confirmation
#   _tools/deploy.sh -b main   # deploy another branch/commit, without touching your checkout
set -euo pipefail

cd "$(dirname "$0")/.."

REMOTE_DIR=/sharedirs/sharedir01/tchaves/public_html/
YES=no
REF=
while [ $# -gt 0 ]; do
  case "$1" in
    -y) YES=yes ;;
    -b) REF="${2:?-b needs a branch or commit}"; shift ;;
    *)  echo "Usage: $0 [-y] [-b <branch>]" >&2; exit 2 ;;
  esac
  shift
done

die() { echo "ERROR: $*" >&2; exit 1; }

# 1. Config: .env.deploy holds FTP_HOST, FTP_USER and optionally FTP_PASS.
[ -f .env.deploy ] && . ./.env.deploy
[ -n "${FTP_HOST:-}" ] || die "FTP_HOST not set. cp .env.deploy.example .env.deploy and fill it in."
[ -n "${FTP_USER:-}" ] || die "FTP_USER not set in .env.deploy."
if [ -z "${FTP_PASS:-}" ]; then
  read -rsp "FTP password for $FTP_USER: " FTP_PASS; echo
fi

# 2. Tooling.
command -v lftp >/dev/null || die "lftp not found. Install it: brew install lftp"

# 3. VPN: the FTP host is only reachable through it.
echo "Checking FTP host is reachable..."
nc -z -G 5 "$FTP_HOST" 21 >/dev/null 2>&1 \
  || die "FTP host $FTP_HOST unreachable. Connect the VPN first."

# 4. Build (same as CI). With -b, build that ref in a temporary worktree.
SRC=.
if [ -n "$REF" ]; then
  git rev-parse --verify --quiet "$REF^{commit}" >/dev/null || die "Unknown branch/commit: $REF"
  SRC=$(mktemp -d)
  trap 'git worktree remove --force "$SRC" >/dev/null 2>&1 || true' EXIT
  git worktree add --detach --quiet "$SRC" "$REF"
fi
echo "Building $(git -C "$SRC" log -1 --format='%h %s')${REF:+ ($REF)}..."
(cd "$SRC" && JEKYLL_ENV=production bundle exec jekyll build -d _site)
SITE="$SRC/_site"

# 5. Sanity gate: never delete-mirror an empty or broken build.
[ -f "$SITE/index.html" ] || die "$SITE/index.html missing. Build looks broken."
COUNT=$(find "$SITE" -type f | wc -l | tr -d ' ')
[ "$COUNT" -gt 20 ] || die "_site has only $COUNT files. Refusing to mirror."

export LFTP_PASSWORD="$FTP_PASS"   # keeps the password off the command line
mirror() {
  lftp --env-password -u "$FTP_USER" "ftp://$FTP_HOST" -e "
    set ftp:ssl-allow no; set net:max-retries 2; set net:timeout 20;
    mirror -R --delete --parallel=4 $* '$SITE/' $REMOTE_DIR;
    bye"
}

# 6. Dry run + confirm.
echo "Comparing with server..."
PLAN=$(mirror --dry-run)
# A reverse-mirror dry run prints uploads as `get -O <remote> file:<local>`, not `put`.
UPLOADS=$(grep -cE '^(get|put) ' <<<"$PLAN" || true)
DELETES=$(grep -cE '^rm(dir)? ' <<<"$PLAN" || true)
echo "$PLAN" | grep -E '^rm(dir)? ' | sed 's/^/  /' || true
echo "Plan: $UPLOADS upload(s), $DELETES delete(s) -> $FTP_HOST:$REMOTE_DIR"
if [ "$UPLOADS" -eq 0 ] && [ "$DELETES" -eq 0 ]; then
  echo "Server already up to date."; exit 0
fi
if [ "$YES" != yes ]; then
  read -rp "Proceed? [y/N] " ANSWER
  [ "$ANSWER" = y ] || [ "$ANSWER" = Y ] || { echo "Aborted."; exit 1; }
fi

# 7. Mirror.
mirror --verbose
echo "Deploy done."
