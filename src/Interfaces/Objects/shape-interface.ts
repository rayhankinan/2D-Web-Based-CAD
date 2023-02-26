import ShapeType from "Main/Objects/types";

interface ShapeInterface {
  readonly id: number;
  readonly type: ShapeType;
  tx: number;
  ty: number;
  degree: number;
  sx: number;
  sy: number;
  kx: number;
  ky: number;
}

export default ShapeInterface;
