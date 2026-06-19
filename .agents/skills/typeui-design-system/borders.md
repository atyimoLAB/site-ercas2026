# Borders

## Width Scale | Context | Width | |---|---| | Hairlines, dividers, card outlines, input outlines | **1 px** (default) | | Focus-visible outlines | 2 px (with 2 px offset) | | **Avatar disc** | **4 px** |

## Colour

- Default border colour: `text/10` (a 10 % opacity ink hairline). This is what you use for cards, inputs, dividers.
- Avatar disc border: `#101828` (`disc-border` token). Crisper than `text` to separate the photo from the cream surface.
- Focus outline: `primary` (`#0C0C09`).
- Status borders: the matching status colour (`success`, `danger`, `warning`, `info`) used inside small components only.

## Rules

- **Solid by default.** No dashed, dotted, or double borders anywhere except file dropzones (which may use 1 px dashed at `text/40`).
- **Never thicker than 1 px** on rectangular content (cards, inputs, dividers). The 4 px avatar border is the single exception and is unique to that component.
- **Never mix widths inside a single component.**
- **Border-radius and width move together.** A 1 px outline pairs with `radius-md`; the 4 px avatar pairs with `radius-full`.
- Dividers between sections: prefer whitespace; if a line is required, use a 1 px `text/10` rule that spans the full container width with no inner spacing.

