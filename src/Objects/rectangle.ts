import Shape from "Objects/shape";
import Point from "Operations/point";
import { renderCanvas } from "..";

class Rectangle extends Shape {
	private p1: Point;
	private p2: Point;
	private p3: Point;
	private p4: Point;
	private originalXPoints: number[];
	private originalYPoints: number[];
	private deltaXvalue: number;
	private deltaYvalue: number;

	public constructor(point: Point) {
		super(4);

		this.p1 = point;
		this.deltaXvalue = 0;
		this.deltaYvalue = 0;

		this.originalXPoints = [point.getPair()[0]];
		this.originalYPoints = [point.getPair()[1]];
	}

	public findCenter(): Point {
		const [p1x, p1y] = this.p1.getPair();
		const [p2x, p2y] = this.p2.getPair();
		const [p3x, p3y] = this.p3.getPair();
		const [p4x, p4y] = this.p4.getPair();

		return new Point([
			(p1x + p2x + p3x + p4x) / 4,
			(p1y + p2y + p3y + p4y) / 4,
		]);
	}

	public updatePoint(p: Point) {
		var p2 = p;
		const [p3, p4] = this.getSymmetricalRectanglePoint(p);

		// p1 ----> p3
		// ^		v
		// p4 <---- p2
		this.p2 = p3;
		this.p3 = p;
		this.p4 = p4;

		this.originalXPoints[1] = this.p2.getPair()[0];
		this.originalXPoints[2] = this.p3.getPair()[0];
		this.originalXPoints[3] = this.p4.getPair()[0];

		this.originalYPoints[1] = this.p2.getPair()[1];
		this.originalYPoints[2] = this.p3.getPair()[1];
		this.originalYPoints[3] = this.p4.getPair()[1];
	}

	public addPosition(gl: WebGLRenderingContext): void {
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([
				...this.p1.getPair(),
				...this.p2.getPair(),
				...this.p3.getPair(),
				...this.p4.getPair(),
				...this.p1.getPair(),
			]),
			gl.STATIC_DRAW
		);
	}

	public addColor(gl: WebGLRenderingContext): void {
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([
				...this.p1.getColor(),
				...this.p2.getColor(),
				...this.p3.getColor(),
				...this.p4.getColor(),
				...this.p1.getColor(),
			]),
			gl.STATIC_DRAW
		);
	}

	public drawMethod(gl: WebGLRenderingContext): number {
		return gl.TRIANGLE_FAN;
	}

	public count(): number {
		return this.n + 1;
	}

	public isPointComplete(): boolean {
		return this.p2 != null;
	}

	public rotateByDegree(
		x: number,
		y: number,
		a: number,
		b: number,
		deg: number
	): Point {
		if (deg == 90) {
			return new Point([-y + a + b, x - a + b]);
		} else if (deg == 180) {
			return new Point([-x + 2 * a, -y + 2 * b]);
		} else if (deg == 270) {
			return new Point([y - b + a, -x + a + b]);
		}
	}

	public getSymmetricalRectanglePoint(point: Point): [Point, Point] {
		const [a, b] = this.p1.getPair();
		const [c, d] = point.getPair();

		var point1 = new Point([a, d]);
		var point2 = new Point([c, b]);

		return [point1, point2];
	}

	public moveX(delta: number) {
		this.p1.setX(this.originalXPoints[0] + delta);
		this.p2.setX(this.originalXPoints[1] + delta);
		this.p3.setX(this.originalXPoints[2] + delta);
		this.p4.setX(this.originalXPoints[3] + delta);

		renderCanvas();
	}

	public moveY(delta: number) {
		this.p1.setY(this.originalYPoints[0] + delta);
		this.p2.setY(this.originalYPoints[1] + delta);
		this.p3.setY(this.originalYPoints[2] + delta);
		this.p4.setY(this.originalYPoints[3] + delta);

		renderCanvas();
	}

	public setupSelector(): void {
		var selector = document.getElementById("selector");
		selector.replaceChildren();

		// slider x, y for places
		var firstDiv = document.createElement("div");
		firstDiv.className = "transformation-translation";
		var translationSelectorTitle = document.createElement("h1");
		translationSelectorTitle.textContent = "Translation";

		/* SLIDER X */
		var sliderxTitle = document.createElement("h2");
		sliderxTitle.textContent = "Slider X";
		var sliderXtext = document.createElement("label");
		sliderXtext.textContent = this.deltaXvalue.toString();
		var sliderX = document.createElement("input") as HTMLInputElement;
		sliderX.type = "range";
		sliderX.min = "-600";
		sliderX.max = "600";
		sliderX.value = this.deltaXvalue.toString();
		sliderX.step = "10";
		sliderX.addEventListener("input", (e) => {
			const delta = (e.target as HTMLInputElement).value;
			this.moveX(+delta);
			this.deltaXvalue = +delta;
			sliderXtext.textContent = this.deltaXvalue.toString();
		});

		/* SLIDER Y */
		var slideryTitle = document.createElement("h2");
		slideryTitle.textContent = "Slider Y";
		var sliderY = document.createElement("input") as HTMLInputElement;
		sliderY.type = "range";
		var sliderYtext = document.createElement("label");
		sliderYtext.textContent = this.deltaYvalue.toString();
		var sliderY = document.createElement("input") as HTMLInputElement;
		sliderY.type = "range";
		sliderY.min = "-500";
		sliderY.max = "500";
		sliderY.value = this.deltaYvalue.toString();
		sliderY.step = "10";
		sliderY.addEventListener("input", (e) => {
			const delta = (e.target as HTMLInputElement).value;
			this.moveY(+delta);
			this.deltaYvalue = +delta;
			sliderYtext.textContent = this.deltaYvalue.toString();
		});

		firstDiv.append(
			translationSelectorTitle,
			sliderxTitle,
			sliderX,
			sliderXtext,
			slideryTitle,
			sliderY,
			sliderYtext
		);

		// slider height, width, rotation
		var secondDiv = document.createElement("div");
		secondDiv.className = "transformation-size";
		var sizeSelectorTitle = document.createElement("h1");
		sizeSelectorTitle.textContent = "Size";

		secondDiv.append(sizeSelectorTitle);

		// input for colors
		var thirdDiv = document.createElement("div");
		thirdDiv.className = "transformation-color";
		var colorSelectorTitle = document.createElement("h1");
		colorSelectorTitle.textContent = "Color";

		thirdDiv.append(colorSelectorTitle);

		selector.append(firstDiv, secondDiv, thirdDiv);
	}
}

export default Rectangle;
