import PolygonInterface from "Main/Interfaces/Objects/polygon-interface";
import Polygon from "Main/Objects/polygon";
import Point from "Main/Operations/point";

class PolygonFactory {
  public static fromInterface(polygonInterface: PolygonInterface): Polygon {
    const [pInitial, ...pRest] = polygonInterface.arrayOfPoint;

    const polygon = new Polygon(new Point([pInitial.x, pInitial.y]));
    for (const p of pRest) {
      polygon.updatePoint(new Point([p.x, p.y]));
    }

    return polygon;
  }
}

export default PolygonFactory;
