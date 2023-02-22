import Shape from "Objects/shape";
import Point from "Operations/point";
import convexHull from "Algorithms/convex-hull";

class Polygon extends Shape {
	private firstPoint: Point;
	private arrayOfPoint: Point[] = [];
	private p1: Point;
	private p2: Point;
	private isMoreThanTwo: boolean;

	public constructor(point: Point) {
		super(1);

		this.p1 = point;
		this.isMoreThanTwo = false;
	}

	public findCenter(): Point {
		// render point
		if (!this.isMoreThanTwo) {
			const [p1x, p1y] = this.p1.getPair();
			const [p2x, p2y] = this.p2.getPair();

			return new Point([(p1x + p2x) / 2, (p1y + p2y) / 2]);
		}

		let totalX = 0;
		let totalY = 0;

		for (const p of this.arrayOfPoint) {
			const [pX, pY] = p.getPair();

			totalX += pX;
			totalY += pY;
		}

		return new Point([totalX / this.n, totalY / this.n]);
	}

	public updatePoint(point: Point) {
		if (!this.isMoreThanTwo) {
			this.p2 = point;
			this.arrayOfPoint.push(this.p1);
			this.arrayOfPoint.push(this.p2);
			this.isMoreThanTwo = true;
		} else {
			this.arrayOfPoint.push(point);
		}
	}

	public updatePointLine(point: Point) {
		this.p2 = point;
	}

	public addPosition(gl: WebGLRenderingContext): void {
		// add position as line
		if (this.arrayOfPoint.length < 3) {
			this.addPositionLine(gl);
			return;
		}

		const positionArray: number[] = [];
		const hull: readonly Point[] = convexHull(this.arrayOfPoint);

		for (const p of hull) {
			positionArray.push(...p.getPair());
		}

		const [pInitial] = hull;
		positionArray.push(...pInitial.getPair());

		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array(positionArray),
			gl.STATIC_DRAW
		);
	}

	public addPositionLine(gl: WebGLRenderingContext): void {
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([...this.p1.getPair(), ...this.p2.getPair()]),
			gl.STATIC_DRAW
		);
	}

	public addColor(gl: WebGLRenderingContext): void {
		// add color as line
		if (this.arrayOfPoint.length < 3) {
			this.addColorLine(gl);
			return;
		}

		const colorArray: number[] = [];
		const hull: readonly Point[] = convexHull(this.arrayOfPoint);

		for (const p of hull) {
			colorArray.push(...p.getColor());
		}

		const [pInitial] = hull;
		colorArray.push(...pInitial.getColor());

		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array(colorArray),
			gl.STATIC_DRAW
		);
	}

	public addColorLine(gl: WebGLRenderingContext): void {
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([...this.p1.getColor(), ...this.p2.getColor()]),
			gl.STATIC_DRAW
		);
	}

	public drawMethod(gl: WebGLRenderingContext): number {
		if (this.arrayOfPoint.length < 3) {
			return gl.LINES;
		}

		return gl.TRIANGLE_FAN;
	}

	public count(): number {
		if (this.arrayOfPoint.length < 3) {
			return 3;
		}
		return this.arrayOfPoint.length + 1;
	}

	public isPointComplete(): boolean {
		return this.p2 != null;
	}

	public setupSelector(): void {
		var selector = document.getElementById("selector");
		selector.replaceChildren();

		// slider x, y for places
		var firstDiv = document.createElement("div");
		firstDiv.className = "transformation-translation";
		var translationSelectorTitle = document.createElement("h1");
		translationSelectorTitle.textContent = "Translation";

		firstDiv.append(translationSelectorTitle);

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

export default Polygon;
