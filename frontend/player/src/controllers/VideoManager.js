import Dispose from "../utils/Dispose.js"
import MediaSourceHandler from "./MediaSourceHandler.js"
import { moveDisableAirplay, notResetMediaSource, supportManagedMediaSource } from "../utils/Config.js"
const NBa = function(a, b) {
		a.resource && a.resource.equals(b) || (a.resource && a.resource.dispose(), a.resource = b)
	};
export const	getBufferedTime = function(a) {
		return a && a.length ? a.end(a.length - 1) : NaN
	};
	const vL = function(a, b) {
		if (!a) return NaN;
		b = tL(a, b);
		return 0 <= b ? a.end(b) : NaN
	};
	const tL = function(a, b) {
		if (!a) return -1;
		try {
			for (var c = 0; c < a.length; c++)
				if (a.start(c) <= b && a.end(c) >= b) return c
		} catch (d) {}
		return -1
	};
export default class VideoManager extends Dispose {
    constructor() {
      super()
        this.wI = !1;
        this.resource = null;
        this._hasEventVolumeChange = this.K = !1;
      this.D = {}///new g.Dd();
        this.qa = null;

    }

    BG() {
        return this.resource;
    }

    Dy(a) {
        var b = "";
        a && (NBa(this, a), (b = a.resource));
        if (!this.Df() || b) {
            b && this.Df() !== b && (this.DG(b), delete this.B, this.C && (this.C.reject(), delete this.C), moveDisableAirplay && supportManagedMediaSource && !window.MediaSource && window.ManagedMediaSource && this._setDisableRemotePlayback(!(null == a || !a.j))), (a && a.j) || this.load(), this._hasEventVolumeChange || (this.addEventListener("volumechange", this.lV), (this._hasEventVolumeChange = !0));
        }
                
    }

    Iq(a, b) {
        if (this.B) {
            if (tjb && IL(this.B) && !this.B.Sz(a, b)) {
                var c;
                GL(this, {
                    l: "megms",
                    sr: null == (c = this.qa) ? void 0 : HL(c)
                });
                LBa(this);
                this.stopVideo();
            } else {
                return (this.Ta = this.B), (this.B = void 0), this.Ta;
            }
        }
        a = window.MediaSource ? new MediaSourceHandler(this, new window.MediaSource(), !1) : EL && window.ManagedMediaSource ? new MediaSourceHandler(this, new window.ManagedMediaSource(), !1) : window.WebKitMediaSource ? new MediaSourceHandler(this, new window.WebKitMediaSource(), !1) : new MediaSourceHandler(this, void 0, !1);
        this.Dy(a.C);
        this.Ta = a;
        this.wI = !1;
        return a;
    }

    playVideo() {
        var a = this;
        this.Ph() && this.seekTo(0);
        !this.Df() && this.resource && (g.KF(Error("playVideo without src")), this.DG(this.resource.resource), this.resource.j || this.load());
        var b = this.play(),
            c;
        (null == (c = this.qa) ? 0 : c.L("html5_remove_ios_7_hack_force_play")) || (!b && iW && 7 <= (rT || 0) && lBa(this, function () {
            g.aC(function () {
                MBa(a, a.getCurrentTime(), 0);
            }, 500);
        }));
        return b;
    }

    seekTo(a) {
        0 < this.Ck() && (iW && 4 > rT && (a = Math.max(0.1, a)), this.setCurrentTime(a));
    }

    oo() {
        if (!this.B && this.Ta) {
            if (this.Ta.G) {
                try {
                    var a;
                    GL(this, {
                        l: "mer",
                        sr: null == (a = this.qa) ? void 0 : HL(a),
                        rs: JL(this.Ta)
                    });
                    this.Ta.clear();
                    this.B = this.Ta;
                    this.Ta = void 0;
                } catch (b) {
                    (a = new g.eD("Error while clearing Media Source in MediaElement: " + b.name + ", " + b.message)), g.KF(a), this.stopVideo();
                }
            } else {
                this.stopVideo();
            }
        }
    }

    stopVideo() {
        var a = this;
        if (!this.B) {
            var b;
            null == (b = this.Ta) || IBa(b);
            if (ujb) {
                if (!this.C) {
                    var c = new KL();
                    c.then(void 0, function () {});
                    this.C = c;
                    vjb && this.pause();
                    g.aC(function () {
                        a.C === c && (QBa(a), c.resolve());
                    }, 200);
                }
            } else {
                QBa(this);
            }
        }
    }

    sz() {
        var a = this.getBuffered();
        return 0 < getBufferedTime(a) && this.getDuration() ? vL(a, this.getCurrentTime()) : 0;
    }

    _getLoadedFraction() {
        var a = this.getDuration();
        return Infinity === a ? 1 : a ? this.sz() / a : 0;
    }

    pc() {
        try {
            var a = this.getSize();
            return {
                vct: this.getCurrentTime().toFixed(3),
                vd: this.getDuration().toFixed(3),
                vpl: sL(this.Lv(), ",", 3),
                vbu: sL(this.getBuffered()),
                vpa: "" + +this.isPaused(),
                vsk: "" + +this.Uf(),
                ven: "" + +this.Ph(),
                vpr: "" + this.getPlaybackRate(),
                vrs: "" + this.Ck(),
                vns: "" + this.ZH(),
                vec: "" + this.ph(),
                vemsg: this._getError(),
                vvol: "" + this.getVolume(),
                vdom: "" + +this.NO(),
                vsrc: "" + +!!this.Df(),
                vw: "" + a.width,
                vh: "" + a.height
            };
        } catch (b) {
          console.error(b)
            return {};
        }
    }

    hasError() {
        return 0 < this.ph();
    }

    addEventListener(a, b) {
        const ev = this.D[a] || (this.D[a] = []);
        ev.push(b)
        this.sN(a);
    }

    removeEventListener(a, b) {
        const ev = this.D[a]
        if(ev){
          for (let i = 0; i < ev.length; i++) {
            if(b === ev[i]){
              delete ev[i];
              break;
            }
          }
        }
    }

    dispatchEvent(a) {
        if (this.C && "pause" === a.type) return !1;
       /* if (notResetMediaSource) {
            var b,
                c = (null == (b = a.j) ? void 0 : b.timeStamp) || Infinity;
            b = c > performance.now() ? c - Date.now() + performance.now() : c;
            c = this.B || this.Ta;
            if ((null == c ? 0 : c.mm()) || b <= ((null == c ? void 0 : c.K) || 0)) {
                var d;
                GL(this, {
                    l: "mede",
                    sr: null == (d = this.qa) ? void 0 : HL(d),
                    et: a.type
                });
                return !1;
            }
            if (this.wI) return (GL(this, {
                l: "medes",
                et: a.type
            }), c && "seeking" === a.type && ((c.K = performance.now()), (this.wI = !1)), !1);
        }*/
        
        const ev = this.D[a.type]
        if(ev){
          for (let i = 0; i < ev.length; i++) {
            ev[i](a)
          }
        }
    }

    oN() {
        this.K = !1;
    }

    jN() {
        this.K = !0;
        this.pB(!0);
    }

    lV() {
        this.K && !this.YH() && this.pB(!0);
    }

    equals(a) {
        return !!a && a.Fb() === this.Fb();
    }

    _dispose() {
        this._hasEventVolumeChange && this.removeEventListener("volumechange", this.lV);
        ujb && QBa(this);
        super._dispose()
    }
}