import { AnimationPromise } from "@nativescript/core/ui/animation"
import { NDNode } from "./NDNode"
import { NDEvent } from "./NDDocument"

class NDClassList extends Set {
  #setClassName: (className: string) => void
  constructor(setClassName: (className: string) => void): void
  add(className: string): void
  remove(className: string): void
  toggle(className: string): void
  contains(className: string): boolean
}

export function NDElementFactory<T extends ViewBase>(
  NSComponent: new (...args: any[]) => T
): NDElement<T>

export type NDElement<T> = NDNode<T> & {
  // ---- Properties ----
  // ---- Ignore web aria properties
  // readonly assignedSlot: NDNode<any> | null
  #attributes: { [key: string]: string }
  #events: Map<(event: NDEvent<any>) => void, string>

  readonly childElementCount: number
  readonly children: NDElement<T>[]
  readonly classList: NDClassList
  className: string
  // ---- clientHeight, clientLeft, clientTop, clientWidth are more relevant to CSS box model, which might not directly apply in NativeScript
  // readonly clientHeight: number;
  // readonly clientLeft: number;
  // readonly clientTop: number;
  // readonly clientWidth: number;
  // ----- elementTiming: Experimental Web API, not relevant for NativeScript
  // readonly elementTiming: string;
  readonly firstElementChild: NDElement<T> | null
  id: string
  innerHTML: string
  readonly lastElementChild: NDElement<T> | null
  // ---- localName and namespaceURI are more relevant to XML/HTML documents
  // readonly localName: string;
  // readonly namespaceURI: string | null;
  readonly nextElementSibling: NDElement<T> | null
  outerHTML: string
  // ---- part: Part of the ::part CSS pseudo-element, not relevant for NativeScript
  // readonly part: DOMTokenList;
  // ---- prefix: Relevant to XML namespaces, likely not needed in NativeScript
  // readonly prefix: string | null;
  readonly previousElementSibling: NDElement<T> | null
  // ---- Scroll properties might be implemented if the component specifically handles scrolling
  // readonly scrollHeight: number;
  // scrollLeft: number;
  // readonly scrollLeftMax: number;
  // scrollTop: number;
  // readonly scrollTopMax: number;
  // readonly scrollWidth: number;
  // ---- shadowRoot: Shadow DOM is a web-specific concept
  // readonly shadowRoot: ShadowRoot | null;
  // slot: Part of Web Components, not applicable in NativeScript
  // slot: string;
  readonly tagName: string

  // ---- Methods ----
  after(...nodes: Array<string | NDElement<T>>): void
  animate(animation: any): AnimationPromise
  append(...nodes: Array<string | NDElement<T>>): void
  // ---- Not applicable in NativeScript
  // attachShadow(init: ShadowRootInit): ShadowRoot;
  before(...nodes: Array<string | NDElement<T>>): void
  cloneNode(deep?: boolean): NDElement<T>
  // ---- Might not be necessary
  // closest(selectors: string): NDElement<T> | null;
  // ---- More relevant to CSS in web context
  // computedStyleMap(): StylePropertyMapReadOnly;
  // ---- Not applicable in NativeScript
  // getAnimations(options?: GetAnimationsOptions): Animation[];
  getAttribute(qualifiedName: string): string | null
  getAttributeNames(): string[]
  // ---- Attr type is specific to web DOM
  // getAttributeNode(qualifiedName: string): Attr | null;
  // ---- Namespace handling might not be necessary
  // getAttributeNodeNS(namespace: string | null, localName: string): Attr | null;
  // ---- Namespace handling might not be necessary
  // getAttributeNS(namespace: string | null, localName: string): string | null
  // ---- Specific to layout rendering in web
  // getBoundingClientRect(): DOMRect;
  // ---- Specific to layout rendering in web
  // getClientRects(): DOMRectList;
  getElementsByClassName(classNames: string): HTMLCollectionOf<NDElement<T>>
  getElementsByTagName(qualifiedName: string): NodeListOf<NDElement<T>>
  // getElementsByTagNameNS(namespaceURI: string, localName: string): HTMLCollectionOf<NDElement<T>>; // Namespace handling might not be necessary
  hasAttribute(qualifiedName: string): boolean
  // hasAttributeNS(namespace: string | null, localName: string): boolean; // Namespace handling might not be necessary
  hasAttributes(): boolean
  // hasPointerCapture(pointerId: number): boolean; // Pointer events are handled differently in NativeScript
  insertAdjacentElement(
    position: InsertPosition,
    insertedElement: NDElement<T>
  ): NDElement<T> | null
  insertAdjacentHTML(where: InsertPosition, html: string): void
  // ---- No text nodes in NativeScript
  // insertAdjacentText(where: InsertPosition, text: string): void;
  // --- CSS selector matching not applicable
  // matches(selectors: string): boolean;
  prepend(...nodes: Array<string | NDElement<T>>): void
  querySelector(selectors: string): NDElement<T> | null
  querySelectorAll(selectors: string): NodeListOf<NDElement<T>>
  // ---- Pointer events are handled differently in NativeScript
  // releasePointerCapture(pointerId: number): void;
  remove(): void
  removeAttribute(qualifiedName: string): void
  // ---- Attr type is specific to web DOM
  // removeAttributeNode(attr: Attr): Attr;
  // ---- Namespace handling might not be necessary
  // removeAttributeNS(namespace: string | null, localName: string): void;
  replaceChildren(...nodes: Array<string | NDElement<T>>): void
  replaceWith(...nodes: Array<string | NDElement<T>>): void
  // ---- Fullscreen APIs are different in NativeScript
  // requestFullscreen(options?: FullscreenOptions): Promise<void>;
  // ---- Pointer lock API is specific to web
  // requestPointerLock(): void;
  // ---- Scrolling is handled differently in NativeScript
  // scroll(options?: ScrollToOptions): void;
  // ---- Scrolling is handled differently in NativeScript
  // scrollBy(options?: ScrollToOptions): void;
  // ---- Scrolling is handled differently in NativeScript
  // scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
  // ---- Non-standard, scrolling is handled differently in NativeScript
  // scrollIntoViewIfNeeded(centerIfNeeded?: boolean): void;
  // ---- Scrolling is handled differently in NativeScript
  // scrollTo(options?: ScrollToOptions): void;
  setAttribute(qualifiedName: string, value: string): void
  // ---- Attr type is specific to web DOM
  // setAttributeNode(attr: Attr): Attr | null;
  // ---- Namespace handling might not be necessary
  // setAttributeNodeNS(attr: Attr): Attr | null;
  // setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void

  // ---- Events ----
  addEventListener(
    eventName: string,
    callback: (event: NDEvent<any>) => void
  ): void
  dispatchEvent(event: NDEvent): void
  removeEventListener(callback: (event: NDEvent<any>) => void): void
}
