import Shape from "Objects/shape";
import Point from "Operations/point";

class Rectangle extends Shape {
  private readonly p1: Point;
  private readonly p2: Point;
  private readonly p3: Point;
  private readonly p4: Point;

  /* Exactly 4 Points */
  public constructor(tuple: readonly [Point, Point, Point, Point]) {
    super(4);

    const [p1, p2, p3, p4] = tuple;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
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
}

export default Rectangle;
