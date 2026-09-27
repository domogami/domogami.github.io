# 🪴 Dom's Digital Garden

A place for me to publish my learnings as I dive into topics and document my active projects.

Because I couldn't bring myself to pay [10 dollars a month for Obsidian Publish](https://obsidian.md/publish), I have decided to use a modified version of [quartz](https://quartz.jzhao.xyz/) based on [Brandon Boswell's Tutorial](https://www.youtube.com/watch?v=ITiiuBNVue0&t=364s) which has allowed me to host my own digital garden using GitHub Pages.

I have a single Obsidian Vault with personal and public notes hosted on iCloud Drive (so I have access on my iPhone). I originally used separate scripts to export, review, and publish my notes. I'm now moving that workflow into my personal fork of Quartz Syncer so I can review the files and changes in Obsidian before explicitly publishing them. Private folders and excluded notes stay out of the export. The plugin is configured to send reviewed content to the `content/` directory on the `v5` branch, where GitHub Actions builds and deploys the site to GitHub Pages.

The site now runs on **Quartz 5.0.0**, with a notebook-style redesign to match [dominicklee.net](https://dominicklee.net). The personal styles and components live in `site/notebook/`, separate from Quartz core to make future upgrades easier.

🔗 [Dom's Digital Garden 🪴](https://domogami.github.io)

## Prerequisites

- Install [Node Version Manager](https://github.com/nvm-sh/nvm).
- Use the `v5` branch. `Quartz4` is the older site branch.
- Quartz 5 requires Node 22 or newer and npm 10.9.2 or newer. The commands below use the Node version pinned in `.node-version`, matching GitHub Actions.

## How to develop locally

From the `v5` checkout:

```shell
nvm install "$(cat .node-version)"
nvm use "$(cat .node-version)"
npm ci
npx quartz plugin install --from-config
npm run install-plugins
npm run site:preview -- --port 8080
```

Open [localhost:8080](http://localhost:8080). For a production build without the preview server, run `npm run site:build`. These site commands keep dates in the `America/Los_Angeles` time zone, both locally and in GitHub Actions.

If `npm ci` fails while compiling `sharp` and mentions `libvips` or `node-gyp`, your machine is probably picking up a global `libvips` install. In that case, rerun the install with:

```shell
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm ci
```

After editing the custom components or browser scripts, rebuild their local plugin packages with `node site/notebook/build.mjs` and restart the preview. See the [notebook layer guide](site/notebook/README.md) for checks and upgrade notes.

## Publishing

Push site code changes to `v5`; GitHub Actions builds and deploys them. For notes, review and explicitly approve the changes in Quartz Syncer before publishing to `v5` → `content`. Building locally does not publish anything, and a successful push still needs a successful Pages deployment before the live site updates.
