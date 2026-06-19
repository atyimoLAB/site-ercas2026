# Inputs

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

Inputs match the rest of the system — flat, hairline-bordered, no fill.

## Core Specs

- **Display:** block, full-width inside its container
- **Background:** `transparent` (cream shows through)
- **Border:** 1 px solid `text/10`
- **Radius:** 4 px
- **Shadow:** **none**
- **Family:** Open Sans
- **Font size:** 16 px (prevents iOS zoom)
- **Color:** `text`
- **Placeholder color:** `text/40`
- **Padding:** 12 px horizontal, 10 px vertical
- **Transition:** 150 ms on border-color only

## Label

- Block, 14 px Open Sans, weight 500, `text` colour
- Margin-bottom: 8 px
- `htmlFor` always matches the input `id`

## Helper Text

- 12 px, `text/40`, sits 6 px below the input

## States

### Default
- Border: `text/10`

### Hover
- Border: `text/30`

### Focus-visible
- Outline: 2 px `primary`, 2 px offset (matches buttons — same focus ring across the whole system)
- Border colour stays at `text/30` underneath

### Filled
- Border: `text/30`

### Success
- Border: `success` (1 px)
- Helper text: `success`

### Error
- Border: `danger` (1 px)
- Helper text: `danger`

### Disabled
- Background: `text/5` (very faint cream wash)
- Border: `text/10`
- Text & placeholder: `text/30`
- Cursor: `not-allowed`

## Input with Icon

- Container is `relative`
- Icon: 16 × 16 px, `text/40`, absolutely positioned
- Leading icon: `left-3`, input adds `pl-10`
- Trailing icon: `right-3`, input adds `pr-10`

## Textarea

- Same specs as input
-  (128 px), resize `vertical` only
- Padding: 12 px

## Prohibited

- No filled grey input backgrounds.
- No coloured focus ring other than `primary`.
- No animated borders.
- No floating-label patterns — labels sit above the input.

