# ERCAS 2026 — Conference Website

Static site for the ERCAS 2026 conference, built with [Jekyll](https://jekyllrb.com/) and the [jekyll-theme-conference](https://github.com/DigiLab-OVGU/jekyll-theme-conference) theme.

## Run with Docker (recommended)

No Ruby on your machine — one command:

```bash
docker compose up dev
```

Site (Portuguese): <http://localhost:4000/> — served at root (PT `baseurl`
is now `""` for the `ercas2026.ufba.br` custom domain). Live reload is on.

| Task | Command |
|------|---------|
| Dev server, PT, live reload | `docker compose up dev` |
| Dev server, EN | `JEKYLL_CONFIG=_config.yml,_config.en.yml docker compose up dev` |
| Production-parity build + preview (PT) | `docker compose up prod` |
| Rebuild after a `Gemfile.lock` change | `docker compose build` |
| Full reset (clears gem/cache volumes) | `docker compose down -v` |

- After editing any `_config*.yml`, restart: `docker compose restart dev`
  (Jekyll doesn't reload config).
- `prod` builds with `JEKYLL_ENV=production` and serves the exact `_site/` that
  ships — use it to verify production output.
- File watching uses polling (required for macOS bind mounts), so reloads
  lag ~1–2s.
- The site is on **port 4000**. Port `35729` is the live-reload helper only —
  visiting it shows `This port only serves livereload.js over HTTP.`, not the
  site. Use <http://localhost:4000/>.

## Run natively (without Docker)

Requires **Ruby 3.4.x** and **Bundler 4.x** (a version manager like
[mise](https://mise.jdx.dev/) is recommended).

```bash
bundle install

# Dev (PT) — a layered --config is REQUIRED or nothing renders:
bundle exec jekyll serve --config _config.yml,_config.pt.yml --livereload

# Production build (what CI runs):
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site
```

## Project structure

```
_config.yml      # site settings + theme config
index.markdown   # home page
about.markdown   # about page
404.html         # not-found page
_site/           # generated output (gitignored)
```

> Conference content (talks, speakers, program) is added under `_data/` —
> see the [theme docs](https://github.com/DigiLab-OVGU/jekyll-theme-conference)
> for the expected data files.

## Notes

- Theme is `jekyll-theme-conference`, which is **not** a blog theme — it provides
  `talk`, `program`, `speaker`, `page`, etc. layouts, but no `post` layout.
- After editing `_config.yml`, restart the server — it is not auto-reloaded.

## Deployment

Built static output lives in `_site/`. Deploy that directory to any static host
(GitHub Pages, Netlify, etc.).
