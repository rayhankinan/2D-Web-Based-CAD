class Coordinate {
  protected x: number;
  protected y: number;
  protected w: number;

  constructor(position: readonly [number, number, number]) {
    const [x, y, w] = position;
    this.x = x;
    this.y = y;
    this.w = w;
  }

  getPosition(): readonly [number, number, number] {
    return [this.x, this.y, this.w];
  }

  dot(other: Coordinate): number {
    return this.x * other.x + this.y * other.y + this.w * other.w;
  }
}

export default Coordinate;
