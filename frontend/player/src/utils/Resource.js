export default class {
    B = false;
    constructor(resource, b) {
        this.resource = resource;
        this.j = b ?? false;
    }
    dispose() {
        if (!this.isDisposed) {
            if (this.j)
                try {
                    URL.revokeObjectURL(this.resource);
                } catch (a) {}
            this.B = !0;
        }
    }
    isDisposed() {
        return this.B;
    }
    equals(a) {
        return null !== a && a.resource === this.resource;
    }
    toString() {
        return "MediaResource {" + this.resource + "}";
    }
}
