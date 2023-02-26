import RectangleInterface from "Main/Interfaces/Objects/rectangle-interface";
import Rectangle from "Main/Objects/rectangle";
import Point from "Main/Operations/point";

class RectangleFactory {
  public static fromInterface(
    rectangleInterface: RectangleInterface
  ): Rectangle {
    const rectangle = new Rectangle(
      new Point([rectangleInterface.p1.x, rectangleInterface.p1.y])
    );
    rectangle.p2 = new Point([
      rectangleInterface.p2.x,
      rectangleInterface.p2.y,
    ]);
    rectangle.p3 = new Point([
      rectangleInterface.p3.x,
      rectangleInterface.p3.y,
    ]);
    rectangle.p4 = new Point([
      rectangleInterface.p4.x,
      rectangleInterface.p4.y,
    ]);

    return rectangle;
  }
}

export default RectangleFactory;
