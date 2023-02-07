import resizeCanvasToDisplaySize from "Utils/resize-canvas";
import Shape from "Objects/shape";
import Transformation from "Operations/transformation";
import TransformationProps from "Interfaces/transformation-props";

function drawScene(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  positionLocation: number,
  positionBuffer: WebGLBuffer,
  colorLocation: number,
  colorBuffer: WebGLBuffer,
  matrixLocation: WebGLUniformLocation,
  shape: Shape,
  transformationProps: TransformationProps
) {
  /* Setup viewport */
  resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  /* Clear color */
  gl.clear(gl.COLOR_BUFFER_BIT);

  /* Setup program */
  gl.useProgram(program);

  /* Setup position */
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positionSize = 2; /* 2 components per iteration */
  const positionType = gl.FLOAT; /* The data is 32 bit float */
  const positionNormalized = false; /* Don't normalize the data */
  const positionStride = 0; /* 0: Move forward size * sizeof(type) each iteration to get the next position */
  const positionOffset = 0; /* Start at the beginning of the buffer */
  gl.vertexAttribPointer(
    positionLocation,
    positionSize,
    positionType,
    positionNormalized,
    positionStride,
    positionOffset
  );

  /* Setup color */
  gl.enableVertexAttribArray(colorLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  const colorSize = 4; /* 4 components per iteration */
  const colorType = gl.FLOAT; /* The data is 32 bit float */
  const colorNormalized = false; /* Don't normalize the data */
  const colorStride = 0; /* 0: Move forward size * sizeof(type) each iteration to get the next position */
  const colorOffset = 0; /* Start at the beginning of the buffer */
  gl.vertexAttribPointer(
    colorLocation,
    colorSize,
    colorType,
    colorNormalized,
    colorStride,
    colorOffset
  );

  /* Count Matrix */
  const { width, height, tx, ty, degree, sx, sy, kx, ky } = transformationProps;

  const matrix = Transformation.general(
    width,
    height,
    tx,
    ty,
    degree,
    sx,
    sy,
    kx,
    ky,
    shape.findCenter()
  ).flatten();

  console.log(matrix);

  gl.uniformMatrix3fv(matrixLocation, false, matrix);

  /* Draw scene */
  const primitiveType = shape.drawMethod(gl);
  const offset = 0;
  const count = shape.count();
  gl.drawArrays(primitiveType, offset, count);
}

export default drawScene;
