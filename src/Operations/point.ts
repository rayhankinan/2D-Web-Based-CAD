import Coordinate from "Operations/coordinate";

class Point extends Coordinate {
  constructor(tuple: readonly [number, number]) {
    const [x, y] = tuple;
    super([x, y, 1]);
  }
}

export default Point;
