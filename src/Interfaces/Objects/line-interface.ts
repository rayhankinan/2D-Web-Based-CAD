import ShapeInterface from "Interfaces/Objects/shape-interface";
import PointInterface from "Interfaces/Operations/point-interface";
import ShapeType from "Main/Objects/types";

interface LineInterface extends ShapeInterface {
  type: ShapeType.LINE;
  p1: PointInterface;
  p2: PointInterface;
}

export default LineInterface;
