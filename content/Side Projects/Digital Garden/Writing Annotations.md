---
title: Writing Annotations
description: A copy-and-paste guide to handwritten notes, arrows, folding, and animation in the garden.
---

Annotations are ordinary Markdown callouts. Their words live in the note, while the garden adds the handwritten font, optional arrow, and writing animation. There is no separate annotation editor or hidden store of text.

Each example below includes the Markdown to copy and the rendered result.

## Quick start

```markdown
> [!annotation|arrow-down] This is the interesting part

## Your next section

Your writing goes here.
```

Start the line with `>`, use `annotation` as the callout type, and write your own title after the closing bracket. The optional settings go after `|`, separated by spaces. Use only **one arrow direction** per annotation.

Place the annotation immediately before or after the passage it refers to. Moving that block of Markdown moves the annotation. Leave a blank line without `>` before returning to normal page content.

## 1. A simple handwritten note

Use this for a short aside or a little personality, without pointing anywhere.

```markdown
> [!annotation] Still figuring this one out
```

> [!annotation] Still figuring this one out

Give every annotation a title; otherwise the renderer supplies the generic title “Annotation.”

## 2. Point down to what comes next

Use `arrow-down` before a heading, paragraph, or list. The garden tightens the gap so the arrow sits closer to the next passage.

```markdown
> [!annotation|arrow-down] Start with one small idea

A note does not need to be finished to be worth keeping.
```

> [!annotation|arrow-down] Start with one small idea

A note does not need to be finished to be worth keeping.

## 3. Point back up

Use `arrow-up` after the passage you want to comment on.

```markdown
Writing things down gives me room to think about them differently.

> [!annotation|arrow-up] This is why I keep a garden
```

Writing things down gives me room to think about them differently.

> [!annotation|arrow-up] This is why I keep a garden

## 4. Point right

Use `arrow-right` for a small directional flourish. The arrow follows the title. It does not automatically connect to another object or create a second column.

```markdown
> [!annotation|arrow-right] Another direction to explore
```

> [!annotation|arrow-right] Another direction to explore

## 5. Point left

Use `arrow-left` when the arrow should lead into the title instead. It appears before the handwritten words.

```markdown
> [!annotation|arrow-left] Back to the original idea
```

> [!annotation|arrow-left] Back to the original idea

## 6. Align an annotation to the right

Add `align-end` to move the whole annotation to the end of the content column—the right side in this garden. It can be combined with any one arrow direction, or used alone. This does not put the annotation in the sidebar or make text wrap around it.

```markdown
> [!annotation|arrow-up align-end] A thought about what came before

> [!annotation|align-end] A quiet note at the edge
```

> [!annotation|arrow-up align-end] A thought about what came before

> [!annotation|align-end] A quiet note at the edge

## 7. Add a longer explanation

Continue the blockquote on following lines. Only the title is handwritten; the body keeps the regular reading font. Use `>` on an otherwise empty line to separate paragraphs inside the annotation.

```markdown
> [!annotation|arrow-up] A little more context
> The body supports **bold**, _italics_, and `inline code`.
>
> It also supports [a heading link](#quick-start) or [[Notetaking Tech Stack]].
```

> [!annotation|arrow-up] A little more context
> The body supports **bold**, _italics_, and `inline code`.
>
> It also supports [a heading link](#quick-start) or [[Notetaking Tech Stack]].

Use a real link when the reader needs to know exactly which heading or note you mean. The arrows are decorative cues: they travel with the title and do not attach themselves to a specific paragraph, image, graph node, or arbitrary point on the page.

## 8. Make the explanation foldable

Put `-` immediately after the closing bracket to start collapsed. The title stays visible; clicking it reveals the body.

```markdown
> [!annotation]- A detail for the curious
> This extra explanation starts folded away.
```

> [!annotation]- A detail for the curious
> This extra explanation starts folded away.

Use `+` instead to start expanded but still allow folding. Arrow and alignment settings work with folding too.

```markdown
> [!annotation|arrow-up align-end]+ Keep the context handy
> This starts open. Click the title to collapse it.
```

> [!annotation|arrow-up align-end]+ Keep the context handy
> This starts open. Click the title to collapse it.

## 9. Keep one annotation still

Titles normally write in the first time they enter view on the garden. Nearby annotations share a short stagger automatically; there are no timing settings to add to each note. The body remains immediately readable.

Add `static` to skip the writing animation for one annotation while keeping its styling and arrow.

```markdown
> [!annotation|arrow-down static] No animation on this one
```

> [!annotation|arrow-down static] No animation on this one

This annotation appears fully written from the start.

## 10. Turn off notebook reveals for a whole note

Add `notebookMotion: false` to the note's existing frontmatter. Frontmatter belongs at the very top of the file, between `---` lines; do not add a second frontmatter block if the note already has one.

```yaml
---
title: A quieter note
notebookMotion: false
---
```

This skips the notebook motion component's reveals for that page. It keeps annotation text, arrows, and styling intact; it is not a switch for every animation elsewhere on the site. This guide leaves motion enabled so the examples can demonstrate it.

The garden also respects the device's reduced-motion preference and keeps annotation text visible for printing, keyboard focus, Find, and heading-link navigation.

## Writing in Obsidian

Use exactly the same Markdown in Obsidian. Without our styling snippet, it appears as a normal custom callout. The prepared `notebook-annotations.css` snippet supplies the handwritten font and arrows:

1. Copy the snippet into the vault's `.obsidian/snippets/` folder.
2. Enable it in **Settings → Appearance → CSS snippets**.
3. View the note in Reading view or Live Preview. Source mode shows the Markdown syntax.

The snippet is maintained in the Quartz project at `site/notebook/obsidian/notebook-annotations.css`. It is a static visual treatment; the garden's writing animation is not currently part of the Obsidian snippet. Its appearance still needs checking with the installed Obsidian theme.

Annotations do not change publishing permissions. Adding one does not mark a note public or bypass the review-and-publish process. Keep the Markdown in the source vault so the next export preserves it.

## Copyable recipe

```markdown
> [!annotation|arrow-down] A little signpost

## The idea

Write the main thought here.

> [!annotation|arrow-up align-end] One more thing
> Add context or [[Notetaking Tech Stack|a related note]].

> [!annotation|static]- Optional background
> Extra detail that starts collapsed and does not animate.
```

Keep titles short, use arrows where they help the reader, and let the main writing carry the explanation. All the words remain in this one Markdown file even without the garden's styling.
