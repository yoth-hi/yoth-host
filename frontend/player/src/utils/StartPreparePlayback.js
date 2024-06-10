import CreateMedia from "./../controllers/VideoController.js"
import Data from "./Data.js"
export default function (app) {
  CreateMedia(app)
  StartInitializeApplicationPlayback(app)
}
class dataVp {
  constructor(a, data){
    this.ariaLabel = "";
    this.clipStart = 0;
		this.clipEnd = Infinity;
		this.captionTracks = [];
		Data(this, data)
  }
}
export function created(a) {
		var b = new dataVp(a.X, a._config.args);
		a._event._dispach("initialvideodatacreated", b);
		return a._set1(1, b)
};

function StartInitializeApplicationPlayback(app){
  app._logger.debug("start initialize application playback");
  const h = created(app)
  app._controllerMediaElement = h;
  if(app.mediaElement){
    h._setMediaElement(app.mediaElement)
  }
}
