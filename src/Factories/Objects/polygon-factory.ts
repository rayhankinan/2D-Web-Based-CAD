import PolygonInterface from "Main/Interfaces/Objects/polygon-interface";
import Polygon from "Main/Objects/polygon";
import PointFactory from "Factories/Operations/point-factory";

class PolygonFactory {
  public static fromInterface(polygonInterface: PolygonInterface): Polygon {
    const [pInitialInterface, ...pRestInterfaces] =
      polygonInterface.arrayOfPoint;

    const polygon = new Polygon(
      PointFactory.fromInterface(pInitialInterface),
      polygonInterface.id
    );
    for (const p of pRestInterfaces) {
      polygon.updatePoint(PointFactory.fromInterface(p));
    }

    return polygon;
  }
}

export default PolygonFactory;
