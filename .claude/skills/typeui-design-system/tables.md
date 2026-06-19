# Tables

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

Tables are built from hairlines and whitespace — no zebra striping, no shadows, no rounded cell fills.

## Wrapper

- Horizontal scroll overflow on small screens
- Background: `transparent` (cream surface shows through)
- Radius: 6 px — applied to the wrapper, with overflow hidden so cell borders clip
- Border: 1 px `text/10`
- No shadow

## Table Element

- `width: 100%`, left-aligned (right-aligned for RTL)
- Font: 14 px Open Sans, `text/60`

## Table Head

- Font: 11 px Open Sans, weight 600, `text/60`, **uppercase**, 0.08em letter-spacing
- Background: `transparent`
- Bottom border: 1 px `text/10`
- Cell padding: 24 px horizontal, 12 px vertical

## Table Body

- Row background: `transparent`
- Row bottom hairline: 1 px `text/10` (omit on the last row to avoid doubling with the wrapper)
- Row hover: background `text` at 5% opacity (optional)
- Row header (`<th scope="row">`): weight 500, `text` colour, white-space nowrap
- Cell padding: 24 px horizontal, 16 px vertical

## Cell Content

- Numerics: tabular figures, right-aligned
- Status pills: small pill badges per `badges.md`
- Truncation: `text-ellipsis whitespace-nowrap` on cells with `max-width`

## Rules

- No zebra striping.
- No drop shadow.
- Last row: omit bottom hairline.
- Row header: always `scope="row"`.
- Sortable columns: chevron icon (12 × 12 px, `text/40`) right of header label, hover lifts label to `text`.
- All colours via tokens — no raw hex.

