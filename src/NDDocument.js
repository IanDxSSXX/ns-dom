import { NDNode } from "./nodes/NDNode"
import { NDLayoutNode } from "./nodes/NDLayoutNode"
import { LayoutBase } from "@nativescript/core"
import { NodeMap } from "./nodeMap"

export class NDDocument {
  createElement(tagName) {
    const componentClass = NodeMap[tagName]
    if (!componentClass) throw new Error(`Cannot create Node ${tagName}`)
    const component = new componentClass()
    if (component instanceof LayoutBase) {
      return new NDLayoutNode(tagName, component)
    }
    return new NDNode(tagName, component)
  }
}
