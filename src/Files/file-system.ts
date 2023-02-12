import Shape from "Objects/shape";

class FileSystem {
  public static loadShape(text: string): Shape {
    return JSON.parse(text) as Shape;
  }

  public static rawShape(shape: Shape): string {
    return JSON.stringify(shape);
  }
}

export default FileSystem;
