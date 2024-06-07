import { Element, Register, Html } from "./components/Element.js"

const html = Html(`
<h1>hey</h1>
`)

class App extends Element {
  constructor(){
    super()
    
  }
}

Register(App, "yed-app", html)