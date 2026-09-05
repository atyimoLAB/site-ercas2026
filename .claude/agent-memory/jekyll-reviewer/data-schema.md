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
- Room: `pt/_rooms/auditorio.md` → name "Auditório" (single room, both days).
- Speakers: `helena-caseli.md`, `mariana-recamonde.md`, `mirlei-moura-da-silva.md`,
  `ricardo-rios.md`, `robespierre-pita.md`, `rodrigo-veras.md` (name: "Rodrigo de Melo Souza Veras").
- Talks: 14 unique talks across 2 days (2026-10-06/07), including 3 reused-by-name
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

**Note (2026-07-17, CORRECTED same day after actual build verification):** the literal string
"A confirmar" appearing in a talk's `speakers:` list (e.g. `analise-sintatica-transformers.md`,
`criando-rede-neural-do-zero.md`, `epidemiologia-genomica-coortes.md`,
`fundamentos-iot-healthcare.md`, `imagens-suporte-diagnostico.md`, `sessao-tecnica-1/2/3.md`) is
an intentional, non-matching placeholder name, not a broken cross-reference — don't flag the
*name mismatch* itself. **But it does NOT render as plain unlinked text as previously assumed
here.** Verified in built HTML (`talks/*.html` and `programacao/index.html`): the gem's stock
`list_speakers.html` only prints plain text when `speaker.hide` is truthy; since "A confirmar"
has no matching `_speakers` doc, `speaker` resolves to `nil`, `speaker.hide` is falsy, and the
`else` branch fires, producing `<a href="">A confirmar</a>` — an anchor with an **empty href**
(links to the current page), on every one of the 8 talks and duplicated on the program page.
This is a real accessibility/UX defect (misleading affordance, WCAG 2.4.4 link-purpose concern),
not the plain-text fallback the revert intended. **Recommended fix, still unapplied as of
2026-07-17:** add a `_speakers/*.md` stub doc with `name: A confirmar` and `hide: true` — the
theme's own `speaker.hide` branch then renders plain text with no link everywhere
`list_speakers.html` is used, no custom override needed. Side effect to weigh: gem's
`speaker-overview.html` does NOT skip `hide: true` speakers (line ~32), so this stub would also
appear as a plain-text "A confirmar" row in the alphabetized speakers overview page — likely
acceptable but flag it to the user/jekyll-coder rather than assuming. The five
Institucional-track ceremony/logistics talks (`abertura-oficial`, `almoco`, `credenciamento`,
`intervalo`, `premiacao-encerramento`) still have no `speakers:` field at all — confirmed via
`git diff` they're untouched — and correctly render no speaker line at all (that code path is
fine; only the "A confirmar"-as-fake-speaker-name path is broken).

**Track/tag taxonomy overhaul (2026-07-12, verified clean):** `conference.talks.tracks` is now
7 thematic/institutional tracks (Diagnóstico por Imagem e Visão Computacional/primary,
Processamento de Linguagem Natural e Saúde Mental/info, Ciência de Dados Clínicos e
Epidemiologia/success, Fundamentos de IA e Aprendizado de Máquina/danger, "IoT, Sistemas e
Infraestrutura em Saúde" [comma, not slash]/warning, Sessões Técnicas/dark, Institucional/
secondary) — the old format-as-track values (Minicurso/Palestra/Workshop/Abertura/
Encerramento/Logística) are gone from `_config.yml` and from every `_talks/*.md`, confirmed
via grep. Minicurso/Palestra/Workshop now live as name-only entries in `conference.talks.tags`
(no `color`/`icon` — confirmed via gem source `get_tag_icon.html`/`list_tags.html` that tags
render fine with no icon, falling back to plain text; tag `color:` is schema-valid but the
theme ignores it, so omitting it is correct, not an oversight). All logistics/hidden talks
(`credenciamento`, `almoco`, `intervalo`) and ceremony talks (`abertura-oficial`,
`premiacao-encerramento`) now carry `track: Institucional` instead of being omitted — this
respects the [[known-issues]] track-less-talk quirk correctly.

**Theme override inventory (added 2026-07-12, first-time overrides — will NOT auto-track gem
updates, re-diff on theme version bumps):**
- `_includes/list_speakers.html` override — **reverted 2026-07-17.** The repo-local wrapper
  (which added an `{% else %}` fallback rendering `site.data.lang[pt].speaker.tba` / "A
  confirmar" for any talk with no `speakers:`) was deleted; the theme gem's original include
  (no empty-state branch) is back in effect via local-then-gem resolution. A talk with no
  `speakers:` now renders no speaker line at all, everywhere the include is used. The
  `speaker.tba` key was removed from `pt/_data/lang.yml`. "A confirmar" now only appears when
  an editor manually types it into a specific talk's `speakers:` list — see below.
- `_layouts/program.html`: hoists the existing `nbr_rooms = d.rooms | size` assign from inside
  the room `<th>` loop to just above the `<table>` tag (single assignment, no shadowing/dupes
  elsewhere in the file — checked), and appends ` program-rooms-1 w-100` to `.program-table`
  when `nbr_rooms == 1`, else the original ` w-auto`. Paired with new `assets/css/main.scss`:
  `.program-table.program-rooms-1 .program-talk { width: auto; min-width: 0; max-width: none; }`
  — 3-class selector correctly wins specificity over the gem's 2-class
  `.program-table .program-talk { width: 15rem }` (`_sass/theme.scss`), and only applies when
  the `program-rooms-1` class is present, so the multi-room fixed-15rem horizontal-scroll path
  is untouched. **Caveat: the multi-room path is currently unexercised by real data** — ERCAS
  2026 has exactly one room (Auditório) on all 3 program days, so this override has never been
  visually verified against an actual multi-room table. Re-verify visually if/when a second
  room is ever added to `program.yml`.
