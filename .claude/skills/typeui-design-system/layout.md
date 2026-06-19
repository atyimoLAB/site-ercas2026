# Layout & Spacing

> Dependencies: `colors.md`, `typography.md`

## Spacing Rhythm

Base unit: **4 px** (`--spacing`). Use multiples; the canonical scale for this skill is: | Step | Value | |---|---|---| | `xs` | 4 px | `1` | | `sm` | 8 px | `2` | | `md` | 16 px | `4` | | `lg` | 24 px | `6` | | `xl` | 32 px | `8` | | `2xl` | 64 px | `16` | | `3xl` | 96 px | `24` |

## Hero Spacing (the canonical rhythm of the landing page) | Gap | Value | |---|---| | Avatar → `h1` | 24 px | | `h1` → lead paragraph | 32 px | | Lead paragraph → CTA | 64 px | | Page outer padding | 16 px mobile, 32 px ≥ small |

These exact gaps are mandatory on any hero/landing surface — they are the "feel" of the project.

## Containers | Purpose | Max width | Notes | |---|---|---| | Hero / landing column | **672 px** | Default for any page-level main content | | Long-form prose | 768 px | About / case-study text | | Works grid | 1024 px | Project thumbnails, 2- or 3-column | | Absolute outer cap | 1280 px | Only for full-bleed gallery rows |

Every container is centered with horizontal padding . Never let content touch the viewport edge.

## Page Scaffold (use this on every full-page route)

This scaffold is the single source of truth — copy it, do not invent variations.

## Section Pattern (when more than the hero is needed)

When a page has follow-up sections (Works, About, Contact):

- **No alternating section backgrounds.** Every section sits on `surface`.
- **Vertical padding:** 96 px between sections, 128 px before the first follow-up section after a hero.
- **Section header pattern:** small uppercase eyebrow (12 px, `text/60`, 0.12em letter-spacing) → `h2` headline → 48 px gap → section content.
- **Section dividers** (if needed): a single 1 px hairline at `text/10`, full container width. Prefer pure whitespace over dividers.

## Background Treatment

- **Always** render the 45°/-45° crosshatch on full-page routes (see scaffold above).
- The crosshatch sits at z-index -10 with pointer-events none so it never interferes with interaction.
- **Never** stack additional textures, noise, blobs, gradient meshes, or images on top. The crosshatch is the only decorative layer this design uses.
- Hero photography (e.g. project thumbnails) lives **inside** content blocks, never as a section background.

## Motion & Animation

- **Default to none.** This is a quiet design — animation should be the exception, not the rule.
- When animating, use CSS transitions on `colors`, `opacity`, or `transform` only. 150 ms (`--default-transition-duration`) with the default cubic-bezier.
- One acceptable orchestrated moment per page-load: stagger the avatar → `h1` → paragraph → CTA fade-in with `40 ms` delay between elements. No more.
- Never animate the crosshatch background.
- Never use parallax, scroll-jacking, or auto-playing motion.

## Visual Depth

- The design is intentionally **flat**. Depth comes from typography weight contrast (900 vs 400) and from the 60 % opacity of body copy, not from shadows or gradients.
- Avatar gets shadow-sm (see shadows.md). Nothing else carries elevation.

## Must

- Hero rhythm: 24 / 32 / 64 px sequence between avatar / h1 / paragraph / CTA.
- Crosshatch background present on every full-page route.
- One Primary CTA per view, centered.
- Containers always centered, never full-bleed for text content.
- Mobile padding, scales to at small breakpoint and above.

