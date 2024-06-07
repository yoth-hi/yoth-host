//import { ElementMixin, version } from '@polymer/polymer/lib/mixins/element-mixin.js';
import { ElementMixin, version } from 'https://unpkg.com/@polymer/polymer@3.5.1//lib/mixins/element-mixin.js';
export class Element {};

export function Register(class_, name, html) {
  class_.prototype.is = name;
  const component = create(class_, name, html);
  RegisterElement(component, name)
}
export function Html(textHtml){
  let element;
  return function(){
    element = document.createElement("template");
    element.innerHTML = textHtml
    return element
  }
}

export const useShadow = false;

function create(class_, name, html){
  class Tsr extends ElementMixin(class_) {
    __styleSheet = null;
    connectedCallback(){
      super.connectedCallback()
    }
    get template(){
      return html()
    }
    get shadowRoot (){
      return useShadow ? this.hostElement.shadowRoot : this.hostElement;
    }
    attachShadow(data){
      return useShadow ? this.hostElement.attachShadow(data) : void 0
    }
    _attachDom(dom){
      if(dom){
        this.hostElement.appendChild(dom)
      }
    }
  }
  var p;
  if(html){
    Object.defineProperty(Tsr.prototype,"_template",{
      get:function(){
        p ?? (p = html())
        return p
      },
      set:function(q){
        p=q
      },
      configurable:!0,
      enumerable:!0
    })
  }

  
  return {
    init(element){
      Tsr.prototype.hostElement = element
      const comp = new Tsr;
      return comp;
    }
  }
}
function RegisterElement({ init }, name){
  class Element_ extends HTMLElement{
    constructor(){
      super()
      this.inst = init(this)
    }
    connectedCallback(){
      this.inst.connectedCallback()
    }
  }
  customElements.define(name, Element_)
}
export { version }
