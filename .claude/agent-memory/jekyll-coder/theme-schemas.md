---
name: theme-schemas
description: jekyll-theme-conference 4.0.2 verified field names, deprecated keys, data_dir/lang.yml gotcha, and checks.html findings
metadata:
  type: reference
---

## Verified layouts in gem

default, home, page, program, location, room, speaker, speaker-overview, talk, talk-overview, stream-overview, manifest, json-config, json-data, json-site, sw.js

## conference: config keys (base _config.yml)

- `name`, `year`, `tz`, `show_errors` — top-level under conference
- `event:` — `dates`, `city`, `venue`, `registration_url`
- `social:` — `email`, `instagram`
- `talks.tracks:` list of `{name, color}` — color is a Bootstrap color name (info/success/warning/danger/primary)
- `talks.tags:` list of `{name, icon}` — icon is a bootstrap-icons name
- `conference.navigation.links:` list of `{name, relative_url | absolute_url}` — set in per-lang config

## DEPRECATED keys (cause theme error bar)

- `conference.location` → move to location page front matter
- `conference.program` → move to program page front matter
- `conference.main` → move to home page front matter
- `conference.info_bars` → renamed to `conference.info.bars`
- `conference.link_preview` → renamed to `conference.meta.link_preview`
- `conference.speakers.show_firstname` → no longer supported
- `conference.talks.main_categories` → renamed to `conference.talks.tracks`
- `conference.talks.hide_icons` / `hide_link_icons` → no longer supported

## data_dir gotcha

When `data_dir: pt/_data` is set, Jekyll no longer reads the theme gem's `_data/`. The theme's `checks.html` validates `site.data.lang.version == 10`. Without lang.yml in pt/_data/, this check fails and an error bar appears.

**Fix:** copy theme gem's `_data/lang.yml` into both `pt/_data/lang.yml` and `en/_data/lang.yml`. Do not edit it — the theme owns this file.

## location layout front matter

`postal_address:` is a page-level key (not a config key), with sub-fields: `name`, `street`, `region`, `postal_code`, `locality`. `map:` is also page-level (not config).

## Liquid in YAML front matter

Jekyll does NOT interpolate Liquid in YAML front matter values. `title: "{{ site.conference.name }}"` renders literally. Use static values in front matter; use Liquid only in page body markdown.

## Collections defaults wiring

In base _config.yml:
```yaml
defaults:
  - scope: {path: "", type: talks}    values: {layout: talk}
  - scope: {path: "", type: speakers} values: {layout: speaker}
  - scope: {path: "", type: rooms}    values: {layout: room}
```
Collections must have `output: true`.

## program.yml schema

```yaml
days:
  - name: Day Name
    abbr: Abbr
    date: 2026-10-13          # ISO date
    rooms:
      - name: Sala Principal  # must match _rooms/<file>.md name: field exactly
        talks:
          - name: Talk Name   # must match _talks/<file>.md name: field exactly
            time_start: "09:00"
            time_end: "10:00"
```

## Talk front matter

`name` (req, unique, matches program.yml), `speakers` (list of speaker name strings, must match _speakers name: fields), `track` (matches a conference.talks.tracks name), `tags` (list matching conference.talks.tags names), `links`, `hide`.

## Speaker front matter

`name` (req, unique), `first_name`, `last_name` (req), `links`, `hide`.

## Room front matter

`name` (req, unique, matches program.yml room names), `hide`, `live`.

## Tracks vs tags — confirmed theme rendering behavior (2026-07)

Read from gem source, not assumed:
- `talk.track` is a **singular string** matched against `conference.talks.tracks[].name`.
  Track `color:` (Bootstrap color name) **is used** — border/badge/legend in both the talk
  page and the program grid (`get_track_properties.html` → `bg-{color}-subtle` etc).
- `talk.tags` is a **list** of strings matched against `conference.talks.tags[].name`. Tag
  `color:` is defined in the schema but the theme **ignores** it — don't bother setting it.
  A tag with an `icon:` renders **icon-only** on the talk page (the tag word is hidden,
  screen-reader/tooltip only) via `list_tags.html`. If you want the tag word visible, omit
  `icon:` — name-only tags render as `<span class="me-2">{name}</span>` (test to confirm
  this holds in future theme versions).
- Hidden talks (`hide: true`, e.g. logistics/breaks) still render as colored program-grid
  cells and **must** have a `track:` set or the previous cell's `track_color` bleeds forward
  in the grid — don't leave `track:` unset on hidden talks.
- ERCAS 2026 taxonomy (as of 2026-07): 7 tracks — 5 thematic (Diagnóstico por Imagem e Visão
  Computacional/primary, Processamento de Linguagem Natural e Saúde Mental/info, Ciência de
  Dados Clínicos e Epidemiologia/success, Fundamentos de IA e Aprendizado de Máquina/danger,
  IoT Sistemas e Infraestrutura em Saúde/warning) + Sessões Técnicas/dark + Institucional/
  secondary. Session-format words (Minicurso/Palestra/Workshop) live as name-only tags, not
  tracks. Sessões Técnicas and Institucional talks get no format tag (redundant with the
  track name itself).

## Empty-speakers fallback — REVERTED (2026-07-17)

The repo-local `_includes/list_speakers.html` override described here previously (added
2026-07) has been deleted. The theme gem's original `list_speakers.html` (no empty-state
branch) is back in effect via Jekyll's local-then-gem include resolution: a talk with no
`speakers:` field now renders **no speaker line at all**, everywhere the include is used
(talk page, program grid, overview). The `speaker.tba` key ("A confirmar") was removed from
`pt/_data/lang.yml`.

"A confirmar" is no longer a theme-wide fallback — it is now a **manual, per-talk literal
string** that editors type directly into a talk's `speakers:` front-matter list when a real
talk's speaker isn't confirmed yet, e.g.:
```yaml
speakers:
  - A confirmar
```
It renders as plain unlinked text (inside an empty-href anchor, since it won't match any
`_speakers` doc `name:`) — cosmetically harmless, same as any other unmatched speaker name.
Institucional-track ceremony/logistics talks (Abertura Oficial, Almoço, Credenciamento,
Intervalo, Premiação e Encerramento) intentionally have **no** `speakers:` field at all, so
they render with no speaker line — do not add "A confirmar" to those.

## program.html override for single-room full-width (repo override, added 2026-07)

Theme's `_layouts/program.html` table is fixed-width (`.program-talk { width: 15rem }`) with
no per-day room-count hook. Repo now overrides this layout (copied from gem 4.0.2) to hoist
the existing `nbr_rooms = d.rooms | size` assign above the `<table>` tag and add a
conditional class: `program-rooms-1 w-100` when `nbr_rooms == 1`, else the original `w-auto`.
Paired with `assets/css/main.scss` rule `.program-table.program-rooms-1 .program-talk { width:
auto; min-width: 0; max-width: none; }`. This is a first-time override of `program.html` —
it will NOT auto-track future `jekyll-theme-conference` gem updates to that layout; re-diff
against the gem source on theme version bumps.
