import createShader from "Utils/shader";
import createProgram from "Utils/program";
import resizeCanvasToDisplaySize from "Utils/resize-canvas";

import Line from "Objects/line";
import Shape from "Objects/shape";
import Point from "Operations/point";
import Rectangle from "Objects/rectangle";
import Polygon from "Objects/polygon";
import Square from "Objects/square";
import ShapeType from "Objects/types";

import FileSystem from "Files/file-system";
import FileHandling from "./Files/file-handling";

/* Global variables */
let objects: Shape[] = [];

let shapeType: ShapeType;
let isDrawing = false;
let polygonRedrawIndex = 0;
let isFirstDrawing = true;

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

/* Setup Program */
gl.useProgram(program);

/* Setup Viewport */
resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

/* Clear Color */
gl.clear(gl.COLOR_BUFFER_BIT);

const positionBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();

/* List of Shapes Listener */
const listOfShapes = document.getElementById(
  "list-of-shapes"
) as HTMLSelectElement;
listOfShapes.addEventListener("change", () => {
  const index: number = +listOfShapes.selectedOptions[0].value;

  objects[index].setupSelector();
  if (objects[index].type == ShapeType.POLYGON) {
    const selector = document.getElementById("selector");

    const addPointButton = document.createElement("button");
    addPointButton.textContent = "add new point";
    addPointButton.className = "btn";
    addPointButton.addEventListener("click", () => {
      isDrawing = true;
      polygonRedrawIndex = index;
      shapeType = ShapeType.POLYGON_REDRAW;
    });

    selector.append(addPointButton);
  }
});

/* Button Listener */
const lineBtn = document.getElementById("line-btn");
lineBtn.addEventListener("click", () => {
  shapeType = ShapeType.LINE;
  isDrawing = false;
});

const squareBtn = document.getElementById("square-btn");
squareBtn.addEventListener("click", () => {
  shapeType = ShapeType.SQUARE;
  isDrawing = false;
});

const rectangleBtn = document.getElementById("rectangle-btn");
rectangleBtn.addEventListener("click", () => {
  shapeType = ShapeType.RECTANGLE;
  isDrawing = false;
});

const polygonBtn = document.getElementById("polygon-btn");
polygonBtn.addEventListener("click", () => {
  shapeType = ShapeType.POLYGON;
  isDrawing = false;
  isFirstDrawing = true;
});

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  FileHandling.download(FileSystem.serialize(objects));
});

const uploadBtn = document.getElementById("load-btn");
uploadBtn.addEventListener("click", () => {
  FileHandling.upload((text) => {
    objects = FileSystem.load(text);

    renderCanvas();
  });
});

/* Canvas Listener */
canvas.addEventListener("mousedown", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const point = new Point([x, y]);

  switch (shapeType) {
    case ShapeType.LINE:
      if (!isDrawing) {
        const line = new Line(point);
        objects.push(line);

        isDrawing = true;
      } else {
        const line = objects[objects.length - 1] as Line;
        line.updatePoint(point);
        line.render(gl, program, positionBuffer, colorBuffer);
        line.setupOption(`line_${objects.length}`, objects.length, true);

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
        square.setupOption(`square_${objects.length}`, objects.length, true);

        isDrawing = false;
      }
      break;

    case ShapeType.RECTANGLE:
      if (!isDrawing) {
        const rectangle = new Rectangle(point);
        objects.push(rectangle);

        isDrawing = true;
      } else {
        const rectangle = objects[objects.length - 1] as Rectangle;

        rectangle.updatePoint(point);
        rectangle.render(gl, program, positionBuffer, colorBuffer);
        rectangle.setupOption(
          `rectangle_${objects.length}`,
          objects.length,
          true
        );

        isDrawing = false;
      }
      break;

    case ShapeType.POLYGON:
      if (!isDrawing) {
        const polygon = new Polygon(point);
        objects.push(polygon);

        isDrawing = true;
      } else {
        const polygon = objects[objects.length - 1] as Polygon;

        polygon.updatePoint(point);
        polygon.render(gl, program, positionBuffer, colorBuffer);
        polygon.setupOption(
          `polygon_${objects.length}`,
          objects.length,
          isFirstDrawing
        );

        isFirstDrawing = false;
      }
      break;

    case ShapeType.POLYGON_REDRAW:
      const polygon = objects[polygonRedrawIndex] as Polygon;

      polygon.updatePoint(point);
      polygon.render(gl, program, positionBuffer, colorBuffer);

      break;
  }
});

canvas.addEventListener("mousemove", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const point = new Point([x, y]);

  if (isDrawing) {
    switch (shapeType) {
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
        /* Do Nothing */
        break;

      default:
        throw new Error("Shape type is not defined");
    }
  }
});

/* Export Function */
export const renderCanvas = () => {
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (const object of objects) {
    object.render(gl, program, positionBuffer, colorBuffer);
  }

  window.requestAnimationFrame(renderCanvas);
};

export const getShapeType = () => {
  return shapeType;
};

export const setShapeType = (newShapeType: ShapeType) => {
  shapeType = newShapeType;
};

export const getIsDrawing = () => {
  return isDrawing;
};

export const setIsDrawing = (newIsDrawing: boolean) => {
  isDrawing = newIsDrawing;
};

/* DOM Listener */
document.addEventListener("DOMContentLoaded", renderCanvas);
