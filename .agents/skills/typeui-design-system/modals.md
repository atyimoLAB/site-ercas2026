# Modals

> Dependencies: `colors.md`, `radius.md`, `shadows.md`, `buttons.md`, `inputs.md`

Modals are the one place this design admits a real shadow — they need to feel as if they're floating above the page.

## Core Specs

### Overlay (Backdrop)
- Fixed, full-screen
- Z-index: 40
- Background: `rgba(12, 12, 9, 0.50)` (the ink colour at 50 % opacity, so the cream tint persists)
- Optional `backdrop-blur-sm`

### Content Container
- Background: `surface` (`#F4F4F1`)
- Radius: 6 px
- Shadow: shadow-lg (see shadows.md)
- Border: 1 px `text/10`
- Padding: 24 px
- Max width: 512 px (default), 640 px for form modals
- Centered both axes

## Anatomy

### Header
- Title: 18 px Inter, weight 600, `text` colour
- Optional bottom hairline: 1 px `text/10`, 16 px below the title
- Close button: Ghost button (16 × 16 px icon, `text/40`, hover `text`), positioned top-right

### Body
- Vertical padding: 24 px
- Vertical spacing between elements: 16 px
- Text: 14–16 px Open Sans, line-height 1.625, `text/60`

### Footer
- Top hairline: 1 px `text/10`, optional
- Padding-top: 24 px
- Layout: horizontal flex, items at trailing edge, 12 px gap
- Always one Primary action, optionally one Secondary or Ghost to the left

## Variants

### Default (information)
Header + body + footer with Primary / Secondary actions.

### Confirmation Pop-up
Centered text, optional 48 × 48 px icon at the top, no header divider, footer collapses into two stacked buttons on mobile.

### Form Modal
Body contains inputs from `inputs.md`. 16 px gap between fields. The submit Primary lives in the footer.

## Rules

- Backdrop is the only place where a near-black tint is allowed at large surface area.
- Content surface is always `surface` cream — never white.
- Use shadow-lg (see shadows.md) only here. Cards and dropdowns must not borrow it.
- Accessibility: `role="dialog"`, `aria-modal="true"`, focus trap, `Escape` closes.
- Close button must be present and reachable by keyboard.

