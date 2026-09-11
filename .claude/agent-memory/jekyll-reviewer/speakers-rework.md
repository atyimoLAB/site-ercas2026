---
name: speakers-rework
description: /palestrantes/ card grid, avatar pipeline, schema_speaker.html fork — reviewed 2026-09-10 on thicolares/improve-palestrantes
metadata:
  type: project
---

Reviewed the uncommitted "speakers rework" branch (`thicolares/improve-palestrantes`), plan at
`~/.claude/plans/ask-jekyll-architect-to-plan-silly-waffle.md` + architect spec
`...-agent-a329fd471ea09a34e.md`. Verdict: approve with notes (minor items only). Key facts
worth remembering for future speaker/committee/avatar work on this repo:

**`_includes/schema_speaker.html` is now a permanent fork of the gem.** Confirmed by diffing
against `jekyll-theme-conference-4.0.2`'s copy: the gem's `"name": "{{ ... | jsonify }}"` really
does double-quote (jsonify already quotes), producing invalid `""Helena Caseli""` JSON-LD. Built
and verified the fixed output renders as valid `"name": "Helena Caseli"`. Checked all 4 sibling
schema includes (`schema_talk.html`, `schema_room.html`, `schema_conference.html`,
`schema_location.html`) — **none of them have this bug**; they all already use bare
`{{ x | jsonify }}` without wrapping quotes. So this was not a systemic upstream pattern, just one
broken file — no consistency gap from fixing only `schema_speaker.html`. `list_header_meta.html`
in the gem calls `{% include schema_speaker.html %}` by bare filename, so Jekyll's site-first
include resolution automatically picks up the site's fork with zero further changes needed.

**Avatar front-matter schema** (additive, on `pt/_speakers/*.md`): `avatar: /assets/images/speakers/<slug>.jpg`
(custom key, not `image` — reserved for future SEO plugins) + theme-native `links:` array
(`name`/`absolute_url`/`icon`, rendered by the gem's `get_link.html` as `bi-{{icon}}`). Missing
`avatar:` → `_includes/ercas_speaker_avatar.html` falls back to
`/assets/images/committees/placeholder.svg`, the same grey silhouette `_includes/committees.html`
uses. `_includes/checks.html` (gem) only validates speaker `name` uniqueness — new keys are safe,
leak nowhere.

**CSS pattern for circular avatars**: `@mixin avatar-circle($size)` in `assets/css/main.scss`,
consumed by `.committee-avatar` (64px, `/organizacao/`), `.speaker-avatar-card` (96px, card grid),
`.speaker-avatar-page` (160px desktop / 120px `<576px`, speaker page header). Deliberately mixin-based
not a shared class — sizes diverge per section and a shared class would let one section's tweak
silently restyle another. Verified compiled CSS output for `.committee-avatar` is byte-identical
before/after the mixin refactor.

**Known minor gaps (not blockers) as of this review:**
- `.speaker-card`'s text-column `<div>` (sibling of the avatar `<img>`) has no `min-width: 0` /
  explicit `flex: 1 1 auto` — relies on natural word-wrap to avoid flex overflow. Fine for current
  content (all speaker names/session titles contain wrappable spaces) but worth adding
  defensively before any name/title without spaces shows up.
- Speaker name and derived talk-title output (`{{ speaker.first_name }}`, `{{ ercas_talk_title }}`)
  are NOT `| escape`d in `_layouts/speaker.html` / `_layouts/speaker-overview.html` — inherited
  from the unforked upstream theme behavior, inconsistent with this repo's own
  `_includes/committees.html` precedent which does escape names. Low risk (maintainer-controlled
  content) but flag if this pattern spreads.
- `schema_speaker.html`'s new `speaker_image_url` uses the theme's existing manual
  `prepend: site.baseurl | prepend: site.url` idiom (matches how `speaker_url`/`talk_url` are
  already built in the same file) rather than the `absolute_url` filter — consistent with local
  convention, works correctly today (`baseurl: ""`), but is more fragile than the filter if baseurl
  ever becomes non-empty.

See [[site-architecture]] for the single-config PT-BR setup and [[data-schema]] for
speakers/talks/program cross-reference rules.
