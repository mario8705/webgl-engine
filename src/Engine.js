import Shader from './Shader';
import Mesh from './Mesh';

class Engine {
    constructor(width, height) {
        this.view = document.createElement('canvas');
        this.view.setAttribute('width', this.width = width);
        this.view.setAttribute('height', this.height = height);
        this.onRender = () => {};

        this.gl = this.view.getContext('webgl') || this.view.getContext('experimental-webgl');

        this.render();
    }

    initShader(vertexShaderSource, fragmentShaderSource) {
        return Shader.initShader(this.gl, vertexShaderSource, fragmentShaderSource);
    }

    createMesh(vertices, format) {
        return Mesh.createMesh(this.gl, vertices, format);
    }

    render() {
        this.onRender(this.gl);

        window.requestAnimationFrame(() => this.render());
    }
}

export default Engine;
