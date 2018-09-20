
const kElements = Symbol('elements');
const kVertexSize = Symbol('vertexSize');

class VertexFormat {
    static TYPE_FLOAT = 1;

    constructor() {
        this[kElements] = [];
        this[kVertexSize] = 0;
    }

    vertexSize(vertexSize) {
        this[kVertexSize] = vertexSize;
        return this;
    }

    addElement(type, size, stride) {
        this[kElements].push({ type, size, stride });
        return this;
    }
}

export default VertexFormat;
