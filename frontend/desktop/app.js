import { Element, Register, Html } from "./components/Element.js"

import"./layout/index.js";

const html = Html(`
<style>
  html {
    font-size: 10px;
    font-family: Arial, sans-serif;
  }
  * {
    margin: 0;
    padding: 0;
  }
  html, [light] {
    --app-spec-base-background: #12123211;
    --app-searchbox-background: #fff;
    --app-searchbox-text-color: #000;
    --app-searchbox-border-shadow-color: #01010101;
  }
  yed-app {
    background: var(--app-spec-base-background);
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    min-height: 100vh;
  }
  .header-content {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2020;
    transform: translateY(0);
    transition: transform .3s ease;
  }
</style>
<div class="content">
  <div class="header-content">
    <app-header></app-header>
  </div>
</div>
`)

class App extends Element {
  constructor(){
    super()
  }
}

Register(App, "yed-app", html)