import ShapeInterface from "Main/Interfaces/Objects/shape-interface";

class FileSystem {
  public static loadShape(text: string): ShapeInterface[] {
    return JSON.parse(text) as ShapeInterface[];
  }

  public static rawShape(arrayOfShapeInterface: ShapeInterface[]): string {
    return JSON.stringify(arrayOfShapeInterface);
  }
}

export default FileSystem;
