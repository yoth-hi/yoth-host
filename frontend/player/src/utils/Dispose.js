export default class Dispose {
    _disposed = false;
    _callbacks = [];
    isDisposed() {
        return this._disposed;
    }
    dispose() {
        this._disposed || ((this._disposed = true), this._dispose());
    }
    addOnDisposeCallback(callback, bind) {
        if (this._disposed) {
            if (bind) {
                callback.apply(bind);
            } else {
                callback(bind);
            }
        } else {
            this._callbacks.push(bind ? callback.bind(bind) : callback);
        }
    }
    _dispose() {
        while (this._callbacks.length) {
            this._callbacks.shift()();
        }
    }
}
