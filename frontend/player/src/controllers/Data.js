const GH = function(a) {
		var b = {},
			c;
		for (c in a) b[c] = a[c];
		return b
	};
export default class {
  constructor(data = {}){
    const b = {}, c = {};
    this.url = data.url || "";
		this.args = data.args || GH(b);
		this.assets = data.assets || {};
		this.attrs = data.attrs || GH(c);
		this.fallback = data.fallback || null;
		this.fallbackMessage = data.fallbackMessage || null;
		this.html5 = !!data.html5;
		this.disable = data.disable || {};
		this.loaded = !!data.loaded;
		this.messages = data.messages || {}
  }
}
export class ManagerData {
  
}