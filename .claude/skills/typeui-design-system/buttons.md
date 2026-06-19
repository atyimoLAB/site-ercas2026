# Buttons

> Dependencies: `colors.md`, `radius.md`, `typography.md`

The minimal portfolio favours **one** strong button per view. The default is the solid dark CTA below — the same button used for "See My Works" on the live site.

## Core Specs (apply to every variant unless overridden)

- **Family:** Open Sans
- **Weight:** 600 (semibold)
- **Display:** inline flex, items vertically centred, content horizontally centred
- **Radius:** `6px` — the default. Pills (`9999px`) are allowed for icon-only round buttons.
- **Border:** none on the primary; 1 px on secondary/ghost outlines.
- **Shadow:** **none.** Buttons in this system are flat — no glints, no inset highlights, no drop shadows.
- **Cursor:** `pointer`.
- **Transition:** `transition-colors` only (no transform, no scale).
- **Box sizing:** border-box.
- **Focus-visible:** `outline: 2px solid var(--color-primary); outline-offset: 2px`. No focus ring of any other colour.

## Sizes | Size | Font size | Padding-x | Padding-y | Height (computed) | |---|---|---|---|---| | Small | 14 px | 16 px | 8 px | 32 px | | Base | 16 px | 24 px | 12 px | 44 px | | **Large (default for hero CTA)** | **18 px** | **40 px** | **24 px** | **72 px** |

The hero CTA always uses **Large**. Other CTAs default to Base.

## Variants

### Primary (the signature CTA — dark on cream)
- **Background:** `primary` (`#0C0C09`)
- **Text:** `surface` (`#F4F4F1`)
- **Border:** none
- **Hover:** background `primary` at 90% opacity
- **Active:** background `primary` at 80% opacity
- **Focus-visible:** 2 px solid `primary` outline with 2 px offset
- **Disabled:** background `primary` at 30% opacity, text `surface` at 70% opacity, cursor not-allowed

### Secondary (outline — used only when a Primary already exists in the same view)
- **Background:** `transparent`
- **Border:** `1px solid primary`
- **Text:** `primary`
- **Hover:** background `primary`, text `surface` (full ink fill)
- **Active:** background `primary` at 90% opacity, text `surface`
- **Focus-visible:** same as Primary
- **Shadow:** none, **no glint**

### Ghost (text-only, for tertiary navigation links)
- **Background:** `transparent`
- **Border:** none
- **Text:** `primary`
- **Underline:** 1 px, `text/40` colour, on hover the underline becomes full `primary`
- **Hover:** no background change — the underline change is the entire hover affordance
- **Focus-visible:** outline-2 outline-offset-2 outline-primary
- **No shadow**

### Disabled (any variant)
- **Cursor:** `not-allowed`
- **Opacity:** 30 % on the foreground colour
- **No hover, no focus ring change**

## Pairing Rules (per page)

- **One Primary maximum** per view. Two competing dark buttons breaks the design.
- A Secondary may sit next to a Primary in the same flex row, separated by 12–16 px gap.
- Ghost buttons are used for navigation (`Home`, `About`, `Works`) — never as the primary action.

## Icons in Buttons

- Icon size: 16 × 16 px (Base/Small) or 20 × 20 px (Large)
- Spacing: `8px` gap between icon and label
- Icon stroke uses `currentColor` so it inherits the button's text colour
- Layout: inline flex, vertically centered

## Prohibited

- **No box-shadow, no inset glint, no gradient.** Flat fills only.
- **No coloured CTAs** (no green / red / brand-blue solid buttons on hero surfaces). Status actions live inside alerts/forms, not as page-level CTAs.
- **No transform or scale on hover** — only colour changes.
- **No rounded-full** on rectangular text buttons. Pills are reserved for icon-only round controls.
- **No uppercase** on button labels longer than two words.

