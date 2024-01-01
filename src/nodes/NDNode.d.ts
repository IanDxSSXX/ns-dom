export class NDNode<T> {
  tagName: string
  nsComponent: T
  private _parentNode: NDNode<any> | null

  constructor(tagName: string, nsComponent: T)

  // DOM API
  // Text Content
  textContent: string

  innerText: string

  // Node
  readonly parentNode: NDNode<any> | null
  readonly nextSibling: NDNode<any> | null
  readonly previousSibling: NDNode<any> | null

  cloneNode(deep: boolean): NDNode<any>
}
