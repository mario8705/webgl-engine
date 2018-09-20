import VertexFormat from './VertexFormat';

class RenderManager {
	constructor() {

	}

	beginScene() {
		// Trouver une fonction a cette methode
	}

	endScene() {
		// Flush le cache des meshes en attende (opti batch materials, deferred ou truc comme ca)
	}

	drawMesh(gl, mesh, shader) {
		let i, el;
		const { elements } = mesh.vertexFormat;
		gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffer);

		// TODO extract those from vertex format
		for (i = 0; i < elements.length; ++i) {
			el = elements[i];

			gl.vertexAttribPointer(el.location, el.size, gl.FLOAT, false, mesh.vertexFormat.vertexSize, el.offset);
			gl.enableVertexAttribArray(el.location);
		}

		gl.useProgram(shader.program);
		gl.drawArrays(gl.TRIANGLES, 0, mesh.numVertices);
	}
}

export default RenderManager;