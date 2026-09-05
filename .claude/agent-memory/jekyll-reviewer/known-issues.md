---
name: known-issues
description: Recurring and known issues in ERCAS 2026 site to watch in future reviews
metadata:
  type: feedback
---

**Resolved since last check (verify still true, don't just trust this):**
- GUIDE.md/README.md leaking into `_site/` — now in `exclude:` in `_config.yml`, confirmed absent
  from a fresh build 2026-07-10.
- Old fake program/speaker/room placeholder content — fully replaced with real ERCAS 2026
  schedule 2026-07-10, see [[data-schema]].

**Open / newly discovered (2026-07-10):**
1. **Track-less talks trigger a false-positive theme build error, rendered site-wide.** See
   [[data-schema]] "Theme quirk" section for full mechanics. Any `_talks/*.md` without a
   `track:` field (even `hide: true` logistics rows, which the theme's own README says are
   allowed to omit `track`) causes `_includes/checks.html` in the gem to add them to a
   "tracks not defined" error, which renders as a red `alert-danger` box on every page because
   `show_errors: true` is unconditional in prod now (see [[site-architecture]]). This is the
   single highest-value check for future reviews of `_talks/` changes: grep built HTML for
   `alert-danger` after every build touching talks.

2. **"A confirmar" as a fake `speakers:` entry renders as a broken empty-href link, not plain
   text (discovered/verified in built HTML 2026-07-17).** After the `_includes/list_speakers.html`
   repo override was reverted (restoring the gem's stock include with no empty-state branch),
   editors started typing the literal name "A confirmar" into `speakers:` lists as a manual
   placeholder for unconfirmed speakers. The gem's include only suppresses the `<a>` wrapper when
   `speaker.hide` is truthy; a non-matching name gives a `nil` speaker object, so `speaker.hide`
   is falsy and it still emits `<a href="">A confirmar</a>` (confirmed in `talks/*.html` and
   8x on `programacao/index.html`). **Decided 2026-07-17: accepted as-is, not a bug to fix.**
   User was asked and explicitly chose to leave the empty-href anchor rather than add a
   `hide: true` speaker stub doc — the stub was rejected because the gem's
   `speaker-overview.html` doesn't skip hidden speakers, so it would leak a fake "A confirmar"
   row onto the public `/palestrantes/` page. **Do not propose the stub-doc fix again** unless
   the user revisits this trade-off. Do not flag the empty-href anchor as a review finding.

3. **`/programacao/` day selector — history + current state (last touched 2026-09-05).**
   `_layouts/program.html` line ~21 appends a date span after `{{ day_name }}` on each day
   tab, and line 17 sets the `<ul>` nav style. Iterations:
   - v1: `nav-pills` + `<span class="text-body-secondary">— N de Out.</span>` — FAILED WCAG
     AA: on the active pill (`#0d6efd` bg, `#fff` text) `.text-body-secondary`'s
     `color: var(--bs-secondary-color) !important` won over the inherited white → ~2.4:1.
     (Pure white on `#0d6efd` is only ~4.9:1, so any opacity/desat on that blue pill fails.)
   - v2: dropped the color class, span became `<span class="fw-normal">` inheriting the
     pill color. AA OK.
   - v3: `nav-pills` → `nav-tabs`; separator `— ` → `, ` (comma tight to name:
     "Terça-feira, 6 de Out."); NEW scoped block in `assets/css/main.scss` under
     `#program-tabs`. An interim v3 used `box-shadow: inset 0 -3px 0 var(--bs-primary)` for
     the active accent — that FAILED WCAG 2.4.7 because Bootstrap's only focus indicator is
     `.nav-link:focus-visible { outline:0; box-shadow:0 0 0 .25rem #0d6efd40 }` and the
     higher-specificity `.active` box-shadow overrode it, so a focused active tab looked
     identical to an unfocused one. Removed.
   - v4 used `font-weight: 700` on `.nav-link.active` → the bold label was wider than the
     inactive tab, so the tab visibly resized on click. Removed.
   - v5 (current, APPROVED 2026-09-05): `#program-tabs` block =
     `--bs-nav-tabs-border-width: 2px` (one override that keeps the strip's bottom line, each
     link's negative bottom margin, and the active link's border width in lockstep → no
     vertical drift); inactive `.nav-link` `color: var(--bs-secondary-color)`
     (≈6.8:1 on #fff, AA); `.nav-link:hover,:focus` `color: var(--bs-emphasis-color)`;
     `.nav-link.active` = `--bs-emphasis-color` (#000, ≈18:1 on the 8% primary tint) +
     `background-color: rgba(var(--bs-primary-rgb),0.08)` +
     `border-color: var(--bs-primary) var(--bs-primary) var(--bs-body-bg)` (classic bordered
     tab: 2px blue top/sides, bottom painted `#fff` to overlap and hide the grey strip line;
     ground behind the strip is body `#fff`, so the math works). **Only color / background /
     border-color change on activation — font, padding, line-height, border-box all identical
     both states, so the tab cannot reflow on click.** (`.nav-underline .nav-link.active`
     sets `font-weight:700` but the `<ul>` is `nav-tabs`, not `nav-underline`, so it never
     applies.) NO box-shadow → Bootstrap's stock `:focus-visible` ring is uncontested for
     every tab. `#program-tabs` id beats Bootstrap's `.nav-tabs …`. main.css loads after
     conference.bundle.css. `.fw-normal` date span is 400 in both states.
   - **Dark mode: site forces `data-bs-theme="light"` via a MutationObserver in the repo's
     `_includes/header.html` override, so dark never renders — dark-mode contrast is moot,
     but the block uses `--bs-*` tokens so it'd still be sane if dark were re-enabled.**
   When reviewing this selector in future: any `box-shadow` on `.nav-link.active` re-breaks
   the focus ring (2.4.7); verify id-selector specificity still wins after a theme bump; the
   `--bs-body-bg` bottom-border trick only works while the page ground behind the tab strip
   stays `#fff`; re-confirm the light-force in header.html before dismissing dark mode.

**How to apply:** Check item 1 in every future review that adds or edits `_talks/*.md`,
especially hidden/logistics-style entries (breaks, lunch, registration) that don't naturally
have a track. Check item 2 whenever a talk's `speakers:` list contains a placeholder/unconfirmed
name rather than a real matching `_speakers` doc. Re-verify the "resolved" items above still
hold before citing them, since prior memory snapshots in this file described a different
(multi-config, bilingual) architecture that turned out to be stale.
