# Shadows

This design is **flat by intent.** The only routinely-used shadow is shadow-sm (see shadows.md) on the avatar disc. Everything else should rely on whitespace, hairline borders, and typographic weight contrast for separation. | Token | CSS value | When (if ever) to use | |---|---|---| | `none` | — | Default for buttons, cards, sections, hero surfaces | | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Avatar disc only | | `0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)` | Floating menus (dropdown, popover) when they overlay content | | `0 10px 20px -8px rgb(0 0 0 / 0.10)` | Modal dialog overlay only |

## Rules

- **Buttons have no shadow.** Not the primary, not the secondary, never. No glints, no insets, no glows.
- **Cards have no shadow.** Use a 1 px hairline border at `text/10` instead.
- **Sections have no shadow.** Whitespace separates sections.
- **Avatar gets shadow-sm (see shadows.md)** — that's the only place the design admits elevation on first-paint surfaces.
- **Overlays** (dropdown, popover, modal) may use shadow-md (see shadows.md) / shadow-lg (see shadows.md) because they sit above content and need to read as floating. They are the only exception.
- Never stack multiple shadow tokens on one element.
- Never use coloured shadows.

