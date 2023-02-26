class Coordinate {
  protected x: number;
  protected y: number;
  protected w: number;

  public constructor(position: readonly [number, number, number]) {
    const [x, y, w] = position;
    this.x = x;
    this.y = y;
    this.w = w;
  }

  public getTriplet(): readonly [number, number, number] {
    return [this.x, this.y, this.w];
  }

  public setTriplet(position: readonly [number, number, number]): void {
    const [x, y, w] = position;
    this.x = x;
    this.y = y;
    this.w = w;
  }

  public setX(x: number): void {
    this.x = x;
  }

  public setY(y: number): void {
    this.y = y;
  }

  public dot(other: Coordinate): number {
    return this.x * other.x + this.y * other.y + this.w * other.w;
  }
}

export default Coordinate;
