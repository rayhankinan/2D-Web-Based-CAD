import VectorInterface from "Main/Interfaces/Operations/vector-interface";
import Coordinate from "Operations/coordinate";

class Vector extends Coordinate implements VectorInterface {
  public constructor(position: readonly [number, number]) {
    super([...position, 0]);
  }

  public getPair(): readonly [number, number] {
    return [this.x, this.y];
  }
}

export default Vector;
