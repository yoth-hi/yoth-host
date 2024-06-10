export default class {
  constructor(tag){
    this._tag = tag;
  }
  debug(){
    console.log(`[${this._tag}]: ${[...arguments].join("-")}`)
  }
}