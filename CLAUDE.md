# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static website for **ERCAS 2026** (Escola Regional de Computação Aplicada à Saúde), a health-informatics conference in Salvador/BA, Oct 6–7 2026. Built with **Jekyll 4.4** + the **`jekyll-theme-conference`** (~4.0.2) theme, deployed to GitHub Pages. The site is currently **single-language PT-BR**.

`jekyll-theme-conference` is not a blog theme — it ships `home`, `program`, `talk`, `speaker`, `room`, `page` layouts but **no `post` layout**. Theme docs / source: https://github.com/DigiLab-OVGU/jekyll-theme-conference

## Commands

Install deps: `bundle install` (Ruby 3.4.x; see `.ruby-version`).

Build and dev now use a single default config (`_config.yml`):

```bash
# Local dev (PT-BR) — live reload
bundle exec jekyll serve --livereload

# Production build (what CI runs)
bundle exec jekyll build -d _site

# Horizontal-overflow guard (needs a build first)
node _tools/check-overflow.mjs
```

After editing `_config.yml`, **restart** the server — config is not auto-reloaded.

There is no test runner. Two gates:

1. **The build**, via `show_errors: true` (set in `_config.yml`), which makes the theme surface broken cross-references (a talk pointing at a missing speaker, etc.) as visible page errors. **Run the local build and check for theme error output** before committing content changes.
2. **`_tools/check-overflow.mjs`**, which fails if any built page can be panned horizontally. It serves `_site`, drives headless Chrome over raw CDP (no npm dependencies — needs Node ≥ 22 for the global `WebSocket`, and Chrome, or `CHROME_PATH`), and asserts `scrollWidth <= clientWidth` for every built route at 320/360/390/414/576/768/992/1200px. Routes are enumerated from `_site/**/index.html`, so new talks/speakers/rooms are covered automatically. `.github/workflows/checks.yml` runs both on every PR.

`_tools/` is never published: Jekyll skips root entries beginning with `_`, so no `exclude:` entry is needed.

### Layout rule: horizontal gutters inside `.container`

A Bootstrap `.container` has 12px of side padding, and a `.row`'s negative side margin is half its `--bs-gutter-x`. **Inside a `.container`, a `.row` must not use a horizontal gutter above `gx-3` (1.5rem) without a breakpoint suffix** — `gx-4`/`gx-5` pull −24px against those 12px, so below `sm` (where the container is full-bleed) the row juts 12px past each viewport edge and the whole page pans sideways. Use `gx-lg-5` and friends. This is what `_includes/sponsors.html` does, and because that include renders in every page's footer, getting it wrong breaks the entire site at once.

Related: `.navbar-nav` does not wrap, so the navbar's `conference.navigation.breakpoint` must stay at a width where all the links actually fit (currently `lg`). Adding a nav link means re-running the guard at 992/1200.

## Architecture

### Single-language config

`_config.yml` is now the only active config and includes:

- `baseurl: ""` for root custom-domain serving.
- `collections_dir: pt` and `data_dir: pt/_data`.
- `conference.lang: pt` and PT navigation.

Source content remains under the `pt/` tree (`index.md`, `program/index.md`, `talks/index.md`, `speakers/index.md`, `committees.md`, `sponsors.md`, `important-dates.md`, `location/index.md`, `404.html` plus `_talks/`, `_speakers/`, `_rooms/`, and `_data/`).

### Collections and how content links together

Collections `talks`, `speakers`, `rooms` are declared in `_config.yml` (with `output: true` and default layouts) but their files live under each language tree because of `collections_dir`. **Cross-references are by display-name strings, not IDs or file paths:**

- A talk's front matter `speakers:` lists speaker **names** that must match a speaker doc's `name`.
- A talk's `track:` must match a track `name` in `_config.yml` → `conference.talks.tracks`.
- `_data/program.yml` schedules talks by repeating their **`name`** under each day → room. Room/talk/speaker names must agree across the data file, the collection docs, and `_config.yml`.

Because links are name-based, renaming anything means updating every place that names it (collection doc, `program.yml`, `_config.yml`). This is exactly what `show_errors: true` helps catch.

### Custom includes (sections the theme lacks)

The theme has no native committees / sponsors / important-dates rendering, so `_includes/committees.html`, `_includes/sponsors.html`, `_includes/important_dates.html` render those from the corresponding `_data/*.yml`. The page markdown is a thin shell that sets layout/permalink and calls `{% include … %}`.

The **important-dates / "Datas"** section is intentionally dormant for the 2026 edition (issue #42): `pt/important-dates.md` has `published: false` (so `/datas/` is not built) and the `Datas` nav entry in `_config.yml` is commented out. The include and `pt/_data/important_dates.yml` are kept as a template for future editions. Note: `disabled: true` on a nav link does **not** hide it — the theme renders a greyed-out inactive link — so hiding a section requires commenting out the nav entry and setting `published: false` on the page.

### i18n strings: `lang.yml`

`_data/lang.yml` is the theme's translation table (keys like `program.*`, `speaker.*`, `location.*`), shipped with `en/de/fr/pt`. Custom keys have been **added** to it (e.g. `important_dates.{event,date}`) for the custom includes; includes read `site.data.lang[site.conference.lang].<key>` with a `| default:` fallback. When adding a custom include that needs labels, add the keys to `pt/_data/lang.yml`.

## Deployment

`.github/workflows/deploy.yml` builds on push to `main` and deploys to GitHub Pages, using the single default config and uploading `_site/`.

### Pending custom-domain migration

Target is **`https://ercas2026.ufba.br/`**. The config is already set for it: `_config.yml` has `url: https://ercas2026.ufba.br` and `baseurl: ""` (serves at root). Remaining work is the DNS/GitHub-Pages cutover — full runbook in `GUIDE.md` (DNS request to UFBA infra, GitHub Pages settings, HTTPS). `GUIDE.md` and `README.md` are `exclude`d from the build.
