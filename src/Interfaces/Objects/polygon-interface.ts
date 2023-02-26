import ShapeInterface from "Interfaces/Objects/shape-interface";
import PointInterface from "Interfaces/Operations/point-interface";

interface PolygonInterface extends ShapeInterface {
  arrayOfPoint: PointInterface[];
}

export default PolygonInterface;
