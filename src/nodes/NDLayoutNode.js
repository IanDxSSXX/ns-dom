import { NDNode } from "./NDNode"

export class NDLayoutNode extends NDNode {
  #children = []

  // --- Manipulation methods
  appendChild(child) {
    child._parentNode = this
    this.#children.push(child)
    this.nsComponent.addChild(child.nsComponent)
  }

  insertBefore(newChild, refChild) {
    const index = this.#children.indexOf(refChild)
    if (index === -1) return
    newChild._parentNode = this
    this.#children.splice(index, 0, newChild)
    this.nsComponent.insertChild(newChild.nsComponent, index)
  }

  replaceChild(newChild, oldChild) {
    const index = this.#children.indexOf(oldChild)
    if (index === -1) return
    newChild._parentNode = this
    oldChild._parentNode = undefined
    this.#children.splice(index, 1, newChild)
    this.nsComponent.removeChild(oldChild.nsComponent)
    this.nsComponent.insertChild(newChild.nsComponent, index)
  }

  removeChild(child) {
    const index = this.#children.indexOf(child)
    if (index === -1) return
    child._parentNode = undefined
    this.#children.splice(index, 1)
    this.nsComponent.removeChild(child.nsComponent)
  }

  removeAllChildren() {
    this.#children = []
    this.nsComponent.removeChildren()
  }

  // ---- Child Node
  get firstChild() {
    return this.#children[0]
  }

  get lastChild() {
    return this.#children[this.#children.length - 1]
  }

  get childNodes() {
    return this.#children
  }

  contains(node) {
    return this.#children.includes(node)
  }

  hasChildNodes() {
    return this.#children.length > 0
  }
}
