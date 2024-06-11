import { Element, Register, Html } from "../components/Element.js";

const html = Html(`
<style>
  app-drower{
    width: var(--app-drower-width);
    position: absolute;
    left:0;
    top:0;
    bottom: 0;
    z-index: 1200;
    display: block;
  }
  app-drower #content{
    width: var(--app-drower-width);
    background: var(--app-spec-base-background);
    box-shadow: 3px 0px 2.5px var(--app-spec-base-background);
    max-height: calc(100vh - 7rem);
    overflow: scroll;
    margin-top: 7rem;
  }
  app-drower #content-body{
    min-height: 100vh;
  }
  .drower-box-category-title{
    font-size: 1.6rem;
    line-height: 2.2rem;
    font-weight: 500;
    padding: 6px 12px 4px;
  }
  .drower-box-category-items{
    margin-top: 6px;
  }
  .drower-box-category-item:hover{
    background: #8882;
  }
  .drower-item-newness{
    background: red;
    width: .4rem;
    border-radius: .2rem;
    height: .4rem;
  }
  .drower-box-category:not(:last-child) {
    border-bottom: 1px solid rgba(0,0,0,.1)
}
  .drower-box-category-item{
    height: 4rem;
    margin: 0px 15px;
    overflow: hidden;
    display: flex;
    border-radius: 8px;
    cursor: pointer;
    align-items: center;
    padding-right: 12px;
  }
  .drower-item-icon{
    margin-right: 24px;
    width: 24px;
  }
  .drower-box-category[main]{
    margin-top: -6%;
  }
  .drower-item-text{
    font-size: 1.4rem;
    font-family: Arial, Sans-Serif;
    line-height: 2rem;
    flex:1;
    font-weight: 500;
  }
</style>
<div id="content"
  on-mouseover="_onMouseIn"
  on-mouseleave="_onMouseOut"
  on-touchstart="_onMouseIn"
  on-touchend="_onMouseOut"
  trasnstion-scrollbar=""
  hidden-scrollbar$="{{!showScrollbar}}"
>
<div id="content-body">
  <template is="dom-repeat" items="{{data.renderList}}" as="box">
    <div class="drower-box-category" main$="[[!box.title]]">
      <div class="drower-box-category-title" hidden="[[!box.title]]">
        <span>{{box.title}}</span>
      </div>
      <div class="drower-box-category-items">
        <template is="dom-repeat" items="{{box.itemsDrowerItems}}" >
          <a class="endpoint drower-box-category-item" href="{{getDataEndpoint(item)}}">
            <div class="drower-item-icon"></div>
            <div class="drower-item-text">{{item.title}}</div>
            <div class="drower-item-newness" hidden="[[!item.haveNews]]"></div>
          </a>
        </template>
      </div>
    </div>
  </template>
  <template is="dom-repeat" items="{{data.outhers}}" >
    <app-support-link data="{{item}}">
    </app-support-link>
  </template>
</div>
</div>
`);

class Aupport extends Element {
    properties = {
        data: {
            type: Object,
            value: {}
        }
    };
}
Register(
    Aupport,
    "app-support-link",
    Html(`
<style>
app-support-link{
  color: #888;
  font-weight: bold;
  line-height: 2rem;
  margin: 0px 10px;
}
</style>
    <a
      href="{{data.url}}"
      aria-label="{{data.name}}"
      title="{{data.name}}"
    >{{data.name}}</a>
`)
);

const h = {
    title: "Home",
    get haveNews(){ return Math.random()>.5},
    endpoint: {
        url: "/"
    }
};
const data = {
    renderList: [
        {
            title: undefined,
            itemsDrowerItems: [h, h, h, h]
        },
        {
            title: "Vocé",
            itemsDrowerItems: [h, h, h]
        },
        {
            title: "Outros",
            itemsDrowerItems: [
            h   ]
        }
    ],
    outhers: [{ name: "company", url: "#host%company" }]
};
class Drower extends Element {
    constructor() {
        super();
    }
    get data() {
        return data;
    }
    properties = {
      showScrollbar:{
        type: String,
        value: false
      }
    }
    getDataEndpoint(data) {
        return data?.endpoint?.url ?? "";
    }
    _onMouseIn(){
      this.showScrollbar = true
    }
    _onMouseOut(){
      this.showScrollbar = false
    }
}
Register(Drower, "app-drower", html);
