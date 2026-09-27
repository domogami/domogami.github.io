import type { QuartzEmitterPlugin } from "@quartz-community/types"
import type { ContentDetails, ContentIndexMap } from "@quartz-community/content-index"
interface HuntOptions {
  id: string
  hiddenPaths: string[]
  destination: string
  pieces: {
    id: string
    page: string
    label: string
    anchor?: string
    afterParagraph?: number
    message?: string
  }[]
}
declare const FlowerHunt: QuartzEmitterPlugin<HuntOptions>
export { FlowerHunt, type HuntOptions, type ContentDetails, type ContentIndexMap }
