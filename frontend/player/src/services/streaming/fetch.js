const w4a = function (a) {
    a._render
        .read()
        .then(a._onRender, a.onError)
        .then(void 0, console.error);
};
export default class Fetch_ {
    status = 0;
    _size = 0;
    _list = [];
    constructor(url, reqInit, timing) {
        this._timing = timing;
        this._onload = a => {
            if (a) {
                this.status = a.status;
                if (a.ok && a.body && 204 !== this.status) {
                    this.status = this.status || 242;
                    this._render = a.body.getReader();
                    w4a(this);
                } else {
                    this._onDone();
                }
            } else {
                throw new Error("null");
            }
        };
        this._onRender = a => {
            const { value, done } = a;
         //   debugger
            if (done) {
                this._onRender = void 0;
                this._onDone();
                this._timing._append(this._list);
            } else {
                this._size += value.length;
                value.length && this._list.push(value);
                w4a(this);
                this._timing._append(this._list);
            }
            //a.done ? (e.C = void 0, e.onDone()) : (f = f.value, e.B += f.length, e.j.append(f), w4a(e), f = (0, g.FD)(), f - e.Z > e.policy.j && (e.Z = f, e.Gb.St(h, e.B))))
        };
        this._start(url);
    }
    _start(url) {
        const req = new Request(url, {});
        fetch(req).then(this._onload);
    }
    _onDone() {
        this._timing._callback(this);
    }
}
