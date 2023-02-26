import SquareInterface from "Main/Interfaces/Objects/square-interface";
import Square from "Main/Objects/square";
import Point from "Main/Operations/point";

class SquareFactory {
  public static fromInterface(squareInterface: SquareInterface): Square {
    const square = new Square(
      new Point([squareInterface.p1.x, squareInterface.p1.y])
    );
    square.p2 = new Point([squareInterface.p2.x, squareInterface.p2.y]);
    square.p3 = new Point([squareInterface.p3.x, squareInterface.p3.y]);
    square.p4 = new Point([squareInterface.p4.x, squareInterface.p4.y]);

    return square;
  }
}

export default SquareFactory;
