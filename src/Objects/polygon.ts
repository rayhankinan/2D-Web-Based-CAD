import Shape from "Objects/shape";
import Point from "Operations/point";
import convexHull from "Algorithms/convex-hull";

class Polygon extends Shape {
  private readonly arrayOfPoint: readonly [Point, Point, Point, ...Point[]];

  /* Minimum 3 Points */
  public constructor(arrayOfPoint: readonly [Point, Point, Point, ...Point[]]) {
    super(arrayOfPoint.length);
    this.arrayOfPoint = arrayOfPoint;
  }

  public findCenter(): Point {
    let totalX = 0;
    let totalY = 0;

    for (const p of this.arrayOfPoint) {
      const [pX, pY] = p.getPair();

      totalX += pX;
      totalY += pY;
    }

    return new Point([totalX / this.n, totalY / this.n]);
  }

  public addPosition(gl: WebGLRenderingContext): void {
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

  public addColor(gl: WebGLRenderingContext): void {
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

  public drawMethod(gl: WebGLRenderingContext): number {
    return gl.TRIANGLE_FAN;
  }

  public count(): number {
    return this.n + 1;
  }

  public isPointComplete(): boolean {
      return true
  }
}

export default Polygon;
