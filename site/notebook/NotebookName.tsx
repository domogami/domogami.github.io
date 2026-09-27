import { nameGlyphs } from "./nameGlyphs"

// The header renders once per page. Prefix the SVG clip ID to avoid collisions
// with note diagrams. Geometry comes from the portfolio's Poppins name study.
export function NotebookName() {
  return (
    <svg class="notebook-name" viewBox="0 14 418 80" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="notebook-brand-name-ink" clipPathUnits="userSpaceOnUse">
          <polygon class="notebook-name-sweep" points="-600,-10 540,-10 480,118 -600,118" />
        </clipPath>
      </defs>
      {nameGlyphs.map((glyph) => (
        <g>
          <path d={glyph.d} fill="currentColor" clipPath="url(#notebook-brand-name-ink)" />
          <path
            class="notebook-name-outline"
            d={glyph.d}
            fill="none"
            stroke="currentColor"
            stroke-width="0.9"
            pathLength="1"
            opacity="0"
          />
        </g>
      ))}
    </svg>
  )
}
