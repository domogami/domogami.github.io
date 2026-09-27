# Garden layout and organization ideas

Research: September 24, 2026. Proposals only; no layout, note content, publishing configuration, or deployment changes made for this review.

## What other gardens suggest

- [Jacky Zhao](https://jzhao.xyz/) offers personal entry points into writing, projects, and books, alongside selected writing and recent notes. Lesson: give new and returning readers distinct starting points.
- [Maggie Appleton](https://maggieappleton.com/garden) exposes topic, content-type, and growth-stage filters. Lesson: topic, format, and maturity are useful separate dimensions; one folder hierarchy cannot describe all three.
- [Andy Matuschak](https://notes.andymatuschak.org/z5E5QawiXCMbtNtupvxeoEX) describes concept-oriented, densely connected evergreen notes. His [top-of-mind page](https://notes.andymatuschak.org/zPKTSiU725W9WQCqoVPBcxm) supplies a curated starting point. Lesson: relationships and active interests can guide exploration.
- [Gwern's design notes](https://gwern.net/design) describe previews, contextual backlinks, collapsible detail, and wide-screen sidenotes. Lesson: allow readers to inspect supporting context without losing their place; adopt selectively given implementation complexity.

These are observations from the sites and their authors' documentation. The recommendations below are adaptations for Dom's garden, not claims that each source implements the proposed design.

## Prioritized opportunities

| Priority | Improvement                               | Concrete proposal                                                                                                                                                                                                           | Likely implementation scope                                         |
| -------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| First    | A clearer homepage entry point            | Keep the personal welcome, then offer three curated starting notes and a compact set of topic entrances. Move exhaustive category lists into collection pages.                                                              | Markdown and links initially                                        |
| First    | Topic maps independent of vault folders   | Introduce a few pages such as Software Craft, Tools for Thought, Books, and Food & Life. Explain the connections between notes; a note can belong to several maps. Preserve existing files and URLs.                        | Markdown index notes                                                |
| First    | One-line note descriptions                | Pair titles with an author-written sentence explaining what the reader will find. Use dense rows, with occasional notebook accents, instead of large cards for every note.                                                  | Markdown first; optional metadata renderer later                    |
| First    | Clear heading hierarchy                   | The homepage currently puts “My Current Adventures” immediately before “A bit about me” at the same heading level. Give the former actual current content, or make it a true parent with smaller subsections.               | Markdown headings/content review                                    |
| Next     | Guided reading trails                     | Offer a short ordered path such as Why Obsidian → Digital Garden → selected workflow notes, with a sentence explaining each step. Keep free exploration available.                                                          | Markdown trail pages                                                |
| Next     | A useful note ending                      | Add a few deliberately chosen “Read next” links, with brief reasons. Keep automatic backlinks separately labeled “Mentioned in,” since incoming links and recommended next steps serve different purposes.                  | Markdown first; optional local component                            |
| Next     | Recently tended notes                     | Show three to five meaningfully revised public notes. Use intentional updated metadata rather than treating every vault copy, rebuild, or bulk formatting change as a new update.                                           | Metadata plus a small list component                                |
| Next     | Optional note maturity                    | Offer plain-language status such as Seedling, Growing, and Evergreen with a short explanation. A status describes completeness, never publication permission or factual certainty.                                          | Optional frontmatter and local component                            |
| Next     | Mobile navigation that unfolds on demand  | Provide a compact “On this page” disclosure for long notes, accessible search, and useful next-note links at the end. Keep the green folded graph as optional exploration, with a compact reveal on mobile.                 | Existing components/layout first; small local enhancement if needed |
| Later    | Purposeful collection pages               | Start with a bookshelf: title, author, reading state, and one takeaway. Recipes could have their own index with optional time/category fields. Add metadata only where it helps browsing.                                   | Markdown collections, then reusable views                           |
| Later    | A shared home/garden navigation           | Link clearly between the portfolio and garden. Let the portfolio carry the fuller personal introduction and the garden emphasize ideas, notes, and current interests.                                                       | Shared navigation and reviewed copy                                 |
| Later    | A compact trail of recently visited notes | Help readers return after following several links. Consider a short browser-local recent-notes list before experimenting with stacked panes. Inspired by [Historical Trails](https://maggieappleton.com/historical-trails). | Optional local component; higher lifecycle/testing cost             |

## First proposed pass

Start with the first four items: homepage orientation, topic maps, note descriptions, and heading hierarchy. These can mostly live in Markdown and improve both desktop and the newly denser mobile layout. Keep the current palette, typography, annotations, and restrained motion.

Build any repeated visual rendering in the existing `site/notebook` layer. Prefer ordinary Markdown links and optional frontmatter so content stays useful in Obsidian. Avoid page-specific layout code and changes to Quartz core or installed community plugins.

Any generated list, topic count, graph, search index, or preview must be built from the explicitly reviewed public export. Linking to a note, adding a topic, or marking a note Evergreen must never publish it or import a linked private note automatically. This preserves the required file-by-file publication review.

Do not begin with a large taxonomy, automatic semantic clustering, or a custom stacked-pane reading system. Those are higher-maintenance experiments; the curated navigation changes should establish whether they are needed.
