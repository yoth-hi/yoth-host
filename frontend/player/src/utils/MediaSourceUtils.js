import { setTimeout } from "./interval.js";
import Streaming from "../services/streaming.js";
import { Url } from "./utils.js";
import Range from "./Renge.js";
import SourceBuffer from "./SourceBuffer.js";

const qBa = function (a) {
    return 0 <= a.indexOf("/mp4")
        ? 1
        : 0 <= a.indexOf("/webm")
        ? 2
        : 0 <= a.indexOf("/x-flv")
        ? 3
        : 0 <= a.indexOf("/vtt")
        ? 4
        : 0;
};
const constructorRange = function () {};

export function setCallback(scope, callback) {
    if (isOpenedReadyStateMediaSource(scope)) {
        setTimeout(function () {
            callback(scope);
        }, 0);
    } else {
        scope.callback = callback;
    }
}
export function isOpenedReadyStateMediaSource(a) {
    try {
        return "open" === getReadyStateMediaSource(a);
    } catch (b) {
        return !1;
    }
}
export function getReadyStateMediaSource(a) {
    if (a.Ta) return a.Ta.readyState;
    switch (a.gh.webkitSourceState) {
        case a.gh.SOURCE_OPEN:
            return "open";
        case a.gh.SOURCE_ENDED:
            return "ended";
        default:
            return "closed";
    }
}
export function UpdateTime(scope) {
    const { _mediaElement, _app, _streamingStartController } = scope;
    const callback = () => {
        scope.l || (scope.l = 0);
        const { _video, _audio } = _streamingStartController._getDataPlayback();
        const url_ = new Url(
            "http://localhost:3000?u=" + encodeURIComponent(_video.url)
        );
        const data = _video.bitrate * 1;
        if(!_mediaElement.can && ((!_mediaElement._isStarted) || canMakeARequestStream(_mediaElement))){
        const url1 = url_._clone();
        const j = scope.l + data;
        const range = new Range(scope.l, scope.l = Math.min(_video.contentLength ?? 1e100, j));
        url1.set("range", range.toString());
          _mediaElement.can = true;
        const req = new Streaming(
            url1,
            {},
            function () {
                _mediaElement.can = false
            },
            _streamingStartController
        );
        _mediaElement._isStarted = true
        };
    };
    _streamingStartController.opened
        ? callback()
        : (_streamingStartController._loaded = callback);
}
export function createSource(scope, video, _audio, mediaController) {
    const { Ta } = mediaController;
    const mimeType = video.mimeType;
    let sourceVideo;
    if (Ta) {
        sourceVideo = Ta.addSourceBuffer(mimeType);
    }
    const l = new SourceBuffer(
        sourceVideo,
        mediaController.gh,
        "0",
        qBa(mimeType),
        null,
        !1
    );
    mediaController._sourceVideo = l;
}
const canMakeARequestStream = (mediaElement) => {
  const buffered = mediaElement.getBuffered()
  const currentTime = mediaElement.getCurrentTime()
  for (let i = 0; i < buffered.length; i++) {
            if (buffered.start(i) <= currentTime && buffered.end(i) >= currentTime) {
                const bufferEnd = buffered.end(i);
                const timeRemaining = bufferEnd - currentTime;
                return timeRemaining < 2; // Retorna true se o buffer restante for menor que 2 segundos
            }
        }
        return false;
}