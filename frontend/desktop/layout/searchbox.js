import {
    Element,
    Register,
    Html,
    SetElementIn,
    listen
} from "../components/Element.js";
const html = Html(`
<style>
app-searchbox {
    margin: 0 0 0 40px;
    padding: 0 4px;
    flex: 1;
    background-color: var(--app-searchbox-background);
    flex-basis: 0.000000001px;
    display: flex;
    overflow: hidden;
    border-radius: 16px;
  }
  app-searchbox #container {
    position: relative;
    align-items: center;
  /*  background-color: var(--app-searchbox-background);*/
    border: 1px solid var(--ytd-searchbox-legacy-border-color);
    border-right: none;
    box-shadow: inset 0 1px 2px var(--app-searchbox-border-shadow-color);
    caret-color: var(--app-spec-text-primary);
    color: var(--app-searchbox-text-color);
    padding: 0 4px 0 16px;
    margin-left: 32px;
    flex: 1;
    flex-basis: 0.000000001px;
    display: flex;
    flex-direction: row;
}app-searchbox #search-form {
    height: 40px;
    position: relative;
    flex: 1;
    flex-basis: 0.000000001px;
    display: flex;
    flex-direction: row;
  }
  #search-input {
    flex:1;
    width: 100%;
  }
  #search-input input {
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
    background-color: transparent;
    border: none;
    box-shadow: none;
    color: inherit;
    font-family: Noto,sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    margin-left: 4px;
    max-width: 100%;
    outline: none;
    text-align: inherit;
    width: 100%;
    -ms-flex: 1 1 0.000000001px;
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    flex: 1;
    -webkit-flex-basis: 0.000000001px;
    -ms-flex-preferred-size: 0.000000001px;
    flex-basis: 0.000000001px;
  }
  app-searchbox #search-clear-button {
    height: 24px;
    width: 24px;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    cursor: pointer;
    margin-right: 5px;
  }
  app-searchbox #search-clear-button:not([hidden]) {
    display: flex;
  }
  app-searchbox #search-icon-legacy {
    border-radius:0 40px 40px 0;
    width: 50px;
    cursor: pointer;
    appearance: none;
    background: none;
    border: none;
  }
</style>
<form id="search-form" action="/results">
  <div id="container" on-click="onClick_">
    <yt-icon id="search-icon" icon="[[icon]]" on-mousedown="focusInput">
    </yt-icon>
    <div id="search-input">
      <input
        id="search-input-element"
        placeholder$="[[placeholder]]"
      >
    </div>
    <div id="search-clear-button" on-click="clearSearch" hidden="[[!isClearButtonVisible]]">clear</div>
  </div>
  <slot name="search-container"></slot>
</form>
<button id="search-icon-legacy" aria-label$="[[placeholder]]">\n  <yt-icon icon="[[icon]]"></yt-icon>\n  <app-paper-tooltip prefix="">[[placeholder]]</app-paper-tooltip>\n</button>
`);

class Header extends Element {
    constructor() {
        super();
        
    }
    ready() {
        this.loadSearchbox();
        this.placeholder = "Search"
    }
    onClick_(event) {
        this.isInputTouched ||
            event.target !== this.searchInput ||
            (this.isInputTouched = true);
    }
    focusInput(event) {
        event?.preventDefault();
        this.searchInput.focus();
    }
    clearSearch(event) {
        event.preventDefault();
        this.searchInput.value = "";
        this.hasInput = this.isClearButtonVisible = !1;
        this.focusInput();
    }
    loadSearchbox() {
        this.setupSearchboxLoad(null, () => this.initializeSearchbox());
        this.onInputChange();
        listen(this.searchInput, "focus", () => this.onInputFocus());
        listen(this.searchInput, "blur", () => this.onInputBlur());
        listen(this.searchInput, "keyup", () => this.onInputChange());
    }
    onInputFocus() {
        this.hasFocus = true;
    }
    onInputBlur() {
        this.hasFocus = false;
    }
    setupSearchboxLoad(a, b) {
        const d = () => {
            this.onInputChange();
           // OpenBox(this)
        };
        var p = listen(this.hostElement, "app-voice-activated", d);
        var e = listen(this.searchInput, "mouseover", d);
        var h = listen(this.searchInput, "keypress", d);
        var l = listen(this.searchButton, "mouseover", d);
        var m = listen(this.searchButton, "keypress", d);
        this.hasFocus && d();
    }
    initializeSearchbox() {
        debugger;
    }
    onInputChange() {
        if (this.searchInput) {
            this.isClearButtonVisible = "" !== this.searchInput.value;
            this.hasInput = "" !== this.searchInput.value;
        }
    }
}
SetElementIn("search-form", Header.prototype, "searchForm", void 0);
SetElementIn("search-icon-legacy", Header.prototype, "searchButton", void 0);
SetElementIn("search-input-element", Header.prototype, "searchInput", void 0);

Register(Header, "app-searchbox", html);
