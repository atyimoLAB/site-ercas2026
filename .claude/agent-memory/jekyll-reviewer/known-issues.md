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

**How to apply:** Check item 1 in every future review that adds or edits `_talks/*.md`,
especially hidden/logistics-style entries (breaks, lunch, registration) that don't naturally
have a track. Re-verify the "resolved" items above still hold before citing them, since prior
memory snapshots in this file described a different (multi-config, bilingual) architecture that
turned out to be stale.
