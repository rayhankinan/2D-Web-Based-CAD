import Shape from "Objects/shape";
import Point from "Operations/point";

class Square extends Shape {
  private side: number;

  constructor(x: number, y: number, side: number) {
    super(x, y);
    this.side = side;
  }

  findCenter(): Point {
    return new Point([this.x + this.side / 2, this.y + this.side / 2]);
  }

  addData(gl: WebGLRenderingContext): void {}

  drawMethod(gl: WebGLRenderingContext): number {
    return gl.TRIANGLE_STRIP;
  }

  count(): number {
    return 4;
  }
}
