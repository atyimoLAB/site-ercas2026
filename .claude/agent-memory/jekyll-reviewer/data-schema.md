---
name: data-schema
description: ERCAS 2026 collection/data file schemas, real program content, and the track-less-talk theme quirk
metadata:
  type: project
---

**Collections** (under `pt/`): `_talks/`, `_speakers/`, `_rooms/`. Configured in `_config.yml`
with layout defaults.

**_talks/*.md required fields:** `name` (must match `pt/_data/program.yml` talk name exactly,
including accents/punctuation/quoting). Optional: `speakers` (list of speaker `name`s),
`track` (must match a `conference.talks.tracks[].name` in `_config.yml` — see the theme-quirk
note below), `tags`, `links`, `hide`.

**_speakers/*.md required fields:** `name`, `first_name`, `last_name`.

**_rooms/*.md required fields:** `name` (must match `program.yml` room `name` exactly).

**program.yml schema:** `days[].name/abbr/date` → `rooms[].name` → `talks[].name/time_start/time_end`.

**Theme quirk — talks with no `track:` trip a false-positive build error (confirmed 2026-07-10):**
The theme's own README documents `track` as optional on a talk. But
`jekyll-theme-conference-4.0.2/_includes/checks.html` (lines ~10-28) iterates **all** of
`site.talks` unconditionally (it does not skip `hide: true` talks) and treats any talk whose
`track` doesn't match a configured track name — including `nil` when the field is simply
absent — as a "talks assigned to tracks not defined in `_config.yml`" error. Logistics-row
talks (Credenciamento/Intervalo/Almoço-style entries with `hide: true` and no `track`) will
trigger this. Combined with `show_errors: true` being unconditional now (see
[[site-architecture]]), this renders a site-wide red alert box in the actual production build.
**Watch for this in every future review that adds/edits `_talks/*.md` without a `track:`.**
Fix is to give such talks a real configured track (or add a dedicated neutral track like
"Logística" to `conference.talks.tracks` and use it), not to omit the field, despite the
theme docs saying it's optional.

**Current real content (populated 2026-07-10, replacing all prior placeholder/fake data):**
- Tracks in `_config.yml`: Minicurso (info), Palestra (primary), Workshop (success), Abertura
  (warning), Encerramento (dark).
- Room: `pt/_rooms/auditorio.md` → name "Auditório" (single room, all 3 days).
- Speakers: `helena-caseli.md`, `mariana-recamonde.md`, `mirlei-moura-da-silva.md`,
  `ricardo-rios.md`, `robespierre-pita.md`, `rodrigo-veras.md` (name: "Rodrigo de Melo Souza Veras").
- Talks: 18 unique talks across 3 days (2026-10-05/06/07), including 3 reused-by-name
  logistics talks (`credenciamento.md`, `almoco.md`, `intervalo.md`, all `hide: true`, no track)
  each scheduled multiple times across days without file duplication.
- All previous fake identifiers (`keynote-abertura`, `telemedicina-hospitais`,
  `ia-vigilancia-epidemiologica`, `ana-costa`, `bruno-lima`, `carla-mendes`, `sala-principal`,
  `sala-workshop`, tracks Pesquisa/Indústria/Educação) are fully deleted — confirmed absent
  from the whole tree via grep, not just orphaned.

**Note:** `pt/_data/committees.yml` independently has members literally named "Ana Costa",
"Bruno Lima", "Carla Mendes" — coincidental reuse of the old fake-speaker names in an unrelated
data file, not leftover fake-speaker content. Don't confuse the two if grepping for these names.

**Cross-reference integrity (verified 2026-07-10 via scripted comparison, not just eyeballing):**
every `program.yml` talk name matches a `_talks` file `name:` exactly; every talk `speakers:`
entry matches a `_speakers` file `name:` exactly; the room name matches; all `track:` values
match a configured track name; no time-slot overlaps within a room/day.
