import { motion } from "./config"
import type { Animate } from "./controller"

/** Preserve whitespace, inline formatting, links, emoji clusters, and the original text. */
export function prepareInk(element: HTMLElement): HTMLElement[] {
  if (element.dataset.notebookInk)
    return [...element.querySelectorAll<HTMLElement>(".notebook-ink-letter")]
  element.dataset.notebookInk = "true"
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" })
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    if (!node.parentElement?.closest("code, pre, svg, [aria-hidden='true']")) nodes.push(node)
  }
  const count = nodes.reduce((total, node) => total + [...segmenter.segment(node.data)].length, 0)
  if (count > motion.maxLetters) return [] // Long content stays static rather than creating a long wait.
  const letters: HTMLElement[] = []
  for (const node of nodes) {
    const fragment = document.createDocumentFragment()
    for (const token of node.data.split(/(\s+)/u)) {
      if (!token || /^\s+$/u.test(token)) {
        fragment.append(token)
        continue
      }
      const word = document.createElement("span")
      word.className = "notebook-ink-word"
      const graphemes = [...segmenter.segment(token)]
      if (graphemes.length > 24) word.classList.add("notebook-ink-word-long")
      for (const { segment } of graphemes) {
        const letter = document.createElement("span")
        letter.className = "notebook-ink-letter"
        letter.textContent = segment
        word.append(letter)
        letters.push(letter)
      }
      fragment.append(word)
    }
    node.replaceWith(fragment)
  }
  return letters
}

export function writeInk(letters: HTMLElement[], delay: number, animate: Animate) {
  const step = Math.min(
    motion.inkStep,
    (motion.inkBudget - motion.inkStroke) / Math.max(1, letters.length - 1),
  )
  letters.forEach((letter, index) =>
    animate(letter, [{ opacity: 0 }, { opacity: 1 }], {
      duration: motion.inkStroke,
      delay: delay + index * step,
      easing: "linear",
    }),
  )
}
