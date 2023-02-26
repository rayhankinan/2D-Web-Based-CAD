import SquareInterface from "Main/Interfaces/Objects/square-interface";
import Square from "Main/Objects/square";
import PointFactory from "Factories/Operations/point-factory";

class SquareFactory {
  public static fromInterface(squareInterface: SquareInterface): Square {
    const square = new Square(PointFactory.fromInterface(squareInterface.p1));
    square.p2 = PointFactory.fromInterface(squareInterface.p2);
    square.p3 = PointFactory.fromInterface(squareInterface.p3);
    square.p4 = PointFactory.fromInterface(squareInterface.p4);

    return square;
  }
}

export default SquareFactory;
