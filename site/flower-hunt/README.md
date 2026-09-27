# Flower Hunt for Quartz 5

A small, hand-drawn flower scavenger hunt for Dom's garden. Five illustrated petals are tucked between paragraphs in **College at UCSD**, **Working at Amazon**, **Watch Party**, **Rabbit Holes**, and **Lighthouse Poem**. Collecting a petal sends it into the flower in the lower-right corner. Two petals carry short handwritten messages; the others stand alone. The unframed plant looks drawn directly on the page, with a handwritten 0/5 progress counter and no popovers. Completing it inks all five petals in sequence and blooms the flower and reveals **Open Personal Growth** and its descendants. Once complete, the flower becomes a link into the revealed section.

## Configuration

Edit the `./site/flower-hunt/plugin` entry in `quartz.config.yaml`:

```yaml
- source: ./site/flower-hunt/plugin
  enabled: true
  options:
    id: personal-growth-v1
    hiddenPaths:
      - my-experiences/open-personal-growth
      # Add more directory or individual note slugs here.
    destination: my-experiences/open-personal-growth
    pieces:
      - id: beginnings
        page: my-experiences/college-at-ucsd
        label: The beginnings petal
        anchor: life-at-warren-college
        afterParagraph: 1
        message: A little something is growing here…
```

Use **published URL slugs**, not vault paths or `.md` filenames. A hidden path matches itself and descendants at a slash boundary, so `growth` will not hide `growthful`. There can be 1–8 petals, with stable, unique IDs and fixed locations. Multiple petals may share a page. Optional `anchor` is a heading's HTML ID (the fragment in its permalink), without `#`. Optional `afterParagraph` places the petal after that numbered direct paragraph within the heading’s section (or the whole article without an anchor). A missing paragraph falls back to the heading; a missing anchor uses the article. Without either placement option, the petal appears at the end. Optional `message` adds a short handwritten caption; omit it for a standalone petal. The build rejects missing piece pages, a missing destination, and pieces placed in the hidden area.

`id` namespaces the browser's progress. Keep it stable when moving pieces or editing accessible labels. A completed hunt stays complete even when pieces change; change `id` deliberately to start a new hunt for everyone. Storage is per browser and origin, so localhost and the live site have independent progress. Clearing website data, private browsing, or switching devices can mean playing again. If persistent storage is blocked, the plugin tries session storage ; progress may not survive.

## What hiding means

This is an **Easter egg, not access control**. The user explicitly chose publicly accessible notes with hidden discovery. HTML, attachments, the source repository, configuration, and the unlocked index remain inspectable. Do not use this for private journals or secrets. Existing search-engine caches and links cannot be retroactively removed by this plugin.

Before completion:

- The standard content index excludes hidden notes, folder nodes, links to them, and tags used only by hidden notes. Explorer, search, and both graphs consume that index.
- Sitemap and RSS omit the hidden pages. Hidden page HTML has `noindex, nofollow, noarchive` for cooperative crawlers.
- Folder/tag listing rows, backlinks, ordinary links, and transclusion blocks targeting the hidden paths are concealed. Folder listing counts reflect the visible rows.
- Direct hidden-page visits keep the content concealed without explanatory text. With JavaScript disabled, the hidden section stays concealed.

After completion, the browser requests the full discovery index. One reload after the final bloom refreshes Explorer, search, and graphs consistently; scroll position is restored. No additional server, account, or cookie is needed. The full index remains publicly accessible by design. Independent `unlisted` notes stay out of both indexes.

Ordinary prose that mentions these topics is not rewritten. Do not include personal excerpts directly in public notes or RSS descriptions if you want those excerpts to remain undiscoverable through ordinary reading. Attachments remain public; this plugin does not encrypt or relocate them.

## Theme and interaction

All colors inherit Quartz's current theme tokens, including Hybrid. The plant remains unchanged; the flower is a separate, unframed plant drawing with a handwritten progress counter fixed in the lower-right corner. Artwork lives in `art.ts` as reusable SVG geometry; `styles.css` controls the ink/bloom animation and notebook shapes.

At the garden's mobile breakpoint (800px and below), the flower sits in its own row after the footer, aligned right with safe-area spacing. It scrolls with the page and never overlaps reading text. When the collector is offscreen, a collected petal gently lifts and fades in place instead of flying down the page. Desktop keeps the fixed corner flower.

Buttons work with mouse, touch, Enter, and Space. Progress is announced through a polite status region. Reduced-motion users skip the petal flight and bloom animation. Collected petals disappear from their page after flying to the flower. Controls have invisible touch padding; printing hides them.

## Development and upgrade boundary

```sh
npm run site:flower-build
npm run install-plugins
npm run site:flower-test
npx tsc --noEmit -p site/flower-hunt/tsconfig.json
npm run site:build
```

Commit `plugin/dist/` together with source changes; Quartz loads the local plugin package directly. The generator bundles browser code and styles into the plugin, so GitHub Actions does not need an extra build step. `hast-util-from-html` and `hast-util-to-html` provide structured HTML decoration.

Regenerate the plugin index before type-checking, as CI does. The plugin preserves the community `ContentDetails` and `ContentIndexMap` types in its declaration export list, which Quartz's file tree imports through that generated index. The package's `types` entry supports Quartz's TypeScript module resolution.

This plugin **replaces** the standard ContentIndex emitter using its public API. Keep `@quartz-community/content-index` installed but do not enable its emitter alongside Flower Hunt. To remove the hunt, disable this plugin and re-enable the normal ContentIndex emitter, then do a clean site build.

There are no edits to Quartz core or source notes. These integration points still need verification on upgrade:

1. Quartz 5 emits pages before the other emitters, including during incremental builds. The plugin decorates those generated HTML pages idempotently.
2. A resource-only component installs its pre-script before Quartz initializes `fetchData`. The narrowly scoped same-origin `static/contentIndex.json` fetch wrapper selects the unlocked index for returning players; other fetches are unchanged.
3. The unlocked index mirrors the community ContentIndex fields. The public index, sitemap and RSS are generated by the community emitter itself.
4. HTML decoration relies on standard links, `.center`, `.section-li`, `.page-listing`, and `.transclude`. Check new page-type plugins separately.
5. **Full-page navigation is required** (`enableSPA: false`, this site's current setting). SPA persistence needs a separate lifecycle integration before enabling it.

`site/build.mjs` runs `verify-build.mjs` after production builds. Quartz can log an emitter failure without exiting with an error; the independent check makes missing gates or leaked hidden graph nodes fail the build instead. Use `npm run site:build` for deployment, not the bare Quartz command.

To replay locally, remove only `garden-flower:personal-growth-v1` and `garden-flower:personal-growth-v1:complete` from the browser's local/session storage and reload. Do not clear all site data, which would also reset the theme and reading preferences.
