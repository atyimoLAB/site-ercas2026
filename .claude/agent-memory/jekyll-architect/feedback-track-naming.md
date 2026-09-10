---
name: feedback-track-naming
description: User's rules for naming ERCAS conference tracks — short 2-4 word modern pt-BR terms, grouped into few tracks, singletons avoided
metadata:
  type: feedback
---

When proposing `conference.talks.tracks` names for ERCAS, follow these rules:

1. **Short: 2–4 words**, noun phrases, no long descriptive qualifiers. "IA para Diagnóstico" ✅ / "Fundamentos de IA e Aprendizado de Máquina" ❌.
2. **Current (2026) academic pt-BR buzzwords**, and they must align with the actual session titles — e.g. "IA Generativa e LLMs" for sessions whose titles literally say "LLMs" / "modelos de linguagem".
3. **Group aggressively — fewer tracks wins.** Target ~4–6 tracks for the whole program, each carrying 2+ activities. **A one-talk track is the worst outcome** and only acceptable when genuinely unavoidable (or pre-existing and explicitly frozen).

**Why:** the user wants the card tint on `/programacao/` to carry real meaning while the legend stays hidden (`hide_legend: true`), but a bespoke track per session destroys that signal and produces a confetti of near-identical pale tints. Short names also have to survive the narrow `.program-talk` grid column and the `TAG · TRILHA` meta line.

**How to apply:** whenever asked to add/rename/split a track. The user reversed course once mid-task on this — an earlier "one-item tracks are acceptable" allowance was walked back in favour of consolidation, so default to consolidating and only propose a split when two sessions genuinely cannot share an umbrella. Non-AI tracks (Ciência de Dados, IoT/Infraestrutura, Institucional) are treated as frozen — do not rename or recolour them unless asked, even when they violate rule 1.

See [[theme-program-layout]] for how track colors resolve and why only ~4 Bootstrap contextual slots are visually usable.
