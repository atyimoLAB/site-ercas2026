# Sidebars

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

Sidebars are uncommon in a minimal portfolio (most pages are single-column hero scaffolds). When one is needed — usually for a long case-study or dashboard-style admin view — keep it lean.

## Core Specs

- **Background:** `surface` (cream — the same as the page; the sidebar reads as a column, not a separate surface)
- **Right border** (for left-sidebar): 1 px `text/10`
- **Width:** 240 px desktop, 100 % mobile (slide-in)
- **Padding:** 12 px horizontal, 24 px vertical

## Anatomy

### Outer Container
- Hidden below `md` (768 px) breakpoint, replaced by a slide-in drawer with a hamburger trigger
- Trigger: ghost button, 24 × 24 px icon

### Inner Wrapper
- Full height, vertical scroll overflow
- Sticky if page is long: `position: sticky; top: 0`

### Section Header (eyebrow)
- 11 px Open Sans, weight 600, uppercase, 0.12em letter-spacing, `text/40`
- Margin-bottom: 8 px

### Navigation List
- Vertical spacing: 4 px between items

### Navigation Item
- Layout: horizontal flex, items vertically centred, 12 px gap, full-width
- Padding: 8 px horizontal, 8 px vertical
- Radius: 6 px
- Font: 14 px Open Sans, weight 500, `text/60`
- Hover: background `text` at 5% opacity, `text` text
- Transition: `colors` 150 ms
- Icon: 16 × 16 px, inherits text colour

### Active Item
- Background: `text/5`
- Text: `text`
- 2 px left ink bar (`primary` colour, full height of the item) sitting flush with the inline-start edge — this is the active indicator

### Separator
- 24 px top margin, 1 px hairline `text/10`, 16 px top padding before the next group

### Bottom CTA Card (optional)
- Padding: 16 px
- Border: 1 px `text/10`
- Radius: 6 px
- Background: transparent
- Contains a short label and a Secondary button

## Rules

- Sidebar background is the same cream as the page — separation comes from the 1 px hairline alone.
- Active state is text + a 2 px ink bar — never a saturated colour fill.
- Multi-level menus indent with 24 px additional left padding. Two levels max.
- Keyboard navigation: arrow keys to move, `Enter` to activate.

