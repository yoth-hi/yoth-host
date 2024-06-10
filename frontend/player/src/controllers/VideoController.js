import VideoManager from "./VideoManager.js";
class VideoController extends VideoManager {
    constructor(a) {
        super();
        this.j = a; // HTMLVideoElement
        this.G = {};
        this.listener = (c) => {
            this.dispatchEvent(new Event(c.type))//new vV(b, c.type, c));
        };
        this.j.preload = "auto"
    }
    Ou() {
        return !0;
    }
    isView() {
        return !1;
    }
    bR() {
        return !1;
    }
    Fb() {
        return this.j;
    }
    Df() {
        return this.j.src;
    }
    DG(a) {
        var b = this.getPlaybackRate();
        this.j.src = a;
        this.setPlaybackRate(b);
    }
    gK() {
        this.j.removeAttribute("src");
    }
    getPlaybackRate() {
        try {
            return 0 <= this.j.playbackRate ? this.j.playbackRate : 1;
        } catch (a) {
            return 1;
        }
    }
    setPlaybackRate(a) {
        this.getPlaybackRate() !== a && (this.j.playbackRate = a);
        return a;
    }
    Us() {
        return this.j.loop;
    }
    setLoop(a) {
        this.j.loop = a;
    }
    canPlayType(a, b) {
        return this.j.canPlayType(a, b);
    }
    isPaused() {
        return this.j.paused;
    }
    Uf() {
        return this.j.seeking;
    }
    Ph() {
        return this.j.ended;
    }
    YH() {
        return this.j.muted;
    }
    pB(a) {
        oBa();
        this.j.muted = a;
    }
    _getPlayed() {
        return this.j.played || rL([], []);
    }
    getBuffered() {
        try {
            var a = this.j.buffered;
        } catch (b) {}
        return a || rL([], []);
    }
    GD() {
        return this.j.seekable || rL([], []);
    }
    CG() {
        var a = this.j;
        return a.getStartDate ? a.getStartDate() : null;
    }
    getCurrentTime() {
        return this.j.currentTime;
    }
    setCurrentTime(a) {
        this.j.currentTime = a;
    }
    getDuration() {
        return this.j.duration;
    }
    load() {
        var a = this.j.playbackRate;
        try {
            this.j.load();
        } catch (b) {}
        this.j.playbackRate = a;
    }
    pause() {
        this.j.pause();
    }
    play() {
        var a = this.j.play();
        if (!a || !a.then) return null;
        a.then(void 0, function () {});
        return a;
    }
    _getReadyState() {
        return this.j.readyState;
    }
    ZH() {
        return this.j.networkState;
    }
    ph() {
        return this.j.error ? this.j.error.code : null;
    }
    _getError() {
        return this.j.error ? this.j.error.message : "";
    }
    getVideoPlaybackQuality() {
        if (
            window.HTMLVideoElement &&
            this.j instanceof window.HTMLVideoElement &&
            this.j.getVideoPlaybackQuality
        )
            return this.j.getVideoPlaybackQuality();
        if (this.j) {
            var a = this.j,
                b = a.webkitDroppedFrameCount;
            if ((a = a.webkitDecodedFrameCount))
                return {
                    droppedVideoFrames: b || 0,
                    totalVideoFrames: a
                };
        }
        return {};
    }
    Oh() {
        return !!this.j.webkitCurrentPlaybackTargetIsWireless;
    }
    nu() {
        return !!this.j.webkitShowPlaybackTargetPicker();
    }
    togglePictureInPicture() {
        var a = this.j,
            b = window.document;
        window.document.pictureInPictureEnabled
            ? this.j !== b.pictureInPictureElement
                ? a.requestPictureInPicture()
                : b.exitPictureInPicture()
            : nBa() &&
              a.webkitSetPresentationMode(
                  "picture-in-picture" === a.webkitPresentationMode
                      ? "inline"
                      : "picture-in-picture"
              );
    }
    Ws() {
        var a = this.j;
        return new g.le(a.offsetLeft, a.offsetTop);
    }
    getSize() {
        return g.is(this.j);
    }
    setSize(a) {
        g.hs(this.j, a);
    }
    getVolume() {
        return this.j.volume;
    }
    setVolume(a) {
        oBa();
        this.j.volume = a;
    }
    sN(a) {
        this.G[a] ||
            (this.j.addEventListener(a, this.listener),
            (this.G[a] = this.listener));
    }
    setAttribute(a, b) {
        this.j.setAttribute(a, b);
    }
    removeAttribute(a) {
        this.j.removeAttribute(a);
    }
    hasAttribute(a) {
        return this.j.hasAttribute(a);
    }
    gD() {
        return LC(this.j);
    }
    ls(a) {
        g.Mu(this.j, a);
    }
    ID(a) {
        return g.$r(this.j, a);
    }
    NO() {
        return g.pf(document.body, this.j);
    }
    audioTracks() {
        var a = this.j;
        if ("audioTracks" in a) return a.audioTracks;
    }
    _dispose() {
        for (
            var a = g.u(Object.keys(this.G)), b = a.next();
            !b.done;
            b = a.next()
        )
            (b = b.value), this.j.removeEventListener(b, this.G[b]);
        super._dispose()
    }
    _setDisableRemotePlayback(a) {
        this.j.disableRemotePlayback = a;
    }
}

export { VideoController };
export default function (app) {
    app.mediaElement = new VideoController(document.createElement("video"));
    app.mediaElement.Iq();
    app._mediaController._setMediaElement(app.mediaElement)
    const media = app.mediaElement.Fb()
    media.controls = true
    document.body.appendChild(media)
}
