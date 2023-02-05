"use strict";

// Returns a random integer from [0, range)
function randomInt(range) {
  return Math.floor(Math.random() * range);
}

// Fill the buffer with the values that define a rectangle.
function setRectangle(gl, x, y, width, height) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x2, y2]),
    gl.STATIC_DRAW
  );
}

function main() {
  // Get a WebGL context
  const canvas = document.querySelector("#webgl-canvas");
  const gl = canvas.getContext("webgl");
  if (!gl) {
    alert("Browser anda tidak mendukung WebGL!");
    return;
  }

  // Setup GLSL program
  const program = webglUtils.createProgramFromScripts(gl, [
    "vertex-shader",
    "fragment-shader",
  ]);

  // Look up where the vertex data needs to go
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // Look up uniform locations
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");

  // Create a buffer to put 2D clip space points in
  const positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Resize WebGL functionalities to only fit canvas
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // The data is 32 bit float
  const normalized = false; // Do not normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0; // Start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalized,
    stride,
    offset
  );

  // Set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  // Draw shapes
  for (let i = 0; i < 50; i++) {
    // Setup a random rectangle
    // This will write to positionBuffer because its the last thing we bound on the ARRAY_BUFFER bind point
    setRectangle(
      gl,
      randomInt(300),
      randomInt(300),
      randomInt(300),
      randomInt(300)
    );

    // Set a random color.
    gl.uniform4f(
      colorUniformLocation,
      Math.random(),
      Math.random(),
      Math.random(),
      1
    );

    // Draw the rectangle.
    const primitiveType = gl.TRIANGLE_STRIP;
    const offset = 0;
    const count = 4;
    gl.drawArrays(primitiveType, offset, count);
  }
}

main();
