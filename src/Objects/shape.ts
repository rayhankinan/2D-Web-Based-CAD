import Point from "Operations/point";

abstract class Shape {
  abstract findCenter(): Point;
  abstract addPosition(gl: WebGLRenderingContext): void;
  abstract addColor(gl: WebGLRenderingContext): void;
  abstract drawMethod(gl: WebGLRenderingContext): number;
  abstract count(): number;
}

export default Shape;
