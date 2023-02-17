import createShader from "Utils/shader";
import createProgram from "Utils/program";
import resizeCanvasToDisplaySize from "Utils/resize-canvas";
import { LINE, SQUARE, RECTANGLE, POLYGON, NONE } from "Utils/types";

import Line from "Objects/line";
import Shape from "Objects/shape";
import Point from "Operations/point";

/* Global variables */
var drawMethod: string;
var objects: Shape[] = [];
var isDrawing = false;

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

/* Setup program */
gl.useProgram(program);

/* Setup viewport */
resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

/* Clear color */
gl.clear(gl.COLOR_BUFFER_BIT);

const positionBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

/* Button listener */
const lineBtn = document.getElementById("line-btn");
lineBtn.addEventListener("click", function (e) {
	drawMethod = LINE;
});

const squareBtn = document.getElementById("square-btn");
squareBtn.addEventListener("click", function (e) {
	drawMethod = SQUARE;
});

const rectangleBtn = document.getElementById("rectangle-btn");
rectangleBtn.addEventListener("click", function (e) {
	drawMethod = RECTANGLE;
});

const polygonBtn = document.getElementById("polygon-btn");
polygonBtn.addEventListener("click", function (e) {
	drawMethod = POLYGON;
});

canvas.addEventListener("mousedown", function (e) {
	var x = e.clientX
	var y = e.clientY
	var point = new Point([x,y])

	switch(drawMethod) {
		case LINE:
			if (!isDrawing) {
				var line = new Line(point);
				objects.push(line)

				isDrawing = true
			} else {
				var line = objects[objects.length-1] as Line
				line.updatePoint(point);
				line.render(gl, program, positionBuffer, colorBuffer);

				isDrawing = false
			}
			break;
	}
});

canvas.addEventListener("mousemove", function (e) {
	var x = e.clientX
	var y = e.clientY
	var point = new Point([x,y])

	if (isDrawing) {
		switch(drawMethod) {
			case LINE:
				var line = objects[objects.length-1] as Line
				line.updatePoint(point);
				line.render(gl, program, positionBuffer, colorBuffer);
				break;
		}
	}
});

const renderCanvas = () => {
	gl.clear(gl.COLOR_BUFFER_BIT)
	for (var i = 0; i < objects.length; i++) {
		objects[i].render(gl, program, positionBuffer, colorBuffer)
	}

	window.requestAnimationFrame(renderCanvas);
}

renderCanvas();

