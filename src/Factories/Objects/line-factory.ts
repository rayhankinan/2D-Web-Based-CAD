import LineInterface from "Main/Interfaces/Objects/line-interface";
import Line from "Main/Objects/line";
import PointFactory from "Factories/Operations/point-factory";

class LineFactory {
  public static fromInterface(lineInterface: LineInterface): Line {
    const line = new Line(
      PointFactory.fromInterface(lineInterface.p1),
      lineInterface.id
    );
    line.p2 = PointFactory.fromInterface(lineInterface.p2);

    return line;
  }
}

export default LineFactory;
