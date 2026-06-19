# Tabs

> Dependencies: `colors.md`, `radius.md`, `borders.md`, `typography.md`

The default tab pattern in this design is the **Underline** variant — it sits flat against the surface and reads as type-first navigation.

## Core Specs

- **Typography:** 14 px Open Sans, weight 500
- **Default text colour:** `text/60`
- **Active text colour:** `text`
- **Transition:** `colors` 150 ms

## Variants

### 1. Underline (default — use this 95 % of the time)

**Wrapper:** bottom hairline `text/10`, full container width.

**Tab Item:**
- Padding: 16 px horizontal, 12 px vertical
- Bottom border: 2 px transparent
- Background: transparent | State | Appearance | |---|---| | Active | text `text`, bottom border `primary` | | Inactive | text `text/60`; hover → text `text` | | Disabled | text `text/30`, cursor not-allowed, no hover | | Focus-visible | 2 px outline `primary`, 2 px offset |

### 2. Pills (for compact toolbars only)

**Tab Item:**
- Padding: 12 px horizontal, 8 px vertical
- Radius: 6 px
- No shadow | State | Appearance | |---|---| | Active | `primary` background, `surface` text | | Inactive | `text/60`; hover → background `text` at 5% opacity, `text` text | | Disabled | `text/30`, cursor not-allowed |

### 3. Full-Width Segmented (for two- or three-option pickers)

Behaves like a button group:
- Wrapper: 1 px `text/10`, 6 px radius
- Items overlap with `-1px` left margin
- Active: `primary` background, `surface` text
- Inactive: transparent background, `text/60` text

## Tabs with Icons

- Icon: 16 × 16 px
- Spacing: 8 px right margin from icon to label
- Layout: inline flex, items vertically centred
- Icon inherits the tab's text colour

## Prohibited

- No coloured underline (no brand-blue/green underline). The active underline is always `primary` (ink).
- No more than 5 tabs in a single bar — switch to a dropdown instead.
- No shadow on any tab variant.

