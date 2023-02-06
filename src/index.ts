import createShader from "@utils/shader";
import createProgram from "@utils/program";

function main() {
  try {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas-webgl";

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

    /* DO SOMETHING WITH THE PROGRAM */

    document.body.appendChild(canvas);
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    }
  }
}

main();
