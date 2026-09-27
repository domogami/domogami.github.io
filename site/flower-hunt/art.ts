/** Portable hand-drawn flower geometry. Current theme supplies every color. */
export function petalSvg(index: number) {
  const outlines = [
    "M25 46C9 38 6 20 17 11C29 1 44 15 39 29Q35 41 25 46Z",
    "M24 46C9 33 8 16 21 9C36 2 45 19 37 32Q33 42 24 46Z",
    "M24 46C13 40 5 24 14 13C25 0 43 10 40 25Q36 40 24 46Z",
    "M25 46C7 36 9 17 20 10C34 1 45 17 38 31Q33 40 25 46Z",
    "M25 46C13 39 6 22 17 12C30 0 44 13 39 28Q34 41 25 46Z",
  ]
  return `<svg viewBox="0 0 52 58" aria-hidden="true">
    <path class="petal-paper" d="${outlines[index % outlines.length]}"/>
    <path class="petal-vein" d="M25 44Q24 31 29 19M25 35l-7-8M25 29l7-5"/>
    <path class="petal-pencil" d="M15 17Q10 27 17 36"/>
    <path class="petal-spark" d="M43 7v6m-3-3h6M7 40l-3 3m40 0 2 2"/>
  </svg>`
}
export function flowerSvg(count: number, found: string[], ids: string[]) {
  return `<svg viewBox="0 0 120 144" fill="none" aria-hidden="true" class="hunt-flower">
  <path class="hunt-stem" d="M60 127Q65 107 60 80L60 62M61 111Q37 115 32 94Q53 94 61 111M62 98Q84 96 87 77Q67 80 62 98"/>
  ${ids.map((id, i) => `<g class="hunt-petal ${found.includes(id) ? "found" : ""}" data-petal="${i}" style="--petal-index: ${i}" transform="rotate(${(i * 360) / count} 60 48)"><path pathLength="1" d="M60 47C40 35 42 12 57 9C75 6 81 28 60 47Z"/></g>`).join("")}
  <circle class="hunt-heart" cx="60" cy="48" r="10"/>
  <path class="hunt-ground" d="M42 130Q60 133 78 129"/></svg>`
}
