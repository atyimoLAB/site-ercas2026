# Accordion

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

The default accordion is **Flush** — it disappears into the cream surface and reads as a list of expandable headings. Use the bordered wrapper variant only when the accordion sits inside a multi-section page and needs visual containment.

## Core Specs

- **Wrapper (bordered variant):** full width, 1 px border `text/10`, 6 px radius, corner-clipped on the first/last items
- **Item separator:** 1 px hairline `text/10` on every item except the last
- **No shadow** on any variant

## Trigger (button)

- Layout: horizontal flex, items vertically centred, spaced apart, full-width
- Padding: 16 px horizontal, 16 px vertical (20 px / 16 px when inside a bordered wrapper)
- Font: 16 px Open Sans, weight 500
- Color: `text`
- Background: `transparent`
- Hover: background `text` at 5% opacity
- Open state: background `text` at 5% opacity, weight lifts to 600
- Focus-visible: 2 px outline `primary`, 2 px offset
- Transition: `colors` 150 ms

## Panel (content)

- Padding: 16 px horizontal, 16 px vertical (20 px / 16 px in bordered variant)
- Background: `transparent`
- Top hairline: 1 px `text/10` (only inside the bordered variant)
- Font: 14 px Open Sans, `text/60`, line-height 1.625

## Chevron Icon

- Size: 16 × 16 px
- Color: `text/40`
- Closed: 0deg
- Open: 180deg
- Transition: `transform` 150 ms

## Variants

### Flush (default)
No outer border, no wrapper background. Items separated by 1 px `text/10` hairlines only. Use inside any container that already has its own background.

### Bordered (collapse)
A single shared bordered wrapper around all items. One panel open at a time.

### Always Open
Multiple panels can be open simultaneously. Same styling as Flush or Bordered.

## States | State | Trigger appearance | |---|---| | Closed | `text` text, transparent background | | Hover | background `text` at 5% opacity | | Open | background `text` at 5% opacity, weight 600 | | Focus | 2 px outline `primary`, 2 px offset | | Disabled | `text/30` text, cursor not-allowed, no hover |

## Prohibited

- No drop shadow.
- No coloured background on open items.
- No animation beyond the chevron rotation and a fade on the panel content.

