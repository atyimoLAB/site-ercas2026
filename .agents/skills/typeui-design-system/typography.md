# Typography

> Dependencies: `colors.md`

Type does the heavy lifting in this design — colour and layout intentionally stay quiet so the words can lead.

## Font Stack | Role | Family | CSS variable | |---|---|---| | Display (hero `h1`, large numerics) | **Inter** | `--font-display: var(--font-inter), ui-sans-serif, system-ui, sans-serif` | | Body / UI (paragraphs, buttons, labels) | **Open Sans** | `--font-sans: var(--font-open-sans), ui-sans-serif, system-ui, sans-serif` | | Code / mono | **Inconsolata** | `--font-mono: var(--font-inconsolata), ui-monospace, SFMono-Regular, monospace` |

All three are loaded via the project's standard web-font loading mechanism. Never introduce a serif, slab, or script. Never override the body default of Open Sans.

## Hero Headline (the project's signature)

The page-level `h1` always uses these settings — this is the visual anchor of the design. | Property | Value | |---|---| | Font family | `--font-display` (Inter) | | Font weight | **900 (black)** | | Letter-spacing | `-0.025em` | | Color | `primary` (`#0C0C09`) | | Line-height | `1` | | Margin-bottom | `32 px` |

Responsive size: | Breakpoint | Size | |---|---|---| | Mobile (default) | **36 px** | | Small (≥640 px) | **48 px** | | Medium (≥768 px) | **96 px** |

There is **only one** element on a page that uses this scale.

## Heading Scale (everything else)

All sub-headings use Inter at weight 700 (bold), tight tracking, ink-coloured. | Element | Mobile | Tablet (≥768 px) | Desktop (≥1024 px) | Line-height | Margin-bottom | |---|---|---|---|---|---| | `h2` | 28 px | 36 px | 44 px | 1.15 | 24 px | | `h3` | 22 px | 26 px | 30 px | 1.2 | 20 px | | `h4` | 20 px | 22 px | 24 px | 1.25 | 16 px | | `h5` | 18 px | 18 px | 20 px | 1.4 | 12 px | | `h6` | 14 px (uppercase, `0.08em` tracking) | 14 px | 14 px | 1.4 | 8 px |

Never reduce line-height below `1` for the hero `h1` or below `1.1` for other headings. Never skip heading levels.

## Paragraphs

### Hero / Lead Paragraph (the one directly under the hero `h1`)
- Family: `--font-sans` (Open Sans)
- Weight: 400
- Color: `text/60`
- Line-height: `1.625`
- Margin-bottom: `64 px`
- Responsive size: **18 px → 20 px → 24 px**
- Max line length: ≤ 60 characters (rely on container)

### Standard Body Paragraph
- Size: 16 px
- Weight: 400
- Color: `text/60`
- Line-height: 1.7
- Max width: ~ 65 characters

### Small Supporting Copy
- Size: 14 px
- Weight: 400
- Color: `text/40`
- Use for captions, timestamps, helper text, legal copy.

## UI Labels | Context | Family | Size | Weight | Notes | |---|---|---|---|---| | Primary CTA label | Open Sans | **18 px** | **600** (semibold) | Cream colour on dark button | | Secondary / ghost button label | Open Sans | 16 px | 500 | Ink colour | | Input label | Open Sans | 14 px | 500 | Ink colour, 8 px below sits the input | | Caption / meta | Open Sans | 12–14 px | 500 | `text/40` | | Eyebrow / section kicker | Open Sans | 12 px, uppercase, `0.12em` tracking | 600 | `text/60` |

Never apply paragraph line-height (1.7) to control labels.

## Links

- **Inline links in body copy:** ink colour, 1 px underline at `text/40`, underline removed on hover.
- **Standalone CTA links:** ink colour, weight 500, underline always visible, hover shifts underline to full ink.
- Never colour links with brand or accent hues.

## Emphasis

- `<strong>` lifts inline copy from `text/60` back to full ink — that's the whole emphasis mechanism.
- `<em>` is for tone only.
- Set in ALL CAPS only for ≤ 24-character labels (eyebrows, button groups), with `0.08–0.12em` tracking, 12 or 14 px.

## Prohibited

- No coloured text for paragraphs (status, brand, accent).
- No light weights below 400 — they vanish on the cream surface.
- No condensed or expanded variants of Inter / Open Sans.
- No drop-shadows on text.
- No two  headlines on the same page.

