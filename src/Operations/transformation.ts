import Point from "Operations/point";
import Vector from "Operations/vector";
import Matrix from "Operations/matrix";

class Transformation {
  static translation(p: Point, tx: number, ty: number): Point {
    /* Create transformation matrix */
    const v1 = new Vector([1, 0]);
    const v2 = new Vector([0, 1]);
    const pivot = new Point([tx, ty]);
    const matrix = new Matrix([v1, v2, pivot]);

    /* Count result point */
    const newPoint = matrix.multiplyCoordinate(p) as Point;

    return newPoint;
  }

  static rotation(p: Point, degree: number): Point {
    /* Create transformation matrix */
    const v1 = new Vector([Math.cos(degree), Math.sin(degree)]);
    const v2 = new Vector([-Math.sin(degree), Math.cos(degree)]);
    const pivot = new Vector([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    /* Count result point */
    const newPoint = matrix.multiplyCoordinate(p) as Point;

    return newPoint;
  }

  static scale(p: Point, sx: number, sy: number): Point {
    /* Create transformation matrix */
    const v1 = new Vector([sx, 0]);
    const v2 = new Vector([0, sy]);
    const pivot = new Point([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    /* Count result point */
    const newPoint = matrix.multiplyCoordinate(p) as Point;

    return newPoint;
  }

  static shearX(p: Point, kx: number): Point {
    /* Create transformation matrix */
    const v1 = new Vector([1, kx]);
    const v2 = new Vector([0, 1]);
    const pivot = new Point([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    /* Count result point */
    const newPoint = matrix.multiplyCoordinate(p) as Point;

    return newPoint;
  }

  static shearY(p: Point, ky: number) {
    /* Create transformation matrix */
    const v1 = new Vector([1, 0]);
    const v2 = new Vector([ky, 1]);
    const pivot = new Point([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    /* Count result point */
    const newPoint = matrix.multiplyCoordinate(p) as Point;

    return newPoint;
  }
}

export default Transformation;
