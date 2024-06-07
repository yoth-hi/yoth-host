import { now } from "./utils.js";
let requestNumber = 0;

export default class {
    constructor(scope, app) {
      this._scope = scope
      this._app = app
        this.requestNumber = ++requestNumber;
        this._start = this._now();
    }
    _now() {
        return now();
    }
    _append(data){
      const w = this._app._getMediaController()
      w._appendVideo(data)
    }
}
