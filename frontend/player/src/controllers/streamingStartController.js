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
    "url": "https://rr2---sn-nupfcg-jo4e.googlevideo.com/videoplayback?expire=1718001325&ei=TUpmZpe-HqOe-LAPicetqAk&ip=143.137.158.23&id=o-AAuOREie3B_TGWfhZ7tKrFljQ1pLZ2nN2vcpGk81fp1P&itag=134&aitags=133%2C134%2C135%2C136%2C160%2C242%2C243%2C244%2C247%2C278%2C298%2C299%2C302%2C303%2C394%2C395%2C396%2C397%2C398%2C399%2C597%2C598&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=2H&mm=31%2C29&mn=sn-nupfcg-jo4e%2Csn-bg0eznzy&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=781250&bui=AbKP-1NOfmg2y3ZfPgGKJEIbJhtVidGUFKWee8DelvM2lnPdiVZlNx88oz-d7D-et9hFnEO9yA6JPhAI&spc=UWF9f9U3AqyOhLEH_YH6bZ44qfz__23QRuW7S0a13X3tKH38xYWCSEPAGo6YOxk&vprv=1&svpuc=1&mime=video%2Fmp4&ns=xOUiitrFZh-aJXwrBotIlfMQ&rqh=1&gir=yes&clen=55639632&dur=1104.504&lmt=1621121412376047&mt=1717979318&fvip=3&keepalive=yes&c=MWEB&sefc=1&txp=5535434&n=JaWbXG9d_KWR_SqP1&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgLzIvw0qVQPB0IW5fZvuXye1tv0xUiAkOneOLjRBCeYkCIAypr4UYnjA3QleLN3H8DmiG7To5p4ljKwrZDVCrCSog&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHlkHjAwRQIhAPqrZU04JEpM67ib6CdtIfQ_xWMPOxEEt9YxfYf_UIgKAiBG6aPMyQDPga6ikejNxwmNN_-38ZoRCWYKeRDRf5ICuw%3D%3D",
    "mimeType": "video/mp4; codecs=\"avc1.4d401e\"",
    "bitrate": 668628,
    "width": 640,
    "height": 360,
    "initRange": {
        "start": "0",
        "end": "739"
    },
    "indexRange": {
        "start": "740",
        "end": "3435"
    },
    "lastModified": "1621121412376047",
    "contentLength": "55639632",
    "quality": "medium",
    "fps": 30,
    "qualityLabel": "360p",
    "projectionType": "RECTANGULAR",
    "averageBitrate": 403001,
    "highReplication": true,
    "approxDurationMs": "1104504"
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
