import Shape from "Objects/shape";
import Point from "Operations/point";

class Square extends Shape {
  private p1: Point;
  private p2: Point;
  private p3: Point;
  private p4: Point;

  constructor(tuple: [Point, Point, Point, Point]) {
    super();
    const [p1, p2, p3, p4] = tuple;

    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
  }

  findCenter(): Point {
    const [p1x, p1y] = this.p1.getPair();
    const [p2x, p2y] = this.p2.getPair();
    const [p3x, p3y] = this.p3.getPair();
    const [p4x, p4y] = this.p4.getPair();

    return new Point([
      (p1x + p2x + p3x + p4x) / 4,
      (p1y + p2y + p3y + p4y) / 4,
    ]);
  }

  addPosition(gl: WebGLRenderingContext): void {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        ...this.p1.getPair(),
        ...this.p2.getPair(),
        ...this.p3.getPair(),
        ...this.p4.getPair(),
      ]),
      gl.STATIC_DRAW
    );
  }

  addColor(gl: WebGLRenderingContext): void {}

  drawMethod(gl: WebGLRenderingContext): number {
    return gl.TRIANGLE_STRIP;
  }

  count(): number {
    return 8;
  }
}

export default Square;
