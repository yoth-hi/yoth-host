import MekeARequest from "./streaming/index.js"
import Timing from "./../utils/Timing.js"
export default class {
  constructor(urlBaseObj, reqInit, callback, obj){
    this.timing = new Timing(this, obj);
    this.timing._callback = callback;
    this._url = urlBaseObj;
    this._url.set("rn", this.getRequestNumber())
    this._xhr = MekeARequest(this._url, reqInit, this.timing)
  }
  getRequestNumber(){
    return this.timing.requestNumber
  }
}