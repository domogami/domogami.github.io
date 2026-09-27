/**
 * Isolated source probes for Quartz Syncer 2.0.18, commit
 * 2ce5047df7d4127107b12c00c61ab21f9f86aa78. No plugin installation or network.
 * Run from this Quartz checkout:
 * node site/notes/publishing-evaluation/check-syncer.mjs /path/to/pinned/source
 *
 * Executes original declarations/methods extracted with the TypeScript AST.
 * Obsidian, compilation inputs and the remote backend are synthetic. This is
 * NOT an end-to-end Obsidian, authentication, renderer or deployment test.
 * Passing assertions reproduce behavior; they do not certify privacy safety.
 */
import fs from "node:fs"
import path from "node:path"
import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { createRequire } from "node:module"
const require = createRequire(import.meta.url)
const ts = require("typescript")
const root = process.argv[2]
if (!root) throw new Error("Provide the pinned source directory")
assert.equal(JSON.parse(fs.readFileSync(path.join(root, "manifest.json"))).version, "2.0.18")
const hashes = {}
function source(file) {
  const raw = fs.readFileSync(path.join(root, file), "utf8")
  hashes[file] = createHash("sha256").update(raw).digest("hex")
  return ts.createSourceFile(file, raw, ts.ScriptTarget.Latest, true)
}
function evaluate(code, bindings, name) {
  const js = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText
  const exports = {}
  new Function("exports", ...Object.keys(bindings), js)(exports, ...Object.values(bindings))
  return exports[name]
}
function declarations(file, names, bindings, result = names[0]) {
  const ast = source(file)
  const code = ast.statements
    .filter(
      (n) =>
        names.includes(n.name?.text) ||
        (ts.isVariableStatement(n) &&
          n.declarationList.declarations.some((d) => names.includes(d.name.getText(ast)))),
    )
    .map((n) => n.getText(ast))
    .join("\n")
  return evaluate(code, bindings, result)
}
function members(file, className, names, bindings, extra = "") {
  const ast = source(file)
  const cls = ast.statements.find((n) => ts.isClassDeclaration(n) && n.name.text === className)
  const code = cls.members
    .filter((n) => names.includes(n.name?.getText(ast)))
    .map((n) => n.getText(ast))
    .join("\n")
  assert.equal(cls.members.filter((n) => names.includes(n.name?.getText(ast))).length, names.length)
  return evaluate(`export class ${className} { ${extra}\n${code} }`, bindings, className)
}
const utilsFile = "src/utils/utils.ts"
const vaultScope = declarations(utilsFile, ["vaultScope"], {})
const isWithinVaultPath = declarations(utilsFile, ["isWithinVaultPath"], { vaultScope })
const getSpecialFileType = declarations(
  "src/publishFile/PublishFile.ts",
  ["getSpecialFileType"],
  {},
)
const hasPublishFlag = declarations("src/publishFile/Validator.ts", ["hasPublishFlag"], {})
const collectCandidatePaths = declarations(
  "src/publishFile/PublishCandidates.ts",
  ["isEnabledSpecialFile", "collectFromMetadataCache", "collectCandidatePaths"],
  { getSpecialFileType, hasPublishFlag, isWithinVaultPath },
  "collectCandidatePaths",
)
const TreeState = declarations("src/views/PublicationCenter/TreeState.ts", ["TreeState"], {})
const PathMapper = declarations("src/git/PathMapper.ts", ["PathMapper"], {})
const Platform = { isMobileApp: false }
const DynamicCompilationSession = declarations(
  "src/services/DynamicCompilationSession.ts",
  ["DESKTOP_SESSION_LIMIT", "MOBILE_SESSION_LIMIT", "criteriaMatch", "DynamicCompilationSession"],
  { Platform },
  "DynamicCompilationSession",
)
const buildRemoteIndex = declarations(
  "src/publisher/PublishStatusManager.ts",
  ["buildRemoteIndex"],
  {},
)
const arrayBufferToBase64 = (data) => Buffer.from(data).toString("base64")
const Publisher = declarations("src/publisher/Publisher.ts", ["Publisher"], {
  PathMapper,
  DynamicCompilationSession,
  buildRemoteIndex,
  arrayBufferToBase64,
  generateBlobHash: async (data) => createHash("sha1").update(data).digest("hex"),
})
const PublicationCenter = members(
  "src/views/PublicationCenter/PublicationCenter.ts",
  "PublicationCenter",
  ["handlePublish"],
  { Notice: class {}, arrayBufferToBase64 },
)
const Compiler = members(
  "src/compiler/SyncerPageCompiler.ts",
  "SyncerPageCompiler",
  ["convertFileLinks", "stripVaultPathFromLinks", "collectGeneratedAssets"],
  {
    vaultScope,
    getLinkpath: (link) => link.split("#")[0],
    escapeRegExp: (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  },
  'static ASSET_EXTENSIONS = new Set(["png"]);',
)

const observations = []
function record(test, requirementMet, observed) {
  observations.push({ test, requirementMet, observed })
}
assert.equal(hasPublishFlag("publish", {}), false)
assert.equal(hasPublishFlag("publish", { publish: false }), false)
assert.equal(hasPublishFlag("publish", { publish: "false" }), true)
record(
  "Strict publication flag",
  false,
  'Boolean false is excluded; string "false" passes the flag helper.',
)

const makeFile = (p, frontmatter = {}) => ({
  path: p,
  name: path.basename(p),
  extension: p.split(".").at(-1),
  stat: { mtime: 1 },
  frontmatter,
})
const inventory = [
  makeFile("Public/approved.md", { publish: true }),
  makeFile("Public/unmarked.md"),
  makeFile("Public/string-false.md", { publish: "false" }),
  makeFile("Private/journal.md", { publish: true }),
  makeFile("Public-old/wrong-scope.md", { publish: true }),
  makeFile("Public/collection.base"),
]
const settings = {
  vaultPath: "Public",
  contentFolder: "content",
  gitBranch: "v5",
  publishFrontmatterKey: "publish",
  allNotesPublishableByDefault: false,
  useBases: true,
  useCache: false,
  autoCleanOrphanedMedia: false,
}
const candidateApp = {
  vault: {
    getMarkdownFiles: () => inventory.filter((f) => f.extension === "md"),
    getFiles: () => inventory,
  },
  metadataCache: { getFileCache: (f) => ({ frontmatter: f.frontmatter }) },
}
const candidates = [...collectCandidatePaths(candidateApp, {}, settings)]
assert.deepEqual(candidates, [
  "Public/approved.md",
  "Public/string-false.md",
  "Public/collection.base",
])
record(
  "Note scope and default exclusion",
  true,
  "Unmarked Markdown and notes outside Public/ are excluded in the fallback path.",
)
record(
  "Bases require explicit note flag",
  false,
  "Enabling Bases includes an unflagged .base as a candidate, still subject to selection.",
)

const notePath = "Public/approved.md",
  noteKey = "approved.md",
  imagePath = "Private/scan.png"
const image = makeFile(imagePath)
const tree = new TreeState()
tree.setEntries([
  { path: noteKey, category: "unpublished" },
  { path: imagePath, category: "media-linked" },
])
assert.equal(tree.getSelectedFiles().length, 0)
record("New entries start unchecked", true, "No new entries selected in a fresh TreeState.")
tree.setLinkedMediaFiles(new Map([[noteKey, new Set([imagePath])]]))
tree.selectFile(noteKey)
assert(tree.selectedFiles.has(imagePath))
tree.tab = "advanced"
tree.toggleFile(imagePath)
assert(!tree.selectedFiles.has(imagePath))

const compiler = new Compiler()
compiler.settings = settings
compiler.metadataCache = {
  getCache: () => ({ embeds: [{ link: imagePath, original: `![[${imagePath}]]` }] }),
  getFirstLinkpathDest: () => image,
  fileToLinktext: (f) => f.path,
}
const [converted, blobs] = await compiler.convertFileLinks({
  getPath: () => notePath,
  hasDynamicContent: false,
})(`![[${imagePath}]]`)
assert.equal(blobs[0].vaultPath, imagePath)
record(
  "Embedded media stays within public root",
  false,
  "The original converter resolves Private/scan.png from a note scoped to Public/.",
)

let currentText = converted
const note = {
  file: makeFile(notePath),
  getVaultPath: () => "approved.md",
  getPath: () => notePath,
  compile: async () => ({ getCompiledFile: () => [currentText, { blobs }] }),
}
const writes = []
const app = {
  vault: {
    getFileByPath: (p) => (p === imagePath ? image : undefined),
    readBinary: async () => new TextEncoder().encode("SYNTHETIC PRIVATE IMAGE").buffer,
  },
}
const backend = {
  getCachedTree: async () => [],
  writeFiles: async (branch, message, changes) => {
    writes.push(structuredClone(changes))
    return { sha: "fixture-commit" }
  },
  invalidateTreeCache() {},
  refreshTreeCache: async () => {},
}
const plugin = {
  settings,
  quartzCompatibility: { supportsV5Management: async () => false },
  statusCache: { patchPublished() {} },
}
const dataStore = {
  loadLocalFile: async () => null,
  getValidityCriteria: (mtime) => ({
    mtime,
    version: 1,
    dataviewRevision: 0,
    datacoreRevision: 0,
    settingsFingerprint: "fixture",
    detectorVersion: 1,
  }),
}
const publisher = new Publisher(app, plugin, backend, {}, dataStore)
// Exercise the original UI controller too; tree keys use paths relative to
// the configured public root, as PublishFile.getVaultPath does.
const ui = new PublicationCenter()
Object.assign(ui, {
  app,
  _plugin: { getPublisher: () => publisher },
  treeState: tree,
  status: { unpublished: [note], changed: [] },
  setOperating() {},
  updateProgress() {},
  loadStatus: async () => {},
})
await ui.handlePublish()
assert.equal(writes.length, 1)
assert(writes[0].some((f) => f.path === "content/Private/scan.png"))
record(
  "Unchecking attachment prevents upload",
  false,
  "Original UI controller and publisher still stage the unchecked private-path image.",
)

publisher.beginDynamicSession()
currentText = "Reviewed version A"
assert.equal(await publisher.getLocalCompiledContent(note), "Reviewed version A")
currentText = "Unreviewed version B"
note.file.stat.mtime++
const result = await publisher.publishBatch([note])
assert.equal(result.success, true)
assert.equal(writes.at(-1)[0].content, "Unreviewed version B")
record(
  "Edits after review require new approval",
  false,
  "Review helper returns A; after mtime changes, publisher sends B without an approval token.",
)

const broken = {
  ...note,
  getVaultPath: () => "Public/broken.md",
  file: makeFile("Public/broken.md"),
  compile: async () => {
    throw new Error("synthetic compilation failure")
  },
}
const partial = await publisher.publishBatch([note, broken])
assert.equal(partial.success, true)
assert.equal(partial.filesPublished, 1)
assert.equal(partial.failures.length, 1)
record(
  "Whole reviewed batch stops on failure",
  false,
  "One note fails compilation; the other is still written with a reported partial failure.",
)

const beforeFailedBatch = writes.length
const failed = await publisher.publishBatch([broken])
assert.equal(failed.success, false)
assert.equal(writes.length, beforeFailedBatch)
record(
  "Entirely failed compilation writes nothing",
  true,
  "A batch with only the failing fixture does not call the remote writer.",
)

const resolvePublishTarget = declarations(
  "src/publisher/PublishTargetResolver.ts",
  ["resolvePublishTarget"],
  { Platform },
)
Platform.isMobileApp = true
Platform.isDesktopApp = false
const mobileTarget = resolvePublishTarget({
  publishTarget: "local",
  quartzRepoPath: "/fake/repo",
  gitRemoteUrl: "https://example.invalid/repo",
})
assert.equal(mobileTarget.effective, "remote")
assert.equal(mobileTarget.overridden, true)
record(
  "Mobile destination is explicit",
  null,
  "A configured local target resolves to remote on mobile when both exist; resolver reports the override. UI disclosure not tested.",
)

console.log(
  JSON.stringify(
    {
      plugin: "Quartz Syncer",
      version: "2.0.18",
      commit: "2ce5047df7d4127107b12c00c61ab21f9f86aa78",
      method:
        "Isolated original declarations with synthetic Obsidian/compiler/backend boundaries; no remote writes",
      observations,
      sourceSha256: hashes,
    },
    null,
    2,
  ),
)
