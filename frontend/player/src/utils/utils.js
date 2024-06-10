import Data from "../controllers/Data.js"
export const window_ = window;
export const now =
    window_.Y && window_.Y.now
        ? window_.Y.now
        : window_.performance &&
          window_.performance.timing &&
          window_.performance.now &&
          window_.performance.timing.navigationStart
        ? function () {
              return (
                  window_.performance.timing.navigationStart +
                  window_.performance.now()
              );
          }
        : function () {
              return new Date().getTime();
          };
export class Url {
    url = "";
    constructor(url_) {
        const url = new URL(url_);
        this.host = url.host;
        this._origin = url.origin;
        const params = new URLSearchParams(url.search);
        this._listQuerys = {};
        params.forEach((value, key) => {
            this._listQuerys[key] = value;
        });
    }
    set(key, value) {
        this._listQuerys[key] = value;
    }
    toString(){
      return this._origin + ((x) => {
        let u = "?"
        for (let i = 0; i < x.length; i++) {
          const key = x[i]
          const value = this._listQuerys[key];
          u += key + "=" + encodeURIComponent(value) + "&"
        }
        return u;
      })(Object.keys(this._listQuerys))
    }
    _clone(){
      const url = new Url(this.toString())
      return url
    }
}

export function ManagerData(a) {
		a instanceof Data || (a = new Data(a));
		return a
};