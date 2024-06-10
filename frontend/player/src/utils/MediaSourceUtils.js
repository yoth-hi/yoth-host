import { setTimeout } from "./interval.js";
import Streaming from "../services/streaming.js";
import { Url } from "./utils.js";
import Range from "./Renge.js";
import SourceBuffer from "./SourceBuffer.js";
import { getBufferedTime } from "../controllers/VideoManager.js";
import { formats } from "./adaptiveFormats.js";
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
const U = "http://localhost:3000"
let Q = 22
function checkBufferStatus(_mediaElement) {
  const currentTime = _mediaElement.getCurrentTime();
  const buffered = _mediaElement.getBuffered();
  const bufferingThreshold = Q;
  
  let bufferEnd = 0;
  
  // Encontrar o final do buffer atual
  for (let i = 0; i < buffered.length; i++) {
    if (buffered.start(i) <= currentTime && currentTime <= buffered.end(i)) {
      bufferEnd = buffered.end(i);
      break;
    }
  }
  
  // Verificar se falta 0,5 segundos para terminar o buffer ou se currentTime não está em nenhum intervalo bufferizado
  if ((bufferEnd - currentTime) <= bufferingThreshold || bufferEnd === 0) {
    for (let i = 0; i < buffered.length; i++) {
      if (buffered.start(i) <= currentTime && currentTime <= buffered.end(i)) {
        return [buffered.start(i), buffered.end(i)];
      }
    }
    return [currentTime, currentTime]; // Caso currentTime não esteja em nenhum intervalo bufferizado
  }

  return null;
}
let t = 0;
export function UpdateTime(scope) {
    const { _mediaElement, _app, _streamingStartController } = scope;
    const callback = () => {
        const { _video } = _streamingStartController._getDataPlayback();
        const a = formats[_video.itag] ?? _video;
        const rg = (scope[`itag:${_video.itag}`] = scope[`itag:${_video.itag}`] || new Url(U||_video.url))._clone();
        
        const u = checkBufferStatus(_mediaElement)
        console.log(u)
        
         if (!_mediaElement.can &&( u|| !_mediaElement._isStarted)) {
        const start = t;
        const end = t += 1e16
        t += 1
        const range = new Range(Math.floor(start), Math.floor(end));
        rg.set("range", range);
     //   debugger
          scope.currentTime = _mediaElement.getCurrentTime() || 0;
        _mediaElement.can = true;
        const req = new Streaming(
            rg,
            {},
            function () {
                _mediaElement.can = false;
            },
            _streamingStartController
        );
        _mediaElement._isStarted = true;
        }
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
const canMakeARequestStream = mediaElement => {
    const buffered = mediaElement.getBuffered();
    const currentTime = mediaElement.getCurrentTime();
    for (let i = 0; i < buffered.length; i++) {
        if (
            buffered.start(i) <= currentTime &&
            buffered.end(i) >= currentTime
        ) {
            const bufferEnd = buffered.end(i);
            const timeRemaining = bufferEnd - currentTime;
            return timeRemaining; // Retorna true se o buffer restante for menor que 2 segundos
        }
    }
    return false;
};
const getDu_ = mediaElement => {
    const buffered = mediaElement.getBuffered();
    const currentTime = mediaElement.getCurrentTime();
    for (let i = 0; i < buffered.length; i++) {
        if (
            buffered.start(i) <= currentTime &&
            buffered.end(i) >= currentTime
        ) {
            const bufferEnd = buffered.end(i);
            const timeRemaining = bufferEnd - currentTime;
            return Math.max(0, timeRemaining); // Retorna true se o buffer restante for menor que 2 segundos
        }
    }
    return 0;
};
function canFetchChunk(bitrateMbps, chunkDurationSeconds, mediaElement) {
    const currentBufferedTime =
        Math.max(
            0,
            mediaElement.getCurrentTime() +
                canMakeARequestStream(mediaElement) -
                1
        ) * 0.955;
    const totalDuration = mediaElement.getDuration();
    const isLive = totalDuration === Infinity;

    // Calcular o tamanho do chunk em bits
    const chunkSizeBits = bitrateMbps * chunkDurationSeconds * 1e6; // 1 Mbps = 1e6 bits/second

    // Calcular o tempo necessário para baixar o chunk
    const timeToDownloadChunkSeconds = chunkSizeBits / (bitrateMbps * 1e6);
    // t = 2_000_000 /
    const S = bitrateMbps * 1e6;
    if (isLive) {
        // Para transmissões ao vivo, assumimos que sempre podemos baixar o próximo chunk
        const start = currentBufferedTime;
        const end = start + chunkDurationSeconds;
        return [start * S, end * S];
    } else {
        // Para VOD, verificamos se há tempo suficiente no buffer para baixar o próximo chunk
        const bufferAhead = totalDuration - currentBufferedTime;
           if (bufferAhead >= timeToDownloadChunkSeconds) {
            // Calcular o range [start, end]
            const start = currentBufferedTime;
            const end = start + chunkDurationSeconds;
            return [start * S, end * S];
        } else {
            // Não é possível baixar o próximo chunk a tempo
            return null;
        }
    }
}
