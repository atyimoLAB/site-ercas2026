# Color Tokens

> The minimal portfolio palette is intentionally tiny: one warm cream, one warm near-black, and a few status hues. Light only — no dark-mode variants.

All values below are technology-agnostic; map them to whatever styling layer the project uses.

## Core Palette (used everywhere) | Token | Value | Role | |---|---|---| | `surface` | `#F4F4F1` | Page background, button-foreground on dark | | `primary` | `#0C0C09` | Headline ink, CTA background | | `text` | `#0C0C09` | Default body ink (same value as `primary`, kept distinct for semantics) | | `rgba(12, 12, 9, 0.6)` | Secondary copy — always express as "text at 60% opacity"; do not introduce a separate gray hex | | `rgba(12, 12, 9, 0.4)` | Captions, metadata | | `hairline` | `rgba(12, 12, 9, 0.10)` | Optional 1 px dividers | | `crosshatch` | `rgba(12, 12, 9, 0.03)` | The signature +45° / -45° background pattern |

## Bordered Disc (avatar) | Token | Value | |---|---| | `disc-border` | `#101828` (slightly cooler than ink for crispness on the cream) | | `disc-fill` | `#FFFFFF` |

## Interaction States (derived from `primary`) | State | Expression | |---|---| | Hover on dark CTA | `primary` at 90% opacity | | Active on dark CTA | `primary` at 80% opacity | | Focus ring | `primary` outline, 2 px, 2 px offset | | Disabled | `primary` at 30% opacity background, `surface` text |

## Status (use only inside small components — never on hero surfaces) | Token | Value | |---|---| | `success` | `#16A34A` | | `warning` | `#D97706` | | `danger` | `#DC2626` | | `info` | `#2563EB` |

Each status token is paired with a `*-soft` background derived as a 10% mix of the status colour into `surface`.

## Semantic Usage Rules

- **Page surface:** always `surface`. Never alternate section backgrounds.
- **Headlines (`h1`–`h3`):** `primary`.
- **Body paragraphs:** `text` at 60% opacity. Full-strength `text` is reserved for emphasised inline runs (`<strong>`).
- **Captions / metadata / timestamps:** `text` at 40% opacity.
- **Primary CTA:** `primary` background, `surface` label.
- **Links inline in copy:** `primary` ink, 1 px underline at `text/40`, hover removes the underline.
- **Dividers:** 1 px line at `hairline`. Avoid them when whitespace already separates content.
- **Status indicators:** use the status token for the icon / dot only; keep the surrounding surface cream.

## Prohibited

- No raw hex / rgb in component code — always go through tokens.
- No second gray ramp. Hierarchy is achieved by lowering the opacity of `text`, not by adding new grays.
- No gradients on text or surfaces.
- No saturated brand colours on large layout surfaces. The page must read as cream + ink first.
- No dark-mode overrides. This skill is light-mode only.
- No accent colour for body copy or navigation.

