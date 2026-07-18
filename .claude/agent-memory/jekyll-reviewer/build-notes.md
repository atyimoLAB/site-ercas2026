---
name: build-notes
description: Build commands and known build behavior for ERCAS 2026 (single-config, single-language)
metadata:
  type: project
---

**Current build command (confirmed 2026-07-10, matches CLAUDE.md):**
`bundle exec jekyll build -d _site` — single default `_config.yml`, no per-language config
overlay anymore. (Earlier memory describing `_config.pt.yml`/`_config.en.yml` multi-config
builds and FTP-over-VPN CI is stale/superseded — re-verify against `.github/workflows/` and
`_config.yml` before trusting those details again.)

**`show_errors: true` is unconditional** in the single `_config.yml` — no prod override
disables it. This means `bundle exec jekyll build` exiting 0 with clean CLI output is **not
sufficient** to confirm the build is clean: the theme's own `checks.html` validations render
as an `alert alert-danger` Bootstrap box baked into the built HTML (on every page, since the
include appears to sit in a shared layout/partial) without causing a non-zero exit code or CLI
warning. **Always grep the built `_site/**/*.html` for `alert-danger` / "There was an error
when generating the site" after every build**, not just check the CLI log. See
[[data-schema]] for the specific track-less-talk trigger discovered 2026-07-10.

**Ruby/Jekyll versions:** Ruby 3.4.4 (`.ruby-version` pins `3.4`), Jekyll 4.4,
jekyll-theme-conference 4.0.2 (gem installed via mise-managed Ruby at
`~/.local/share/mise/installs/ruby/3.4.4/.../gems/jekyll-theme-conference-4.0.2` — useful path
for reading theme source directly when diagnosing check.html-style errors).

**Permalink strategy:** explicit `permalink:` front matter on every page
(`/programacao/`, `/palestras/`, `/palestrantes/`, `/sobre/`, etc.) — no `/pt/` leakage.

**`exclude:`** in `_config.yml` covers `en`, `GUIDE.md`, `README.md` — confirmed neither leaks
into `_site/` anymore.

**`--strict_variables` is not a real Jekyll 4.4.1 CLI flag** (confirmed 2026-07-12 — errors
with "invalid option"). The CLAUDE.md/reviewer-instructions reference to it is aspirational;
the only real strict flag available is `--strict_front_matter`. Don't waste a build cycle
retrying it — go straight to `bundle exec jekyll build -d <dir> --strict_front_matter` and then
grep the output HTML for `alert-danger` per the known-issues gate.
