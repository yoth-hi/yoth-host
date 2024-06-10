import { addEventListenerVisibilityStateChange } from "./visibilitystate.js";
import { setTimeout } from "./interval.js";
import { now } from "./utils.js";
export default function (a, args) {
    var response = args.response;
    var Qc = response.videoDetails;
    if (Qc) {
        const data = {};
        const ki = Qc.title;
        ki && ((a.title = ki), data.title || (data.title = ki));
        const lengthSeconds = Number(Qc.lengthSeconds);
        lengthSeconds &&
            ((a.lengthSeconds = lengthSeconds),
            data.length_seconds || (data.length_seconds = lengthSeconds));
        const isLive = Qc.isLive;
        null != isLive && (a.isLivePlayback = isLive);
    }
}
const qab = function (a) {
    return a._mediaElement && a._mediaElement.Ou()
        ? a._mediaElement.Fb()
        : null;
};
const Qab = () => {};
const TG = (a, b) => {
    return !!(a.state & b);
};
class NL {
    constructor(state) {
        this.state = state || 64;
    }
}
const tL = function (a, b) {
    if (!a) return -1;
    try {
        for (var c = 0; c < a.length; c++)
            if (a.start(c) <= b && a.end(c) >= b) return c;
    } catch (d) {}
    return -1;
};
const SBa = function(a, b, c, d) {
		if (d = 1 < d) a.B = !0;
		if (a.j) b !== a.mediaTime && (a.j = !1);
		else if (0 < b && a.mediaTime === b) return c - a.timeStamp > (d || !a.B ? 1500 : 400);
		a.mediaTime = b;
		a.timeStamp = c;
		return !1
	};
const vL = function (a, b) {
    if (!a) return NaN;
    b = tL(a, b);
    return 0 <= b ? a.end(b) : NaN;
};
const xL = function (a, b) {
    a = vL(a, b);
    return 0 <= a ? a - b : 0;
};
const ML = function (a) {
    return xL(a.getBuffered(), a.getCurrentTime());
};
const w0 = function(a, b) {
		return b > a.mediaTime + a.C && b < a.mediaTime + 5
	};
	const ut = (a, b) => {
	    var c = a._mediaElement.pc();
			c.omt = (a._mediaElement.getCurrentTime() + a.Pc()).toFixed(3);
		debugger
	}
export class Controller {
    constructor(a, b, c, d, e, f, h, l, m, n) {
        this.videoData = m;
        this.playerType = b;
        this.playerState = new NL();
        this._mediaElement = null;
        this.tamplate = d;
        this.NC = {
          C: 0
        };
        addEventListenerVisibilityStateChange(this._onVisibilityState);
    }
    _onVisibilityState() {
        debugger;
    }
    _setMediaElement(_mediaElement) {
        if (_mediaElement) {
            this._mediaElement = _mediaElement;
            Lab(this);
        }
    }
    Pc() {
		return this.timestampOffset = 0
	};
    _dispach({ type }) {
      ut(this, type)
        switch (type) {
            case "durationchange":
                const duration = this._mediaElement.getDuration();
                isFinite(duration) &&
                    (!this.Ta || 0 < duration) &&
                    1 !== duration &&
                    this._setDuration(duration);
                break;
            case "timeupdate":
                const isStart =
                    this._mediaElement && !this._mediaElement.getCurrentTime();
                const hasNoData =
                    this._mediaElement &&
                    0 === this._mediaElement._getReadyState();
                if (isStart && (!this.nJ || hasNoData)) return;
                this.nJ = this.nJ || !!this._mediaElement.getCurrentTime();
                this._onTimeUpdate();
                break;

            default:
            // code
        }
    }
    bf(a) {
        var b = g.sU(this, a);
        return b
            ? this.Ff(b)
                ? ((b = a1(this, b)),
                  b.bf() - b.getCurrentTime() + this.getCurrentTime(a))
                : b.bf()
            : 0;
    }
    _onTimeUpdate(is = false) {
        if (this._mediaElement && this.videoData) {
            const currentTime = this._getCurrentTime();

            const pause = this._mediaElement.isPaused();

            const on = () => {
                if (this._mediaElement && !TG(this.playerState, 128)) {
                    const m = TG(this.playerState, 8);
                    const e = this._getCurrentTime();
                    const fg7 = ML(this._mediaElement);
                    const hh = w0(this.NC, e);
                    const p = SBa(this.NC, e, now(), fg7);
                    console.log(p,hh, this.NC);
                    //this._onTimeUpdate()
                }
            };
            0 === this._mediaElement._getPlayed().length
                ? setTimeout(on, 100)
                : setTimeout(on, 500);
            this.videoData._currentTime = currentTime;
            !is && this._isPlaying() && Qab(this);
        }
    }
    _isPlaying() {
        return !this._mediaElement.isPaused();
    }
    _getCurrentTime() {
        return this._mediaElement.getCurrentTime();
    }
    _setDuration(duration) {
        if (this.videoData.lengthSeconds !== duration) {
            this.videoData.lengthSeconds = duration; //, P0(this))
        }
    }
}
const Lab = function (a) {
    const eventList =
        "loadstart loadedmetadata play playing progress pause ended suspend seeking seeked timeupdate durationchange ratechange error waiting resize".split(
            " "
        );
    for (let i = 0; i < eventList.length; i++) {
        const eventName = eventList[i];
        a._mediaElement.addEventListener(eventName, a._dispach.bind(a));
    }
    //a.X.Jl && a.mediaElement.Ou() && (a.JB.T(a.mediaElement, "webkitplaybacktargetavailabilitychanged", a.s8, a), a.JB.T(a.mediaElement, "webkitcurrentplaybacktargetiswirelesschanged", a.t8, a))
};
