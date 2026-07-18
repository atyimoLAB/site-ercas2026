---
name: theme-program-layout
description: How jekyll-theme-conference program/timetable renders tracks, tags, and the legend; repo override points
metadata:
  type: project
---

`jekyll-theme-conference` 4.0.2 program/timetable internals (gem at `~/.local/share/mise/installs/ruby/3.4.4/.../gems/jekyll-theme-conference-4.0.2`).

**Repo already overrides `_layouts/program.html`** (near-verbatim copy of the gem's). This is where timetable event cards and the bottom legend are rendered — edit this file, not the gem.

- **Event card** (repo `_layouts/program.html` ~line 178-193): includes `get_track_properties.html` which sets `track_color` (from `site.conference.talks.tracks[].color`, matched by `talk.track == track_prop.name`, default `light`). The card `<div>` is tinted `bg-{track_color}-subtle text-{track_color}-emphasis border-start border-4 border-{track_color}-subtle`. **The track NAME is not shown on the card** — only the color tint. `talk.track` holds the name string.
- **Tag pills** rendered by theme include `list_tags.html`: `<span class="badge fw-normal bg-body-secondary text-body-secondary {{ include.class }}">…</span>`. This is the theme's canonical pill/badge pattern to mirror for a track pill (swap the neutral colors for `bg-{track_color}-subtle text-{track_color}-emphasis`).
- **Legend** (repo `_layouts/program.html` ~line 225-234): renders under `<h5>` using lang key `program.legend` (PT = "Legenda"), one colored box per track. Gated by `{%- unless page.hide_legend -%}`. **Toggle off via `hide_legend: true` in the program page front matter** (`pt/program/index.md`) — no override/gem edit needed.

Tracks/tags configured in `_config.yml` under `conference.talks.tracks` / `conference.talks.tags`. Track colors are Bootstrap theme color names (primary/info/success/danger/warning/dark/secondary). No custom SCSS needed for pills — Bootstrap color-utility + badge classes are already compiled by the theme.
