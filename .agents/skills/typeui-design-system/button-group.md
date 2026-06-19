# Button Groups

> Dependencies: `buttons.md`, `colors.md`, `radius.md`, `borders.md`

Use button groups sparingly — they add density to a design that otherwise rewards space. They're appropriate for view-switchers and toolbar segments, not for hero CTAs.

## Core Specs

- **Wrapper:** inline flex, 6 px radius, 1 px border `text/10`
- **No shadow** on the wrapper (this design is flat)
- **Children overlap:** `-1px` left margin on every child except the first, so the shared border reads as one line
- **All inner buttons use the Secondary or Ghost variant from `buttons.md`** — never the solid Primary

## Anatomy

### Wrapper
- Display: inline flex
- Radius: 6 px
- Border: 1 px solid `text/10`
- Background: `transparent`

### First Button
- Inline-start corners: 6 px radius
- Inline-end corners: 0

### Middle Button(s)
- All four corners: 0

### Last Button
- Inline-start corners: 0
- Inline-end corners: 6 px radius

### All buttons except first
- `-1px` left margin

## States

- **Inactive button:** transparent background, `text/60` label
- **Hover:** background lifts to `text/5`, label to `text`
- **Selected / active:** background `text` (full ink), label `surface`
- **Focus-visible:** 2 px outline `primary`, 2 px offset (the entire group can lose its border-overlap during focus — that's fine)

## Rules

- Maximum **4 segments** in a group; beyond that, switch to a select.
- Icon-only buttons inside a group: 16 × 16 px icon, height matches text-button rows.
- Never mix sizes inside a single group.

