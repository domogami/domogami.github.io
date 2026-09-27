# Personal notebook layer

This folder owns the garden's visual identity. Quartz core and installed community plugins are unchanged.

- `NotebookBrand.tsx` / `plant.inline.ts`: portfolio GardenPlant SVG, draw-in sequence and accessible replay button; the adjacent name links home using Quartz's published path utility.
- `NotebookTheme.tsx` / `theme.inline.ts`: animated sun/moon/horizon control, Light/Dark/Hybrid persistence, cross-tab synchronization, and a collapsible tablet/desktop navigation rail. `controls.scss` owns its visuals.
- `annotations.scss`: opt-in styling for Markdown `[!annotation]` callouts; no component or parser plugin. See [Writing annotations](annotations.md).
- `hybrid.scss`: Hybrid surfaces: charcoal navigation with a muted tint of the portfolio’s Send word banner teal (`#0e7c79`), warm cream article and soft blue quote callouts. The graph uses its ordinary canvas colors and the shared green ribbon header, with the same outline, fill and lettering animation as the other themes. Hybrid paints the tablet page gutter and wide desktop gutter charcoal without changing layout padding/margins; a pseudo-element paints the full-bleed mobile masthead behind the shared control grid. The saved theme key remains `blended` for compatibility.
- `notebook.scss`: scoped component styles and the personal site skin; imported once by `quartz/styles/custom.scss`.
- `obsidian/`: optional offline Obsidian CSS snippet, generated from the shared annotation styles by `build-obsidian.mjs`; see its README for the future publishing-plugin integration.
- `NotebookMotion.tsx` / `motion.inline.ts` / `motion/`: reusable first-view lettering, graph ribbon and subtle page entrance. See [Notebook motion](motion/README.md) for timing, author controls, extension points and verification.
- `motion.scss`: finished ribbon and lettering styles, including reduced-motion/print fallbacks.
- `NotebookGraph.tsx` / `graph/`: compact graph layout and readable hover labels via an isolated community-plugin adapter. See [Graph tuning and upgrade boundary](graph/README.md).
- `plugins/`: four local Quartz component packages, configured with explicit positions/priorities in `quartz.config.yaml`.
- `build.mjs`: bundles the editable TSX and browser script modules into those packages. Keep `plugins/*/dist` versioned with the source so standard Quartz plugin installation/build works without additional CI steps.

After editing TSX or inline scripts, run `node site/notebook/build.mjs`. After changing package exports, regenerate the plugin index with `node --import tsx quartz/plugins/loader/install-plugins.ts`. Then run both `node node_modules/typescript/bin/tsc --noEmit -p site/notebook/tsconfig.json` (editable notebook sources) and `node node_modules/typescript/bin/tsc --noEmit` (Quartz), followed by a Quartz build. SCSS and YAML changes require only the Quartz build.

`quartz.ts` is the upstream default again: no dispatcher replacement, array insertion, or local imports. Each component can be disabled independently in YAML. The package manifests target Quartz 5 (`>=5.0.0 <6.0.0`); review compatibility before opting into a new major version.

Upgrade checks: build and type-check, verify theme persistence, home/deep-note links, search, graph contrast, 320px/mobile layout, plant replay by mouse and keyboard, and reduced motion. CSS still depends on Quartz's published markup and browser integration events; these may need small adjustments after upstream changes.

## Plant provenance and behavior

SVG paths and animation timing come from `GardenPlant` in the user's `dominicklee.net/app/components/notebook/NotebookDrawings.tsx` and its notebook stylesheet. The geometry is reused directly; React hooks were replaced with a small Quartz lifecycle script. The drawing runs on page load and replays on mouse entry or button activation. Keyboard Enter/Space work through the native button. Reduced-motion users see the completed plant, with no animation or replay. The drawing also completes with JavaScript disabled; only replay needs JavaScript.

At widths up to 800px, `notebook.scss` uses a compact reading rhythm across all themes: a 1.65rem page title, 1.6/1.4/1.2rem article heading hierarchy, and smaller heading/paragraph/list gaps. Body text stays at 1rem and desktop typography is unchanged. These are shared selectors, with no note-specific sizing.

Poppins is used for the site name, page title and headings. Caveat is reserved for annotations and the quotation treatment. The portfolio cream/charcoal theme palettes and native page transitions remain configurable independently.

Dark mode uses a soft pistachio green (`#b6cf8e`), inspired by the portfolio's green paper, for its primary accent and matching translucent highlights. Shared theme tokens in `quartz.config.yaml` also color links and graph nodes without modifying Quartz components.

Hybrid is the default when no valid `notebook-theme` preference exists, regardless of the system color scheme or Quartz’s automatically seeded legacy `theme` key. Explicit choices persist. The theme button cycles Light → Dark → Hybrid, with native Enter/Space activation and left/right arrow shortcuts. Its SVG shade, rays and horizon transition with CSS, so rapid changes do not queue animations. Reduced-motion users receive immediate state changes. Preferences apply in the head before paint and labels synchronize on navigation, history restoration and cross-tab storage events; one delegated handler avoids duplicate bindings.

The toolbar contains exactly three controls: Search, an icon-only theme switch with an accessible name and tooltip, and a book button for reading mode. Reading mode hides the navigation, graph, contents and backlinks at every breakpoint, centers the article in a comfortable-width column, and keeps the logo and toolbar in a non-sticky header with an Exit reading mode button. Its independent `notebook-reading` preference persists across pages and tabs; the old sidebar-collapse preference is no longer used. Quartz's stock reader-mode component is disabled to avoid competing behavior.

Plant/theme verification: all seven SVG paths render; the stroke/fill sequence completes; keyboard replay restarts it; reduced motion leaves the finished plant and disables replay; name links return home from nested notes. Theme persistence/search and viewport checks at 320, 390, 768, 1024 and 1440px passed with no page errors. TypeScript, formatting, and the Quartz 5 build passed. All work remains uncommitted and unpublished.

Markdown annotation verification: the standard Quartz plugin rendered all four arrow metadata values, title-only notes, body formatting/links, and collapsible annotations. Browser checks passed for all three themes, 320–1440px layouts, print retention, and content preservation without CSS/JavaScript. The separate example build remains outside published content. The Obsidian snippet is generated from the same SCSS with an embedded offline font; it has not yet been verified inside the user's Obsidian app.

The three toolbar controls share 44px targets, 8px corners and one border/surface treatment in `controls.scss`. Search fills the remaining space beside the two icon buttons. Its Lexend label uses weight 300. Keep these tokens shared when refining the controls.

The footer shares the reading column inset and centers its text and wrapping links in every theme, including reading mode and mobile layouts.

`panels.scss` reflows related-note panels below 1200px into columns at least 16rem wide, stacking when the article column is narrower; backlinks get a full row. The mobile masthead has a brand/menu row and a separate three-control row, with real padding and a gap before breadcrumbs. Hybrid’s background follows that header box rather than extending over the article.

`navigation.scss` makes the mobile explorer expand in the header grid below the controls, moving content down rather than covering it. Quartz still owns tree state and click handlers. Collapsed Explorer and table-of-contents lists are explicitly hidden, leaving their headings at natural height. Reading mode keeps the brand visible; its header scrolls away with the document.

`motion/explorer.ts` adds a short unfolding/retracting Explorer reveal with a bounded
stagger of top-level rows and a springy heading chevron. It observes the existing
toggle click after Quartz changes state; it does not replace the Explorer or its
folder persistence. Rapid toggles start from the current panel height and cancel
old animations. Closing content is inert, and temporary styles are removed on
completion, navigation, resize, print, or motion-preference changes. Reduced
motion and `notebookMotion: false` skip the reveal. The mobile menu stays in flow.

The main `.center` grid item explicitly fills its track with zero inline margins, so short folder/tag listings align with regular notes instead of shrinking and drifting right at tablet widths.

`navigation.ts` initializes Explorer’s session scroll restoration before it mounts and saves tree scroll on full-page departure. This avoids Explorer’s `scrollIntoView()` fallback moving the document; it does not override fragment navigation or browser history restoration. Check this adapter against Explorer upgrades. `search.scss` gives Hybrid search independent charcoal results and cream preview scopes, including reading mode; the preview tokens match the light palette in `quartz.config.yaml`. Phones keep Quartz’s single results column.

### Name drawing

`NotebookName.tsx`, `nameGlyphs.ts`, and `name.scss` adapt the portfolio's “Outline, then ink” study to the header, using only the six Dom Lee letters (no period). The Poppins glyph license is retained in `poppins-OFL.txt`. The name starts with the plant, draws its outlines, and sweeps in ink after 1320ms. The plant replay button restarts both drawings; the name remains the accessible home link. Reduced motion displays the finished SVG immediately. Keep these local assets independent of the portfolio runtime and verify mobile sizing, theme colors, replay, and reduced motion when upgrading.

### Favicon

`quartz/static/garden-logo.svg` is the portable garden mark: the main site's teal hexagon with our drawn sage plant and terracotta pot. It contains only SVG paths, explicit colors, and an accessible title/description, with no fonts or external dependencies. Its strengthened cream strokes preserve the silhouette at favicon sizes. The original crane mark remains in `crane.svg` as the shared hexagon reference.

Run `node site/notebook/build-icon.mjs` after editing the SVG to regenerate `quartz/static/icon.png` at 512px. Quartz's standard head and favicon emitter consume this PNG; no core override is needed. Run a full site build to refresh the generated `/favicon.ico`. The animated plant/name header remains a separate treatment of the same brand.

### Hybrid overscroll surface

At desktop/tablet widths, `hybrid.scss` paints the full left rail behind its sticky content and extends this fixed paint one viewport above and below the screen. A matching hard split on the root canvas supplies the colors exposed by elastic overscroll. The boundary derives from Quartz's sidebar width and centered page gutter, including the tablet inset. This changes no layout boxes, scroll dimensions, or native overscroll behavior. The split is absent on mobile, in reading mode, in other themes, and in print. Verified boundary alignment at 801/1199/1200px and wider, unchanged document dimensions, and theme/reading-mode reset. Native Arc/macOS rubber-band motion still needs a manual gesture check; normal browser automation cannot establish its exact compositor behavior.

### Task lists

`tasks.scss` skins the native Markdown task inputs with an uneven outline and SVG ink check. `motion/tasks.ts`, mounted by the existing NotebookMotion plugin, wraps only the inline text following each checkbox, leaving nested lists and block content untouched. It preserves inline links/emphasis and supplies an accessible name when absent. Quartz's Obsidian-flavored Markdown plugin continues to own checkbox state and browser persistence; the site does not edit or publish the source notes.

Completed text uses a thin background stroke that follows wrapped lines via `box-decoration-break`. The shared motion controller reveals initially completed tasks as they enter view; native checkbox changes use a short CSS transition. Reduced motion shows the finished state immediately, printing uses a normal strike-through, and without JavaScript Quartz's original task text decoration remains. No extra dependency or Quartz core modification is required.
