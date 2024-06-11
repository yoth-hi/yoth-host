export class Element {}
//import '@polymer/polymer@3.5.1/lib/elements/dom-repeat.js';
//import { ElementMixin, version } from '@polymer/polymer/lib/mixins/element-mixin.js';
import "https://unpkg.com/@polymer/polymer@3.5.1/lib/elements/dom-repeat.js?module";
import {
    ElementMixin,
    version
} from "https://unpkg.com/@polymer/polymer@3.5.1/lib/mixins/element-mixin.js?module";
export function SetElementIn(selector, prototype, name, startValue) {
    let value = startValue;
    Object.defineProperties(prototype, {
        [name]: {
            configurable: !0,
            enumerable: !0,
            get: function () {
                const element = this.$[selector];
                return element;
            }
        }
    });
}
export function Register(class_, name, html) {
    class_.prototype.is = name;
    const component = create(class_, name, html);
    RegisterElement(component, name);
}
export function Html(textHtml) {
    let element;
    return function () {
        element = document.createElement("template");
        element.innerHTML = textHtml?.replace(/[\n ]{2,}/g, " ");
        return element;
    };
}

export const useShadow = false;

function create(class_, name, html) {
    class Tsr extends ElementMixin(class_) {
        constructor() {
            super();
            const y = Object.keys(this.properties || {});
            for (let i = 0; i < y.length; i++) {
                const name = y[i];
                this[name] = this.properties[name]?.value || null;
                Object.defineProperties(this.hostElement, {
                    [name]: {
                        configurable: !0,
                        enumerable: !0,
                        get: () => {
                            return this[name];
                        },
                        set: a => {
                            return (this[name] = a);
                        }
                    }
                });
            }
        }
        __styleSheet = null;
        connectedCallback() {
            super.connectedCallback();
            class_.prototype.attached?.apply(this);
        }
        ready() {
            super.ready();
            class_.prototype.ready?.apply(this);
        }
        get template() {
            return html();
        }
        get shadowRoot() {
            return useShadow ? this.hostElement.shadowRoot : this.hostElement;
        }
        attachShadow(data) {
            return useShadow ? this.hostElement.attachShadow(data) : void 0;
        }
        _attachDom(dom) {
            if (dom) {
                super._attachDom(dom);
                this.hostElement.appendChild(dom);
            }
        }
    }
    var p;
    if (html) {
        Object.defineProperty(Tsr.prototype, "_template", {
            get: function () {
                p ?? (p = html());
                return p;
            },
            set: function (q) {
                p = q;
            },
            configurable: !0,
            enumerable: !0
        });
    }

    return {
        init(element) {
            class_.prototype.hostElement = element;
            const comp = new Tsr();
            return comp;
        }
    };
}
function RegisterElement({ init }, name) {
    class Element_ extends HTMLElement {
        constructor() {
            super();
            this.inst = init(this);
        }
        connectedCallback() {
            this.inst.connectedCallback();
        }
    }
    customElements.define(name, Element_);
}
export { version };

export function listen(element, name, callback) {
    element.addEventListener(name, function (a) {
        callback(a);
    });
}
