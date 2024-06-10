export default class {
  constructor(){
    this._list = {};
  }
  _dispach(name, data){
    const event = this._list[name]||[]
    for (let i = 0; i < event.length; i++) {
      event[i](data)
    }
  }
  _listen(name, callback, scope){
    const event = this._list[name] = this._list[name] || [];
    event.push(scope?callback.bind(scope):callback)
  }
}