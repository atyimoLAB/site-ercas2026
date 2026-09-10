---
name: data-schema
description: ERCAS 2026 collection/data file schemas, real program content, and the track-less-talk theme quirk
metadata:
  type: project
---

**Collections** (under `pt/`): `_talks/`, `_speakers/`, `_rooms/`. Configured in `_config.yml`
with layout defaults.

**CURRENT STATE (verified 2026-09-10, supersedes the 2026-07 snapshots lower in this file):**
- **Tracks** in `_config.yml` `conference.talks.tracks` (6, taxonomy reworked 2026-09-10):
  `IA Generativa e LLMs`/ercas-violet, `Ciência de Dados Clínicos e Epidemiologia`/success,
  `IA Responsável e Equidade`/danger, `IA para Diagnóstico`/ercas-blue, `IoT, Sistemas e
  Infraestrutura em Saúde`/warning, `Institucional`/secondary. Retired names (still in
  ricardo-gomes.md minibio prose only, fine): `Fundamentos de IA e Aprendizado de Máquina`,
  `LLMs em Saúde`, `Processamento de Linguagem Natural e Saúde Mental`.
- **Track colors**: theme interpolates `track.color` straight into class names
  (`bg-{c}-subtle`, `border-{c}-subtle`, `text-{c}-emphasis`, `link-underline-{c}`) both
  server-side and in `conference.bundle.js` (live mode). `ercas-violet`/`ercas-blue` are
  custom colors defined in `assets/css/main.scss` via `$ercas-track-colors` list + `@each`
  (needs `@use "sass:list"` at file top — bare `nth()` warns `global-builtin` and fails the
  clean-build gate). Bootstrap `-bg-subtle` tints are ~1.1–1.2:1 on the white timetable
  (renders as no color — the `info` bug that triggered this); ercas tints are one step
  deeper (30% base in white): violet #d4c6ec ~1.7:1, blue #b6d4fe ~1.5:1 vs white — stronger
  than every stock track tint. NEVER use `light` as a track color (silent fallback for a
  missing track). `!important` on the emitted rules is correct (mirrors Bootstrap's own
  subtle utilities; main.css loads after conference.bundle.css).
- **Tags** (name-only unless noted): Keynote(icon star), Tutorial(icon mortarboard), Minicurso,
  Palestra, Credenciamento, Abertura, Fechamento, Workshop. Only Minicurso/Palestra/Credenciamento/
  Abertura/Fechamento are actually used by talks. Keynote/Tutorial/Workshop are unused (harmless).
- **Rooms** (5): `auditorio-farmacia.md` "Auditório de Farmácia"/secondary, `ic-sc-1.md`
  "IC - SC I"/success, `ic-sc-2.md` "IC - SC II"/warning, `ic-sc-4.md` "IC - SC IV"/info,
  `saguao-do-ic.md` "Saguão do IC"/dark (Credenciamento only, added 2026-09).
- **program.yml plenary convention** (documented in the file's header comment): each day has
  THREE `plenary: true` lanes — "Auditório de Farmácia" (Abertura/Palestras/Fechamento,
  full-width card + `/salas/auditorio-farmacia/`), "Saguão do IC" (Credenciamento 08:00–08:30
  both days, own full-width card + `/salas/saguao-do-ic/`), and one unnamed `is_break: true`
  (Intervalo/Almoço, flat `.program-banner`, no room page). Non-plenary lanes (IC - SC *)
  become table columns. Verified 2026-09-10: multiple named plenary lanes at different times
  render correctly — theme emits one full-width `colspan` card per active plenary lane per row,
  no empty/stray plenary cells on rows where a given plenary lane is idle. `_layouts/room.html`
  is fine here because each plenary room name appears only once per day (no `{%- break -%}`
  concat issue). All 8 `.program-room-chip-<color>` classes (incl. `-dark`) pre-exist in
  `assets/css/main.css` mapped to `--bs-<color>-bg-subtle`/`-text-emphasis` — any Bootstrap
  color is a valid room `color:` with no CSS change; `dark` gives ~13:1 contrast.
- **"Minicurso N" / "Palestra N" numbering** is derived at render by
  `_includes/ercas_talk_index.html` from CHRONOLOGICAL order across days, per tag, deduped by
  talk `name`; same-`time_start` ties broken by lane order in `program.yml`. Two-part minicursos
  (same name, 08:30–10:00 + 10:30–12:00) share one number. Current mapping: M1 analise-R,
  M2 prompt-engineering(→IA Generativa e LLMs), M3 integrando-cidacs, M4 aplicacoes-llms
  (→IA Generativa e LLMs), M5 blockchain, M6 shap(→IA Responsável e Equidade),
  M7 sumarizacao(→IA Generativa e LLMs); P1 modelos-preditivos(→IA Responsável e Equidade,
  Mariana, 06/10 16:00), P2 deteccao(→IA para Diagnóstico, Rodrigo Veras, 07/10 13:30),
  P3 ia-pln-saude-mental(→IA para Diagnóstico, Helena, 07/10 15:30).
- **Structural invariant**: plenary-lane and parallel-lane activities must be temporally
  disjoint on a given day, or the parallel `<td>` loop is skipped and concurrent talks vanish
  with no build error. Currently disjoint on both days — re-check on every schedule edit.
- **Speakers** (14, all referenced): breno-silva, bruno-oliveira, carlos-cardoso,
  fernando-oliveira, gabriel-teixeira, helena-caseli, jose-augusto, lais-sacramento,
  marcus-eustorgio, mariana-recamonde-mendoza ("Mariana Recamonde-Mendoza"), matheus-villa,
  ricardo-gomes ("Ricardo Gomes" — renamed 2026-09 from ricardo-oliveira.md/"Ricardo
  Oliveira"; same minibio; M7 speaker), ricardo-rocha, rodrigo-veras ("Rodrigo Veras" — NOT the old
  "Rodrigo de Melo Souza Veras" from the 2026-07 snapshot; that file was deleted and recreated).
- Content-gathering pass in progress 2026-09: several talk bodies / speaker minibios are
  intentionally just `<!-- resumo pendente -->` / `<!-- minibio pendente -->` HTML comments.
  Empty bodies are EXPECTED, not a defect. NB these HTML comments DO render into public HTML.

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
