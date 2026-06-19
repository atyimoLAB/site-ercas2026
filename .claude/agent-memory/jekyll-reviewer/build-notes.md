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
- Deploy: openfortivpn VPN tunnel → `SamKirkland/FTP-Deploy-Action` delete-mirror to `/sharedirs/sharedir01/tchaves/public_html/`
- No dry-run or delete sanity gate (the marketplace action mirrors directly; flagged — recommend lftp rewrite with dry-run + sanity gate)
- VPN teardown step has `if: always()` — runs even on failure
- `show_errors: false` in pt build (overridden in `_config.pt.yml`) — no theme error-bar in production
- EN build is NOT in CI yet (by design, deferred until custom domain)

**Known CI quirk:** `bundle config set frozen true` runs AFTER `ruby/setup-ruby` with `bundler-cache: true`,
which already ran `bundle install` internally. Frozen enforcement only guards subsequent explicit bundle invocations,
not the install step itself. With a committed lockfile this is safe but the ordering is counterintuitive.

**Prior blocker (resolved 2026-06-19):** vpn.conf heredoc indentation issue is gone. The workflow now writes vpn.conf via `printf` redirects (no heredoc), so leading-whitespace is not a concern.

**CI workflow simplification (2026-06-19):** VPN bring-up replaced with a simpler ppp0-wait loop. The iptables REJECT killswitch was dropped (deliberate user decision). Route-assert (`ip route get`, dev must be ppp0) is kept. SamKirkland/FTP-Deploy-Action replaces lftp. Teardown renamed "Disconnect SSL-VPN", `if: always()`.

**ppp0 wait loop liveness (resolved):** The ppp0 wait loop checks openfortivpn liveness via `sudo kill -0 "$(cat openfortivpn.pid)"` inside the loop, so if the process dies mid-bring-up the step fails fast and dumps the VPN log instead of spinning to the full timeout.

**Permalink strategy:** All pages/overviews have explicit `permalink:` in front matter (e.g., `/program/`, `/talks/`). No `/pt/` leakage in built URLs. No `/en/` path leakage in en build.

**URL output verified:**
- PT: `_site/program/`, `_site/talks/`, `_site/speakers/`, `_site/committees/`, `_site/sponsors/`, `_site/important-dates/`, `_site/location/`
- EN: `_site/en/program/`, `_site/en/talks/`, etc. (baseurl=/en, url=https://atyimolab.github.io)
- Canonical URLs: pt → `https://atyimolab.github.io/site-ercas2026/`; en → `https://atyimolab.github.io/en/`

**jekyll-include-cache:** Required by theme, present in Gemfile and `plugins:` in `_config.yml`. Build works.

**Default Jekyll exclusions apply:** `Gemfile`, `Gemfile.lock`, `vendor` are excluded. But `GUIDE.md` and `README.md` are NOT excluded and DO publish to both `_site/` and `_site/en/`. See known-issues item 1.

**Scaffold pages:** index.markdown, about.markdown, root 404.html all correctly absent from repo root.

**show_errors:** base=true, pt=false, en=false. No error-bar appears in either built site output.
