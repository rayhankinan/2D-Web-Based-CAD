import Shape from "Objects/shape";
import Point from "Operations/point";

class Line extends Shape {
  public p1: Point;
  public p2: Point;

  /* Exactly 2 Points */
  public constructor() {
    super(2);

    // const [p1, p2] = tuple;
    // this.p1 = p1;
    // this.p2 = p2;
  }

  public updatePoint(tuple: [Point, Point] ) {
    const [p1, p2] = tuple;
    this.p1 = p1;
    this.p2 = p2;
  }

  public findCenter(): Point {
    const [p1x, p1y] = this.p1.getPair();
    const [p2x, p2y] = this.p2.getPair();

    return new Point([(p1x + p2x) / 2, (p1y + p2y) / 2]);
  }

  public addPosition(gl: WebGLRenderingContext): void {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([...this.p1.getPair(), ...this.p2.getPair()]),
      gl.STATIC_DRAW
    );
  }

  public addColor(gl: WebGLRenderingContext): void {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([...this.p1.getColor(), ...this.p2.getColor()]),
      gl.STATIC_DRAW
    );
  }

  public drawMethod(gl: WebGLRenderingContext): number {
    return gl.LINES;
  }

  public count(): number {
    return this.n;
  }
}

export default Line;
