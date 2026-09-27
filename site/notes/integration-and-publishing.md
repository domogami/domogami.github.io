# Garden integration and publishing decisions

Local investigation: September 24, 2026. No publishing or DNS changes performed.

## Which checkout is current?

The live site already uses Quartz 5. The origin repository defaults to `v5`.

- `00f24f26`: August 3 migration to Quartz 5.
- `95988bb6`: August 4 final deployment configuration.
- `1051f754`: August 4 LaTeX rendering fix.
- `0477c6e`: August 4 default-dark setting and latest `v5` head when checked.
- Confirmed successful deployment of that head: https://github.com/domogami/domogami.github.io/actions/runs/30881868141

The original parent checkout is still on `Quartz4`, at `16c483c`, with stale remote refs and uncommitted files. Several files are iCloud dataless placeholders. This isolated `work/garden-v5` checkout starts from the existing published `v5` branch and uses its committed content. It does not import unreviewed parent content or vault notes. The original checkout and Raycast scripts have not been migrated to this directory.

## Small customization surface

- `quartz.config.yaml`: standard theme palette, typography, existing community plugins and layout.
- `quartz.ts`: unchanged upstream entry point. Custom components are local packages under `site/notebook/plugins/`, positioned in YAML.
- `site/notebook/`: personal component, browser script, and stylesheet, separate from upstream implementations.
- `quartz/styles/custom.scss`: imports of the personal skin and Markdown annotation styles.

After visual review, Light uses the portfolio cream (#efe7d7), Dark uses its charcoal (#2b3034), and Hybrid uses solid charcoal navigation (#2b3034), portfolio cream (#efe7d7) for the article, soft blue quote callouts (#c6d9de), and a dotted portfolio-teal (#0e7c79) local graph with cream heading and white marks. The expanded graph retains its original colors. The teal welcome-section experiment was removed. The sidebar becomes a compact charcoal masthead on mobile. The earlier teal frame, charcoal title card, and page gradient were rejected and removed. The blue paper is a complementary accent, while ink, cream, charcoal, and teal remain from the portfolio. The selector label is now Hybrid while its persisted key remains blended. Ink (#252b2e), teal (#0e7c79), mint (#43d0c1), and terracotta (#a34e36) follow the portfolio palette. All three keep a continuous reading surface, Poppins headings, Caveat annotations, and a graph matched to the root palette. Hybrid does not divide the article and graph into separate light/dark columns. The site name has the portfolio plant SVG with its drawing animation. The earlier split-column treatment was rejected and removed. Existing browser theme preferences are respected; fresh sessions default to Hybrid. The selector persists independently while retaining Quartz's standard light/dark attribute and themechange event for graph and code rendering.

This avoids editing installed plugins or upstream components. During upgrades, reinstall the locked dependencies/plugins and check this small integration surface. CSS selectors and component contracts can still change across major versions; no theme can guarantee zero work for Quartz 6. Keep the existing AliasRedirects plugin for historical note URLs and preserve the existing math configuration.

References: https://quartz.jzhao.xyz/layout (Style and TS layout overrides), https://quartz.jzhao.xyz/configuration, https://quartz.jzhao.xyz/getting-started/migrating

## Hosting choices

### Recommended: garden.dominicklee.net

Keep the portfolio on Netlify and garden on GitHub Pages. Set the GitHub Pages custom domain to `garden.dominicklee.net`, then set the DNS `garden` CNAME to `domogami.github.io`. Update Quartz baseUrl to `garden.dominicklee.net`, enable HTTPS when ready, and update the portfolio's garden link. No apex-domain move is necessary. GitHub Actions publishing does not require a repository CNAME file. Verify the old GitHub Pages URL redirects and deep links still work after cutover.

Reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

### Possible: dominicklee.net/garden

The portfolio has a Netlify/React Router setup. Two viable designs:

1. Build Quartz separately and copy its generated output into the portfolio deploy's `/garden` directory. Have a garden update trigger a Netlify rebuild, using a pinned garden revision. This keeps source repositories separate while producing one deploy.
2. Proxy `/garden/*` through Netlify to an independent garden origin. Put rules before the React Router catch-all and ensure the garden build understands the public `/garden` base path.

Neither is only a DNS change. Test direct nested loads, SPA navigation, assets, graph/search indexes, canonical links, RSS, sitemap, redirects, and 404s under the prefix. A plain rewrite cannot repair incorrect root-relative URLs inside HTML or JS. Avoid redirect loops between a custom domain and the proxy origin. These options are designs, not configured or verified deployments.

Reference: https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/

## Obsidian publish command: review is mandatory

User requirement: separation exists so the exact public files can be inspected and explicitly approved. Prioritize avoiding disclosure of private journals. A timer or note-edit hook may prepare a review, never approve or publish it.

A desktop-only personal plugin can expose `Prepare garden publish` in the command palette and a ribbon button. Both it and Raycast should call the same publisher implementation. The plugin is a UI for a reviewed transaction, not a second publishing pipeline.

Proposed flow:

1. Export to a fresh directory outside every Git working tree. Never move or delete source vault files. Stop on missing, unreadable, or unhydrated inputs. Apply private-folder exclusions before any content enters Git; exclusions win over any note-level flag.
2. Build a candidate manifest. Show additions, modifications, removals, attachment previews, text diffs, and the complete resulting public file list. Include every attachment and exported transclusion. New files require explicit inclusion; do not automatically include all attachments or linked private notes. Show broken links without copying their targets.
3. Build the candidate locally and show its preview. Filtering notes from HTML is not sufficient: excluded notes must never enter a public repository or commit history. Check generated search indexes, graph data, RSS, sitemap, social images, and assets against the candidate.
4. Require explicit `Publish these reviewed changes` confirmation, identifying repository, branch, and counts. Bind approval to hashes of the exported files, final output, relevant configuration, current local commit, and expected remote branch head. Any change invalidates approval and returns to review.
5. In an isolated clean publishing checkout, stage only the exact approved paths and verify the staged diff matches the manifest. Never use `git add .` in the development checkout. Use a lock against overlapping publishes, fail on every error, and push without force only when the remote head still matches. A push rejection requires a fresh review after reconciliation.
6. Show commit/push and deployment status separately. A successful push is not yet a successful deployment. Failures must not report success. Preserve the candidate for inspection; cancellation leaves the vault and remote unchanged.

The current Raycast build script clears export/output directories before running the exporter; the publish script separately stages the entire checkout and can print success after failures. Replace these only as part of the reviewed publisher implementation. Do not run either old script against this preview. Do not auto-publish on a timer, and do not silently adopt publish:true as a replacement for final confirmation.

Existing public notes are not made private by deleting them from the latest output; Git history and earlier deployments may retain them. The pipeline's boundary must prevent the first disclosure.

Obsidian API reference: https://docs.obsidian.md/Plugins/User+interface/Commands

## Local verification

- Quartz reports 5.0.0; builds 79 Markdown notes into 270 output files.
- TypeScript, formatting of changed files, and Git whitespace checks pass.
- Browser checks pass for all three theme selections through reload and note navigation, plus search. The transition prototype uses normal document navigation with enableSPA: false.
- No horizontal overflow at 320, 390, 768, 1024, or 1440px; no browser page errors in the checked flows.
- Screenshots captured in Light, Dark, Blended and mobile Blended.
- The built-in file watcher hit the machine's open-file limit. The preview at `http://localhost:8080` serves the completed static build on loopback; rebuild after edits because this fallback server does not hot reload.
- Run `npm run site:build` for a build or `npm run site:preview` for the local preview after installing dependencies and generating the plugin index. Both commands use `site/build.mjs`, which sets `America/Los_Angeles` for Quartz and its workers. The deployment and validation workflows use the same entry point so dates display consistently, including daylight saving time. Direct `npx quartz build` commands bypass this time-zone setting. Node 24 was used locally. The locked Sharp install required `SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm ci` on this machine.
- Date sources prefer frontmatter, then Git, then filesystem metadata. Keep manual date-only values as `YYYY-MM-DD`; Syncer's UTC timestamps do not need rewriting. The time zone controls how those timestamps display, not the stored instant.
- No note import, publish script execution, commit, push, deployment, domain change, or Obsidian plugin installation occurred.

## Native page-transition prototype

The linked Coding2GO video, “CSS Can Now Animate Between Pages” (https://www.youtube.com/watch?v=XH1G58QqPIM), demonstrates CSS cross-document view transitions. This local prototype uses `@view-transition { navigation: auto; }` with a brief fade and small vertical shift. It opts out when prefers-reduced-motion is reduce; unsupported browsers keep normal navigation.

The preview sets `enableSPA: false` so normal document navigations trigger the native API. This is a deliberate preview tradeoff, not an upstream router patch. Retaining SPA routing would require a separate integration with its DOM-update lifecycle; CSS cross-document opt-in alone will not animate SPA navigation.

A custom subdomain gives the garden a recognizable address under a domain you own and makes a future hosting move possible without changing public URLs. It does not by itself improve speed, privacy, deployment automation, or allow cross-origin transitions. `dominicklee.net` and `garden.dominicklee.net` are different origins. For native transitions between the portfolio and garden, use the same origin (such as `dominicklee.net/garden`), opt in on both sides, and avoid cross-origin redirects. That changes the earlier recommendation: a subdomain is simplest for independent hosting, while `/garden` is better if seamless page transitions between the two sites are a priority.

References: https://developer.chrome.com/docs/web-platform/view-transitions/cross-document and https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using

Caveat is copied from the portfolio's existing font asset and shipped with its SIL OFL license in `quartz/static/fonts/`. Poppins loads through the existing Fonts plugin. The earlier Kalam heading experiment was replaced.

Final browser verification observed a native view transition on an actual note-to-note navigation, and no transition with reduced motion enabled. Theme persistence was checked across actual note navigations as well as reloads; in-page heading anchors intentionally do not start document transitions.

The plant/name and theme selector load through two local component plugins. Annotations now use native Obsidian callouts in Markdown with a scoped stylesheet, without a custom component or parser. The home annotation text is in content/index.md. The temporary PageTypeDispatcher replacement and positional array edits have been removed; quartz.ts exactly matches the upstream entry point again. See ../notebook/README.md for rebuilding the local packages and upgrade checks.
