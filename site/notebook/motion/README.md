# Notebook motion

An optional Quartz 5 component adds a small shared animation system to the garden. It uses the portfolio’s folded banner geometry and outline → fill → lettering sequence, with shorter timing for a reading-focused site. Quartz core and the community graph/callout plugins stay unchanged.

## Ownership

| File                    | Responsibility                                                                    |
| ----------------------- | --------------------------------------------------------------------------------- |
| `../NotebookMotion.tsx` | Quartz component, per-page frontmatter marker, browser script registration        |
| `../motion.inline.ts`   | Quartz `nav`/`render` lifecycle, selectors, reveal registration and cleanup       |
| `config.ts`             | Shared selectors and timing budgets                                               |
| `controller.ts`         | One IntersectionObserver per page, bounded staggering and owned animation cleanup |
| `banner.ts`             | Progressive enhancement of existing graph headings with the portfolio ribbon      |
| `ink.ts`                | Grapheme-safe lettering that preserves Markdown formatting, links and whitespace  |
| `../motion.scss`        | Finished appearance, responsive lettering and print/reduced-motion overrides      |

`../build.mjs` bundles browser module imports into a self-contained script string for Quartz’s `afterDOMLoaded` hook. The generated `../plugins/notebook-motion` package is registered in `quartz.config.yaml`; disabling that entry removes the JavaScript behavior. Keep generated packages alongside source when committing.

## Reading behavior

- The graph heading is centered. Its ribbon outline draws for 600ms, fills for 240ms, then its label writes in. The graph canvas itself is usable throughout.
- Every Markdown `[!annotation]` title writes in the first time it enters the viewport. No note names, content text, or page-specific delays are hardcoded. Annotation bodies and ordinary article paragraphs remain static.
- Lettering is a brief per-grapheme ink fade, using the handwritten font for annotation titles. It suggests writing; it does not trace actual font strokes. Inline glyphs preserve accessible heading/link names and selectable text, unlike splitting text into separate inline-block letters. Words stay together, with a long-word escape hatch for narrow screens.
- Each viewport batch receives 65ms steps capped at 195ms. Staggering restarts for the next batch, so a late section never waits for preceding content. Lettering completes within 650ms; titles longer than 160 graphemes stay static.
- The page header gently appears from 70% opacity over 220ms. Native cross-document transitions use a short, non-translating fade where supported. Article paragraphs do not slide or wait behind a reveal.
- Scrolling away and back does not replay an animation. Quartz `render` events may register newly added elements but do not duplicate existing ribbons or lettering. A new page navigation creates a new lifecycle.

All CSS describes the finished state. The Web Animations API temporarily supplies the reveal, then releases its effects. Reduced motion, print, keyboard focus, browser Find, and hash navigation finish pending animation immediately. Initial anchor navigation skips reveals. Missing JavaScript/animation APIs leave content readable; without JavaScript the graph keeps its plain centered heading. Reduced-motion users still get the finished ribbon. These guarantees apply to this motion component; the separate plant component owns its replay behavior.

## Author controls

No extra markup is needed for existing annotation callouts:

```markdown
> [!annotation|arrow-down] A thought before the next section
```

Keep an individual annotation still while retaining its styling:

```markdown
> [!annotation|arrow-down static] This thought appears immediately
```

Disable this component’s reveals on an entire page:

```yaml
---
notebookMotion: false
---
```

Custom components may opt out with `data-notebook-motion="off"` on an element or ancestor. This does not disable the independent plant animation or site-wide native page transitions. The optional Obsidian snippet currently provides static annotation styling; a future Obsidian plugin would need its own editor/preview lifecycle adapter.

## Extending the system

Add selectors in `config.ts` and register a reveal through `controller.observe(element, (delay, animate) => { ... })` in `motion.inline.ts`. Use the supplied `animate` function so finish/cleanup owns every effect. Keep final styles in SCSS, never persist opacity zero, and leave essential reading content visible. Reuse `prepareInk`/`writeInk` or `decorateBanner`/`bannerReveal` for compatible headings instead of copying timing logic. A new banner selector also needs a matching stylesheet rule; current visual rules are scoped to the graph.

The controller owns only effects it starts. It does not cancel graph simulation, theme handling, or plant animation. Avoid transforms, clipping or isolation on the `.graph` parent: the expanded graph uses a fixed overlay that must escape it.

## Build and verification

Run from the preview repository root with Node 22 or newer:

```sh
node site/notebook/build.mjs
# Only needed after changing plugin exports/registration:
node --import tsx quartz/plugins/loader/install-plugins.ts
node node_modules/typescript/bin/tsc --noEmit -p site/notebook/tsconfig.json
node node_modules/typescript/bin/tsc --noEmit
node quartz/bootstrap-cli.mjs build
node quartz/bootstrap-cli.mjs build -d site/notebook/examples -o /tmp/quartz-annotation-preview
```

Serve `public/` at localhost:8080 and the separate example output at localhost:8081 using a server with clean HTML URLs. Then run:

```sh
# Point to an existing Playwright install if it is not resolvable from this repository.
PLAYWRIGHT_MODULE=/absolute/path/to/playwright node site/notebook/tests/motion.browser.cjs
```

`QUARTZ_PREVIEW_URL`, `QUARTZ_EXAMPLES_URL`, and `BROWSER_CHANNEL` may override the defaults. The browser checks cover sequencing, accessible names, repeated render events, expanded graph, first-view behavior, rich Markdown/Unicode, narrow layout, author opt-outs, reduced motion, focus, anchor navigation, print and graceful fallback. Examples live outside `content/` and are not included in the normal garden build.

Upgrade checks: verify `.graph > h3`, callout title selectors, and the Quartz `nav`, `render`, and `window.addCleanup` integration. The local package targets Quartz `>=5.0.0 <6.0.0`; review a new major version before enabling it. Geometry provenance: `dominicklee.net/app/components/notebook/NotebookDrawings.tsx` (`DrawnBanner`), with animation inspiration from that site’s `notebook.css`.
