# Icon Shapes

> Dependencies: `colors.md`, `radius.md`

Icon containers (the round / square frames that hold a foreground icon) are used sparingly in this design — usually for feature-list bullets or social links. Default to the **Neutral** variant.

## Core Specs

- Box-sizing: border-box
- Icon perfectly centred
- Circle: the default radius
- Rounded square: 6 px for sizes MD/LG/XL; 4 px for XS/SM
- No shadow

## Sizes | Size | Container | Icon | |---|---|---| | XS | 24 × 24 px | 14 × 14 px | | SM | 32 × 32 px | 16 × 16 px | | MD (default) | 40 × 40 px | 20 × 20 px | | LG | 48 × 48 px | 24 × 24 px | | XL | 56 × 56 px | 28 × 28 px |

## Variants

### Neutral (default)
- Shape: circle
- Background: `transparent`
- Border: 1 px `text/10`
- Icon colour: `text/60`

### Solid Ink
- Shape: circle
- Background: `primary`
- Border: none
- Icon colour: `surface`

### Hairline (for inline social-link rows)
- Shape: circle
- Background: `transparent`
- Border: 1 px `text/20`
- Icon colour: `text`
- Hover: border `text`, no background change

### Status (success / warning / danger / info)
- Shape: circle
- Background: matching `*-soft`
- Border: 1 px matching status token
- Icon colour: matching status token

## Prohibited

- No drop shadows.
- No filled brand-coloured circles for non-status content.
- No mix of square and circle icon shapes within the same row/list.

