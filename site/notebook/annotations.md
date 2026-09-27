# Writing annotations

Annotations are content in ordinary Markdown files, using Obsidian's native custom callout syntax. Quartz's existing ObsidianFlavoredMarkdown plugin already preserves the callout type and metadata. There is no additional parser, page-specific content component, or hidden annotation text in the theme. The optional notebook motion component progressively animates the existing title; it does not supply or change the annotation text.

```markdown
> [!annotation|arrow-down] notes, ideas & things taking root

## Welcome Friend!
```

Place the callout directly before or after the text it refers to. Moving the Markdown moves the annotation. The title gets the handwritten font; optional body paragraphs keep the regular body font for readability.

```markdown
> [!annotation|arrow-up align-end] An extra thought about the section above
> Add **emphasis**, [a link](#your-heading), or [[Another note]] here.
>
> A second paragraph works too.
```

Metadata after `|` is a space-separated list. Use at most one arrow direction.

| Syntax                              | Appearance                                                    |
| ----------------------------------- | ------------------------------------------------------------- |
| `[!annotation]`                     | Handwritten title, no arrow                                   |
| `[!annotation\|arrow-down]`         | Curved arrow pointing down                                    |
| `[!annotation\|arrow-up]`           | Curved arrow pointing up                                      |
| `[!annotation\|arrow-left]`         | Curved arrow pointing left                                    |
| `[!annotation\|arrow-right]`        | Curved arrow pointing right                                   |
| `[!annotation\|arrow-up align-end]` | Up arrow, annotation aligned to the end of the content column |

Arrows are attached inline to the handwritten title instead of occupying a separate column. Left arrows lead into the text; right arrows trail it; up/down arrows curve from the text toward the neighboring passage. A down-arrow annotation also reduces the gap before the next section. They are decorative hints, not lines connected to arbitrary elements. For a precise reference use a Markdown heading link or an Obsidian note/block link in the text. This keeps meaning intact for mobile layouts, screen readers, and other Markdown readers. Annotations stay inside the article flow, away from the graph/sidebar. Unknown metadata adds no styling and does not remove any text.

Standard callout folding (`[!annotation]- Title`) still works. Annotations are retained in print, with folded bodies expanded. Use an explicit title; otherwise Obsidian/Quartz supplies the label “Annotation.”

## First-view writing animation

On the garden, annotation titles write in once when they first enter view. New annotations automatically use the same bounded timing/stagger, with no per-note configuration. Body paragraphs remain immediately readable. Reduced motion, keyboard focus, Find, print, and anchor navigation leave text fully visible.

Add `static` to the metadata to skip the animation for one annotation:

```markdown
> [!annotation|arrow-down static] Keep this thought still
```

Set `notebookMotion: false` in a note’s frontmatter to skip the motion component’s reveals on that page. Styling and content remain intact. See [Notebook motion](motion/README.md) for details. The prepared Obsidian CSS snippet remains static; matching editor animations require a future Obsidian plugin adapter.

## Portability and ownership

- Your vault's `.md` file is the source of truth. The home annotation is present in both the source vault's `index.md` and the preview checkout's `content/index.md`. Edit its words in Obsidian and use the normal review-and-publish workflow to update the garden. Adding the callout does not itself export or publish the note.
- Obsidian displays custom callouts as ordinary note callouts without extra CSS. A [ready-to-use Obsidian CSS snippet](obsidian/README.md) now provides the same handwritten styling/arrows; it is prepared here but not installed in the vault.
- Other Markdown readers retain the blockquote text and visible callout marker. Removing the garden stylesheet does not remove content.
- `annotations.scss` controls only `[data-callout="annotation"]`. No changes to Quartz's core or installed plugins are required. Keep ObsidianFlavoredMarkdown's `callouts: true` enabled.
- The stylesheet is imported by `quartz/styles/custom.scss`. During upgrades, verify that the callout type, metadata attributes, and title/body classes remain compatible.

The [example note](examples/index.md) is outside `content/`, so a normal garden build does not publish this authoring guide or its examples. Preview it separately with:

```sh
node quartz/bootstrap-cli.mjs build -d site/notebook/examples -o /tmp/quartz-annotation-preview
```

References: [Obsidian callouts](https://help.obsidian.md/callouts), including custom titles, nested Markdown, folding, and CSS customization.
