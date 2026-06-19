# Border Radius

The minimal portfolio uses a deliberately small radius scale. Things are either slightly softened (6 px) or fully round (circles/pills). There is no in-between. | Token | Value | Default usage | |---|---|---| | `none` | 0 px | Section dividers, full-bleed image edges | | `sm` | 4 px | Inputs, badges, code blocks, small chips | | `md` (default) | **6 px** | Buttons, cards, modals, dropdowns, tooltips | | `full` | 9999 px | Avatars, dot indicators, icon-only round buttons |

## Rules

- **6 px is the project default.** Apply to anything rectangular and interactive (button, card, modal, popover) unless the spec calls for `sm` or `full`.
- Avatars and dot indicators are **always** `full`. No squircles, no rounded squares for profile imagery.
- Never use 8 px, 10 px, 12 px, 16 px, or 20 px radii — they pull the design toward shadcn/Material territory and break the minimal feel.
- A single component must use one radius value. Don't mix `sm` and `md` inside a card.
- Inner elements inside a `md` container use `sm` if they need their own corners (e.g. an inset image inside a card).

