# Radios, Checkboxes & Toggles

> Dependencies: `colors.md`, `radius.md`, `borders.md`

All three controls use the same focus treatment as buttons (2 px `primary` outline, 2 px offset) so the system reads as one.

## Checkbox

- Size: 16 × 16 px
- Radius: 4 px
- Border: 1 px `text/30`
- Background: `transparent`
- Checked background: `primary`
- Checked check mark: `surface`, 1.5 px stroke
- Hover (unchecked): border `text`
- Focus-visible: 2 px outline `primary`, 2 px offset

### Disabled
- Border: `text/10`
- Background: `text/5`
- Check mark: `text/30`

## Radio

- Size: 16 × 16 px
- Radius: 9999 px (full)
- Border: 1 px `text/30`
- Background: `transparent`
- Checked: 1 px border `primary`, inner 8 × 8 px `primary` dot centered
- Hover (unchecked): border `text`
- Focus-visible: 2 px outline `primary`, 2 px offset

### Disabled
- Border: `text/10`
- Inner dot (if checked): `text/30`

Group all radios under the same `name` attribute.

## Toggle

### Track
- Size: 36 × 20 px
- Radius: 9999 px (full)
- Background: `text/15` (off), `primary` (on)
- Transition: `background-color` 150 ms
- Focus-visible (on the wrapper): 2 px outline `primary`, 2 px offset

### Thumb
- Size: 16 × 16 px
- Radius: 9999 px (full)
- Background: `surface`
- Position: 2 px from the leading edge (off), 2 px from the trailing edge (on)
- Transition: `transform` 150 ms

### Disabled
- Track: `text/5`
- Thumb: `text/20`
- Cursor: `not-allowed`

## Label Pattern

- All controls sit in a horizontal flex, items vertically centred, 8 px gap row with their label
- Label: 14 px Open Sans, weight 500, `text` colour
- Helper text below: 12 px Open Sans, `text/40`, 4 px below the label
- `id` of the control matches the `htmlFor` of the label

## Prohibited

- No coloured focus rings (no brand-blue, no green). All three controls share the `primary` outline.
- No animated check marks beyond the natural fade.
- No size variants larger than the defaults — the design is intentionally compact.

