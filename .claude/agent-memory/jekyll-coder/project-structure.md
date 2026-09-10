---
name: project-structure
description: ERCAS 2026 current single-config PT-BR site structure (bilingual plan was abandoned/reverted)
metadata:
  type: project
---

## Single-config PT-BR (current, as of 2026-07)

The site reverted from the old bilingual multi-config plan (no more `_config.pt.yml` /
`_config.en.yml`). There is now **one** `_config.yml` at repo root:
- `collections_dir: pt`, `data_dir: pt/_data`
- `conference.lang: pt`, PT navigation baked in directly
- `exclude: [en, GUIDE.md, README.md]` — an `en/` tree still exists on disk but is excluded
  from the build (bilingual is a future/pending migration, not active)
- `url: https://ercas2026.ufba.br`, `baseurl: ""` — custom domain target already configured
  in config; DNS cutover itself is still pending (see GUIDE.md)

Full architecture and conventions are documented in the repo's own `/CLAUDE.md` — read that
first, it is kept up to date by the team. Don't rely on old notes describing a
`_config.pt.yml`/`_config.en.yml` split; that no longer reflects reality.

## Tree layout (real content, not placeholders)

```
pt/
  _talks/     18 real talk docs (see theme-schemas.md track/tag table)
  _speakers/  6 real speakers: Helena Caseli, Mariana Recamonde, Mirlei Moura da Silva,
              Ricardo Rios, Robespierre Pita, Rodrigo de Melo Souza Veras
  _rooms/     1 room: auditorio.md (name: Auditório) — every program day is single-room
  _data/      program.yml, lang.yml, committees.yml, sponsors.yml, important_dates.yml
  index.md, program/index.md, talks/index.md, speakers/index.md, location/index.md,
  committees.md, sponsors.md, important-dates.md, 404.html
_includes/    committees.html, sponsors.html, important_dates.html, header.html, navbar.html,
              plus repo override of list_speakers.html (added 2026-07, see theme-schemas.md)
_layouts/     home.html, location.html overrides, plus repo override of program.html
              (added 2026-07, see theme-schemas.md — first-time override, won't auto-track
              future theme updates to that layout)
assets/css/main.scss  new as of 2026-07 (was previously linked by header.html but didn't
              exist — 404'd). Empty Jekyll front matter `---\n---\n` needed to compile to .css.
```

Program schedule (as of 2026-09, `pt/_data/program.yml`): 2 days (Ter/Qua,
2026-10-06..07), each with **2 parallel IC rooms** + **3 `plenary: true` lanes**:
  1. `name: Auditório de Farmácia` (color `secondary`) — Abertura, keynotes, Fechamento;
     full-width session card.
  2. `name: Saguão do IC` (color `dark`) — Credenciamento only, 08:00–08:30 both days;
     full-width session card. Added when D7 was reversed — Credenciamento moved out of the
     Auditório lane into its own named plenary lane.
  3. unnamed + `is_break: true` — Intervalo/Almoço; flat `.program-banner`.
The two named plenary lanes never overlap in time, so the layout's "last plenary talk
starting on this row wins" logic is safe. Adding a 4th plenary lane that shares a start
time with another named one WOULD collide (only one banner `<td>` per row).

`pt/_rooms/` has 5 room docs: `auditorio-farmacia`, `ic-sc-1` (IC - SC I/success),
`ic-sc-2` (IC - SC II/warning), `ic-sc-4` (IC - SC IV/info), `saguao-do-ic` (dark).

`pt/_speakers/` (14): Breno Silva, Bruno Oliveira, Carlos Cardoso, Fernando Oliveira,
Gabriel Teixeira, Helena Caseli, José Augusto, Laís Sacramento, Marcus Eustórgio,
Mariana Recamonde-Mendoza, Matheus Villa, Ricardo Gomes (file `ricardo-gomes.md` —
renamed 2026-09 from "Ricardo Oliveira"), Ricardo Rocha, Rodrigo Veras.
