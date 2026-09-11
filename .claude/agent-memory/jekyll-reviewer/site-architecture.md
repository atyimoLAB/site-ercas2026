---
name: site-architecture
description: ERCAS 2026 Jekyll architecture — single default config, PT-BR only, custom-domain target
metadata:
  type: project
---

**As of 2026-07-10 this is a single-config, single-language (PT-BR) site.** The previous
bilingual multi-config setup (`_config.pt.yml` / `_config.en.yml`, GitHub Pages
`/site-ercas2026` baseurl) described in earlier memory snapshots is **stale** — do not
assume it still applies; verify against `_config.yml` and CLAUDE.md before citing it.

**Current setup (confirmed 2026-07-10):**
- One `_config.yml` for both dev and prod: `bundle exec jekyll build -d _site`.
- `baseurl: ""`, `url: https://ercas2026.ufba.br` (target custom domain; DNS cutover still pending per CLAUDE.md).
- `collections_dir: pt`, `data_dir: pt/_data` — content lives under `pt/`.
- `conference.lang: pt`, PT navigation only.
- `show_errors: true` is set **unconditionally** in the single active `_config.yml` — there is
  no separate prod override that turns it off. Any theme validation error (see
  `_includes/checks.html` in the gem) will render as a red Bootstrap alert box on **every**
  page in production, not just in dev. This makes the local build genuinely load-bearing as
  the project's only gate (per CLAUDE.md) — treat any `alert-danger` in built HTML as a blocker.
- `exclude:` in `_config.yml` includes `en`, `GUIDE.md`, `README.md` — the old "GUIDE.md/README.md
  leak into _site" issue from prior reviews is resolved.
- `en/` tree still exists but is excluded from the build (deferred, not part of CI).
- Nav links use a `disabled: true` opt-out pattern (comment at `_config.yml:58-59`): entries
  without `disabled: true` are live. As of 2026-09-10: Sobre, Programação, Palestras,
  Palestrantes, Local, Organização (permalink `/organizacao/`, renamed from "Comitês") are
  enabled; Patrocínio, Datas, Inscrições remain disabled.

See [[data-schema]] for collection schemas and [[build-notes]] for build command details.
