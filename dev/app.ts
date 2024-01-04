import { Application, Label } from "@nativescript/core"
import { document } from "../src"

function create() {
  const layout = document.createElement("StackLayout")
  const button = document.createElement("Button")

  button.text
  button.textContent = "Click!"
  const label = document.createElement("Label")
  label.classList.add("text-red-600")
  label.classList.add("text-center")
  console.log(label.className)
  label.textContent = "hi"

  layout.appendChild(button)
  layout.appendChild(label)

  const button2 = document.createElement("Button")
  button2.textContent = "CfaeCC2"
  layout.insertBefore(button2, label)
  button2.addEventListener("tap", () => {
    label.textContent += "jjj"
  })

  const btn3 = button2.cloneNode(true)
  layout.insertBefore(btn3, button)

  btn3.classList.add("text-red-100")
  btn3.classList.add("h1")

  return layout
}

Application.run({ create })
