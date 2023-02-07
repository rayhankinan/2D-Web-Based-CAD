import Coordinate from "Operations/coordinate";

class Matrix {
  protected a1;
  protected a2;
  protected a3;

  constructor(tuple: readonly [Coordinate, Coordinate, Coordinate]) {
    const [a1, a2, a3] = tuple;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
  }

  getTuple(): readonly [Coordinate, Coordinate, Coordinate] {
    return [this.a1, this.a2, this.a3];
  }

  multiplyMatrix(other: Matrix): Matrix {
    /* Unpack "this" matrix */
    const [a11, a21, a31] = this.a1.getTuple();
    const [a12, a22, a32] = this.a2.getTuple();
    const [a13, a23, a33] = this.a3.getTuple();

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

  multiplyCoordinate(other: Coordinate): Coordinate {
    /* Unpack "this" matrix */
    const [a11, a21, a31] = this.a1.getTuple();
    const [a12, a22, a32] = this.a2.getTuple();
    const [a13, a23, a33] = this.a3.getTuple();

    /* Create transpose coordinate */
    const a1 = new Coordinate([a11, a12, a13]);
    const a2 = new Coordinate([a21, a22, a23]);
    const a3 = new Coordinate([a31, a32, a33]);

    /* Coordinate multiplication */
    const b1 = a1.dot(other);
    const b2 = a2.dot(other);
    const b3 = a3.dot(other);

    /* Create result coordinate */
    const coordinate = new Coordinate([b1, b2, b3]);

    return coordinate;
  }
}

export default Matrix;
