import ShapeInterface from "Interfaces/Objects/shape-interface";
import ShapeType from "Main/Objects/types";

interface FileInterface {
  shapeInterfaces: ShapeInterface[];
  shapeType: ShapeType;
  isDrawing: boolean;
}

export default FileInterface;
