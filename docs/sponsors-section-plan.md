# Plan — ERCAS 2026 sponsor / support section

> **Update (post-ship):** the "compact strip" footer described below was replaced.
> The footer of every page (except `/patrocinio/`) now renders the **full `sponsors.html`
> grid** — same 3-column layout and logo sizes as the `/patrocinio/` page, minus the intro
> text and CTA — inside `_includes/sponsors_footer.html` (`<aside class="sponsors-site-footer">`,
> `border-top`, no background). The `.sponsors-footer-*` strip classes were removed from
> `assets/css/main.scss`.

## Context

The site has placeholder-only sponsor scaffolding: `_includes/sponsors.html`, `pt/sponsors.md`
(permalink `/patrocinio/`), `pt/_data/sponsors.yml` with dummy tiers, a `Patrocínio` nav link
in `_config.yml` marked `disabled: true`, and `assets/images/sponsors/logo-placeholder.svg`.
The theme `jekyll-theme-conference` has **no** native sponsor support — this is a custom section
built like `committees` / `important_dates` (data file + include + thin page shell).

`README.md` (lines 92–174) carries the real brief: rebuild the section to match
`~/Downloads/ercas-sponsors.png` — three categories (**Realização / Organização / Patrocínio**),
~10 institutions with logos + website links, easy to extend, responsive, accessible
(`alt` = full name), plus a compact version **in the footer of every page**, and a
thank-you + call-for-sponsors on the `/patrocinio/` page.

Outcome: `/patrocinio/` becomes a real, linked page; every page gets a compact sponsor
strip in a (new) visible site footer.

### Decisions (from user)

- Footer: **compact strip everywhere** (muted band, small category labels + logo row).
  Full grouped layout (headings + blurb) lives on `/patrocinio/` only.
- CIDACS: use `cidacs-fiocruz-vertical.png` everywhere.
- Keep label **"Patrocínio"** and permalink `/patrocinio/`.
- UESC name correction: the reference image says "Universidade Estadual do Sudoeste da Bahia";
  correct entity is **Universidade Estadual de Santa Cruz (UESC)**, `https://www.uesc.br/`.
- Single-language PT-BR: UI strings inlined in the includes/page (like `pt/404.html`);
  no `lang.yml` changes.
- All 10 logos downloaded and reviewed by the user; the curated set in
  `scratchpad/sponsors/final/` is authoritative. `dest-ime-ufba` is a `.jpg`.

## Data model — `pt/_data/sponsors.yml` (rewrite)

List of categories; rename key `tier` → `category`. `logo` is relative to `assets/images/`;
omit `logo` to fall back to the name as text.

```yaml
- category: Realização
  items:
    - name: Sociedade Brasileira de Computação
      url: https://www.sbc.org.br/
      logo: sponsors/sbc.png

- category: Organização
  items:
    - name: Universidade Federal da Bahia
      url: https://ufba.br/
      logo: sponsors/ufba.png
    - name: Universidade Estadual de Santa Cruz
      url: https://www.uesc.br/
      logo: sponsors/uesc.png
    - name: CIDACS — Centro de Integração de Dados e Conhecimentos para Saúde
      url: https://cidacs.bahia.fiocruz.br/
      logo: sponsors/cidacs-fiocruz.png
    - name: Computação UFBA
      url: https://computacao.ufba.br/
      logo: sponsors/computacao-ufba.png
    - name: PGCOMP UFBA
      url: https://pgcomp.ufba.br/
      logo: sponsors/pgcomp-ufba.png
    - name: DEST/IME UFBA
      url: https://est.ufba.br/
      logo: sponsors/dest-ime-ufba.jpg   # JPEG (white bg, no transparency)
    - name: PPGFAR UFBA
      url: https://ppgfarmacia.far.ufba.br/
      logo: sponsors/ppgfar-ufba.png

- category: Patrocínio
  items:
    - name: NIC.br
      url: https://www.nic.br/
      logo: sponsors/nic-br.png
    - name: CGI.br
      url: https://www.cgi.br/
      logo: sponsors/cgi-br.png
```

## Logo assets — `assets/images/sponsors/`

**All 10 logos already downloaded and user-curated.** Staged (not in repo) at:
`…/scratchpad/sponsors/final/` — `sbc.png`, `ufba.png`, `uesc.png`, `cidacs-fiocruz.png`,
`computacao-ufba.png`, `pgcomp-ufba.png`, `dest-ime-ufba.jpg`, `ppgfar-ufba.png`,
`nic-br.svg`, `cgi-br.svg`. Raw originals + source page dumps sit one level up.

Implementation step: **optimise while copying** each file from `final/` into
`assets/images/sponsors/` (keep the exact names above):

| File | Staged size | Action |
|---|---|---|
| `nic-br.svg`, `cgi-br.svg` | small | copy as-is |
| `sbc.png` 393×600, `ufba.png` 338×600 | ok | copy as-is |
| `cidacs-fiocruz.png` 4500×2250 (280 KB) | oversized | `sips -Z 700` → keep alpha |
| `uesc.png` 2500×3914 (650 KB) | oversized | `sips -Z 700` |
| `ppgfar-ufba.png` 1920×1080 (1.3 MB) | oversized | `sips -Z 700` |
| `computacao-ufba.png` 621×1024 | slightly large | `sips -Z 700` (or as-is) |
| `pgcomp-ufba.png` 499×499 | ok | copy as-is |
| `dest-ime-ufba.jpg` 959×959 (54 KB) | ok | copy as-is — **`.jpg`, JPEG, white bg, no transparency**; `sponsors.yml` references `.jpg` |

Target: each raster ≤ ~150 KB, max dimension ≤ ~700 px, PNG alpha preserved.
Sources for the record: SBC/UFBA from README URLs (sbrc.sbc.org.br); UESC + CIDACS from
`~/Downloads/`; Computação/PGCOMP/PPGFAR from their `*.ufba.br` site headers; DEST/IME =
IME brasão; NIC.br + CGI.br official colour SVGs from Wikimedia Commons.

## Includes

### `_includes/sponsors.html` (rewrite — full `/patrocinio/` version)

- Loop `site.data.sponsors`; per category a `<section>` with an `<h2 class="h4 border-bottom pb-2 mb-3">{{ group.category }}</h2>`.
- Responsive logo grid: reuse the existing pattern
  `row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 align-items-center`.
- Each item: linked (`target="_blank" rel="noopener noreferrer"`) when `url`; `<img>` with
  `class="img-fluid"`, `style="max-height: 90px"`, `alt="{{ item.name }}"`, `loading="lazy"`;
  text fallback (`fw-semibold`) when no `logo`.
- Keep it data-driven so new categories/items need no template change.

### `_includes/sponsors_footer.html` (new — compact strip)

- One `<div class="sponsors-footer border-top py-4 mt-5 bg-body-tertiary">` → `.container`.
- Per category: a small uppercase muted label (`<span class="text-uppercase small fw-semibold text-muted">`)
  followed by an inline-flex wrap of logos (`d-flex flex-wrap align-items-center gap-3`),
  `max-height: 34px` per logo, `alt` = name, `loading="lazy"`, linked as above.
- No blurb, no big headings. Print-hidden (`d-print-none`).

## Site footer override — `_includes/footer.html` (new, copy of theme + insert)

The theme's `_includes/footer.html` only closes `</main>`, renders a `fixed-bottom` PWA nav
(inert — PWA not enabled), then scripts + `</body>`. `_layouts/{default,page,home,talk,speaker,
program,room}` all end with `{% include footer.html %}`, so overriding this one file covers
every page including `pt/404.html`.

Copy the gem file verbatim, then immediately after the `</main>` line insert:

```liquid
  {%- include sponsors_footer.html -%}
```

(placed as a sibling after `</main>`, before the existing `<footer class="fixed-bottom">`).
Wrap the include in a real `<footer class="d-print-none">` element for semantics.

## `pt/sponsors.md` (edit)

Keep front matter (`layout: page`, `permalink: /patrocinio/`, `title: Patrocínio`). Add
above the include:

- Intro line thanking supporters (PT, inline).
- Short call for sponsors with the contact email `contato@ercas2026.ufba.br`
  (from `_config.yml` `conference.social.email`) — e.g. a `.alert.alert-light` or plain lead paragraph.

```markdown
---
layout: page
permalink: /patrocinio/
title: Patrocínio
---

A ERCAS 2026 agradece às instituições que tornam o evento possível.

Quer apoiar a ERCAS 2026? Escreva para
[contato@ercas2026.ufba.br](mailto:contato@ercas2026.ufba.br).

{% include sponsors.html %}
```

## `_config.yml` (edit)

Remove `disabled: true` from the `Patrocínio` nav link (lines ~73–75). Leave every other
nav entry untouched.

## `assets/css/main.scss` (small append)

Minimal rules only — the strip is mostly Bootstrap utilities:

```scss
.sponsors-footer img { width: auto; object-fit: contain; }
.sponsors-footer .sponsors-footer-group + .sponsors-footer-group { margin-top: 0.75rem; }
```

Adjust once rendered; keep additions to a few lines. No new SCSS file.

## Cleanup

- Delete `assets/images/sponsors/logo-placeholder.svg` (unreferenced after rewrite).
- Fix `README.md:111` path hint `pt/assets/images/sponsors/` → `assets/images/sponsors/`
  (the include only resolves `/assets/images/...`).

## Files touched

| File | Action |
|---|---|
| `pt/_data/sponsors.yml` | rewrite (category model, real data) |
| `_includes/sponsors.html` | rewrite (full page version) |
| `_includes/sponsors_footer.html` | new (compact strip) |
| `_includes/footer.html` | new (theme copy + strip injection) |
| `pt/sponsors.md` | add intro + call-for-sponsors |
| `_config.yml` | enable `Patrocínio` nav link |
| `assets/css/main.scss` | ~2 lines for the strip |
| `assets/images/sponsors/*` | add 10 curated logos (8 PNG + `dest-ime-ufba.jpg` + 2 SVG), optimise on copy, remove `logo-placeholder.svg` |
| `README.md` | fix logo-path hint |

## Verification

1. `docker compose up dev` (or `bundle exec jekyll build -d _site`). `show_errors: true` is on —
   build must be clean, no theme error boxes.
2. `/` and any interior page (`/sobre/`, `/programacao/`): compact sponsor strip appears in the
   footer, category labels correct, logos load (check devtools — no 404 under
   `/assets/images/sponsors/`), each logo links to the right site in a new tab.
3. `/patrocinio/`: three category sections in order (Realização, Organização, Patrocínio),
   intro + call-for-sponsors text, logo grid reflows at sm/md/lg widths.
4. Nav shows "Patrocínio" and routes to `/patrocinio/`.
5. `/404.html`: still renders, footer strip present.
6. Print preview of `/patrocinio/`: footer strip hidden (`d-print-none`).
7. Grep the built `_site` for `logo-placeholder` → no hits.
8. Confirm every `item.url` resolves (200) and matches the institution.
