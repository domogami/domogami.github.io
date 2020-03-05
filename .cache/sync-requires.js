// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/Users/domogami/Documents/GitHub/domogami.github.io/.cache/layouts/index.js"))
}

exports.components = {
  "component---src-pages-404-js": preferDefault(require("/Users/domogami/Documents/GitHub/domogami.github.io/src/pages/404.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/domogami/Documents/GitHub/domogami.github.io/src/pages/index.js")),
  "component---src-pages-page-2-js": preferDefault(require("/Users/domogami/Documents/GitHub/domogami.github.io/src/pages/page-2.js"))
}

exports.json = {
  "layout-index.json": require("/Users/domogami/Documents/GitHub/domogami.github.io/.cache/json/layout-index.json"),
  "404.json": require("/Users/domogami/Documents/GitHub/domogami.github.io/.cache/json/404.json"),
  "index.json": require("/Users/domogami/Documents/GitHub/domogami.github.io/.cache/json/index.json"),
  "page-2.json": require("/Users/domogami/Documents/GitHub/domogami.github.io/.cache/json/page-2.json"),
  "404-html.json": require("/Users/domogami/Documents/GitHub/domogami.github.io/.cache/json/404-html.json")
}