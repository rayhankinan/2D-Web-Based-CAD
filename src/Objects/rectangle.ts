import Shape from "Objects/shape";
import Point from "Operations/point";
import renderCanvas from "Main/index";

class Rectangle extends Shape {
  private p1: Point;
  private p2: Point;
  private p3: Point;
  private p4: Point;
  private originalXPoints: number[];
  private originalYPoints: number[];

  public constructor(point: Point) {
    super(4);

    this.p1 = point;
    this.deltaXvalue = 0;
    this.deltaYvalue = 0;
    this.deltaLengthValue = 0;
    this.deltaWidthValue = 0;

    this.originalXPoints = [point.getPair()[0]];
    this.originalYPoints = [point.getPair()[1]];
  }

  public findCenter(): Point {
    const [p1x, p1y] = this.p1.getPair();
    const [p2x, p2y] = this.p2.getPair();
    const [p3x, p3y] = this.p3.getPair();
    const [p4x, p4y] = this.p4.getPair();

    return new Point([
      (p1x + p2x + p3x + p4x) / 4,
      (p1y + p2y + p3y + p4y) / 4,
    ]);
  }

  public updatePoint(p: Point) {
    let p2 = p;
    const [p3, p4] = this.getSymmetricalRectanglePoint(p);

    // p1 ----> p3
    // ^		v
    // p4 <---- p2
    this.p2 = p3;
    this.p3 = p;
    this.p4 = p4;

    this.originalXPoints[1] = this.p2.getPair()[0];
    this.originalXPoints[2] = this.p3.getPair()[0];
    this.originalXPoints[3] = this.p4.getPair()[0];

    this.originalYPoints[1] = this.p2.getPair()[1];
    this.originalYPoints[2] = this.p3.getPair()[1];
    this.originalYPoints[3] = this.p4.getPair()[1];
  }

  public addPosition(gl: WebGLRenderingContext): void {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        ...this.p1.getPair(),
        ...this.p2.getPair(),
        ...this.p3.getPair(),
        ...this.p4.getPair(),
        ...this.p1.getPair(),
      ]),
      gl.STATIC_DRAW
    );
  }

  public addColor(gl: WebGLRenderingContext): void {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        ...this.p1.getColor(),
        ...this.p2.getColor(),
        ...this.p3.getColor(),
        ...this.p4.getColor(),
        ...this.p1.getColor(),
      ]),
      gl.STATIC_DRAW
    );
  }

  public drawMethod(gl: WebGLRenderingContext): number {
    return gl.TRIANGLE_FAN;
  }

  public count(): number {
    return this.n + 1;
  }

  public isPointComplete(): boolean {
    return this.p2 != null;
  }

  public rotateByDegree(
    x: number,
    y: number,
    a: number,
    b: number,
    deg: number
  ): Point {
    if (deg == 90) {
      return new Point([-y + a + b, x - a + b]);
    } else if (deg == 180) {
      return new Point([-x + 2 * a, -y + 2 * b]);
    } else if (deg == 270) {
      return new Point([y - b + a, -x + a + b]);
    }
  }

  public getSymmetricalRectanglePoint(point: Point): [Point, Point] {
    const [a, b] = this.p1.getPair();
    const [c, d] = point.getPair();

    let point1 = new Point([a, d]);
    let point2 = new Point([c, b]);

    return [point1, point2];
  }

  public moveX(delta: number) {
    this.p1.setX(this.originalXPoints[0] + delta - this.deltaLengthValue);
    this.p2.setX(this.originalXPoints[1] + delta - this.deltaLengthValue);
    this.p3.setX(this.originalXPoints[2] + delta + this.deltaLengthValue);
    this.p4.setX(this.originalXPoints[3] + delta + this.deltaLengthValue);

    renderCanvas();
  }

  public moveY(delta: number) {
    this.p1.setY(this.originalYPoints[0] + delta - this.deltaWidthValue);
    this.p2.setY(this.originalYPoints[1] + delta + this.deltaWidthValue);
    this.p3.setY(this.originalYPoints[2] + delta + this.deltaWidthValue);
    this.p4.setY(this.originalYPoints[3] + delta - this.deltaWidthValue);

    renderCanvas();
  }

  public setLength(delta: number) {
    this.p1.setX(this.originalXPoints[0] - delta);
    this.p2.setX(this.originalXPoints[1] - delta);
    this.p3.setX(this.originalXPoints[2] + delta);
    this.p4.setX(this.originalXPoints[3] + delta);

    renderCanvas();
  }

  public setWidth(delta: number) {
    this.p1.setY(this.originalYPoints[0] - delta);
    this.p2.setY(this.originalYPoints[1] + delta);
    this.p3.setY(this.originalYPoints[2] + delta);
    this.p4.setY(this.originalYPoints[3] - delta);

    renderCanvas();
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

    // slider Height and Width
    let secondDiv = document.createElement("div");
    secondDiv.className = "transformation-size";
    let sizeSelectorTitle = document.createElement("h1");
    sizeSelectorTitle.textContent = "Size";

    /* Slider length */
    let sliderLengthTitle = document.createElement("h2");
    sliderLengthTitle.textContent = "Slider Length";

    let sliderLengthtext = document.createElement("label");
    sliderLengthtext.textContent = this.deltaYvalue.toString();

    let sliderLength = document.createElement("input");
    sliderLength.type = "range";
    sliderLength.min = "0";
    sliderLength.max = "500";
    sliderLength.value = this.deltaLengthValue.toString();
    sliderLength.step = "10";
    sliderLength.addEventListener("input", (e) => {
      const delta = (e.target as HTMLInputElement).value;
      this.setLength(+delta);
      this.deltaLengthValue = +delta;
      sliderLengthtext.textContent = this.deltaLengthValue.toString();
    });

    /* Slider width */
    let sliderWidthTitle = document.createElement("h2");
    sliderWidthTitle.textContent = "Slider Width";

    let sliderWidthText = document.createElement("label");
    sliderWidthText.textContent = this.deltaYvalue.toString();

    let sliderWidth = document.createElement("input");
    sliderWidth.type = "range";
    sliderWidth.min = "0";
    sliderWidth.max = "500";
    sliderWidth.value = this.deltaWidthValue.toString();
    sliderWidth.step = "10";
    sliderWidth.addEventListener("input", (e) => {
      const delta = (e.target as HTMLInputElement).value;
      this.setWidth(+delta);
      this.deltaWidthValue = +delta;
      sliderWidthText.textContent = this.deltaWidthValue.toString();
    });

    secondDiv.append(
      sizeSelectorTitle,
      sliderLengthTitle,
      sliderLength,
      sliderLengthtext,
      sliderWidthTitle,
      sliderWidth,
      sliderWidthText
    );

    // input for colors
    let thirdDiv = document.createElement("div");
    thirdDiv.className = "transformation-color";

    let colorSelectorTitle = document.createElement("h1");
    colorSelectorTitle.textContent = "Color";

    thirdDiv.append(colorSelectorTitle);
    selector.append(firstDiv, secondDiv, thirdDiv);
  }
}

export default Rectangle;
