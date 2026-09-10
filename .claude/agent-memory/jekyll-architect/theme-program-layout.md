---
name: theme-program-layout
description: How jekyll-theme-conference program/timetable renders tracks, tags, legend and plenary lanes; repo override points and the two structural invariants that break schedules
metadata:
  type: project
---

`jekyll-theme-conference` 4.0.2 program/timetable internals (gem at `~/.local/share/mise/installs/ruby/3.4.4/.../gems/jekyll-theme-conference-4.0.2`).

**Repo already overrides `_layouts/program.html`** (near-verbatim copy of the gem's). This is where timetable event cards and the bottom legend are rendered — edit this file, not the gem.

- **Event card** (repo `_layouts/program.html` ~line 178-193): includes `get_track_properties.html` which sets `track_color` (from `site.conference.talks.tracks[].color`, matched by `talk.track == track_prop.name`, default `light`). The card `<div>` is tinted `bg-{track_color}-subtle text-{track_color}-emphasis border-start border-4 border-{track_color}-subtle`. **The track NAME is not shown on the card** — only the color tint. `talk.track` holds the name string.
- **Tag pills** rendered by theme include `list_tags.html`: `<span class="badge fw-normal bg-body-secondary text-body-secondary {{ include.class }}">…</span>`. This is the theme's canonical pill/badge pattern to mirror for a track pill (swap the neutral colors for `bg-{track_color}-subtle text-{track_color}-emphasis`).
- **Legend** (repo `_layouts/program.html` ~line 225-234): renders under `<h5>` using lang key `program.legend` (PT = "Legenda"), one colored box per track. Gated by `{%- unless page.hide_legend -%}`. **Toggle off via `hide_legend: true` in the program page front matter** (`pt/program/index.md`) — currently ON (legend hidden), so track names surface only in the card's `TAG · TRILHA` meta line and on the talk page.

Tracks/tags configured in `_config.yml` under `conference.talks.tracks` / `conference.talks.tags`.

## Track colors — how they actually resolve

`track_color` is **pure string interpolation**, never an ordinal/auto-assignment: `get_track_properties.html` matches `talk.track == track_prop.name` and reads that entry's `color:`. So **adding, reordering or removing tracks never shifts any other track's color.** Track order only affects the (hideable) legend and the grouping order on `/palestras/` (`_layouts/talk-overview.html` iterates tracks in config order). Tracks produce no anchors/IDs → renaming breaks no deep links. `_data/program.yml` has no `track` key at all (it keys talks by `name`), so track work never touches it.

The name is interpolated into exactly four class families, in `_layouts/program.html`, `_includes/ercas_talk_card.html`, `_layouts/talk.html`, `_layouts/talk-overview.html`, `_includes/show_talk_listed.html`, `_includes/get_talk_overview_talk.html`, `_includes/show_talk.html`, `_includes/list_speakers.html`, `_layouts/json-data.html`, **and in `assets/js/conference.bundle.js`** (live/app view builds `` `${…color}-subtle` `` and `link-underline-${…color}` the same way):

- `bg-{c}-subtle` · `text-{c}-emphasis` · `border-{c}-subtle` · `link-underline-{c}`

**Consequence: any name works as a track color, not just Bootstrap's contextual names** — it just needs those four classes defined in `assets/css/main.scss`. This is the escape hatch when the 8 contextual slots run out.

**`light` is the silent fallback** when `talk.track` matches no configured track — and `--bs-light-bg-subtle` is `#FBFCFD`, i.e. literally white. **A white/uncoloured card is the exact signature of a broken track reference** (a rename applied in `_config.yml` but not in every `pt/_talks/*.md`, or vice-versa). `show_errors: true` catches it via the gem's `checks.html` `missing_tracks` list, so always read the build's error box.

**Bootstrap 5.3 `-bg-subtle` tints are weak** (20% of the base mixed into white). Contrast vs the white page: `warning` #FFF2CD ≈ 1.10:1, `info` #CFF4FC ≈ 1.16:1, `primary` #CFE2FF ≈ 1.22:1, `secondary` #E1E3E5 ≈ 1.30:1, `success` #D1E7DC ≈ 1.33:1, `danger` #F8D6D9 ≈ 1.36:1. **`info` and `warning` read as "no fill" on a white timetable** — that is a perceptual problem, not a wiring bug; check the built HTML before assuming a broken reference. `dark` #CED4DA is mid-grey and reads as disabled. So the practically usable contextual slots for tracks are ~4 (`success`/`danger`/`warning`/`secondary`), not 8.

## Two invariants that silently break schedules

1. **Plenary and parallel lanes must be temporally disjoint.** The repo's `program.html` delta 3 branches `if plenary_starts_here / elsif plenary_active / else <parallel loop>`. If any plenary-lane activity is running on a row, the parallel `<td>` loop is **skipped entirely** and concurrent room talks vanish from the grid with no build error. A genuinely parallel session in the plenary room must be modeled as an extra **non-plenary lane** (same `name`) for that day, which turns the room into a real column (`nbr_rooms`/`banner_span` recompute per day, so mixed 2-column / 3-column days are fine).
   As of the Oct-2026 grade, ERCAS's own schedule **does** keep the lanes disjoint on both days (plenary Auditório items never overlap the IC-room minicursos), so no extra lane / no override is needed — but re-check this on every schedule change.

2. **`_layouts/room.html` (gem, not yet overridden in repo) `{%- break -%}`s after the FIRST lane matching `this_room.name` per day.** So if a day has two lanes with the same room name (the pattern from invariant 1), `/salas/<room>/` lists only the first lane's talks. Fix = repo override that concatenates all matching lanes' `talks` per day and `| sort: 'time_start'` before rendering. `_layouts/speaker.html` has no such break and is unaffected.

## Numbering of "Minicurso N" / "Palestra N"

Derived at render time by `_includes/ercas_talk_index.html` + `ercas_talk_title.html` from **chronological order across days**, per tag, deduped by talk `name`; ties at the same `time_start` broken by lane order in `program.yml`. There is **no way** to impose an out-of-chronology numbering (e.g. an organizers' spreadsheet that labels a later talk "Palestra 1") without adding an explicit front-matter override (e.g. `label:`) to `ercas_talk_title.html`. Check this whenever the schedule reorders keynotes.
