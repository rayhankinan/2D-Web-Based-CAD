import Point from "Operations/point";

abstract class Shape {
  protected x: number;
  protected y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  abstract findCenter(): Point;
  abstract addData(gl: WebGLRenderingContext): void;
  abstract drawMethod(gl: WebGLRenderingContext): number;
  abstract count(): number;
}

export default Shape;
