# Alerts

> Dependencies: `colors.md`, `radius.md`, `borders.md`

Alerts are inline status messages — quiet by default, never blocking, never tinted with saturated fills on hero surfaces.

## Core Specs

- **Padding:** 16 px
- **Radius:** 6 px
- **Border:** 1 px solid (variant-coloured)
- **Background:** `transparent` for the neutral variant; `*-soft` for status variants
- **Heading:** 14 px Open Sans, weight 600
- **Body:** 14 px Open Sans, weight 400, line-height 1.6
- **Icon (optional):** 16 × 16 px, sits at the top-left with a 12 px right margin, colour matches the variant text

## Variants

### Neutral (default)
- Background: `transparent`
- Border: 1 px `text/20`
- Text (heading + body): `text`

### Success
- Background: `success-soft`
- Border: 1 px `success`
- Text: `success` for heading, `text` at full strength for body

### Warning
- Background: `warning-soft`
- Border: 1 px `warning`
- Text: `warning` for heading, `text` for body

### Danger
- Background: `danger-soft`
- Border: 1 px `danger`
- Text: `danger` for heading, `text` for body

### Info
- Background: `info-soft`
- Border: 1 px `info`
- Text: `info` for heading, `text` for body

## Dismissible Alert

- Add a 16 × 16 px close button at the top-right, `text/40`, hover lifts to `text`. Wrapper `aria-label="Dismiss"`.

## Prohibited

- No drop shadow.
- No saturated solid backgrounds (no full red / green / amber fills).
- No alerts inside the hero block — keep status feedback inside forms or below-the-fold sections.

