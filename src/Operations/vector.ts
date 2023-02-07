import Coordinate from "Operations/coordinate";

class Vector extends Coordinate {
  constructor(position: readonly [number, number]) {
    super([...position, 0]);
  }

  getPair(): readonly [number, number] {
    return [this.x, this.y];
  }
}

export default Vector;
