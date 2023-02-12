import Point from "Operations/point";

abstract class Shape {
  protected readonly n: number;

  public constructor(n: number) {
    this.n = n;
  }

  public abstract findCenter(): Point;
  public abstract addPosition(gl: WebGLRenderingContext): void;
  public abstract addColor(gl: WebGLRenderingContext): void;
  public abstract drawMethod(gl: WebGLRenderingContext): number;
  public abstract count(): number;
}

export default Shape;
