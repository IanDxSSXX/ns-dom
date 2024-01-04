# ns-dom: NativeScript DOM Library
## Overview
ns-dom is a specialized library developed for NativeScript that offers a DOM-like interface for manipulating UI elements. While it may not be an everyday necessity for standard app development, it plays a crucial role in integrating various web frameworks with NativeScript. This library is particularly beneficial for developers looking to merge web-based technologies or frameworks with NativeScript, offering a seamless bridge between traditional web DOM operations and NativeScript's UI components.

## Usage
Here's an example of how ns-dom can be used to create a NativeScript layout using DOM-like methods:
```javascript
import { Application } from "@nativescript/core";
import { document } from "ns-dom";

function create() {
    // Create a new StackLayout
    const layout = document.createElement("StackLayout");

    // Create a Button and set its text content
    const button = document.createElement("Button");
    button.textContent = "Click Me!";
    button.addEventListener("tap", () => {
        label.textContent = "Original Button tapped!";
    });

    // Create a Label
    const label = document.createElement("Label");
    label.textContent = "Welcome to ns-dom";

    // Append Button and Label to the layout
    layout.appendChild(button);
    layout.appendChild(label);

    // Clone the button and modify its text, tap event will be cloned
    const clonedButton = button.cloneNode(true);
    clonedButton.textContent = "I'm Cloned";
    // Style the cloned button
    clonedButton.classList.add("btn-primary");
    // Insert the cloned button before the label
    layout.insertBefore(clonedButton, label);

    return layout;
}

Application.run({ create });
```

## API Reference
The following table provides a comprehensive list of the DOM properties and methods implemented in the ns-dom library, giving an overview of its capabilities:

| Method/Property                      | Description                                               | Implemented |
| ------------------------------------ | --------------------------------------------------------- | ----------- |
| `childNodes`                         | Returns a collection of child nodes.                      | Yes         |
| `firstChild`                         | Returns the first child node.                             | Yes         |
| `isConnected`                        | Indicates if the node is connected to the DOM.            | Yes         |
| `lastChild`                          | Returns the last child node.                              | Yes         |
| `nextSibling`                        | Returns the next node at the same tree level.             | Yes         |
| `nodeName`                           | Returns the name of the node.                             | Yes         |
| `ownerDocument`                      | Returns the top-level document object.                    | Yes         |
| `parentElement`                      | Returns the parent element.                               | Yes         |
| `parentNode`                         | Returns the parent node.                                  | Yes         |
| `previousSibling`                    | Returns the previous node at the same tree level.         | Yes         |
| `textContent`                        | Gets or sets the text content of the node.                | Yes         |
| `appendChild(child)`                 | Appends a child node.                                     | Yes         |
| `compareDocumentPosition(otherNode)` | Compares the document position of two nodes.              | Yes         |
| `contains(node)`                     | Checks if the node contains another node.                 | Yes         |
| `getRootNode()`                      | Returns the root node.                                    | Yes         |
| `hasChildNodes()`                    | Checks if the node has child nodes.                       | Yes         |
| `insertBefore(newChild, refChild)`   | Inserts a new child node before the reference child node. | Yes         |
| `isEqualNode(otherNode)`             | Checks if two nodes are equal.                            | Yes         |
| `isSameNode(otherNode)`              | Checks if two nodes are the same.                         | Yes         |
| `replaceChild(newChild, oldChild)`   | Replaces an old child node with a new child node.         | Yes         |
| `removeChild(child)`                 | Removes a child node.                                     | Yes         |
| `removeAllChildren()`                | Removes all child nodes.                                  | Yes         |
| `depthFirstSearch(root, target)`     | Static method for depth-first search.                     | Yes         |
| `attributes`                               | Returns the element's attributes.                  | Yes         |
| `classList`                                | Provides methods for class manipulation.           | Yes         |
| `className`                                | Gets or sets the class name of the element.        | Yes         |
| `firstElementChild`                        | Returns the first child element.                   | Yes         |
| `id`                                       | Gets or sets the element's ID.                     | Yes         |
| `innerHTML`                                | Gets or sets the HTML content of the element.      | Partial. Simple XML parsing only. |
| `outerHTML`                                | Gets the HTML of the element including itself.     | Yes         |
| `lastElementChild`                         | Returns the last child element.                    | Yes         |
| `nextElementSibling`                       | Returns the next element sibling.                  | Yes         |
| `previousElementSibling`                   | Returns the previous element sibling.              | Yes         |
| `tagName`                                  | Returns the tag name of the element.               | Yes         |
| `after(...nodes)`                          | Inserts nodes after the element.                   | Yes         |
| `animate(animation)`                       | Performs an animation on the element.              | Yes         |
| `append(...nodes)`                         | Appends nodes to the end of the element.           | Yes         |
| `cloneNode(deep)`                          | Clones the element.                                | Yes         |
| `before(...nodes)`                         | Inserts nodes before the element.                  | Yes         |
| `getAttribute(name)`                       | Retrieves the value of an attribute.               | Yes         |
| `getAttributeNames()`                      | Returns the names of all attributes.               | Yes         |
| `getElementByClassName(className)`         | Returns elements with the specified class name.    | Yes         |
| `getElementById(id)`                       | Returns the element with the specified ID.         | Yes         |
| `hasAttribute(name)`                       | Checks if the element has an attribute.            | Yes         |
| `hasAttributes()`                          | Checks if the element has any attributes.          | Yes         |
| `insertAdjacentElement(position, element)` | Inserts an element at a specified position.        | Yes         |
| `insertAdjacentHTML(position, html)`       | Inserts HTML at a specified position.              | Yes         |
| `prepend(...nodes)`                        | Prepends nodes to the beginning of the element.    | Yes         |
| `querySelector(selector)`                  | Returns the first element that matches a selector. | Partial. Limited to basic selectors.       |
| `querySelectorAll(selector)`               | Returns all elements that match a selector.        | Partial. Limited to basic selectors.       |
| `remove()`                                 | Removes the element from the DOM.                  | Yes         |
| `removeAttribute(name)`                    | Removes an attribute from the element.             | Yes         |
| `setAttribute(name, value)`                | Sets the value of an attribute.                    | Yes         |
| `replaceChildren(...nodes)`                | Replaces the children of the element.              | Yes         |
| `replaceWith(...nodes)`                    | Replaces the element with other nodes.             | Yes         |
| `addEventListener(type, listener)`         | Adds an event listener to the element.             | Yes         |
| `dispatchEvent(event)`                     | Dispatches an event to the element.                | Yes         |
| `removeEventListener(type, listener)`      | Removes an event listener from the element.        | Yes         |


## Contributing
Contributions to ns-dom are highly encouraged, especially as we strive to extend its functionality and compatibility. If you're interested in contributing or have suggestions for improvement, please feel free to open an issue or submit a pull request on our repository.

## License
ns-dom is available under the MIT License.