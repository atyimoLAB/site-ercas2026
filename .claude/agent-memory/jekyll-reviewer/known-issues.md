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

**How to apply:** Check item 1 in every future review that adds or edits `_talks/*.md`,
especially hidden/logistics-style entries (breaks, lunch, registration) that don't naturally
have a track. Check item 2 whenever a talk's `speakers:` list contains a placeholder/unconfirmed
name rather than a real matching `_speakers` doc. Re-verify the "resolved" items above still
hold before citing them, since prior memory snapshots in this file described a different
(multi-config, bilingual) architecture that turned out to be stale.
