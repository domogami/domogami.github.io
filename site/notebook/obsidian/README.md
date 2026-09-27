# Annotations inside Obsidian

`notebook-annotations.css` is a standalone CSS snippet generated from the same `annotations.scss` used by Quartz. It contains the licensed Caveat font inline, so it needs no font install, network request, or vault attachment. The callout title and decorative arrows are styled; normal notes and headings keep your Obsidian theme. Body text uses the vault's current text font and color. Light/dark annotation colors match the garden accents and can be overridden with `--notebook-annotation-accent`.

To try it, copy `notebook-annotations.css` into your vault's `.obsidian/snippets/` folder and enable it in **Settings → Appearance → CSS snippets**. Keep the accompanying `caveat-OFL.txt` with any redistributed copy. The build command only generates assets; installation is a separate, explicit step.

Write the same Markdown in either environment:

```markdown
> [!annotation|arrow-down] This is the interesting part
> Optional explanation with **emphasis** or [[a linked note]].
```

Obsidian's native callout renderer supplies the structure in Reading view and Live Preview. Source mode intentionally shows raw Markdown. Validate both views in Obsidian after theme changes; browser verification alone does not verify the installed theme.

Rebuild after changing annotation styles:

```sh
node site/notebook/build-obsidian.mjs
```

## Publishing plugin integration

The planned personal Obsidian plugin can ship this generated CSS as part of its root `styles.css`. Reuse Obsidian's native callout rendering; do not replace the Markdown parser or save annotations in plugin settings. An “Insert annotation” command can offer direction/alignment and insert the ordinary callout at the cursor. An annotation display preference can control the styling without changing note contents.

Keep authoring separate from publishing. Inserting or rendering an annotation must never mark a note public, export a file, stage a commit, or push. The publishing command still requires the explicit file-by-file review and confirmation described in the integration plan. This directory contains the styling asset, not an implemented publishing plugin.

## Existing tools

- [Obsidian callouts](https://help.obsidian.md/callouts) and [CSS snippets](https://help.obsidian.md/snippets) already supply the rendering and styling hooks needed here.
- [Callout Manager](https://github.com/eth-p/obsidian-callout-manager) can discover custom callouts from snippets/themes, browse callout types, and configure colors/icons. It is optional; the hand-drawn geometry and arrow metadata remain in our shared stylesheet. It does not provide the publishing confirmation workflow.

There is no additional community-plugin dependency for these annotations.

## Garden toggle with AnuPpuccin

`garden-annotations.css` is a generated integration section for the existing
`garden.css` snippet. Append it to that snippet (replacing the section between
`BEGIN GARDEN ANNOTATIONS` and `END GARDEN ANNOTATIONS` on subsequent updates).
Do not enable this fragment as a second snippet: the Garden toggle should turn
all of these styles on and off together. Keep the rest of `garden.css` intact.

This variant reuses Garden's embedded Caveat font and scopes the shared annotation
styles to Markdown panes, with enough specificity to override AnuPpuccin's default
callout box. It supports all four arrow directions, `align-end`, optional body text,
and native callout folding. Light mode uses terracotta; dark mode uses soft peach.
Obsidian displays these annotations statically; the website's entry animations are
not part of this CSS integration. Raw Source mode remains ordinary Markdown.

Rebuild with the command above. Neither generator writes to the vault or changes
publishing settings, source notes, or AnuPpuccin's theme files.
