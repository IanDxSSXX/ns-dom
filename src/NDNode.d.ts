import { ViewBase } from "@nativescript/core"
import { NDElement } from "./NDElement"

export function NDNodeFactory<T extends ViewBase>(
  NSComponent: new (...args: any[]) => T
): NDNode<T>

export type NDNode<T> = T & {
  tagName: string
  #ownerDocument: NDDocument
  #children: NDElement<ViewBase>[]
  #parentNode: NDElement<ViewBase> | null
  _parentNode: NDElement<ViewBase> | null

  // ---- Properties ----
  // readonly baseURI: string
  readonly childNodes: NDElement<ViewBase>[]
  readonly firstChild: NDElement<ViewBase> | undefined
  readonly isConnected: boolean
  readonly lastChild: NDElement<ViewBase> | undefined
  readonly nodeName: string
  // readonly nodeType: number
  // readonly nodeValue: string | null
  readonly ownerDocument: NDDocument
  readonly parentElement: NDElement<ViewBase> | null
  readonly parentNode: NDElement<ViewBase> | null
  readonly nextSibling: NDElement<ViewBase> | null
  readonly previousSibling: NDElement<ViewBase> | null
  textContent: string

  // ---- Methods ----
  appendChild(child: NDElement<ViewBase>): void
  // ---- Implemented in NDElement
  // cloneNode(deep: boolean): NDElement<ViewBase>
  compareDocumentPosition(other: NDElement<ViewBase>): number
  contains(node: NDElement<ViewBase>): boolean
  getRootNode(): NDElement<ViewBase>
  hasChildNodes(): boolean
  insertBefore(
    newChild: NDElement<ViewBase>,
    refChild: NDElement<ViewBase> | null
  ): void
  // isDefaultNamespace(defaultNamespace: string): void
  isEqualNode(otherNode: NDElement<ViewBase>): boolean
  isSameNode(otherNode: NDElement<ViewBase>): boolean
  // lookupNamespaceURI(prefix: string): string | null
  // lookupPrefix(namespace: string): string | null
  // normalize(): void
  replaceChild(
    newChild: NDElement<ViewBase>,
    oldChild: NDElement<ViewBase>
  ): void
  removeChild(child: NDElement<ViewBase>): void
  removeAllChildren(): void
}
