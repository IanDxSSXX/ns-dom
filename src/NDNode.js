import { document } from "."

export function NDNodeFactory(NSComponent) {
  class NDNode extends NSComponent {
    tagName
    #ownerDocument
    #children = []
    #parentNode = null

    _setParentNode(parentNode) {
      this.#parentNode = parentNode
    }

    constructor(tagName, ownerDocument) {
      super()
      this.tagName = tagName
      this.#ownerDocument = ownerDocument
    }

    // ---- Properties ----
    // ---- [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Node)
    get childNodes() {
      return this.#children
    }

    get firstChild() {
      return this.#children[0]
    }

    get isConnected() {
      return !!this.#parentNode
    }

    get lastChild() {
      return this.#children[this.#children.length - 1]
    }

    get nextSibling() {
      if (!this.#parentNode) return null
      const siblings = this.#parentNode.childNodes
      const index = siblings.indexOf(this)
      return siblings[index + 1]
    }

    get nodeName() {
      return this.tagName
    }

    get ownerDocument() {
      return this.#ownerDocument
    }

    get parentElement() {
      return this.#parentNode
    }

    get parentNode() {
      return this.#parentNode
    }

    get previousSibling() {
      if (!this.#parentNode) return null
      const siblings = this.#parentNode.childNodes
      const index = siblings.indexOf(this)
      return siblings[index - 1]
    }

    get textContent() {
      return super.text
    }

    set textContent(value) {
      super.text = value
    }

    // ---- Methods ----
    // ---- [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Node)
    appendChild(child) {
      child._setParentNode(this)
      this.#children.push(child)
      super.addChild(child)
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

    compareDocumentPosition(otherNode) {
      let bitmask = 0
      // ---- Nodes are identical, no further checks needed.
      if (this === otherNode) return bitmask

      // ---- Check for ancestor/descendant relationships
      if (NDNode.depthFirstSearch(this, otherNode)) {
        // ---- Node.DOCUMENT_POSITION_PRECEDING
        bitmask |= 2
      } else if (NDNode.depthFirstSearch(otherNode, this)) {
        // ---- Node.DOCUMENT_POSITION_FOLLOWING
        bitmask |= 4
      }

      // ---- Check for disconnected nodes
      //      For simplicity, assume all nodes are in the same tree/document
      // ---- Node.DOCUMENT_POSITION_DISCONNECTED
      bitmask |= 1

      // ---- Check for containment
      let current = this
      while (current) {
        if (current === otherNode) {
          // ---- Node.DOCUMENT_POSITION_CONTAINED_BY
          bitmask |= 16
          break
        }
        current = current.parentNode
      }

      current = otherNode
      while (current) {
        if (current === this) {
          // ---- Node.DOCUMENT_POSITION_CONTAINS
          bitmask |= 8
          break
        }
        current = current.parentNode
      }

      return bitmask
    }

    contains(node) {
      return "childNodes" in node && node.childNodes.includes(this)
    }

    getRootNode() {
      let current = this
      while (current.parentNode) {
        current = current.parentNode
      }
      return current
    }

    hasChildNodes() {
      return this.#children.length > 0
    }

    insertBefore(newChild, refChild) {
      const index = this.#children.indexOf(refChild)
      if (index === -1) return
      newChild._setParentNode(this)
      this.#children.splice(index, 0, newChild)
      super.insertChild(newChild, index)
    }

    isEqualNode(otherNode) {
      // ---- TODO: Two nodes are equal when they have the same type, defining characteristics (for elements, this would be their ID, number of children, and so forth), its attributes match, and so on.
      return this === otherNode
    }

    isSameNode(otherNode) {
      return this === otherNode
    }

    replaceChild(newChild, oldChild) {
      const index = this.#children.indexOf(oldChild)
      if (index === -1) return
      newChild._setParentNode(this)
      oldChild._setParentNode(null)
      this.#children.splice(index, 1, newChild)
      super.removeChild(oldChild)
      super.insertChild(newChild, index)
    }

    removeChild(child) {
      const index = this.#children.indexOf(child)
      if (index === -1) return
      child._setParentNode(null)
      this.#children.splice(index, 1)
      super.removeChild(child)
    }

    removeAllChildren() {
      this.#children = []
      super.removeChildren()
    }

    // ---- Event Target ----
    dispatchEvent(event) {
      event.object = this
      super.notify(event)
      return true
    }

    // ---- Static Methods ----
    static depthFirstSearch(root, target) {
      for (const child of root.childNodes) {
        if (child === target || NDNode.depthFirstSearch(child, target)) {
          return true
        }
      }
      return false
    }
  }

  return NDNode
}
