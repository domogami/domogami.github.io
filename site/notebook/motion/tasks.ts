// Decorate the rendered task text, never its Markdown or checkbox state.
// Leave nested lists and other block content outside the strike-through span.
export function prepareTasks(): Array<{ input: HTMLInputElement; label: HTMLElement }> {
  const tasks: Array<{ input: HTMLInputElement; label: HTMLElement }> = []
  for (const input of document.querySelectorAll<HTMLInputElement>(
    'article li > input[type="checkbox"]',
  )) {
    const item = input.parentElement!
    let label = item.querySelector<HTMLElement>(":scope > .notebook-task-text")
    if (!label) {
      const nodes: ChildNode[] = []
      for (let node = input.nextSibling; node; node = node.nextSibling) {
        if (node instanceof HTMLElement && getComputedStyle(node).display !== "inline") break
        nodes.push(node)
      }
      if (!nodes.length) continue
      label = document.createElement("span")
      label.className = "notebook-task-text"
      input.after(label)
      label.append(...nodes)
      item.classList.add("notebook-task")
      // Preserve existing explicit names; improve the otherwise unnamed native control.
      if (
        !input.hasAttribute("aria-label") &&
        !input.hasAttribute("aria-labelledby") &&
        !input.labels?.length
      ) {
        let id = tasks.length
        while (document.getElementById(`notebook-task-${id}`)) id++
        label.id = `notebook-task-${id}`
        input.setAttribute("aria-labelledby", label.id)
      }
    }
    tasks.push({ input, label })
  }
  return tasks
}
