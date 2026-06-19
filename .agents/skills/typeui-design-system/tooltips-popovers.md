# Tooltips & Popovers

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `borders.md`

## Tooltips

### Core Specs
- Padding: 8 px horizontal, 6 px vertical
- Font: 12 px Open Sans, weight 500
- Radius: 4 px
- Shadow: shadow-sm (see shadows.md) (only here for tooltips)
- Transition: `opacity` 150 ms
- Max width: 240 px
- Pointer offset from anchor: 8 px

### Default (Dark — the only variant)
- Background: `primary` (`#0C0C09`)
- Text: `surface`
- Border: none

This design uses one tooltip variant. Don't introduce a "light" tooltip — it would compete with cards and dropdowns at the same elevation.

## Popovers

### Core Specs
- Background: `surface`
- Radius: 6 px
- Shadow: shadow-md (see shadows.md)
- Border: 1 px `text/10`
- Transition: `opacity` 150 ms
- Max width: 320 px

### Header / Title
- Padding: 12 px horizontal, 8 px vertical
- Background: `transparent`
- Bottom hairline: 1 px `text/10`
- Font: 14 px Inter, weight 600, `text`

### Body / Content
- Padding: 12 px horizontal, 12 px vertical
- Font: 14 px Open Sans, `text/60`, line-height 1.6

### Footer (optional)
- Padding-top: 12 px above a top hairline `text/10`
- Layout: horizontal flex, items at trailing edge, 8 px gap, contains a Secondary or Ghost button

## Arrows (optional)

- Size: 8 × 8 px rotated 45°
- Background must match the tooltip / popover background (`primary` for tooltips, `surface` for popovers)
- Border on popover arrow: 1 px `text/10` on the two visible edges
- Position via `clip-path` or `transform` to align with the anchor

## Rules

- Tooltips are always dark (`primary` ink). Popovers are always cream.
- Never both visible at once on the same anchor.
- Show on hover after a 200 ms delay; hide on mouse-leave with no delay.
- Keyboard: tooltips appear on focus, hide on blur and `Escape`.
- ARIA: `role="tooltip"`; popover triggers use `aria-haspopup="dialog"` and `aria-expanded`.

