import Engine from './Engine';
import RenderManager from './RenderManager';
import VertexFormat from './VertexFormat';
import * as mat from 'gl-matrix';
import './main.css';

 // Vertex shader program
 const vsSource = `
 attribute vec3 aVertexPosition;
 uniform mat4 uModelViewMatrix;
 uniform mat4 uProjectionMatrix;
 void main() {
   gl_Position = uProjectionMatrix * vec4(aVertexPosition, 1.0);
 }
`;

// Fragment shader program
const fsSource = `
 void main() {
   gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
 }
`;

const engine = new Engine(800, 600);
const shader = engine.initShader(vsSource, fsSource);
const mesh = engine.createMesh(
	new Float32Array([
		0.5,
		0.5,
		0.0,
		-0.5,
		-0.5,
		0.0,
		0.5,
		-0.5,
		0.0,
	]),
	(new VertexFormat()).vertexSize(12).addElement(VertexFormat.TYPE_FLOAT, 3, 0, 0).create()
);

const renderManager = new RenderManager();

engine.onRender = gl => {
    gl.clearColor(0.25, 0.5, 0.75, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    renderManager.drawMesh(gl, mesh, shader);
};

document.getElementById('view').appendChild(engine.view);
