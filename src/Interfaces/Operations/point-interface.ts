import CoordinateInterface from "Interfaces/Operations/coordinate-interface";

interface PointInterface extends CoordinateInterface {
  r: number;
  g: number;
  b: number;
  a: number;
}

export default PointInterface;
