# Avatars

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `borders.md`

The avatar is the **face of the portfolio** — it sits above the headline and is the second-largest element on the page after the hero `h1`. Treat it with care.

## Hero Avatar (the signature profile disc)

This is the only avatar variant that should appear in a hero section. | Property | Value | |---|---| | Width × Height | **208 × 208 px** | | Shape | | Border | **4 px solid `#101828`** | | Inner background | `#FFFFFF` — visible only if the photo doesn't fill | | Image fit | cover fit | | Shadow | | Margin-bottom | 24 px — to the hero `h1` |

The hero avatar is **always circular**. Never a rounded square, never a hexagon, never with a coloured border.

## Inline Avatars (for testimonials, comments, author bylines) | Size | Dimensions | Border | |---|---|---| | Small | 32 × 32 px | none | | Base | 40 × 40 px | none | | Large | 56 × 56 px | 1 px `text/10` (optional) |

All inline avatars are the default radius, cover fit, and use the same white fallback.

## Stacked Avatars

- Displayed in a row
- Each avatar: 32 × 32 px, the default radius, with a 2 px `surface`-coloured ring so they read as separate when overlapping
- Overlap: `-8 px` margin (`-ml-2`) on every avatar except the first
- A trailing "+N" counter uses the same dimensions, background `text` at 10% opacity, ink colour, 12 px Open Sans semibold

## Avatar with Text (author byline)

- Layout: inline flex, items vertically centred, 12 px gap
- Avatar: Base size (40 × 40 px), the default radius, cover fit
- Name: 14 px, weight 600, `text` colour
- Subtitle: 12 px, weight 400, `text/40`

## Prohibited

- No square avatars on hero surfaces.
- No coloured borders (no brand-coloured ring, no rainbow gradient).
- No drop shadow heavier than shadow-sm (see shadows.md).
- No animated/loaded ring spinners around the hero avatar.
- The hero avatar size (208 px) does not change — do not shrink it on smaller screens beyond what the centered layout already does.

