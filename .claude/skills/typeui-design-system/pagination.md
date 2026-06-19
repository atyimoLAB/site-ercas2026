# Pagination

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

## Container

- Layout: inline flex with `-1px` overlap between items so borders read as one continuous line
- Font: 14 px Open Sans, weight 500

## Pagination Item

- Layout: horizontal flex, items centred both axes
- Size: 36 × 36 px
- Color: `text/60`
- Background: `transparent`
- Border: 1 px `text/10`
- Hover: background `text` at 5% opacity, label lifts to `text`
- Transition: `colors` 150 ms
- Focus-visible: 2 px outline `primary`, inset

## Previous / Next Buttons

- Padding: 12 px horizontal, height 36 px
- Label "Previous" / "Next" with chevron (16 × 16 px, `currentColor`) on the leading/trailing side, 8 px gap
- First item: 6 px radius on inline-start corners
- Last item: 6 px radius on inline-end corners

## Active Page Item

- Background: `primary`
- Color: `surface`
- Border: 1 px `primary`
- Hover: stays `primary` (no change)

## Disabled (e.g. Prev on page 1)

- Color: `text/20`
- Cursor: `not-allowed`
- No hover

## Rules

- Display as inline flex with `-1px` child overlap.
- One active item only.
- Always include Previous and Next, even on the first/last page (disabled state).
- All items must be reachable by keyboard.

