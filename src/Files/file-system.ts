import ShapeFactory from "Main/Factories/Objects/shape-factory";
import ShapeInterface from "Main/Interfaces/Objects/shape-interface";
import Shape from "Main/Objects/shape";

class FileSystem {
  public static load(text: string): Shape[] {
    const shapeInterfaces = JSON.parse(text) as ShapeInterface[];

    const shapes: Shape[] = [];
    for (const shapeInterface of shapeInterfaces) {
      shapes.push(ShapeFactory.fromInterface(shapeInterface));
    }

    return shapes;
  }

  public static serialize(shapes: Shape[]): string {
    return JSON.stringify(shapes);
  }
}

export default FileSystem;
