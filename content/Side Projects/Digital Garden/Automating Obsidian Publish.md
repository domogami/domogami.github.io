---
title: Automating Obsidian Publish
---

# Motivation

To make it easier for me to keep my [Digital Garden 🪴](../../Concepts/Digital%20Garden%20%F0%9F%AA%B4.md) website up to date with my personal vault, I needed to automate the publish process to reduce friction between making updates locally and publishing changes. Below are the two scripts I can trigger from [Raycast](../../Software/Tools/Raycast.md) in order to quickly update my website with a simple hotkey and keyword.

 > 
 > \[!note\] Excluded Files
 > To exclude files and directories, check the `.export-ignore` file in the root of the vault. That is respected by obsidian export

 > 
 > \[!warning\] Raycast Does Not Support Input Mid Execution

Because [Raycast](../../Software/Tools/Raycast.md) does not support the ability to prompt the user for inputs mid-execution, I decided to make two separate scripts. The first script exports my obsidian vault, builds the quartz site, and then lists the diffed files to ensure that there are no unintended additions. 

## Obsidian Export

I use [Obsidian Export](https://github.com/zoni/obsidian-export) to copy over non-personal notes from my actual vault to the content folder required by [Quartz](https://quartz.jzhao.xyz/). The export tool gives me more flexibility than copying over files with an `mv` command. It reduces friction for future modifications like if I need to change how links are formatted or if the [Quartz](https://quartz.jzhao.xyz/) frontmatter format changes.

## Build Script

````bash
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Build and Review
# @raycast.mode fullOutput

# Optional parameters:
# @raycast.icon 🛠️
# @raycast.packageName dom.quartz.publish

# Documentation:
# @raycast.description Build the Quartz site and display Git status
# @raycast.author Dominick Lee
# @raycast.authorURL https://github.com/domogami

# Set PATH to include Node.js binaries
export PATH="/Users/dom/.nvm/versions/node/v22.14.0/bin:$PATH"

# Define directories
VAULT_DIR="$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents/Dom's 2nd Brain"
EXPORT_DIR="/Users/dom/Documents/GitHub/obsidian-site/quartz/content"
PUBLIC_DIR="/Users/dom/Documents/GitHub/obsidian-site/quartz/public"
QUARTZ_DIR="/Users/dom/Documents/GitHub/obsidian-site/quartz"
EXPORTER="/Users/dom/Documents/GitHub/obsidian-site/obsidian-export/target/debug/obsidian-export"

# Remove old files
rm -rf "$EXPORT_DIR"/*
rm -rf "$PUBLIC_DIR"/*

# Export Obsidian Vault
"$EXPORTER" --frontmatter=always "$VAULT_DIR" "$EXPORT_DIR"

# Navigate to Quartz directory
cd "$QUARTZ_DIR" || exit 1

# Build Quartz site
if ! npx quartz build; then
  echo "❌ Build failed. Aborting."
  exit 1
fi

# Display git status
echo "📄 Git Status:"
git status
````

## Publish Script

````bash
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Publish Changes
# @raycast.mode fullOutput

# Optional parameters:
# @raycast.icon 🚀
# @raycast.packageName dom.quartz.publish

# Documentation:
# @raycast.description Commit and push changes to the repository
# @raycast.author Dominick Lee
# @raycast.authorURL https://github.com/domogami

# Navigate to Quartz directory
cd /Users/dom/Documents/GitHub/obsidian-site/quartz || exit 1

# Commit and push changes
git add .
date=$(date '+%m-%d-%Y')
git commit -m "✨ [FEAT] $date Update"
git push

echo "✅ Published successfully!"
````
