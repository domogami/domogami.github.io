---
title: My Dotfiles
tags:
  - BlogPost
---

# What are Dotfiles?

Dotfiles are config files that start with a dot (period character) and are hidden on most operating systems by default. They store the user's configuration and settings and these files can be saved and stored to quickly import your custom settings when you transition to a new computer. Examples of common dotfiles include `.zshrc`,  `.vimrc`, and on [MacOS](../Software/MacOS.md) there is generally a `.config/` directory that stores even more config files for different software applications.

# My Dotfiles

I have spent a significant amount of time optimizing my dotfiles which can be found [here](https://github.com/domogami/.dotfiles), but I have also changed my mind a few times on how I manage them. I originally used an open source GO project called [Chezmoi](https://www.chezmoi.io/) but I found that I did not like their CLI and I didn't like the process of editing my dotfiles using their CLI. Instead, I use [DotBot](https://github.com/anishathalye/dotbot) which is far easier to setup and in my option has an easier editing experience.

## Key Dotfiles

The most important settings that I want to persist from machine to machine are my `.zshrc` file which customizes my shell with nice things like appending necessary package locations to my $PATH, creating aliases for quick execution of commands, and setting my default editor *Neovim*. I also have an `aerospace.toml` file that lives in the `~/.config/` directory. This config holds my keybindings for [Aerospace](https://github.com/nikitabobko/AeroSpace) which I use as my primary [Window Manager](Window%20Manager.md).
