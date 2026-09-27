---
publish: true
title: Node Dependency Issues
created: 2022-11-12T23:26:43.000Z
modified: 2025-06-09T01:38:14.299Z
---

## Basic Remedy

If you are ever having strange node dependency issues, this is what helped me

```shell
rm -rf node_modules
rm package-lock.json yarn.lock
npm cache clear --force
npm install
```

## Node Version Manager

I often have issues related to multiple projects using multiple versions of node. To make switching between Node Version 14 to Node Version 18 and then to 21, I use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to quickly switch my version of Node.js

```shell
nvm use 22
```
