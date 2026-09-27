import type { QuartzEmitterPlugin } from "@quartz-community/types"
export interface HuntOptions {
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
export declare const FlowerHunt: QuartzEmitterPlugin<HuntOptions>
