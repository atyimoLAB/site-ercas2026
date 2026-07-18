---
name: build-commands
description: Exact Jekyll build/serve commands for the current single-config PT-BR site
metadata:
  type: reference
---

## Current setup (single `_config.yml`, no per-lang configs)

The old `_config.pt.yml` / `_config.en.yml` multi-config split is gone. See
[project-structure](project-structure.md) — one `_config.yml` at repo root drives everything,
with `conference.show_errors: true` always on.

Production build (what CI runs, per `.github/workflows/deploy.yml`):
```bash
bundle exec jekyll build -d _site
```

Local dev with live reload:
```bash
bundle exec jekyll serve --livereload
```

**Restart the server after any `_config.yml` edit** — config is not auto-reloaded.

No `--config` flag juggling needed anymore. If you see instructions referencing
`_config.pt.yml`/`_config.en.yml`, they're stale — verify against the repo's `/CLAUDE.md`
before trusting them.

## Verifying a content/data change

`show_errors: true` makes broken cross-references (talk → speaker/room/track/tag name
mismatch) render as visible error content in `_site/**/*.html`, not just build-time
warnings. After `bundle exec jekyll build -d _site`, grep the output for stray error text
in addition to checking the build log, e.g.:
```bash
grep -rli "error" _site --include="*.html" | grep -v assets
```
A clean build log alone is not sufficient proof — the theme's error reporting shows up in
rendered HTML.
