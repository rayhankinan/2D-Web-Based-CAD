import Coordinate from "Operations/coordinate";

class Point extends Coordinate {
  private r: number;
  private g: number;
  private b: number;
  private a: number;

  public constructor(
    position: readonly [number, number],
    color: readonly [number, number, number, number] = [0, 0, 0, 1]
  ) {
    super([...position, 1]);

    const [r, g, b, a] = color;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public getPair(): readonly [number, number] {
    return [this.x, this.y];
  }

  public getColor(): readonly [number, number, number, number] {
    return [this.r, this.g, this.b, this.a];
  }

  public setColor(color: readonly [number, number, number, number]): void {
    const [r, g, b, a] = color;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

}

export default Point;
