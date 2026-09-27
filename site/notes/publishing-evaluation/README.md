# Quartz Syncer evaluation

Evaluated September 24, 2026 for Dom's explicit-review publishing workflow.

**Decision: do not connect the unmodified plugin to the real vault or public repository.** Its publication center is a useful model, but the publisher does not enforce approval of the exact outgoing files and bytes. That is the central requirement here, particularly for journals and attachments.

This is a focused source evaluation with reproducible, isolated probes, not a complete security audit. No real vault, token, GitHub write, plugin installation, site deployment, or Obsidian app session was used. All fixture text and media are synthetic. This directory is outside `content/` and is not garden content.

## Version and method

- [Quartz Syncer 2.0.18](https://github.com/saberzero1/quartz-syncer/releases/tag/2.0.18), released September 18, 2026.
- Pinned source commit: `2ce5047df7d4127107b12c00c61ab21f9f86aa78`.
- Manifest: Obsidian minimum 1.13.0; `isDesktopOnly: false`.
- [check-syncer.mjs](./check-syncer.mjs) extracts original declarations and methods using TypeScript's AST and runs them with synthetic Obsidian services, compilation inputs, and an in-memory remote writer.
- [results.json](./results.json) records ten observations and SHA-256 hashes of the examined source files. Assertions confirm the recorded behavior, including undesirable behavior; passing the script is not a privacy certification.

Reproduce with the pinned source already downloaded and Quartz dependencies installed, from the garden checkout:

```sh
node site/notes/publishing-evaluation/check-syncer.mjs /path/to/quartz-syncer-source
```

The harness only checks the supplied source's manifest version, not its Git provenance. Use the pinned commit above and compare source hashes with `results.json` before interpreting a rerun. The full plugin bundle and rendering pipeline are not executed. In the media probe, the actual link converter, selection state, UI publish controller, and publisher are exercised; the remainder of Markdown compilation and Obsidian metadata resolution are fixture boundaries. Quartz integration stylesheet collection is disabled in the fixture. Remote hash comparison uses an empty remote tree.

## What fits

The [publication center](https://saberzero1.github.io/quartz-syncer-docs/usage-guide) already provides a command/ribbon entry point, new and changed note lists, diff viewing, and publishing selected changes. Source inspection confirms a mobile diff-modal path. These are close to the desired interaction.

The released defaults leave automatic publishing off and do not make all notes publishable. The probes confirm that ordinary unmarked Markdown and notes outside the configured content root are excluded by the fallback candidate collector. A fresh selection tree starts unchecked. If every note fails compilation, the publisher does not call the writer.

## Findings against our requirements

| Requirement                                                  | Observed behavior                                                                                                                                                                         | Assessment                                                                                                  |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Private attachments cannot leave the approved scope          | A synthetic public note embedding `Private/scan.png` produces that asset in the original converter, even with `Public` as the configured root.                                            | The root limits note candidates; it is not a complete attachment boundary.                                  |
| Unchecked files are not uploaded                             | Select the note, then uncheck its automatically selected image in the Advanced tab. The original publish controller and publisher still stage the image.                                  | **Blocker.** Media selection is not passed as an enforced asset allowlist.                                  |
| Approval applies to the reviewed version                     | Read compiled version A for review, change the note and its modification time, then publish. Version B is written without requiring a new approval token.                                 | **Blocker.** Cache invalidation recompiles; it does not invalidate permission to publish.                   |
| Only a strict boolean publication flag qualifies             | Boolean `false` is rejected, but string `"false"` passes `hasPublishFlag`. The fallback candidate collector consequently includes it. The ready extended-cache path queries exact `true`. | Eligibility depends on cache path and YAML type. This alone does not auto-publish the note.                 |
| Bases also require deliberate eligibility                    | With Bases enabled, an unflagged `.base` under the public root is included as a candidate.                                                                                                | Selection is still required, but the note-flag policy does not apply uniformly.                             |
| One approved batch either succeeds or stops                  | When one note compiles and another fails, the first is written and the failure is reported.                                                                                               | Partial publication is supported. Our proposed batch should stop before writing if any required file fails. |
| Device changes do not quietly alter the intended destination | The resolver changes a configured local target to remote on mobile if both are configured, reporting an override.                                                                         | UI disclosure was not tested. Our UI should visibly identify repository and branch before confirmation.     |

Primary source pointers, pinned to the evaluated commit:

- [Attachment conversion](https://github.com/saberzero1/quartz-syncer/blob/2ce5047df7d4127107b12c00c61ab21f9f86aa78/src/compiler/SyncerPageCompiler.ts#L451): resolves embeds through the vault metadata cache and creates deferred asset entries.
- [Publish controller](https://github.com/saberzero1/quartz-syncer/blob/2ce5047df7d4127107b12c00c61ab21f9f86aa78/src/views/PublicationCenter/PublicationCenter.ts#L1135): sends selected new/changed notes to `publishBatch`; media-checkbox selections are not an argument to that call.
- [Publisher](https://github.com/saberzero1/quartz-syncer/blob/2ce5047df7d4127107b12c00c61ab21f9f86aa78/src/publisher/Publisher.ts#L459): stages compiled blobs, recompiles when needed, and permits partial batches.
- [Flag helper](https://github.com/saberzero1/quartz-syncer/blob/2ce5047df7d4127107b12c00c61ab21f9f86aa78/src/publishFile/Validator.ts#L11) and [candidate collection](https://github.com/saberzero1/quartz-syncer/blob/2ce5047df7d4127107b12c00c61ab21f9f86aa78/src/publishFile/PublishCandidates.ts#L61).
- [Mobile target resolution](https://github.com/saberzero1/quartz-syncer/blob/2ce5047df7d4127107b12c00c61ab21f9f86aa78/src/publisher/PublishTargetResolver.ts#L31).

These results do **not** establish that an ordinary link to a private Markdown note publishes that note. Private transclusions, query results, Canvas, Excalidraw, attachment metadata, credentials, conflict handling, retries, and actual iOS operation need separate coverage. Dataview is enabled by default in the reviewed source; a future exporter must review generated content as well as the source Markdown.

## Recommended approach

Build a narrow personal review-and-publish plugin with an independent export engine. Use Syncer's publication center as an interaction reference. A fork is possible, but these fixes affect candidate discovery, compilation, attachment collection, approval state, and the final writer; a wrapper around its existing Publish button would not enforce the boundary.

Keep the Obsidian plugin separate from Quartz itself. It should produce a versioned public export manifest and approved content files. Quartz and its site plugins consume that export; no Quartz core changes are needed. This limits future Quartz upgrade work to the renderer/configuration adapter. Any reused implementation would need its license checked first.

The minimum workflow is:

1. **Review changes** from an Obsidian command, ribbon button, or mobile action. No timer or edit event may publish.
2. Collect only deliberately eligible files. A configured private-folder rule wins over all publication flags. Require strict boolean `publish: true` for Markdown plus an explicit registry for non-Markdown files. New files start private; moving them afterward must not be the protection.
3. Assemble a local snapshot of the final outgoing text and assets. Resolve dependencies only within the allowed export; private embeds block publication instead of being silently copied. Review new, changed, removed, and newly included dependency files. Show image previews, final metadata, and exact outgoing text diffs, including generated query output.
4. **Publish reviewed changes** approves an immutable manifest containing destination, base revision, exact paths, operations, and content hashes. Any relevant note, asset, setting, or dependency change invalidates the review. Send only the reviewed snapshot; never recompile into a different payload after approval.
5. Validate the whole batch and remote base revision before writing. Stop for conflicts or any required-file failure. Keep publishing source and site code changes separate; avoid blanket `git add -A`.
6. Report build/deploy state separately from upload success. Display the deployed revision when verified. Failed or retried operations must not expand the approved set.

The manifest must cover additions, modifications, deletions, attachment metadata, and generated data. Folder exclusions in Quartz and a hidden property panel are insufficient: a private source file in a public Git commit is already exposed, even if the site build omits it. Removing a previously published file also does not erase its Git history.

## Mac and iPhone

A shared plugin is feasible using Obsidian's vault APIs and a remote publishing adapter. [Obsidian mobile does not provide Node or Electron APIs](https://docs.obsidian.md/Plugins/Getting%20started/Mobile%20development), so iPhone cannot run the existing Raycast/shell/Quartz build sequence locally.

For a consistent first version, both devices can review the export locally, explicitly publish the approved source to GitHub, and let Actions build/deploy. The current garden workflow is triggered by pushes to `v5`. This means the source commit exists **before** the build passes; a failed build is not a privacy barrier.

If successful compilation before any public commit is a requirement, use a private staging repository/build service, or a Mac build helper. Only approved bytes may enter staging, and the final public export must match the reviewed manifest. This adds infrastructure and should be a separate phase. Mac-only local preview can remain an optional adapter.

## Acceptance gates before using the real vault

- Strict opt-in plus private-path precedence, including case/Unicode/path normalization and outside-scope dependencies.
- Private note link versus transclusion, private image/PDF, attachment metadata, Bases/Canvas/Excalidraw, and query-derived output fixtures.
- Review invalidation after edits, attachment changes, configuration changes, and remote changes; identical behavior on desktop and mobile.
- Complete batch validation, explicit deletions, conflict handling, interrupted uploads, idempotent retries, and no background bypass.
- Disposable Obsidian vault UI tests on Mac and actual iPhone, followed by a throwaway repository deployment using only synthetic notes.

The custom plugin is scoped here, not implemented or installed. This evaluation does not enable Bases or change Mermaid settings; those remain separate site-rendering work.
