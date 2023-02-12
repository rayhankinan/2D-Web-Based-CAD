import createShader from "Utils/shader";
import createProgram from "Utils/program";
import Rectangle from "Objects/rectangle";
import Point from "Operations/point";
import drawScene from "Utils/scene";
import Line from "Objects/line";
import Polygon from "Objects/polygon";

function main() {
  try {
    /* Create Program */
    const canvas = document.querySelector("#webgl-canvas") as HTMLCanvasElement;
    const gl = canvas.getContext("webgl");

    const vertexShaderElement = document.querySelector("#vertex-shader");
    const fragmentShaderElement = document.querySelector("#fragment-shader");

    const vertexShaderSource = vertexShaderElement.textContent;
    const fragmentShaderSource = fragmentShaderElement.textContent;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    const program = createProgram(gl, vertexShader, fragmentShader);

    /* Get Program Attribute and Uniform */
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const colorLocation = gl.getAttribLocation(program, "a_color");
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");

    /* Setup Shape */
    const square = new Rectangle([
      new Point([50, 50], [0, 0, 0, 1]),
      new Point([50, 100], [0, 0, 0, 1]),
      new Point([100, 100], [0, 0, 0, 1]),
      new Point([100, 50], [0, 0, 0, 1]),
    ]);

    const line = new Line([
      new Point([50, 50], [0, 0, 0, 1]),
      new Point([100, 100], [0, 0, 0, 1]),
    ]);

    const polygon = new Polygon([
      new Point([50, 50], [0, 0, 0, 1]),
      new Point([50, 100], [0, 0, 0, 1]),
      new Point([75, 125], [0, 0, 0, 1]),
      new Point([100, 100], [0, 0, 0, 1]),
      new Point([100, 50], [0, 0, 0, 1]),
    ]);

    /* Setup Buffer */
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    polygon.addPosition(gl); /* SET GEOMETRY DI SINI */

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    polygon.addColor(gl); /* SET COLOR DI SINI */

    drawScene(
      gl,
      program,
      positionLocation,
      positionBuffer,
      colorLocation,
      colorBuffer,
      matrixLocation,
      polygon,
      {
        width: gl.canvas.width,
        height: gl.canvas.height,
        tx: 0,
        ty: 0,
        degree: 0,
        sx: 1,
        sy: 1,
        kx: 0,
        ky: 0,
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    }
  }
}

main();
