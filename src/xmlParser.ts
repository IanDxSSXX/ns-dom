export interface XMLNode {
  tagName: string
  attributes: Record<string, string>
  children: XMLNode[]
}

/**
 * @brief Really simple XML parser only for NativeScript XML parsing
 *  Supports:
 *  - Opening and closing tags
 *  - Self-closing tags
 *  - Attributes
 *  - Nested tags
 *  Does not support:
 *  - Text nodes
 *  - Attributes with no value
 *  - CDATA
 *  - Script or any other non-XML tags
 * @param xmlString
 * @returns XMLNode[]
 */
export function parseXML(xmlString: string): XMLNode[] {
  const tagRegex = /<\/*(\w+)([^>]*?)\/*>/g
  const attributeRegex = /(\w+)="([^"]+)"/g

  const stack = []
  let current = []
  const result = current

  function parseAttributes(attributesString: string) {
    const attributes = {}
    let attrMatch: RegExpExecArray
    while ((attrMatch = attributeRegex.exec(attributesString)) !== null) {
      attributes[attrMatch[1]] = attrMatch[2]
    }
    return attributes
  }

  let match: RegExpExecArray
  while ((match = tagRegex.exec(xmlString)) !== null) {
    const matchString = match[0]
    const tagName = match[1]
    const attributesString = match[2]
    const isSelfClosing = matchString.trim().endsWith("/>")
    const attributes = parseAttributes(attributesString)

    if (isSelfClosing) {
      const element = { tagName, attributes, children: [] }
      current.push(element)
    } else if (matchString.startsWith("</")) {
      // ---- Closing tag
      if (stack.length === 0 || stack[stack.length - 1].tagName !== tagName) {
        throw new Error(`Unexpected closing tag: ${tagName}`)
      }
      stack.pop()
      current = stack[stack.length - 1]?.children
    } else {
      // ---- Opening tag
      const element = { tagName, attributes, children: [] }
      stack.push(element)
      current.push(element)
      current = element.children
    }
  }
  if (stack.length > 0) {
    throw new Error("Unbalanced tags")
  }

  return result
}
