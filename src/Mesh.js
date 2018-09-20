
class Mesh {
	constructor(gl, buffer, numVertices, vertexFormat) {
		this.gl = gl;
		this.buffer = buffer;
		this.numVertices = numVertices;
		this.vertexFormat = vertexFormat;
	}

    static createMesh(gl, vertices, vertexFormat) {
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        return new Mesh(
        	gl,
        	buf,
        	(vertices.length * vertices.BYTES_PER_ELEMENT) / vertexFormat.vertexSize,
        	vertexFormat,
        );
    }

    destroy() {
    	if (this.gl.isBuffer(this.buffer)) {
    		this.gl.deleteBuffer(this.buffer);
    		this.buffer = 0;
    	}
    }
}

export default Mesh;
