import Line from "Objects/line";
import Rectangle from "Objects/rectangle";
import Point from "Operations/point";
import { universalDraw } from "./setup";

/* Web Functionality (Program) */
var points = [] as Array<Point>;

/* TODO: selecting point */
var objects = Object.create(null);

/* Drawable */
const canvas = document.querySelector("#webgl-canvas");

function setupFrontend() {
	/* Line */
	var lineBtn = getObjectById("line-btn");
	lineBtn.addEventListener("click", function (e) {
		console.log("line");
	});

	var draw = true;

	const line = new Line();
	var firstPoint: Point;
	canvas.addEventListener("mousedown", function (e: MouseEvent) {
		var x = e.clientX;
		var y = e.clientY;
		var currentPoint = new Point([x, y]);

		if (draw) {
			firstPoint = currentPoint;
			draw = false;
		} else {
			line.updatePoint([firstPoint, currentPoint]);
			draw = true;
			universalDraw(line);
		}
	});

	canvas.addEventListener("mousemove", function (e: MouseEvent) {
		var x = e.clientX;
		var y = e.clientY;
		var currentPoint = new Point([x, y]);
		line.updatePoint([firstPoint, currentPoint]);

		universalDraw(line);
	});
}

function getObjectById(id: string) {
	return document.getElementById(id);
}

export default setupFrontend;
