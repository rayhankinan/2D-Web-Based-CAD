import Point from "Operations/point";

abstract class Shape {
  abstract findCenter(): Point;
  abstract draw(gl: WebGLRenderingContext): void;
  abstract count(): number;
}

export default Shape;
