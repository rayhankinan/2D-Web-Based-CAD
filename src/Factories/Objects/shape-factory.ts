import ShapeInterface from "Main/Interfaces/Objects/shape-interface";
import Shape from "Main/Objects/shape";
import ShapeType from "Main/Objects/types";
import LineFactory from "Factories/Objects/line-factory";
import RectangleFactory from "Factories/Objects/rectangle-factory";
import PolygonFactory from "Factories/Objects/polygon-factory";
import SquareFactory from "Factories/Objects/square-factory";
import LineInterface from "Main/Interfaces/Objects/line-interface";
import RectangleInterface from "Main/Interfaces/Objects/rectangle-interface";
import PolygonInterface from "Main/Interfaces/Objects/polygon-interface";
import SquareInterface from "Main/Interfaces/Objects/square-interface";

class ShapeFactory {
  public static fromInterface(shapeInterface: ShapeInterface): Shape {
    switch (shapeInterface.type) {
      case ShapeType.LINE:
        return LineFactory.fromInterface(shapeInterface as LineInterface);
      case ShapeType.RECTANGLE:
        return RectangleFactory.fromInterface(
          shapeInterface as RectangleInterface
        );
      case ShapeType.POLYGON:
        return PolygonFactory.fromInterface(shapeInterface as PolygonInterface);
      case ShapeType.SQUARE:
        return SquareFactory.fromInterface(shapeInterface as SquareInterface);
      default:
        throw new Error("Unknown shape type");
    }
  }
}

export default ShapeFactory;
