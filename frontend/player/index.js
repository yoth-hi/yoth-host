const list = {};
import Dispose from "./src/utils/Dispose.js";
import MediaController from "./src/controllers/mediaController.js";
import StartPlayback from "./src/utils/StartPreparePlayback.js";
import Logger from "./src/utils/Logger.js";
import { SetNotResetMediaSource } from "./src/utils/Config.js";
import { ManagerData } from "./src/utils/utils.js";
import E from "./src/utils/Event.js";
import { Controller } from "./src/utils/Data.js";
class Player extends Dispose {
    constructor(element, data, c, d) {
        super();
        this._logger = new Logger("App");
        this._config = ManagerData(data || {});
        this._event = new E(this, d);
        const args = this._config.args || {};
        this._mediaController = new MediaController(this);
        StartPlayback(this);
        this._init();
    }
    static create(element, data) {
        const name = "player" + 1;
        const playerO = list[name];
        if (playerO) {
            playerO.dispose();
            delete list[name];
        }
        const newPlayer = new Player(element, data);
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
    getDuration() {
        return 60 * 60 * 12;
    }
    _set1(a, b, c = undefined) {
      var d = this,
			e = this.Sb;
        return new Controller(
            this.X,
            a,
            e,
            this.template,
            function (f) {
                return d.Br.oa.apply(
                    d.Br,
                    [f].concat(g.oa(g.Ia.apply(1, arguments)))
                );
            },
            function () {
                return d.Ua.getVisibilityState();
            },
            this.visibility,
            this,
            b,
            c
        );
    }
    _dispach(name, data) {
        this._event._dispach(name, data);
    }
    addEventListener(name, call) {
        this._event._listen(name, call);
    }
}

window.player = Player;
window.t?.();
