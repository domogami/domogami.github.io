/** Shared timing budget. Delays restart for each viewport batch, never for the whole page. */
export const motion = {
  stagger: 65,
  maxStagger: 195,
  entrance: 220,
  taskStrike: 280,
  outline: 600,
  fill: 240,
  labelStart: 840,
  inkStep: 22,
  inkStroke: 65,
  inkBudget: 650,
  maxLetters: 160,
} as const

export const targets = {
  banner: ".graph > h3",
  annotation: 'article .callout[data-callout="annotation"] > .callout-title > .callout-title-inner',
  entrance: ".center > .page-header",
  optOut: '[data-notebook-motion="off"], [data-callout-metadata~="static"]',
} as const
