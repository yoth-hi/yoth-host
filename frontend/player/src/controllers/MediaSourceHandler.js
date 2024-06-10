import Dispose from "../utils/Dispose.js";
import Resource from "../utils/Resource.js";
import {
    getReadyStateMediaSource,
    isOpenedReadyStateMediaSource
} from "../utils/MediaSourceUtils.js";

export default class extends Dispose {
    listVideoBufferArray = [];
    constructor(a, b, c = false) {
        super();
        this.mediaElement = a;
        this.Ta = b;
        this.isView = c;
        this.K = 0;
        this.D = !1;
        this.G = !0;
        this.W = 0;
        this.callback = null;
        this.Z = !1;
        this.Ta || (this.gh = this.mediaElement.Fb());
        this.C = new Resource(
            this.Ta
                ? window.URL.createObjectURL(this.Ta)
                : this.gh.webkitMediaSourceURL,
            !0
        );
        a = this.Ta || this.gh;
        TC(this, a, ["sourceopen", "webkitsourceopen"], this.y$);
        TC(this, a, ["sourceclose", "webkitsourceclose"], this.x$);
        this.N = {
            updateend: this.S2
        };
    }
    getDuration() {
        var a;
        return (null == (a = this.Ta) ? void 0 : a.duration) || this.W;
    }
    _setDuration(a) {
        try {
            this.Ta
                ? (this.Ta.duration = a)
                : ((this.W = a), this.gh.webkitSourceSetDuration(a));
        } catch (b) {}
    }
    Pg() {
        try {
            return "closed" === getReadyStateMediaSource(this);
        } catch (a) {
            return !0;
        }
    }
    dk() {
        return !!((this.j && this.j.dk()) || (this.B && this.B.dk()));
    }
    isAsync() {
        return this.j ? !!this.j.supports(0) : FBa();
    }
    y$() {
        !this.isDisposed() &&
            isOpenedReadyStateMediaSource(this) &&
            this.callback &&
            (this.callback(this), (this.callback = null));
    }
    x$() {
        this.dispose();
    }
    S2(a) {
        if (CBa && !this.D && a.mm() && 0 === a.Ze().length) {
            var b;
            GL(
                this.mediaElement,
                {
                    l: "mswoue",
                    sr: null == (b = this.mediaElement.qa) ? void 0 : HL(b)
                },
                !1
            );
            a.Py();
            this.mm() ||
                ((this.mediaElement.wI = !0),
                this.mediaElement.setCurrentTime(0));
        }
    }
    EM() {
        return !!this.j.supports(2);
    }
    clear() {
        BBa(this, function () {});
        var a;
        null == (a = this.j) || a.clear();
        var b;
        null == (b = this.B) || b.clear();
    }
    mm() {
        var a, b;
        return (
            (null == (a = this.B) ? void 0 : a.mm()) ||
            (null == (b = this.j) ? void 0 : b.mm())
        );
    }
    Sz(a, b) {
        return !!this.j && !!this.B && this.j.Sz(b) && this.B.Sz(a);
    }
    
    _rrt(sourceBuff){
      if(this.t){
        this._sourceVideo.addEventListener("updateend", ()=>{
          this._sourceVideo.appendBuffer(this.listVideoBufferArray.shift())
        })
        this.t = true;
      }
    }
    _appendVideo(data) {
        this._rrt()
        while (data.length) {
          this.listVideoBufferArray.push(data.shift());
        }
        const h = this.mediaElement._getError()

        if (!this._sourceVideo._getIsUpdating() && !h) {
          this._sourceVideo.appendBuffer(this.listVideoBufferArray.shift())
        } else if(h){
          debugger
        }
    }
}
function TC(scope, a, arr, call) {
    for (; arr.length; ) {
        a.addEventListener(arr.shift(), function () {
            call.apply(scope, arguments);
        });
    }
}
