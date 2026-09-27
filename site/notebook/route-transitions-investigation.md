# Route transition investigation

Investigated 2026-09-26. This is a design and implementation assessment, not an enabled site feature.

Deferred at Dom's request on 2026-09-26; retain these notes for a future iteration.

## Recommendation

Use native View Transitions for the visual language. First prototype cross-document transitions against the current site: keep the rail visually stationary, replace only the article, and reveal the title from left to right. Then treat true sidebar persistence and a graph walk as a separate SPA/component-lifecycle enhancement. Do not promise that CSS preserves a live sidebar or WebGL canvas.

For the complete requested experience, the eventual architecture should be a persistent navigation/graph shell with a route-specific article, breadcrumbs, table of contents, and backlinks. Keep the custom component code in this directory and use Quartz's navigation rather than replacing it with an independently maintained router. A narrow upstream navigation hook would be preferable to carrying a large core fork.

## Video and browser features

The linked Coding to Go video, “CSS Can Now Animate Between Pages,” demonstrates cross-document transitions: `@view-transition { navigation: auto; }`, named `view-transition-name` snapshots, and custom old/new pseudo-element animations. Its navbar stays visually in place while the content moves. It still loads a new HTML document. Transcript reviewed via the browser export.

- Video: https://www.youtube.com/watch?v=XH1G58QqPIM
- Cross-document mechanics: https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
- Same-document mechanics: https://developer.chrome.com/docs/web-platform/view-transitions/same-document
- Feature/support matrix and demos: https://view-transitions.chrome.dev/

Cross-document transitions require the same origin and opt-in on both pages. They are supported in current Chrome/Edge and Safari; Firefox needs ordinary navigation as fallback for that variant. Same-document support is broader in current browsers. Detect the features used rather than gating by browser name; reduced motion bypasses the effects. No need to depend on newer nested/element-scoped transition features for this project.

`dominicklee.net` to `garden.dominicklee.net` would be cross-origin, as are localhost ports 3000 and 8080. Merely changing DNS to a subdomain does not enable a shared transition across the two sites. Hosting the garden under `/garden` on the same origin could support cross-document transitions if both sites opt in.

## What this installed Quartz does

- `quartz.config.yaml`: `enableSPA: false`. Each ordinary route navigation currently loads a document, including the left rail and graph.
- `quartz/components/scripts/spa.inline.ts`: the optional SPA router fetches/parses HTML, emits `prenav`, runs registered cleanup, morphs the body, updates the head and history, then emits `nav`. There is no View Transition call or awaitable before-swap callback in this installed implementation.
- Wrapping `window.spaNavigate` alone would not cover every link: the internal click and popstate handlers call their enclosed `navigate` function directly.
- A `prenav` listener cannot reliably wrap the swap by itself: the router does not wait for a transition's asynchronous snapshot/update callback. The swap needs to happen inside that callback, after the destination has been fetched.
- Installed Explorer 0.1.0 handles `nav` and `render` by building and replacing the tree's contents. It restores folder state and scroll, but enabling SPA alone does not make the tree persistent.
- Installed Graph 0.1.0 uses D3 simulation and PixiJS/WebGL. Its `prenav` handler cleans up; its `nav` handler redraws. Cleanup stops the simulation and destroys the Pixi application. It also redraws on theme changes. There is no exposed retain-layout/update-active-node setting in its public options.
- The installed micromorph's `data-persist` treatment is not a general guarantee that a component subtree and its listeners survive navigation. Do not add that attribute to a whole sidebar and assume it solves cleanup, active-page updates, or canvas lifetime.

These conclusions come from the local installed sources, not an assumption that Quartz 4 documentation exactly matches this Quartz 5 checkout. The package source maps were inspected to trace the graph/explorer lifecycle. No installed package or core source was edited.

## Proposed motion language

| Region               | Behavior                                                                                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plant and Dom Lee    | Draw on initial entry and deliberate replay. Keep finished during internal route changes.                                                                                         |
| Left rail            | Keep position and expanded folders. Update only current-note indication and reveal the active branch if necessary.                                                                |
| Article              | Old content fades over roughly 90ms; new content fades with a 4–6px movement over 180–240ms. Avoid full-screen slides.                                                            |
| Main title           | Reveal the ordinary heading from left to right with a CSS clip/mask over roughly 240ms. Keep selectable, accessible text; no SVG conversion or per-letter wrapping needed.        |
| Folder entry to note | Optionally match the clicked listing title to the destination heading, with a stable slug-based identity. Use only the selected listing link, not every occurrence of that title. |
| Breadcrumbs          | Shared ancestor segments remain quiet; changed segments fade/reveal.                                                                                                              |
| TOC and backlinks    | Replace route-specific data with a small fade; do not freeze them with the left rail.                                                                                             |
| Graph                | Keep layout coordinates and zoom. Change active-node emphasis and subtly illuminate the traversed edge.                                                                           |

Text snapshots can move/resize/crossfade; unrelated words do not automatically morph letter-for-letter. For unequal/multiline headings, prefer a short fade/reveal over stretching old glyphs into new ones. A clicked listing title transitioning to the exact same destination title is the better shared-text use case. Keep transition names unique, especially when search previews/popovers duplicate headings.

The existing page-header entrance in `motion.inline.ts` must be coordinated with the route effect so opacity animations do not stack. Likewise, stop replaying name, plant, and graph-banner entrances on each internal navigation. The initial entry sequence can stay richer than the route sequence.

## Graph walk scope

CSS sees the graph canvas as one visual element; it cannot independently match Pixi nodes inside it. A crossfade can disguise a redraw, but it is not a graph walk.

An isolated persistent graph plugin would retain a map keyed by note slug, node coordinates/velocities, camera zoom/pan, and the active slug. On navigation it would update the active halo, briefly trace an existing edge from old to new node, and update neighbors incrementally. New local-neighborhood nodes can enter near their connected nodes while existing ones keep their positions. Avoid fabricating a direct edge for unrelated notes; use a selection fade or gentle camera move instead. Preserve the previous node long enough to finish a transition when neighborhood membership changes.

The installed content index already supplies graph relationships. Reuse it; no publishing or Markdown changes are needed. Mount once, update on route changes, and dispose only when actually removed. Theme updates should recolor, not restart physics. Pause work when hidden by reading mode or below the viewport. Retain the existing global graph controls or explicitly implement their equivalents.

## Implementation sequence and upgrade boundary

1. **Small visual prototype:** local `transitions.scss` plus early route-state logic in the existing custom component. Keep SPA disabled. Match rail/content/title separately; avoid whole-page fading. Finish the brand on internal arrivals and restore Explorer before the snapshot where feasible. This improves appearance but still reloads/rebuilds components; an asynchronously built Explorer may require readiness coordination to prevent snapshot mismatch.
2. **Persistent components:** enable Quartz SPA in an isolated development preview and adapt Explorer/Graph as local plugins. Verify node and canvas identity across routes, not just screenshots. Maintain active route, folder state, search and graph interactions without stale listeners.
3. **Router integration:** add an awaitable swap hook or native View Transition support upstream if available/accepted; otherwise keep a minimal documented router patch. Fetch before starting the visual transition, then perform cleanup, DOM/head update, scroll/history handling, and route notification in the controlled update phase. A custom replacement router would carry a larger upgrade burden and is not the first choice.
4. **Graph walk:** add incremental selection/layout animation once lifetime is stable. This is materially larger than the CSS layer and should be separately reviewable.

## Examples worth trying

- Fixed header, changing content: https://simple-vt-demos.jakearchibald.com/4-fixed-header/
- Shared heading text: https://simple-vt-demos.jakearchibald.com/5-heading-text/
- Parent/detail navigation with shared name/avatar: https://view-transitions.chrome.dev/profiles/mpa/
- Direction-aware nested navigation: https://view-transitions.chrome.dev/stack-navigator/spa/
- More elaborate coordinated elements, useful as an upper bound on motion: https://view-transitions.chrome.dev/off-the-beaten-path/spa/

Use the first three as the primary garden references. The full-width slides in some demos should be reduced to much smaller movements here.

## Verification before adopting

Check home→folder→note→sibling and Back/Forward; normal links start at top, fragment links land on their headings, and history restores prior scroll. Cover search selection, graph navigation, keyboard focus/route announcements, modified clicks/new tabs, mobile Explorer, reading mode, all three themes, long headings, missing/slow destinations, rapid navigation, and reduced motion. Ensure no doubled listeners/animations and that graph/node identity actually persists in the SPA version. Test Safari/iPhone as well as Chromium. Unsupported browsers get complete, readable pages and ordinary navigation. Keep all experiments local until reviewed.
