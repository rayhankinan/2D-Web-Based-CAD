import Shape from "Objects/shape";
import Transformation from "Operations/transformation";
import createProgram from "./program";
import resizeCanvasToDisplaySize from "./resize-canvas";
import createShader from "./shader";

var gl: WebGLRenderingContext;
var program: WebGLProgram;

function setupWebGL() {
	const canvas = document.querySelector("#webgl-canvas") as HTMLCanvasElement;

	gl = canvas.getContext("webgl");

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

	program = createProgram(gl, vertexShader, fragmentShader);
}

function universalDraw(shape: Shape) {
	/* Get Program Attribute and Uniform */
	const positionLocation = gl.getAttribLocation(program, "a_position");
	const colorLocation = gl.getAttribLocation(program, "a_color");

	/* Setup Buffer */
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	// shape.addPosition(gl); /* SET GEOMETRY DI SINI */

	const colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	// shape.addColor(gl); /* SET COLOR DI SINI */

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

	const matrixLocation = gl.getUniformLocation(program, "u_matrix");
	const { width, height, tx, ty, degree, sx, sy, kx, ky } = {
		width: gl.canvas.width,
		height: gl.canvas.height,
		tx: 0,
		ty: 0,
		degree: 0,
		sx: 1,
		sy: 1,
		kx: 0,
		ky: 0,
	};

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

	gl.uniformMatrix3fv(matrixLocation, false, matrix);

	/* Draw scene */
	const primitiveType = shape.drawMethod(gl);
	const offset = 0;
	const count = shape.count();
	gl.drawArrays(primitiveType, offset, count);
}

export { universalDraw, setupWebGL };
