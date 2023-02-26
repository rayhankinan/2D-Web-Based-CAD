import ShapeInterface from "Interfaces/Objects/shape-interface";
import PointInterface from "Interfaces/Operations/point-interface";
import ShapeType from "Main/Objects/types";

interface PolygonInterface extends ShapeInterface {
  type: ShapeType.POLYGON;
  arrayOfPoint: PointInterface[];
}

export default PolygonInterface;
