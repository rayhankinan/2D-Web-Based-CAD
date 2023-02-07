import Coordinate from "Operations/coordinate";

class Vector extends Coordinate {
  constructor(tuple: readonly [number, number]) {
    const [x, y] = tuple;
    super([x, y, 0]);
  }

  getPair(): readonly [number, number] {
    return [this.x, this.y];
  }
}

export default Vector;
