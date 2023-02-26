import ShapeInterface from "Interfaces/Objects/shape-interface";
import ShapeType from "Main/Objects/types";

interface FileInterface {
  objects: ShapeInterface[];
  shapeType: ShapeType;
  isDrawing: boolean;
}

export default FileInterface;
