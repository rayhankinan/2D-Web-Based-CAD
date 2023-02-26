import LineInterface from "Main/Interfaces/Objects/line-interface";
import Line from "Main/Objects/line";
import Point from "Main/Operations/point";

class LineFactory {
  public static fromInterface(lineInterface: LineInterface): Line {
    const line = new Line(new Point([lineInterface.p1.x, lineInterface.p1.y]));
    line.p2 = new Point([lineInterface.p2.x, lineInterface.p2.y]);

    return line;
  }
}

export default LineFactory;
