# Notebook graph adapter

`NotebookGraph.tsx` wraps `@quartz-community/graph` **0.1.0** as a local Quartz
component. The installed package and Quartz core remain unchanged. Its markup,
graph data, visited-note colors, links, dragging, zoom, modal, and lifecycle still
come from the community plugin.

## Tuning

`quartz.config.yaml` holds the standard graph options:

- Local depth 2 includes direct links/backlinks and one more layer of neighbors.
- Global depth -1 includes the whole published index; unlinked notes stay visible.
- Radial mode is off: it forced disconnected notes into the huge outer ring.
- Local/global link distances are 40/60, with a little less local repulsion.
- `scale` now multiplies the initial fit. Text stays a constant screen size.

`enhance.ts` adds gentle x/y attraction, deterministic starting positions and an
initial settled fit with padding. Unlike D3's center force (which translates the
whole graph), x/y forces also keep separate components near one another. No
notes or tags are discarded. A theme-aware HTML tooltip above the canvas replaces
the overlapping Pixi labels. Long titles wrap, labels stay inside the panel, and
pointer events pass through to the original graph. Labels track nodes during zoom
and disappear on pointer exit, dragging, or teardown. Styles live in `graph.scss`.

## Upgrade boundary

The upstream package does not expose a renderer hook or a label-background option.
This adapter therefore uses **four explicitly checked locations in the upstream
browser script**: slug normalization, after graph construction, after zoom setup,
and during cleanup. Each must match exactly once. Slug normalization makes a
folder's `/index` entry, trailing-slash URL, and slashless links resolve to the
same graph node; otherwise its existing connections are missed. A changed upstream script
throws during the site build rather than silently shipping a broken graph.

This is deliberately a small, documented compatibility adapter, not a promise of
zero maintenance. On a graph package update, review these four integration points
and run the checks below. Prefer replacing this adapter with an official renderer
hook or label feature when available. To revert to the standard graph, change its
YAML source back to `@quartz-community/graph`; the options remain compatible.

## Build and verify

Run `node site/notebook/build.mjs`, then the notebook and Quartz TypeScript checks
and a site build. Restart the preview after changing bundled component scripts.
Keep generated `plugins/notebook-graph` files with the source.

Check the sidebar and global graph in Light/Dark/Hybrid, hover both a short and long
title, zoom in/out, drag a node, click through to a note, and repeatedly open/close
the global graph. Check narrow screens and an isolated note. There must be one
canvas/tooltip per active graph and no leftover global tooltip after closing.
