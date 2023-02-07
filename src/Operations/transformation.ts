import Point from "Operations/point";
import Vector from "Operations/vector";
import Matrix from "Operations/matrix";

class Transformation {
  static translation(tx: number, ty: number): Matrix {
    /* Create transformation matrix */
    const v1 = new Vector([1, 0]);
    const v2 = new Vector([0, 1]);
    const pivot = new Point([tx, ty]);
    const matrix = new Matrix([v1, v2, pivot]);

    return matrix;
  }

  static rotation(degree: number): Matrix {
    /* Create transformation matrix */
    const v1 = new Vector([Math.cos(degree), Math.sin(degree)]);
    const v2 = new Vector([-Math.sin(degree), Math.cos(degree)]);
    const pivot = new Vector([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    return matrix;
  }

  static generalRotation(degree: number, pivot: Point): Matrix {
    const [pivotX, pivotY] = pivot.getPair();

    return Transformation.translation(pivotX, pivotY)
      .multiplyMatrix(Transformation.rotation(degree))
      .multiplyMatrix(Transformation.translation(-pivotX, -pivotY));
  }

  static scale(sx: number, sy: number): Matrix {
    /* Create transformation matrix */
    const v1 = new Vector([sx, 0]);
    const v2 = new Vector([0, sy]);
    const pivot = new Point([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    return matrix;
  }

  static generalScale(sx: number, sy: number, pivot: Point): Matrix {
    const [pivotX, pivotY] = pivot.getPair();

    return Transformation.translation(pivotX, pivotY)
      .multiplyMatrix(Transformation.scale(sx, sy))
      .multiplyMatrix(Transformation.translation(-pivotX, -pivotY));
  }

  static shearX(kx: number): Matrix {
    /* Create transformation matrix */
    const v1 = new Vector([1, kx]);
    const v2 = new Vector([0, 1]);
    const pivot = new Point([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    return matrix;
  }

  static generalShearX(kx: number, pivot: Point): Matrix {
    const [pivotX, pivotY] = pivot.getPair();

    return Transformation.translation(pivotX, pivotY)
      .multiplyMatrix(Transformation.shearX(kx))
      .multiplyMatrix(Transformation.translation(-pivotX, -pivotY));
  }

  static shearY(ky: number): Matrix {
    /* Create transformation matrix */
    const v1 = new Vector([1, 0]);
    const v2 = new Vector([ky, 1]);
    const pivot = new Point([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    return matrix;
  }

  static generalShearY(ky: number, pivot: Point): Matrix {
    const [pivotX, pivotY] = pivot.getPair();

    return Transformation.translation(pivotX, pivotY)
      .multiplyMatrix(Transformation.shearY(ky))
      .multiplyMatrix(Transformation.translation(-pivotX, -pivotY));
  }
}

export default Transformation;
