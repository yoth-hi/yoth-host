const list = {};
import Dispose from "./src/utils/Dispose.js";
import MediaController from "./src/controllers/mediaController.js"
import CreateMedia from "./src/controllers/VideoController.js"
import { SetNotResetMediaSource } from "./src/utils/Config.js";
class Player extends Dispose {
    constructor(element) {
        super();
        this._mediaController = new MediaController(this)
        CreateMedia(this)
        this._init();
    }
    static create(element) {
        const name = "player" + 1;
        const playerO = list[name];
        if (playerO) {
            playerO.dispose();
            delete list[name];
        }
        const newPlayer = new Player(element);
        newPlayer.addOnDisposeCallback(() => {
            delete list[name];
        });
        return (list[name] = newPlayer);
    }
    _dispose() {
        super._dispose();
    }
    _init() {
        SetNotResetMediaSource(false);
        Error.stackTraceLimit = 25;
    }
    _get(key) {
        debugger;
    }
    getDuration(){
      return 10000e2
    }
}

console.log(Player.create(document.body));
