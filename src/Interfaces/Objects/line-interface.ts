import ShapeInterface from "Interfaces/Objects/shape-interface";
import PointInterface from "Interfaces/Operations/point-interface";

interface LineInterface extends ShapeInterface {
  p1: PointInterface;
  p2: PointInterface;
}

export default LineInterface;
