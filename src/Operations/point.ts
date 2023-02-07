import Coordinate from "Operations/coordinate";

class Point extends Coordinate {
  constructor(tuple: readonly [number, number]) {
    const [x, y] = tuple;
    super([x, y, 1]);
  }

  getPair(): readonly [number, number] {
    return [this.x, this.y];
  }
}

export default Point;
