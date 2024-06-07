import { setCallback, createSource } from "../utils/MediaSourceUtils.js"
export default class {
  constructor(app){
    this._app = app;
  }
  _setCallback(mediaController){
    const callback = (scope_) => {
      this._srcObj = scope_;
      const time = this._app.getDuration()
      scope_._setDuration(time)
      this.opened = true;
      this._onSet()
      this._loaded?.()
    }
    setCallback(mediaController, callback)
  }
  _getDataPlayback(){
    const _video ={
    "itag": 134,
    "url": "https://rr2---sn-nupfcg-jo4e.googlevideo.com/videoplayback?expire=1717762239&ei=X6RiZqq-L6bf1sQP-Ky3qAg&ip=143.137.158.23&id=o-ABiPcTqQIjCXYkT-aDTrSqWNhmKvTyICyFTr0B1WMbgV&itag=134&aitags=133%2C134%2C135%2C136%2C160%2C242%2C243%2C244%2C247%2C278%2C298%2C299%2C302%2C303%2C597%2C598&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=9Q&mm=31%2C29&mn=sn-nupfcg-jo4e%2Csn-bg0ezn7e&ms=au%2Crdu&mv=m&mvi=2&pcm2cms=yes&pl=24&initcwndbps=1042500&bui=AbKP-1PP5ZFL3qTG9GJvizIfCMzaSgeHzSsnMS6hZfRyXglWIZ3yvFU7qplW2RupCplUUGlY5qPvzXdr&spc=UWF9f2fIApaDq6Hl7ya4Ed5_dv1SyPzV_0GsebReH2-DqMrxKo5rhhdr8jDY6tI&vprv=1&svpuc=1&mime=video%2Fmp4&ns=R7Gl-PzUNxvUnRsP92Rq6XYQ&rqh=1&gir=yes&clen=50015687&dur=2122.966&lmt=1717694657923102&mt=1717740278&fvip=5&keepalive=yes&c=MWEB&sefc=1&txp=5535434&n=olRU2JsozcVFYFCDg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAMe4pPdPR9hZLeNkpOqf7rNpV2B2uAYDFvvt0zhndeARAiA8AEegFAzJUmVtc58KywDB4luD3v5F9uP28roS8SWWJg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AHlkHjAwRQIhAMqxdbYlk-qLaeuRd_ViwVxCstbM0gQZ0cNMa5S2tRpFAiBKiqyk3zJnZCzFBAdyNw8gBDezNyIH_Zh-6UkwC42Gpw%3D%3D",
    "mimeType": "video/mp4; codecs=\"avc1.4d401e\"",
    "bitrate": 370159,
    "width": 640,
    "height": 360,
    "initRange": {
        "start": "0",
        "end": "740"
    },
    "indexRange": {
        "start": "741",
        "end": "5656"
    },
    "lastModified": "1717694657923102",
    "contentLength": "50015687",
    "quality": "medium",
    "fps": 30,
    "qualityLabel": "360p",
    "projectionType": "RECTANGULAR",
    "averageBitrate": 188474,
    "highReplication": true,
    "approxDurationMs": "2122966"
}
    const _audio = {};
    return { _video, _audio }
  }
  _onSet(){
    const { _video, _audio } = this._getDataPlayback();
    createSource(this, _video, _audio, this._getMediaController())
  }
  _getMediaController(){
    return this._srcObj
  }
}
