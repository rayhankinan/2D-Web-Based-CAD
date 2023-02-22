import createShader from "Utils/shader";
import createProgram from "Utils/program";
import resizeCanvasToDisplaySize from "Utils/resize-canvas";
import { LINE, SQUARE, RECTANGLE, POLYGON, NONE } from "Utils/types";

import Line from "Objects/line";
import Shape from "Objects/shape";
import Point from "Operations/point";
import Rectangle from "Objects/rectangle";
import Polygon from "Objects/polygon";
import Square from "Objects/square";

/* Global variables */
var drawMethod: string;
var objects: Shape[] = [];
var objectMap = Object.create(null);
var isDrawing = false;
var isDrawingLine = true;

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

/* List of shapes listener */
const listOfShapes = document.getElementById("list-of-shapes") as HTMLSelectElement
listOfShapes.addEventListener("change", (e) => {
	const index: number = +listOfShapes.selectedOptions[0].value

	objects[index].setupSelector()
})

/* Button listener */
const lineBtn = document.getElementById("line-btn");
lineBtn.addEventListener("click", function (e) {
	drawMethod = LINE;
	isDrawing = false;
	addToMap();
});

const squareBtn = document.getElementById("square-btn");
squareBtn.addEventListener("click", function (e) {
	drawMethod = SQUARE;
	isDrawing = false;
	addToMap();
});

const rectangleBtn = document.getElementById("rectangle-btn");
rectangleBtn.addEventListener("click", function (e) {
	drawMethod = RECTANGLE;
	isDrawing = false;
	addToMap();
});

const polygonBtn = document.getElementById("polygon-btn");
polygonBtn.addEventListener("click", function (e) {
	drawMethod = POLYGON;
	isDrawing = false;
	addToMap();
});

/* Canvas listener */
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
				line.setupOption("line_" + objects.length, objects.length);

				isDrawing = false
			}
			break;

		case SQUARE:
			if (!isDrawing) {
				var square = new Square(point);
				objects.push(square);

				isDrawing = true
			} else {
				var square = objects[objects.length-1] as Square
				square.updatePoint(point)
				square.render(gl, program, positionBuffer, colorBuffer);
				square.setupOption("square_" + objects.length, objects.length);

				isDrawing = false
			}
			break;

		case RECTANGLE:
			if (!isDrawing) {
				var rectangle = new Rectangle(point);
				objects.push(rectangle);

				isDrawing = true
			} else {
				var rectangle = objects[objects.length-1] as Rectangle
				rectangle.updatePoint(point)
				rectangle.render(gl, program, positionBuffer, colorBuffer);
				rectangle.setupOption("rectangle_" + objects.length, objects.length);

				isDrawing = false
			}
			break;

		case POLYGON:
			if (!isDrawing) {
				var polygon = new Polygon(point);
				objects.push(polygon)
				polygon.setupOption("polygon_" + objects.length, objects.length)

				isDrawing = true
				isDrawingLine = true
			} else {
				var polygon = objects[objects.length-1] as Polygon
				polygon.updatePoint(point)
				polygon.render(gl, program, positionBuffer, colorBuffer);

				isDrawingLine = false;
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

			case SQUARE:
				var square = objects[objects.length-1] as Square
				square.updatePoint(point)
				square.render(gl, program, positionBuffer, colorBuffer)
				break;

			case RECTANGLE:
				var rectangle = objects[objects.length-1] as Rectangle
				rectangle.updatePoint(point)
				rectangle.render(gl, program, positionBuffer, colorBuffer)
				break;

			case POLYGON:
				var polygon = objects[objects.length-1] as Polygon
				if (isDrawingLine) {
					polygon.updatePointLine(point)
					polygon.render(gl, program, positionBuffer, colorBuffer)
				} 
				break;
		}
	}
});

/* Function utils */
export const renderCanvas = () => {
	gl.clear(gl.COLOR_BUFFER_BIT)
	for (var i = 0; i < objects.length; i++) {
		objectMap[i] = objects[i]
		objects[i].render(gl, program, positionBuffer, colorBuffer)
	}

	window.requestAnimationFrame(renderCanvas);
}

renderCanvas();

const addToMap = () => {
	for (var i = 0; i < objects.length; i++) {
		objectMap[i] = objects[i]
	}
}

const updateDropdown = () => {
	
}