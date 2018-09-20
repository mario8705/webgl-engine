import Engine from "./Engine";
import VertexFormat from './VertexFormat';
import './main.css';

 // Vertex shader program
 const vsSource = `
 attribute vec4 aVertexPosition;
 uniform mat4 uModelViewMatrix;
 uniform mat4 uProjectionMatrix;
 void main() {
   gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
 }
`;

// Fragment shader program
const fsSource = `
 void main() {
   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
 }
`;

console.log(new VertexFormat().vertexSize(24).addElement(VertexFormat.TYPE_FLOAT, 3, 0).addElement(VertexFormat.TYPE_FLOAT, 3, 0));

const engine = new Engine(800, 600);
const shader = engine.initShader(vsSource, fsSource);

engine.onRender = gl => {
    gl.clearColor(0.9,0.9,0.8,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
};

document.getElementById('view').appendChild(engine.view);
