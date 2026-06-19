# Dropdown

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `borders.md`, `inputs.md`

## Trigger

Use the Secondary or Ghost button variant from `buttons.md`. Add a chevron icon on the right.

### Chevron
- Size: 16 × 16 px
- Spacing: 6 px left margin from label
- Color: inherits from button text

## Menu Container

- **Background:** `surface` (`#F4F4F1`)
- **Border:** 1 px `text/10`
- **Radius:** 6 px
- **Shadow:** shadow-md (see shadows.md) (the only place besides modals/popovers where shadow is permitted)
- **Z-index:** elevated above all in-flow content
- **Padding:** 8 px
- **Min width:** matches the trigger; max width 320 px

## Menu Item

- Layout: horizontal flex, items vertically centred, 12 px gap, full-width
- Padding: 8 px horizontal, 8 px vertical
- Radius: 4 px
- Font: 14 px Open Sans, weight 500
- Color: `text`
- Hover background: `text/5`
- Active background: `text/10`
- Focus-visible: 2 px outline `primary`, inset
- Transition: `colors` 150 ms

## Variants

### With Divider
Insert a 1 px `text/10` rule between groups. Group label (eyebrow style: 11 px uppercase, `text/40`, 0.12em letter-spacing) sits 8 px above its group.

### With Header
Header padding: 12 px / 8 px, bottom hairline `text/10`. Name: 14 px Inter, weight 600, `text`. Email/meta: 12 px Open Sans, `text/40`, truncated.

### With Icons
Icon: 16 × 16 px, 8 px right of icon to label, `text/60` colour. Hover lifts the icon to `text` along with the label.

### With Checkbox / Radio
Use `radios-checkboxes-toggle.md` specs. The control sits to the left of the label.

### With Search
Top of the menu: a single input from `inputs.md` (size: small).

### Scrollable
Max height 240 px, vertical scroll, custom scrollbar uses `text/20`.

## States | State | Appearance | |---|---| | Trigger focused | 2 px outline `primary`, 2 px offset | | Item hover | background `text` at 5% opacity | | Item active / open | `text/10` background | | Item disabled | `text/30` text, cursor not-allowed, no hover |

## Prohibited

- No saturated brand-coloured menus or items.
- No drop shadow heavier than shadow-md (see shadows.md).
- No animation other than fade-in / out.

