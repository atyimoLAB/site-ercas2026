# Badges

> Dependencies: `colors.md`, `radius.md`, `typography.md`

Badges in this design are tiny, restrained, mostly outline. They label things — they never compete with content.

## Core Specs

- **Border:** 1 px (`text/20` for neutral; matching status hue otherwise)
- **Background:** `transparent` (default) or status `*-soft` for status variants
- **Radius:** 4 px; pills (`9999px`) only for icon-only dots
- **Family:** Open Sans
- **Weight:** 500
- **Letter-spacing:** `0.06em` for uppercase variants

## Sizes | Size | Font size | Padding-x | Padding-y | Case | |---|---|---|---|---| | Default | 11 px | 8 px | 2 px | UPPERCASE, `0.08em` tracking | | Large | 13 px | 10 px | 4 px | Title Case |

The default badge is uppercase and small — that's the project's preferred treatment (think "DESIGNER · 2024").

## Variants

### Neutral (default — use this everywhere unless you mean status)
- Background: `transparent`
- Border: 1 px `text/20`
- Text: `text/60`

### Solid Ink (when more emphasis is needed)
- Background: `primary`
- Border: none
- Text: `surface`

### Status — Success
- Background: `success-soft`
- Border: 1 px `success`
- Text: `success`

### Status — Warning
- Background: `warning-soft`
- Border: 1 px `warning`
- Text: `warning`

### Status — Danger
- Background: `danger-soft`
- Border: 1 px `danger`
- Text: `danger`

### Status — Info
- Background: `info-soft`
- Border: 1 px `info`
- Text: `info`

## Pill / Dot Indicators

- **Dot only** (notification): 8 × 8 px, the default radius, status-coloured background, no border
- **Pill with text:** the default radius, padding 10 px / 4 px, otherwise same colours as the matching variant above

## Badges with Icons

- Icon: 12 × 12 px (default), 14 × 14 px (large)
- Gap: 4 px between icon and label
- Icon uses `currentColor`

## Dismissible Badge

- A close button sits inside the badge, 12 × 12 px, `text/40`
- Hover lifts it to `text`
- No background change on close-button hover (keep it quiet)

## Prohibited

- No saturated coloured-background badges (no solid red, blue, green) outside of `*-soft` status variants.
- No drop shadows.
- No badges larger than the Large size.
- No more than two badges grouped together — they will fight the headline.

