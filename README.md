# 🪴 Dom's Digital Garden

A place for me to publish my learnings as I dive into topics and document my active projects.

Because I couldn't bring myself to pay [10 dollars a month for Obsidian Publish](https://obsidian.md/publish), I have decided to use a modified version of [quartz](https://quartz.jzhao.xyz/) based on [Brandon Boswell's Tutorial](https://www.youtube.com/watch?v=ITiiuBNVue0&t=364s) which has allowed me to host my own digital garden using GitHub Pages.

I have a single Obsidian Vault with personal and public notes hosted on iCloud Drive (so I have access on my iPhone). I have a script that separates personal from public notes, copies them to the content directory, then builds the site. Then I have another script that will add all of the changed files and push them to GitHub where the GitHub Action will build and deploy my site to GitHub Pages.

🔗 [Dom's Digital Garden 🪴](https://domogami.github.io)

## Prerequisites

- Install [Node Version Manager](https://github.com/nvm-sh/nvm)

## How to develop locally

```shell
nvm use 22
npm install
npx quartz build --serve --verbose
```

