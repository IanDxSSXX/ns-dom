import { NDNodeFactory } from "./NDNode"
import { parseXML } from "./xmlParser"

class NDClassList extends Set {
  #setClassName
  constructor(setClassName) {
    super([])
    this.#setClassName = setClassName
  }

  add(className) {
    super.add(className)
    this.#setClassName()
  }

  delete(className) {
    super.delete(className)
    this.#setClassName()
  }

  contains(className) {
    return this.has(className)
  }

  toggle(className) {
    if (this.has(className)) {
      this.delete(className)
    } else {
      this.add(className)
    }
  }
}

export function NDElementFactory(NSComponent) {
  class NDElement extends NDNodeFactory(NSComponent) {
    #attributes = {}
    // ---- Properties ----
    // ---- [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element)
    get attributes() {
      return this.#attributes
    }

    #classList = new NDClassList(this._setClassName.bind(this))
    #className = ""
    _setClassName() {
      this.#className = Array.from(this.#classList).join(" ")
    }

    get classList() {
      return this.#classList
    }

    get className() {
      return this.#className
    }

    set className(className) {
      this.#classList = new NDClassList(this._setClassName.bind(this))
      className.split(" ").forEach(clsName => this.#classList.add(clsName))
    }

    get firstElementChild() {
      return this.firstChild
    }

    id

    get innerHTML() {
      const childHtml = this.childNodes.map(child => child.outerHTML).join("")
      return childHtml
    }

    #parseXMLNode({ tagName, attributes, children }) {
      const componentClass = NodeMap[tagName]
      if (!componentClass) {
        console.error(`Cannot create Node ${tagName}, skipping`)
        return null
      }
      const component = new componentClass()
      const ndElement = new NDElement(tagName, component, this.ownerDocument)
      children.forEach(child => {
        const childElement = this.#parseXMLNode(child)
        Object.entries(attributes).forEach(([key, value]) => {
          if (key === "text") return (childElement.textContent = value)
          childElement.setAttribute(key, value)
        })
        if (childElement) ndElement.appendChild(childElement)
      })
      return ndElement
    }

    set innerHTML(html) {
      const xmlNodes = parseXML(html)
      const newElements = xmlNodes
        .map(node => this.#parseXMLNode(node))
        .filter(Boolean)

      this.childNodes.forEach(child => child.remove())
      newElements.forEach(element => this.appendChild(element))
    }

    get outerHTML() {
      const innerHTML = this.innerHTML
      const attributeString =
        " " +
        Object.entries(this.#attributes)
          .map(([key, value]) => `${key}="${value}"`)
          .join(" ")
      if (!innerHTML) return `<${this.tagName}${attributeString}/>`
      return `<${this.tagName}${attributeString}>${innerHTML}</${this.tagName}>`
    }

    get lastElementChild() {
      return this.lastChild
    }

    get nextElementSibling() {
      return this.nextSibling
    }

    get previousElementSibling() {
      return this.previousSibling
    }

    get tagName() {
      return this.nodeName
    }

    // ---- Methods ----
    // ---- [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Element)
    after(...nodes) {
      const nextSibling = this.nextSibling
      nodes.forEach(node => this.parentNode.insertBefore(node, nextSibling))
    }

    animate(animation) {
      super.animate(animation)
    }

    append(...nodes) {
      nodes.forEach(node => this.appendChild(node))
    }

    before(...nodes) {
      nodes.forEach(node => this.parentNode.insertBefore(node, this))
    }

    getAttribute(name) {
      return this.#attributes[name]
    }

    getAttributeNames() {
      return Object.keys(this.#attributes)
    }

    getElementByClassName(className) {
      const matches = []
      if (this.classList.contains(className)) matches.push(this)
      this.childNodes.forEach(child => {
        matches.push(...child.getElementByClassName(className))
      })

      return matches
    }

    getElementById(id) {
      return super.getViewById(id)
    }

    hasAttribute(name) {
      return this.#attributes[name] !== undefined
    }

    hasAttributes() {
      return Object.keys(this.#attributes).length > 0
    }

    insertAdjacentElement(position, element) {
      switch (position) {
        case "beforebegin":
          this.parentNode.insertBefore(element, this)
          break
        case "afterbegin":
          this.prepend(element)
          break
        case "beforeend":
          this.append(element)
          break
        case "afterend":
          this.parentNode.insertBefore(element, this.nextSibling)
          break
      }
    }

    insertAdjacentHTML(position, html) {
      const xmlNodes = parseXML(html)
      const newElements = xmlNodes
        .map(node => this.#parseXMLNode(node))
        .filter(Boolean)
      newElements.forEach(element =>
        this.insertAdjacentElement(position, element)
      )
    }

    prepend(...nodes) {
      const firstChild = this.firstChild
      nodes.forEach(node => this.insertBefore(node, firstChild))
    }

    querySelector(selector) {
      const isIdSelector = selector.startsWith("#")
      const isClassSelector = selector.startsWith(".")
      const isTagSelector = !isIdSelector && !isClassSelector
      if (isIdSelector) {
        const id = selector.slice(1)
        return this.getElementById(id)
      }
      if (isClassSelector) {
        const className = selector.slice(1)
        return this.getElementByClassName(className)[0]
      }
      if (isTagSelector) {
        const tagName = selector
        return this.getElementsByTagName(tagName)[0]
      }
      return null
    }

    querySelectorAll(selector) {
      const isIdSelector = selector.startsWith("#")
      const isClassSelector = selector.startsWith(".")
      const isTagSelector = !isIdSelector && !isClassSelector
      if (isIdSelector) {
        const id = selector.slice(1)
        return [this.getElementById(id)]
      }
      if (isClassSelector) {
        const className = selector.slice(1)
        return this.getElementByClassName(className)
      }
      if (isTagSelector) {
        const tagName = selector
        return this.getElementsByTagName(tagName)
      }
      return []
    }

    remove() {
      this.parentNode.removeChild(this)
    }

    removeAttribute(name) {
      delete this.#attributes[name]
    }

    setAttribute(name, value) {
      this.#attributes[name] = value
    }

    replaceChildren(...nodes) {
      this.childNodes.forEach(child => child.remove())
      this.append(...nodes)
    }

    replaceWith(...nodes) {
      nodes.forEach(node => this.parentNode.insertBefore(node, this))
      this.remove()
    }

    setAttribute(qualifiedName, value) {
      this.#attributes[qualifiedName] = value
    }
  }

  return NDElement
}
