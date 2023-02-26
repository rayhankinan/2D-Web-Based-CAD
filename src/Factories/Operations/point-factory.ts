import PointInterface from "Main/Interfaces/Operations/point-interface";
import Point from "Main/Operations/point";

class PointFactory {
  public static fromInterface(pointInterface: PointInterface): Point {
    return new Point(
      [pointInterface.x, pointInterface.y],
      [pointInterface.r, pointInterface.g, pointInterface.b, pointInterface.a]
    );
  }
}

export default PointFactory;
