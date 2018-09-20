
function loadShader(gl, type, source) {
    const id = gl.createShader(type);
    gl.shaderSource(id, source);
    gl.compileShader(id);

    if (!gl.getShaderParameter(id, gl.COMPILE_STATUS)) {
        const shaderLog = gl.getShaderInfoLog(id);
        gl.deleteShader(id);

        throw new Error('Can\'t build shader : ' + shaderLog);
    }

    return id;
}

class Shader {
    static kAttribPosition = 'aPosition';
    static kAttribNormal = 'aNormal';

    constructor(gl, program) {
        this.gl = gl;
        this.program = program;
        this.attribs = {};
    }

    resolveAttrib(name) {
      // TODO  const loc = this.gl.getAttribLocation()
    }

    getAttribLocation(name) {
        return this.attribs[name];
    }

    destroy() {
        if (this.gl.isProgram(this.program)) {
            this.gl.deleteProgram(this.program);
            this.program = 0;
        }
    }

    static initShader(gl, vertexShaderSource, fragmentShaderSource) {
        let vertexShader, fragmentShader, program;

        vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

        try {
            fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        } catch (e) {
            gl.deleteShader(vertexShader);
            throw e;
        }

        program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        // Ref counted shader, we don't need them anymore
        gl.detachShader(program, vertexShader);
        gl.detachShader(program, fragmentShader);

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const log = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);

            throw new Error('Can\'t link shader : ' + log);
        }

        return new Shader(gl, program);
    }
}

export default Shader;

