import { Application } from "@nativescript/core"
import { document } from "../src"

function create() {
  const layout = document.createElement("StackLayout")
  const button = document.createElement("Button")

  button.text
  button.textContent = "Click!"
  const label = document.createElement("Label")
  label.textContent = "hi"

  layout.appendChild(button)
  layout.appendChild(label)

  const button2 = document.createElement("Button")
  button2.textContent = "CfaeCC2"
  layout.insertBefore(button2, label)

  const btn3 = button2.cloneNode(true)
  layout.insertBefore(btn3, button)
  btn3.addEventListener("tap", () => {
    label.textContent += "jjj"
  })
  btn3.classList.add("bg-slate-100")
  btn3.classList.toggle("bg-slate-efe")

  return layout
}

Application.run({ create })
