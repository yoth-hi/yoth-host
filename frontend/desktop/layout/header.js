import { Element, Register, Html } from "../components/Element.js";
const html = Html(`
<style>
  app-header {
      display: block;
      width: 100%;
  }
 app-header #background{
    z-index: -1;
    opacity: 1;
    position: absolute;
    height: 56px;
    width: 100%;
    background: #1135;
  }
  app-header #content {
    height: 56px;
    padding: 0 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  app-header .center {
    flex: 0 1 732px;
    min-width: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  

</style>
<div id="background"></div>
<div id="content">
  <div class="start">start</div>
  <div class="center">
    <app-searchbox>
      
    </app-searchbox>
  </div>
  <div class="end">end</div>
</div>
`);

class Header extends Element {
    constructor() {
        super();
    }
}

Register(Header, "app-header", html);
