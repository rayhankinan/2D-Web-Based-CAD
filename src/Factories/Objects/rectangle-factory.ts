import RectangleInterface from "Main/Interfaces/Objects/rectangle-interface";
import Rectangle from "Main/Objects/rectangle";
import PointFactory from "Factories/Operations/point-factory";

class RectangleFactory {
  public static fromInterface(
    rectangleInterface: RectangleInterface
  ): Rectangle {
    const rectangle = new Rectangle(
      PointFactory.fromInterface(rectangleInterface.p1)
    );
    rectangle.p2 = PointFactory.fromInterface(rectangleInterface.p2);
    rectangle.p3 = PointFactory.fromInterface(rectangleInterface.p3);
    rectangle.p4 = PointFactory.fromInterface(rectangleInterface.p4);

    return rectangle;
  }
}

export default RectangleFactory;
