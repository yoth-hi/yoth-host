export default class {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.length = end - start + 1;
    }
    toString() {
        return this.start + "-" + (this.end ?? "");
    }
}
