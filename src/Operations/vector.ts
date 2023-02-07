import Coordinate from "Operations/coordinate";

class Vector extends Coordinate {
  constructor(tuple: readonly [number, number]) {
    const [x, y] = tuple;
    super([x, y, 0]);
  }
}

export default Vector;
