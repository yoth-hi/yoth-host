export default class {
  _event = [];
    constructor(sourceBuffer, b, c, containerType) {
        this._sourceBuffer = sourceBuffer;
        this._containerType = containerType;
        this._onEvent = e => {
            this._dp(e)
        };
        if (this._sourceBuffer) {
            this._sourceBuffer.addEventListener("updateend", this._onEvent);
            this._sourceBuffer.addEventListener("error", this._onEvent);
        }
    }
    appendBuffer(a) {
        if (a && a.length !== 0) {
            this._sourceBuffer?.appendBuffer(a);
        }
    }
    _getIsUpdating() {
        return this._sourceBuffer?.updating ?? false;
    }
    addEventListener(type, call){
      const s = this._event[type] = (this._event[type] || []);
      s.push(call)
    }
    _dp({ type }){
      const a = this._event[type] || []
      for (let i = 0; i < a.length; i++) {
        a[i](this)
      }
    }
}
