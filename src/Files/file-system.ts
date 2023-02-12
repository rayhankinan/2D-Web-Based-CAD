import Shape from "Objects/shape";

class FileSystem {
  public static loadShape(text: string): Shape[] {
    return JSON.parse(text) as Shape[];
  }

  public static rawShape(arrayOfShape: Shape[]): string {
    return JSON.stringify(arrayOfShape);
  }
}

export default FileSystem;
