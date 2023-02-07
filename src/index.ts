import createShader from "Utils/shader";
import createProgram from "Utils/program";

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

    /* Setup Buffer */
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    /* SET GEOMETRY DI SINI */

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    /* SET COLOR DI SINI */

    /* DRAW SCENE */
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    }
  }
}

main();
