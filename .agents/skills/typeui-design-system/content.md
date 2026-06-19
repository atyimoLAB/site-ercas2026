# Content & Grid System

> Dependencies: `layout.md`, `typography.md`

## Containers | Type | Max width | Horizontal padding | |---|---|---| | Hero (single-column) | **672 px** | 16 px on mobile, 32 px from the small breakpoint up | | Long-form prose | 768 px | 16 px on mobile, 32 px from the small breakpoint up | | Works grid | 1024 px | 16 px on mobile, 32 px from the small breakpoint up | | Absolute outer cap | 1280 px | 16 px on mobile, 32 px from the small breakpoint up |

Centre everything horizontally. No full-bleed text — text always sits inside one of the four containers above.

## Vertical Padding | Breakpoint | Section padding | |---|---| | Mobile | 64 px | | Tablet (≥768 px) | 96 px | | Desktop (≥1024 px) | 128 px |

The hero section uses full viewport height and centres its content vertically — it does not follow the section padding scale.

## Grid System

Mobile-first. Default to one column; only escalate when content density actually requires it. | Context | Gap | |---|---| | Works grid (cards) | 32 px | | Two-column prose | 48 px | | Compact metadata rows | 16 px |

### Responsive Columns | Breakpoint | Default columns | Maximum | |---|---|---| | Mobile (default) | 1 | 1 | | Small (≥640 px) | 1 | 2 | | Medium (≥768 px) | 2 | 2 | | Large (≥1024 px) | 2 | 3 |

**Never more than 3 columns.** This design's density is intentionally low.

## Breakpoints | Name | Width | |---|---| | Small | 640 px | | Medium | 768 px | | Large | 1024 px | | Extra large | 1280 px | | 2x Extra large | 1536 px |

## Composition Order Inside a Section

1. Eyebrow (12 px uppercase, `text/60`, 0.12em tracking) — optional
2. `h2` headline
3. Lead paragraph (20 px, `text/60`)
4. Body paragraphs / lists / cards
5. Single CTA (Secondary or Ghost — never a second Primary on a non-hero section)

Items 1 → 2: 12 px gap. 2 → 3: 16 px gap. 3 → 4: 32 px gap.

## Lists

- Indent: 24 px from the surrounding container
- Vertical gap between items: 8 px
- Bullets: small disc, `text` at 40% opacity
- Numbered lists: ink colour for numerals, weight 600

## Body Copy Specifics

- Default paragraph: 16 px Open Sans, weight 400, `text` at 60% opacity, line-height 1.7
- Max measure: ~ 65 characters (rely on the 672 px / 768 px containers)
- Inline emphasis lifts to full `text` via `<strong>`

## Rules

- Mobile-first: design at 375 px first, then enhance.
- Layout shifts are column → row only. Never re-order content arbitrarily between breakpoints.
- Lists, paragraphs, and headings all stay on the cream surface — no inset content boxes.
- Do not add background images, illustrations, or hero photography behind text. Keep the cream + crosshatch as the only background.

