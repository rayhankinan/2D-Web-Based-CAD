import createShader from "Utils/shader";
import createProgram from "Utils/program";
import Square from "Objects/square";
import Point from "Operations/point";
import drawScene from "Utils/scene";
import resizeCanvasToDisplaySize from "Utils/resize-canvas";
import Transformation from "Operations/transformation";

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
    const square = new Square([
      new Point([-0.5, -0.5], [0, 0, 0, 1]),
      new Point([-0.5, 0.5], [0, 0, 0, 1]),
      new Point([0.5, 0.5], [0, 0, 0, 1]),
      new Point([0.5, -0.5], [0, 0, 0, 1]),
    ]);

    /* Setup Buffer */
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    square.addPosition(gl); /* SET GEOMETRY DI SINI */

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    square.addColor(gl); /* SET COLOR DI SINI */

    drawScene(
      gl,
      program,
      positionLocation,
      positionBuffer,
      colorLocation,
      colorBuffer,
      matrixLocation,
      square,
      {
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
