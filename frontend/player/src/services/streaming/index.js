import Fetch from "./fetch.js";
import Xhr from "./xhr.js";

const MakeRequestStream = function () {
    return new Fetch(...arguments);
};

export default function (url_,init, t) {
    const url = url_.toString()
    return MakeRequestStream(url, init, t);
}
