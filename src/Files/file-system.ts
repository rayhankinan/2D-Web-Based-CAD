import ShapeFactory from "Main/Factories/Objects/shape-factory";
import FileInterface from "Main/Interfaces/Files/file-interface";
import ShapeInterface from "Main/Interfaces/Objects/shape-interface";
import Shape from "Main/Objects/shape";
import ShapeType from "Main/Objects/types";

class FileSystem {
  public static load(text: string): [Shape[], ShapeType, boolean] {
    const [shapeInterfaces, shapeType, isDrawing] = JSON.parse(text) as [
      ShapeInterface[],
      ShapeType,
      boolean
    ];

    const shapes: Shape[] = [];
    for (const shapeInterface of shapeInterfaces) {
      shapes.push(ShapeFactory.fromInterface(shapeInterface));
    }

    return [shapes, shapeType, isDrawing];
  }

  public static serialize(
    shapes: Shape[],
    shapeType: ShapeType,
    isDrawing: boolean
  ): string {
    return JSON.stringify([shapes, shapeType, isDrawing]);
  }
}

export default FileSystem;
