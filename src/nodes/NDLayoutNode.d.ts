import { NDNode } from "./NDNode"

export class NDLayoutNode<T> extends NDNode<T> {
  constructor(tagName: string, nsComponent: T)

  // Manipulation methods
  appendChild(child: NDNode<any>): void
  insertBefore(newChild: NDNode<any>, refChild: NDNode<any> | null): void
  replaceChild(newChild: NDNode<any>, oldChild: NDNode<any>): void
  removeChild(child: NDNode<any>): void
  removeAllChildren(): void

  // Child Node
  readonly firstChild: NDNode<any> | undefined
  readonly lastChild: NDNode<any> | undefined
  readonly childNodes: NDNode<any>[]

  contains(node: NDNode<any>): boolean
  hasChildNodes(): boolean
}
