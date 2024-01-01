import { NDNode } from "./nodes/NDNode"
import { NDLayoutNode } from "./nodes/NDLayoutNode"
import { NodeMap } from "./nodeMap"
import { type LayoutBase } from "@nativescript/core"

type NodeReturnType<T extends keyof typeof NodeMap> = InstanceType<
  (typeof NodeMap)[T]
> extends LayoutBase
  ? NDLayoutNode<InstanceType<(typeof NodeMap)[T]>>
  : NDNode<InstanceType<(typeof NodeMap)[T]>>

export class NDDocument {
  createElement<T extends keyof typeof NodeMap>(tagName: T): NodeReturnType<T>
}
