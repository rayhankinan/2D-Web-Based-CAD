import createShader from "Utils/shader";
import createProgram from "Utils/program";
import resizeCanvasToDisplaySize from "Utils/resize-canvas";
import setRectangle from "Objects/rectangle";

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
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position"
    );
    const resolutionUniformLocation = gl.getUniformLocation(
      program,
      "u_resolution"
    );
    const colorUniformLocation = gl.getUniformLocation(program, "u_color");

    /* Setup Buffer and Viewport */
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /* Setup Program */
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const size = 2; /* 2 components per iteration*/
    const type = gl.FLOAT; /* The data is 32 bit float */
    const normalized = false; /* Don't normalize the data */
    const stride = 0; /* 0: Move forward size * sizeof(type) each iteration to get the next position */
    const offset = 0; /* Start at the beginning of the buffer */
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalized,
      stride,
      offset
    );
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    /* Draw Objects */
    for (let i = 0; i < 50; i++) {
      setRectangle(
        gl,
        Math.random() * 300,
        Math.random() * 300,
        Math.random() * 300,
        Math.random() * 300
      );

      gl.uniform4f(
        colorUniformLocation,
        Math.random(),
        Math.random(),
        Math.random(),
        1
      );

      const primitiveType = gl.TRIANGLE_STRIP;
      const offset = 0;
      const count = 4;
      gl.drawArrays(primitiveType, offset, count);
    }
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    }
  }
}

main();
