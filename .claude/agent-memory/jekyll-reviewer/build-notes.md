---
name: build-notes
description: Build commands, CI config, and known build behavior for ERCAS 2026
metadata:
  type: project
---

**Both pt and en builds pass cleanly** (no warnings, no errors) as of second review 2026-06-18.

**PT build:** `bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site`
**EN build:** `bundle exec jekyll build --config _config.yml,_config.en.yml -d _site/en`

**Note:** `--strict_front_matter` and `--strict_variables` flags were NOT used because the theme gem's templates use variables that would likely trigger strict_variables false positives. The standard build was used instead.

**CI (deploy.yml) — migrated from GitHub Pages to FTP-over-VPN (2026-06-18):**
- Runs on: `ubuntu-latest`, ruby `3.4`
- Builds pt only: `bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site` with `JEKYLL_ENV=production`
- Actions SHA-pinned: `actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683` (v4.2.2), `ruby/setup-ruby@89f90524b88a01fe6e0b732220432cc6142926af` (v1.313.0)
- Permissions: `contents: read` only (no `pages: write` or `id-token: write`)
- concurrency group: `ftp-deploy-production`, `cancel-in-progress: false`
- Deploy: openfortivpn VPN tunnel → lftp delete-mirror to `/sharedirs/sharedir01/tchaves/public_html/`
- Dry-run + delete sanity gate (threshold: 200 deletes); `workflow_dispatch` input `allow_large_delete` overrides
- VPN teardown step has `if: always()` — runs even on failure
- `show_errors: false` in pt build (overridden in `_config.pt.yml`) — no theme error-bar in production
- EN build is NOT in CI yet (by design, deferred until custom domain)

**Known CI quirk:** `bundle config set frozen true` runs AFTER `ruby/setup-ruby` with `bundler-cache: true`,
which already ran `bundle install` internally. Frozen enforcement only guards subsequent explicit bundle invocations,
not the install step itself. With a committed lockfile this is safe but the ordering is counterintuitive.

**Known CI quirk (blocker-class):** vpn.conf heredoc has 10-space indentation from YAML block scalar.
openfortivpn is strict about its config format — leading whitespace on `host/port/username/password` lines
may cause VPN connection failures. Fix: use `cat > vpn.conf <<-EOF` with tab-indented body, or redirect to a file without indentation.

**Permalink strategy:** All pages/overviews have explicit `permalink:` in front matter (e.g., `/program/`, `/talks/`). No `/pt/` leakage in built URLs. No `/en/` path leakage in en build.

**URL output verified:**
- PT: `_site/program/`, `_site/talks/`, `_site/speakers/`, `_site/committees/`, `_site/sponsors/`, `_site/important-dates/`, `_site/location/`
- EN: `_site/en/program/`, `_site/en/talks/`, etc. (baseurl=/en, url=https://atyimolab.github.io)
- Canonical URLs: pt → `https://atyimolab.github.io/site-ercas2026/`; en → `https://atyimolab.github.io/en/`

**jekyll-include-cache:** Required by theme, present in Gemfile and `plugins:` in `_config.yml`. Build works.

**Default Jekyll exclusions apply:** `Gemfile`, `Gemfile.lock`, `vendor` are excluded. But `GUIDE.md` and `README.md` are NOT excluded and DO publish to both `_site/` and `_site/en/`. See known-issues item 1.

**Scaffold pages:** index.markdown, about.markdown, root 404.html all correctly absent from repo root.

**show_errors:** base=true, pt=false, en=false. No error-bar appears in either built site output.
