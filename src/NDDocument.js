import { ViewBase } from "@nativescript/core"
import { NDElementFactory } from "./NDElement"
import { NodeMap } from "./nodeMap"

export class NDDocument extends NDElementFactory(ViewBase) {
  createElement(tagName) {
    const componentClass = NodeMap[tagName]
    if (!componentClass) throw new Error(`Cannot create Node ${tagName}`)
    const NDElement = NDElementFactory(componentClass)
    return new NDElement(tagName, this)
  }

  createEvent(eventName, data) {
    return {
      eventName,
      data,
    }
  }
}
