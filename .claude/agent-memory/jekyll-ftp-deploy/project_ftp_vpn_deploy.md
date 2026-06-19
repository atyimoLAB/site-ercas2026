---
name: project-ftp-vpn-deploy
description: ERCAS 2026 alt deploy path — lftp delete-mirror to UFBA FTP over openfortivpn; host/path/runner facts
metadata:
  type: project
---

`.github/workflows/deploy.yml` has an uncommitted rewrite (working tree only as of 2026-06-18) that replaces the GitHub Pages deploy with a plain-FTP delete-mirror over VPN. The committed version still deploys to GitHub Pages.

**Why:** Site is migrating off GitHub Pages toward a UFBA-hosted target (see CLAUDE.md custom-domain note, ercas2026.ufba.br). This FTP path appears to target a shared UFBA host.

**Facts (from the working-tree workflow):**
- VPN mechanism: **openfortivpn** (FortiGate SSL VPN), interface `ppp0`. Not WireGuard/OpenVPN. Secrets: `VPN_GATEWAY_HOST/PORT/USERNAME/PASSWORD`.
- Deploy tool: `lftp mirror --reverse --delete`, `--parallel=4`. Remote dir: `/sharedirs/sharedir01/tchaves/public_html/`.
- Protocol: plain FTP, `set ftp:ssl-allow no` (FTPS NOT in use — flagged, recommend FTPS).
- Runner: **GitHub-hosted ubuntu-latest + VPN** (fallback model, not self-hosted-in-network). Recommend self-hosted runner inside UFBA network.
- Delete sanity threshold: **200**, overridable via `workflow_dispatch` input `allow_large_delete`.
- Build command matches CLAUDE.md: `bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site`, `JEKYLL_ENV=production`. PT only.
- `Gemfile.lock` IS committed (verified). `bundler-cache: true` + `bundle config set frozen true`.

**How to apply:** When reviewing/authoring this workflow, route checks use `ppp0` (openfortivpn), not `wg0`. Push for: build/deploy job separation (currently single `deploy` job — build has secrets in scope), FTPS, self-hosted runner, sha256 manifest verification, and timestamped remote backups. See [[reference-pinned-actions]].
