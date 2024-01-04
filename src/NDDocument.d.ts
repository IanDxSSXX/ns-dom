import { NodeMap } from "./nodeMap"
import { NDElement } from "./NDElement"

type NodeMapType = typeof NodeMap

export interface NDEvent<T> {
  eventName: string
  data: T
}

export type NDDocument = NDElement<() => object> & {
  // ---- Properties ----
  createElement<T extends keyof NodeMapType>(
    tagName: T
  ): NDElement<InstanceType<NodeMapType[T]>>

  createEvent<T>(eventName: string, data: T): NDEvent<T>
}
export declare const NDDocument: new () => NDDocument
