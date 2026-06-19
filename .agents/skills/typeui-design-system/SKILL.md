---
name: "minimal-design-system"
description: "Minimal Design System design system for AI coding agents."
metadata:
  author: typeui.sh
  source: workspace-importer
  projectName: "Minimal"
  projectLogoUrl: ""
  importSource: "Manual TypeUI setup"
  primaryColorReference: "#18181b"
  surfaceColorReference: "#ffffff"
  textColorReference: "#09090b"
  typographyScale: "Inter-style sans serif, 12/14/16/20/24/32 scale, medium labels, semibold headings."
  spacingScale: "4px base grid with 8px, 12px, 16px, 24px, and 32px layout steps."
  radiusScale: "6px controls, 8px cards, 12px overlays, nested radii reduced by inner padding."
---

# Design System — Agent Instructions

This skill describes the visual language for a **minimal portfolio** aesthetic — the same look used at https://minimal-xi.vercel.app/. Every page, component, and layout you produce in this project MUST follow these rules. The system favours typography, whitespace, and one strong call-to-action over decoration.

The rules in this file are **technology-agnostic**. They describe *what* to render and *why* — not which framework, library, utility classes, or rendering technology to use. Implement them in whatever stack the project happens to use.

## Style

A quiet, typography-driven personal portfolio. Warm off-white canvas, near-black ink, a single ultra-bold display headline, supporting copy in soft 60% ink, and one solid dark CTA. A subtle diagonal crosshatch in the background provides texture without competing with content.

Think: independent designer / engineer profile site. Calm, confident, generous whitespace, no ornament.

## Non-Negotiable Aesthetic Rules

These rules apply to **every screen** you build in this project. If a request would break them, push back or adapt — never invent a different style.

1. **Two colours only for layout.** Background `#F4F4F1` (warm cream), ink `#0C0C09` (warm near-black). Anything else (status, accent) is opt-in and used sparingly inside small components, never on hero surfaces.
2. **Soft hierarchy through opacity.** Secondary copy is always the ink colour at **60% opacity**. Do not introduce a separate gray text token for body copy.
3. **One display headline per view.** The hero `h1` is the visual anchor: display family at weight **900 (black)**, tight letter-spacing (-0.025em), and a responsive scale of **36 px → 48 px → 96 px** across mobile / tablet / desktop. Never apply this scale to anything that is not the page's primary headline.
4. **One primary CTA per view.** Solid `#0C0C09` background, cream label, 6 px corner radius, 40 px horizontal padding × 24 px vertical padding, body family at 18 px and weight 600. Hover lowers the background to 90% opacity, active to 80%. No gradient, no glint, no shadow on the button.
5. **Centered, narrow content column.** Hero / landing content lives inside a single 672 px column, centered both axes, on a full-viewport-height wrapper. Inner content is centre-aligned and stacked vertically.
6. **Always render the crosshatch background.** A non-interactive layer underneath the content carrying two repeating diagonal-line gradients at +45° and -45°, colour `rgba(12, 12, 9, 0.03)`, 1 px lines, 32 px grid. This is the project's signature texture — include it on every full-page route.
7. **Flat, almost shadowless.** Only the avatar disc carries a small shadow. No card elevations, no glints, no blur, no neumorphism. Borders are 1 px (or 4 px for the avatar disc) — never thicker.
8. **Sans-serif everywhere.** **Inter** for display headings, **Open Sans** for body and UI labels, **Inconsolata** for code. Do not introduce a serif or a script.
9. **Generous vertical rhythm.** 24 px from avatar to `h1`, 32 px from `h1` to lead paragraph, 64 px from paragraph to CTA. Never crowd.
10. **No dark-mode swap.** This palette is intentionally light only. Do not author dark-mode overrides — if dark variants exist in dependent libraries, override them back to the cream / ink pair.

## Portfolio Page Pattern (use as the default scaffold)

Every new page in this project should start from this scaffold and only add what's strictly necessary. The structure is described in plain terms — implement it in whatever templating language the project uses.

```
PAGE WRAPPER
  - full viewport height
  - background: surface (cream)
  - text colour: text (ink)
  - relative positioning so the background layer can sit beneath
  - content centred horizontally and vertically
  - outer padding: 16 px on mobile, 32 px from the small breakpoint up

  CROSSHATCH BACKGROUND LAYER
    - sits behind everything (lowest stacking order)
    - covers the full wrapper
    - non-interactive (does not catch clicks)
    - background: two repeating diagonal-line gradients at +45° and -45°,
      colour rgba(12,12,9,0.03), 1 px lines, 32 px grid spacing

  MAIN CONTENT COLUMN
    - max width 672 px, centred
    - vertical flow, centre-aligned text and items
    - sits above the crosshatch (higher stacking order)

      AVATAR DISC
        - 208 × 208 px, fully rounded
        - 4 px solid border in disc-border
        - inner background: white
        - small shadow
        - 24 px below it: the headline

      HERO HEADLINE (h1)
        - display family, weight 900, tight letter-spacing
        - colour: primary
        - size: 36 px mobile / 48 px tablet / 96 px desktop
        - 32 px below it: the lead paragraph

      LEAD PARAGRAPH
        - body family, weight 400
        - colour: text at 60% opacity
        - relaxed line-height (~1.625)
        - size: 18 px mobile / 20 px tablet / 24 px desktop
        - 64 px below it: the CTA

      PRIMARY CTA
        - solid dark CTA per buttons.md
```

If a page needs more sections (works grid, about, contact), each new section must:

- Sit on the same cream surface (no alternating section bands).
- Stay inside a centred column no wider than 768 px for prose, 1024 px for grids.
- Separate from the previous section with at least 96 px of vertical padding, never with a visible divider unless the divider is a single 1 px hairline at `text/10`.

## Before Writing Any Code

1. **Read the foundation modules first.** For any UI work, read at minimum: `colors.md`, `typography.md`, `layout.md`, `buttons.md`. For component work, also read the matching component file.
2. **Re-read this SKILL.md every time** you start a new page — the non-negotiable rules above are how this project stays consistent.

## Critical Implementation Notes

- **Tokens are agnostic.** Names like `primary`, `surface`, `text` describe roles, not framework classes. Map them to whatever styling layer the project uses — for example, declare CSS custom properties such as `--color-primary: #0C0C09`, `--color-surface: #F4F4F1`, `--color-text: #0C0C09`, `--font-display: "Inter", sans-serif`, `--font-sans: "Open Sans", sans-serif` — and consume those tokens in components.
- **Cross-reference modules.** A button inside a card must satisfy both `cards.md` AND `buttons.md`.
- **Use semantic HTML.** Proper heading order (`h1`→`h6`), `<button>` for actions, `<a>` for navigation, `aria-label` on icon-only controls, alt text on every image.
- **Every interactive element needs hover, focus-visible, and disabled states** as defined in the matching module.

## Module Index

### Foundation (read first for any UI work)
- [colors.md](colors.md) — the cream / ink palette plus the small set of accent tokens
- [typography.md](typography.md) — Inter display, Open Sans body, hero scale
- [layout.md](layout.md) — hero scaffold, spacing rhythm, crosshatch background
- [radius.md](radius.md) — radius scale (very small)
- [shadows.md](shadows.md) — elevation tokens (mostly unused)
- [borders.md](borders.md) — border widths (1 px default, 4 px on avatar)

### Components
- [buttons.md](buttons.md) — primary solid CTA + minimal secondary / ghost
- [button-group.md](button-group.md) — grouped buttons
- [cards.md](cards.md) — flat hairline cards
- [inputs.md](inputs.md) — single-line minimal inputs
- [alerts.md](alerts.md) — inline minimal alerts
- [badges.md](badges.md) — small uppercase badges
- [lists.md](lists.md) — list components
- [avatars.md](avatars.md) — large bordered profile disc + small variants
- [icon-shapes.md](icon-shapes.md) — icon containers

### Complex Components
- [accordion.md](accordion.md) — accordion variants
- [dropdown.md](dropdown.md) — dropdown menus
- [modals.md](modals.md) — modal dialogs
- [tabs.md](tabs.md) — tab navigation
- [tables.md](tables.md) — table structure
- [pagination.md](pagination.md) — pagination components
- [sidebars.md](sidebars.md) — sidebar navigation
- [radios-checkboxes-toggle.md](radios-checkboxes-toggle.md) — selection controls
- [tooltips-popovers.md](tooltips-popovers.md) — tooltips and popovers
- [content.md](content.md) — grid system, responsiveness
