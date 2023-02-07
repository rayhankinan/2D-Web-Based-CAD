import Point from "Operations/point";
import Vector from "Operations/vector";
import Matrix from "Operations/matrix";
import Coordinate from "Operations/coordinate";

class Transformation {
  static projection(width: number, height: number): Matrix {
    /* Create transformation matrix */
    const p1 = new Point([2 / width, 0]);
    const p2 = new Point([0, -2 / height]);
    const p3 = new Coordinate([-1, 1, 1]);
    const matrix = new Matrix([p1, p2, p3]);

    return matrix;
  }
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
    const pivot = new Point([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    return matrix;
  }

  static scale(sx: number, sy: number): Matrix {
    /* Create transformation matrix */
    const v1 = new Vector([sx, 0]);
    const v2 = new Vector([0, sy]);
    const pivot = new Point([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    return matrix;
  }

  /* BUG: SHEAR MASIH KEBALIK */
  static shearX(kx: number): Matrix {
    /* Create transformation matrix */
    const v1 = new Vector([1, 0]);
    const v2 = new Vector([kx, 1]);
    const pivot = new Point([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    return matrix;
  }

  /* BUG: SHEAR MASIH KEBALIK */
  static shearY(ky: number): Matrix {
    /* Create transformation matrix */
    const v1 = new Vector([1, ky]);
    const v2 = new Vector([0, 1]);
    const pivot = new Point([0, 0]);
    const matrix = new Matrix([v1, v2, pivot]);

    return matrix;
  }

  static general(
    width: number,
    height: number,
    tx: number,
    ty: number,
    degree: number,
    sx: number,
    sy: number,
    kx: number,
    ky: number,
    pivot: Point
  ): Matrix {
    const [pivotX, pivotY] = pivot.getPair();

    return Transformation.projection(width, height)
      .multiplyMatrix(Transformation.translation(tx, ty))
      .multiplyMatrix(Transformation.translation(pivotX, pivotY))
      .multiplyMatrix(Transformation.rotation(degree))
      .multiplyMatrix(Transformation.scale(sx, sy))
      .multiplyMatrix(Transformation.shearX(kx))
      .multiplyMatrix(Transformation.shearY(ky))
      .multiplyMatrix(Transformation.translation(-pivotX, -pivotY));
  }
}

export default Transformation;
