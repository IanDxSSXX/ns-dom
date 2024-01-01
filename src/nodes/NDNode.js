import { document } from ".."

export class NDNode {
  tagName
  nsComponent
  _parentNode

  constructor(tagName, nsComponent) {
    this.tagName = tagName
    this.nsComponent = nsComponent
  }

  // ---- DOM API ----
  // ---- Text Content
  get textContent() {
    return this.nsComponent.text
  }

  set textContent(value) {
    this.nsComponent.text = value
  }

  get innerText() {
    return this.textContent
  }

  set innerText(value) {
    this.textContent = value
  }

  // ---- Node
  get parentNode() {
    return this._parentNode
  }

  get nextSibling() {
    if (!this._parentNode) return null
    const siblings = this._parentNode.childNodes
    const index = siblings.indexOf(this)
    return siblings[index + 1]
  }

  get previousSibling() {
    if (!this._parentNode) return null
    const siblings = this._parentNode.childNodes
    const index = siblings.indexOf(this)
    return siblings[index - 1]
  }

  cloneNode(deep) {
    const newNode = document.createElement(this.tagName)
    newNode.textContent = this.textContent
    if (deep && this.childNodes) {
      this.childNodes.forEach(child => {
        newNode.appendChild(child.cloneNode(true))
      })
    }
    return newNode
  }
}
