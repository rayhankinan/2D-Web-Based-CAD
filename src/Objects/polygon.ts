import Shape from "Objects/shape";
import Point from "Operations/point";

class Polygon extends Shape {
  private readonly arrayOfPoint: Point[];

  constructor(tuple: Point[]) {
    super(tuple.length);
    this.arrayOfPoint = tuple;
  }

  findCenter(): Point {
    let totalX = 0;
    let totalY = 0;

    for (const p of this.arrayOfPoint) {
      const [pX, pY] = p.getPair();

      totalX += pX;
      totalY += pY;
    }

    return new Point([totalX / this.n, totalY / this.n]);
  }

  addPosition(gl: WebGLRenderingContext): void {
    const positionArray: number[] = [];

    for (const p of this.arrayOfPoint) {
      positionArray.push(...p.getPair());
    }

    const [pInitial] = this.arrayOfPoint;
    positionArray.push(...pInitial.getPair());

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(positionArray),
      gl.STATIC_DRAW
    );
  }

  addColor(gl: WebGLRenderingContext): void {
    const colorArray: number[] = [];

    for (const p of this.arrayOfPoint) {
      colorArray.push(...p.getColor());
    }

    const [pInitial] = this.arrayOfPoint;
    colorArray.push(...pInitial.getColor());

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(colorArray),
      gl.STATIC_DRAW
    );
  }

  drawMethod(gl: WebGLRenderingContext): number {
    return gl.TRIANGLE_FAN;
  }

  count(): number {
    return this.n + 1;
  }
}

export default Polygon;
