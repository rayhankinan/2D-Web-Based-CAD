import FileInterface from "Main/Interfaces/Files/file-interface";

class FileSystem {
  public static loadShape(text: string): FileInterface {
    return JSON.parse(text) as FileInterface;
  }

  public static rawShape(fileInterface: FileInterface): string {
    return JSON.stringify(fileInterface);
  }
}

export default FileSystem;
