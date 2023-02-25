import Coordinate from "Operations/coordinate";
import Point from "Operations/point";

class Matrix {
  protected a1;
  protected a2;
  protected a3;

  public constructor(tuple: readonly [Coordinate, Coordinate, Coordinate]) {
    const [a1, a2, a3] = tuple;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
  }

  public getTuple(): readonly [Coordinate, Coordinate, Coordinate] {
    return [this.a1, this.a2, this.a3];
  }

  public flatten(): readonly number[] {
    return [
      ...this.a1.getTriplet(),
      ...this.a2.getTriplet(),
      ...this.a3.getTriplet(),
    ];
  }

  public multiplyMatrix(other: Matrix): Matrix {
    /* Unpack "this" matrix */
    const [a11, a21, a31] = this.a1.getTriplet();
    const [a12, a22, a32] = this.a2.getTriplet();
    const [a13, a23, a33] = this.a3.getTriplet();

    /* Create transpose coordinate */
    const a1 = new Coordinate([a11, a12, a13]);
    const a2 = new Coordinate([a21, a22, a23]);
    const a3 = new Coordinate([a31, a32, a33]);

    /* Matrix multiplication */
    const b11 = a1.dot(other.a1);
    const b12 = a1.dot(other.a2);
    const b13 = a1.dot(other.a3);
    const b21 = a2.dot(other.a1);
    const b22 = a2.dot(other.a2);
    const b23 = a2.dot(other.a3);
    const b31 = a3.dot(other.a1);
    const b32 = a3.dot(other.a2);
    const b33 = a3.dot(other.a3);

    /* Create result coordinate */
    const b1 = new Coordinate([b11, b21, b31]);
    const b2 = new Coordinate([b12, b22, b32]);
    const b3 = new Coordinate([b13, b23, b33]);

    /* Create new matrix */
    const matrix = new Matrix([b1, b2, b3]);

    return matrix;
  }

  public multiplyPoint(point: Point): Point {
    /* Unpack "this" matrix */
    const [a11, a21] = this.a1.getTriplet();
    const [a12, a22] = this.a2.getTriplet();
    const [a13, a23] = this.a3.getTriplet();

    /* Create transpose coordinate */
    const a1 = new Coordinate([a11, a12, a13]);
    const a2 = new Coordinate([a21, a22, a23]);

    const x1 = a1.dot(point);
    const y1 = a2.dot(point);

    const coordinate1 = new Point([x1, y1]);

    return coordinate1;
  }
}

export default Matrix;
