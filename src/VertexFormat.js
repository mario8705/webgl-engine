
const kElements = Symbol('elements');
const kVertexSize = Symbol('vertexSize');

class VertexFormat {
    static TYPE_FLOAT = 1;

    constructor() {
        this[kElements] = [];
        this[kVertexSize] = 0;
    }

    static typeSize(type) {
        switch (type) {
        case VertexFormat.TYPE_FLOAT:
            return 4;

        default:
            return null;
        }
    }

    // TODO autocalculate vertex size if not specified

    vertexSize(vertexSize) {
        this[kVertexSize] = vertexSize;
        return this;
    }

    addElement(type, size, offset, location) {
        this[kElements].push({ type, size, offset, location });
        return this;
    }

    create() {
        return {
            vertexSize: this[kVertexSize],
            elements: this[kElements],
        };
    }
}

export default VertexFormat;
