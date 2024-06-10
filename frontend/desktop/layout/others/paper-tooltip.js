import { Element, Register, Html, listen } from "../../components/Element.js";
const html = Html(`
<style>
  app-paper-tooltip {
    position: absolute;
    outline: none;
    z-index: 1002;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
    transform: translate(-50%, 50%);
  }
    .paper-tooltip[style-target=tooltip] {
    opacity: 0;
    transition: .2s;
      outline: none;
      font-family: "Roboto", "Noto", sans-serif;  -webkit-font-smoothing: antialiased;  font-size: 10px;  line-height: 1;  background-color: var(--paper-tooltip-background, #616161);  color: var(--paper-tooltip-text-color, white);  padding: 8px;  border-radius: 2px;}
  app-paper-tooltip .paper-tooltip[show]{
    opacity: 1;
  }
</style>
<div id="tooltip" show$="[[visible_]]" class="hidden paper-tooltip" style-target="tooltip"></div>
`);

class PaperTooltip extends Element {
    constructor() {
        super();
        this.hostHTML = this.hostElement.childNodes || [];
    }
    ready() {
        const u = this.hostElement.querySelector("#tooltip");
        for (let i = 0; i < this.hostHTML.length; i++) {
            try {
                /* code */
                u.appendChild(this.hostHTML[i]);
            } catch (e) {}
        }
        this.ready_();
    }
    ready_() {
        const on = () => {
            this.visible_ = true;
        };
        const off = () => {
            this.visible_ = false;
        };
      //  listen(this.parent, "mouseover", on);
        listen(this.parent, "foucus", on);
        listen(this.parent, "blur", off);
    }
    get parent() {
        return this.hostElement.offsetParent;
    }
}

Register(PaperTooltip, "app-paper-tooltip", html);
