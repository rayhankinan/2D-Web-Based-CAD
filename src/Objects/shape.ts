import Point from "Operations/point";

abstract class Shape {
  abstract findCenter(): Point;
  abstract addData(gl: WebGLRenderingContext): void;
  abstract drawMethod(): number;
  abstract count(): number;
}

export default Shape;
