import ShapeInterface from "Interfaces/Objects/shape-interface";
import PointInterface from "Interfaces/Operations/point-interface";

interface RectangleInterface extends ShapeInterface {
  p1: PointInterface;
  p2: PointInterface;
  p3: PointInterface;
  p4: PointInterface;
}

export default RectangleInterface;
