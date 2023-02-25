import createShader from "Utils/shader";
import createProgram from "Utils/program";
import resizeCanvasToDisplaySize from "Utils/resize-canvas";
import ShapeType from "Utils/types";

import Line from "Objects/line";
import Shape from "Objects/shape";
import Point from "Operations/point";
import Rectangle from "Objects/rectangle";
import Polygon from "Objects/polygon";
import Square from "Objects/square";

/* Global variables */
const objects: Shape[] = [];

let drawMethod: ShapeType;
let isDrawing = false;
let isDrawingLine = true;

/* Create Program */
const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl");

const vertexShaderElement = document.getElementById("vertex-shader");
const fragmentShaderElement = document.getElementById("fragment-shader");

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
const listOfShapes = document.getElementById(
  "list-of-shapes"
) as HTMLSelectElement;
listOfShapes.addEventListener("change", () => {
  const index: number = +listOfShapes.selectedOptions[0].value;

  objects[index].setupSelector();
});

/* Button listener */
const lineBtn = document.getElementById("line-btn");
lineBtn.addEventListener("click", () => {
  drawMethod = ShapeType.LINE;
  isDrawing = false;
});

const squareBtn = document.getElementById("square-btn");
squareBtn.addEventListener("click", () => {
  drawMethod = ShapeType.SQUARE;
  isDrawing = false;
});

const rectangleBtn = document.getElementById("rectangle-btn");
rectangleBtn.addEventListener("click", (e) => {
  drawMethod = ShapeType.RECTANGLE;
  isDrawing = false;
});

const polygonBtn = document.getElementById("polygon-btn");
polygonBtn.addEventListener("click", () => {
  drawMethod = ShapeType.POLYGON;
  isDrawing = false;
});

/* Canvas listener */
canvas.addEventListener("mousedown", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const point = new Point([x, y]);

  switch (drawMethod) {
    case ShapeType.LINE:
      if (!isDrawing) {
        const line = new Line(point);
        objects.push(line);

        isDrawing = true;
      } else {
        const line = objects[objects.length - 1] as Line;
        line.updatePoint(point);
        line.render(gl, program, positionBuffer, colorBuffer);
        line.setupOption(`line_${objects.length}`, objects.length);

        isDrawing = false;
      }
      break;

    case ShapeType.SQUARE:
      if (!isDrawing) {
        const square = new Square(point);
        objects.push(square);

        isDrawing = true;
      } else {
        const square = objects[objects.length - 1] as Square;
        square.updatePoint(point);
        square.render(gl, program, positionBuffer, colorBuffer);
        square.setupOption(`square_${objects.length}`, objects.length);

        isDrawing = false;
      }
      break;

    case ShapeType.RECTANGLE:
      if (!isDrawing) {
        const rectangle = new Rectangle(point);
        objects.push(rectangle);

        isDrawing = true;
      } else {
        let rectangle = objects[objects.length - 1] as Rectangle;
        rectangle.updatePoint(point);
        rectangle.render(gl, program, positionBuffer, colorBuffer);
        rectangle.setupOption(`rectangle_${objects.length}`, objects.length);

        isDrawing = false;
      }
      break;

    case ShapeType.POLYGON:
      if (!isDrawing) {
        const polygon = new Polygon(point);
        objects.push(polygon);
        polygon.setupOption(`polygon_${objects.length}`, objects.length);

        isDrawing = true;
        isDrawingLine = true;
      } else {
        const polygon = objects[objects.length - 1] as Polygon;
        polygon.updatePoint(point);
        polygon.render(gl, program, positionBuffer, colorBuffer);

        isDrawingLine = false;
      }
      break;
  }
});

canvas.addEventListener("mousemove", (event) => {
  let x = event.clientX;
  let y = event.clientY;
  let point = new Point([x, y]);

  if (isDrawing) {
    switch (drawMethod) {
      case ShapeType.LINE:
        const line = objects[objects.length - 1] as Line;
        line.updatePoint(point);
        line.render(gl, program, positionBuffer, colorBuffer);
        break;

      case ShapeType.SQUARE:
        const square = objects[objects.length - 1] as Square;
        square.updatePoint(point);
        square.render(gl, program, positionBuffer, colorBuffer);
        break;

      case ShapeType.RECTANGLE:
        const rectangle = objects[objects.length - 1] as Rectangle;
        rectangle.updatePoint(point);
        rectangle.render(gl, program, positionBuffer, colorBuffer);
        break;

      case ShapeType.POLYGON:
        const polygon = objects[objects.length - 1] as Polygon;
        if (isDrawingLine) {
          polygon.updatePointLine(point);
          polygon.render(gl, program, positionBuffer, colorBuffer);
        }
        break;
    }
  }
});

/* Render Canvas */
const renderCanvas = () => {
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (const object of objects) {
    object.render(gl, program, positionBuffer, colorBuffer);
  }

  window.requestAnimationFrame(renderCanvas);
};

/* DOM Listener */
document.addEventListener("DOMContentLoaded", renderCanvas);

export default renderCanvas;
