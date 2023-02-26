import ShapeInterface from "Interfaces/Objects/shape-interface";
import PointInterface from "Interfaces/Operations/point-interface";
import ShapeType from "Main/Objects/types";

interface RectangleInterface extends ShapeInterface {
  type: ShapeType.RECTANGLE;
  p1: PointInterface;
  p2: PointInterface;
  p3: PointInterface;
  p4: PointInterface;
}

export default RectangleInterface;
