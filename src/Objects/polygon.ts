import Shape from "Objects/shape";
import Point from "Operations/point";
import convexHull from "Algorithms/convex-hull";

class Polygon extends Shape {
  private p1: Point;
  private p2: Point;
  private arrayOfPoint: Point[] = [];
  private isMoreThanTwo: boolean;
  private originalXPoints: number[];
  private originalYPoints: number[];

  public constructor(point: Point) {
    super(1);

    this.p1 = point;
    this.isMoreThanTwo = false;
    this.deltaXvalue = 0;
    this.deltaYvalue = 0;

    this.originalXPoints = [point.getPair()[0]];
    this.originalYPoints = [point.getPair()[1]];
  }

  public findCenter(): Point {
    // render point
    if (!this.isMoreThanTwo) {
      const [p1x, p1y] = this.p1.getPair();
      const [p2x, p2y] = this.p2.getPair();

      return new Point([(p1x + p2x) / 2, (p1y + p2y) / 2]);
    }

    let totalX = 0;
    let totalY = 0;

    for (const p of this.arrayOfPoint) {
      const [pX, pY] = p.getPair();

      totalX += pX;
      totalY += pY;
    }

    return new Point([totalX / this.n, totalY / this.n]);
  }

  public updatePoint(point: Point) {
    if (!this.isMoreThanTwo) {
      this.p2 = point;
      this.arrayOfPoint.push(this.p1);
      this.arrayOfPoint.push(this.p2);
      this.isMoreThanTwo = true;

      this.originalXPoints[1] = this.p2.getPair()[0];
      this.originalYPoints[1] = this.p2.getPair()[1];
      return;
    }
    this.arrayOfPoint.push(point);

    const pointsLength = this.originalXPoints.length;
    this.originalXPoints[pointsLength] = point.getPair()[0];
    this.originalYPoints[pointsLength] = point.getPair()[1];
  }

  public updatePointLine(point: Point) {
    this.p2 = point;
  }

  public addPosition(gl: WebGLRenderingContext): void {
    // add position as line
    if (this.arrayOfPoint.length < 3) {
      this.addPositionLine(gl);
      return;
    }

    const positionArray: number[] = [];
    const hull: readonly Point[] = convexHull(this.arrayOfPoint);

    for (const p of hull) {
      positionArray.push(...p.getPair());
    }

    const [pInitial] = hull;
    positionArray.push(...pInitial.getPair());

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(positionArray),
      gl.STATIC_DRAW
    );
  }

  public addPositionLine(gl: WebGLRenderingContext): void {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([...this.p1.getPair(), ...this.p2.getPair()]),
      gl.STATIC_DRAW
    );
  }

  public addColor(gl: WebGLRenderingContext): void {
    // add color as line
    if (this.arrayOfPoint.length < 3) {
      this.addColorLine(gl);
      return;
    }

    const colorArray: number[] = [];
    const hull: readonly Point[] = convexHull(this.arrayOfPoint);

    for (const p of hull) {
      colorArray.push(...p.getColor());
    }

    const [pInitial] = hull;
    colorArray.push(...pInitial.getColor());

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(colorArray),
      gl.STATIC_DRAW
    );
  }

  public addColorLine(gl: WebGLRenderingContext): void {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([...this.p1.getColor(), ...this.p2.getColor()]),
      gl.STATIC_DRAW
    );
  }

  public drawMethod(gl: WebGLRenderingContext): number {
    if (this.arrayOfPoint.length < 3) {
      return gl.LINES;
    }

    return gl.TRIANGLE_FAN;
  }

  public count(): number {
    if (this.arrayOfPoint.length < 3) {
      return 3;
    }
    return this.arrayOfPoint.length + 1;
  }

  public isPointComplete(): boolean {
    return this.p2 != null;
  }

  public moveX(delta: number) {
    if (!this.isMoreThanTwo) {
      this.p1.setX(this.originalXPoints[0] + delta);
      this.p2.setX(this.originalXPoints[1] + delta);
      return;
    }

    for (let i = 0; i < this.arrayOfPoint.length; i++) {
      this.arrayOfPoint[i].setX(this.originalXPoints[i] + delta);
    }
  }

  public moveY(delta: number) {
    if (!this.isMoreThanTwo) {
      this.p1.setY(this.originalYPoints[0] + delta);
      this.p2.setY(this.originalYPoints[1] + delta);
      return;
    }

    for (let i = 0; i < this.arrayOfPoint.length; i++) {
      this.arrayOfPoint[i].setY(this.originalYPoints[i] + delta);
    }
  }

  public setupSelector(): void {
    let selector = document.getElementById("selector");
    selector.replaceChildren();

    // slider x, y for places
    let firstDiv = document.createElement("div");
    firstDiv.className = "transformation-translation";
    let translationSelectorTitle = document.createElement("h1");
    translationSelectorTitle.textContent = "Translation";

    /* SLIDER X */
    let sliderxTitle = document.createElement("h2");
    sliderxTitle.textContent = "Slider X";
    let sliderXtext = document.createElement("label");
    sliderXtext.textContent = this.deltaXvalue.toString();
    let sliderX = document.createElement("input");
    sliderX.type = "range";
    sliderX.min = "-600";
    sliderX.max = "600";
    sliderX.value = this.deltaXvalue.toString();
    sliderX.step = "10";
    sliderX.addEventListener("input", (e) => {
      const delta = (e.target as HTMLInputElement).value;
      this.moveX(+delta);
      this.deltaXvalue = +delta;
      sliderXtext.textContent = this.deltaXvalue.toString();
    });

    /* SLIDER Y */
    let slideryTitle = document.createElement("h2");
    slideryTitle.textContent = "Slider Y";
    let sliderYtext = document.createElement("label");
    sliderYtext.textContent = this.deltaYvalue.toString();
    let sliderY = document.createElement("input");
    sliderY.type = "range";
    sliderY.min = "-500";
    sliderY.max = "500";
    sliderY.value = this.deltaYvalue.toString();
    sliderY.step = "10";
    sliderY.addEventListener("input", (e) => {
      const delta = (e.target as HTMLInputElement).value;
      this.moveY(+delta);
      this.deltaYvalue = +delta;
      sliderYtext.textContent = this.deltaYvalue.toString();
    });

    firstDiv.append(
      translationSelectorTitle,
      sliderxTitle,
      sliderX,
      sliderXtext,
      slideryTitle,
      sliderY,
      sliderYtext
    );

    // slider height, width, rotation
    let secondDiv = document.createElement("div");
    secondDiv.className = "transformation-size";
    let sizeSelectorTitle = document.createElement("h1");
    sizeSelectorTitle.textContent = "Size";

    secondDiv.append(sizeSelectorTitle);

    // input for colors
    let thirdDiv = document.createElement("div");
    thirdDiv.className = "transformation-color";
    let colorSelectorTitle = document.createElement("h1");
    colorSelectorTitle.textContent = "Color";

    thirdDiv.append(colorSelectorTitle);

    selector.append(firstDiv, secondDiv, thirdDiv);
  }
}

export default Polygon;
