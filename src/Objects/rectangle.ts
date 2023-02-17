import Shape from "Objects/shape";
import Point from "Operations/point";

class Rectangle extends Shape {
	private center: Point;
	private p1: Point;
	private p2: Point;
	private p3: Point;
	private p4: Point;
	private isSquare: boolean;

	public constructor(point: Point, isSquare: boolean) {
		super(4);

		this.isSquare = isSquare;
		if (this.isSquare) {
			this.center = point;
		} else {
			this.p1 = point;
		}
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
		if (this.isSquare) {
			this.p1 = p;
			[this.p2, this.p3, this.p4] = this.getSymmetricalSquarePoint();
		} else {
			var p2 = p
			const [p3, p4] = this.getSymmetricalRectanglePoint(p);

			// p1 ----> p3
			// ^		v
			// p4 <---- p2
			this.p2 = p3;
			this.p3 = p;
			this.p4 = p4;
		}
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
		if (this.isSquare) {
			return this.p1 != null;
		}
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

	public getSymmetricalSquarePoint(): [Point, Point, Point] {
		const [x, y] = this.p1.getPair();
		const [a, b] = this.center.getPair();

		// point1 90
		var point1 = this.rotateByDegree(x, y, a, b, 90);

		// point2 180
		var point2 = this.rotateByDegree(x, y, a, b, 180);

		// point3 270
		var point3 = this.rotateByDegree(x, y, a, b, 270);

		return [point1, point2, point3];
	}

	public getSymmetricalRectanglePoint(point: Point): [Point, Point] {
		const [a, b] = this.p1.getPair();
		const [c, d] = point.getPair();

		var point1 = new Point([a, d]);
		var point2 = new Point([c, b]);

		return [point1, point2];
	}
}

export default Rectangle;
