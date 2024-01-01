/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { Application } from "@nativescript/core"
import { document } from "../src"

function create() {
  const layout = document.createElement("StackLayout")
  const button = document.createElement("Button")
  button.textContent = "Click!"
  const label = document.createElement("Label")
  label.textContent = "shit"

  layout.appendChild(button)
  layout.appendChild(label)

  const button2 = document.createElement("Button")
  button2.textContent = "CfaeCC2"
  layout.insertBefore(button2, label)

  const btn3 = button2.cloneNode(true)
  layout.insertBefore(btn3, button)

  return layout
}

// Application.run({ moduleName: 'app-root' })
Application.run({ create: () => create().nsComponent })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
