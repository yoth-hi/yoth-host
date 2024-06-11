import { Element, Register, Html } from "./components/Element.js";

import "./layout/index.js";

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
    --app-spec-base-background: #fff;
    --app-searchbox-background: #fff;
    --app-searchbox-text-color: #000;
    --app-searchbox-border-shadow-color: #01010101;
    --app-scrollbar-thumb-color: #0002;
  }
  html[dark],[dark]{
    --app-scrollbar-thumb-color: #2f2f2f;
  }
  html{
    --app-scrollbar-button-color: #0000;
    --app-scrollbar-track-color: #0000;
    --app-scrollbar-corner-color: #0000;
    --app-scrollbar-border-color: #0000; 
    --app-scrollbar-width: 5px;
    --app-scrollbar-height: 5px;
    --show-double-buttons: none;
    --app-scrollbar-border-thickness: 0px;
    --app-drower-width: 260px;
    --app-mastheader-background: var(--app-spec-base-background)
  }
  [hidden-scrollbar]{
    --app-scrollbar-thumb-color: #0000;
  }
  [trasnstion-scrollbar]::-webkit-scrollbar-thumb,
  [trasnstion-scrollbar] *::-webkit-scrollbar-thumb
    
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
  a:link, a, .endpoint {
    color: inherit;
    text-decoration: none;
  }
  ::-webkit-scrollbar { width: var(--app-scrollbar-width, 20px); height: var(--app-scrollbar-height, 20px); }
  ::-webkit-scrollbar-thumb { background: var(--app-scrollbar-thumb-color, #0f0f0); border: var(--app-scrollbar-border-thickness, 3px) solid var(--app-scrollbar-border-color, rgb(255, 255, 255)); border-radius: var(--app-scrollbar-border-radius, 4px); }
  ::-webkit-scrollbar-track { background: var(--app-scrollbar-track-color, #A1A1AA); }
  ::-webkit-scrollbar-corner { background: var(--app-scrollbar-corner-color, #FFFFFF); border: var(--app-scrollbar-border-thickness, 3px) solid var(--app-scrollbar-border-color, rgb(255, 255, 255)); border-radius: var(--app-scrollbar-border-radius, 4px); }
  ::-webkit-scrollbar-button:vertical:start:increment, 
  #preview::-webkit-scrollbar-button:vertical:end:decrement, 
  #preview::-webkit-scrollbar-button:horizontal:start:increment, 
  #preview::-webkit-scrollbar-button:horizontal:end:decrement { display: var(--show-double-buttons, none); }
</style>
<div class="content">
 <app-drower></app-drower>
  <div class="header-content">
    <app-header></app-header>
  </div>
</div>
`);

class App extends Element {
    constructor() {
        super();
    }
}

Register(App, "yed-app", html);
