# Cards

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

Cards in this design are **flat hairline frames** — no fill, no shadow, just a 1 px outline that lets the cream surface show through.

## Core Specs

- **Background:** `transparent` (the page `surface` shows through)
- **Border:** 1 px solid at `text/10`
- **Radius:** 6 px
- **Shadow:** **none**
- **Padding:** 24px; 32px for feature/work cards

## Card Heading

- Family: Inter (display)
- Size: 18 px mobile, 20 px desktop
- Weight: 600
- Color: `primary`
- Margin-bottom: 8 px to subtitle / 16 px to body

## Card Subtitle / Meta

- 12 px Open Sans, weight 500, `text/40`
- Eyebrow style (uppercase, `0.12em` tracking) optional

## Card Body Copy

- 14 px Open Sans, weight 400, `text/60`, line-height 1.6

## States

### Static Card (non-interactive)
- Border: 1 px `text/10`
- No hover, no cursor change

### Interactive Card (link wraps the whole card)
- Same base styles
- Hover: border colour shifts to `text/30`, body text (any `text/60` content) lifts to `text` for 150 ms — that's the entire affordance
- Cursor: `pointer`
- Focus-visible: 2 px outline `primary`, 2 px offset

### Featured / Work-thumbnail Card
- Image fills the top of the card (full-bleed inside the radius), aspect ratio 4:3, cover fit
- Image radius matches container: the default radius on the top corners only
- Below the image: 24 px padding block with title (`h3` style) + 1-line description + small "View →" link (ghost button style)

## Layouts

- Single-column for testimonials / quotes (max width 768 px, centered)
- Two-column at `md`, three-column at `lg` for project grids — gap `32 px`
- Never more than 3 columns. Density isn't the goal of this design.

## Prohibited

- **No drop shadow.** Replace any "elevated card" instinct with whitespace and a hairline.
- **No filled background colour** (no light gray cards). The cream of the page must be visible inside the card.
- **No gradient borders, no animated borders.**
- **No badge clusters** stacked on the card. One small status pill maximum.

