import Shape from "Objects/shape";
import Point from "Operations/point";
import Transformation from "Main/Operations/transformation";
import renderCanvas from "Main/index";

class Square extends Shape {
  private center: Point;
  private p1: Point;
  private p2: Point;
  private p3: Point;
  private p4: Point;

  public constructor(point: Point) {
    super(4);

    this.center = point;
  }

  public findCenter(): Point {
    return this.center;
  }

  public updatePoint(p: Point) {
    this.p1 = p;
    [this.p2, this.p3, this.p4] = this.getSymmetricalSquarePoint();
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
    return this.p1 != null;
  }

  public getSymmetricalSquarePoint(): readonly [Point, Point, Point] {
    const [xCenter, yCenter] = this.center.getPair();

    const p2 = Transformation.translation(xCenter, yCenter)
      .multiplyMatrix(Transformation.rotation(0.5 * Math.PI))
      .multiplyMatrix(Transformation.translation(-xCenter, -yCenter))
      .multiplyPoint(this.p1);

    console.log([
      this.p1,
      this.center,
      Transformation.translation(xCenter, yCenter),
      Transformation.rotation(0.5 * Math.PI),
      Transformation.translation(-xCenter, -yCenter),
      this.p2,
    ]);

    const p3 = Transformation.translation(xCenter, yCenter)
      .multiplyMatrix(Transformation.rotation(Math.PI))
      .multiplyMatrix(Transformation.translation(-xCenter, -yCenter))
      .multiplyPoint(this.p1);

    const p4 = Transformation.translation(xCenter, yCenter)
      .multiplyMatrix(Transformation.rotation(1.5 * Math.PI))
      .multiplyMatrix(Transformation.translation(-xCenter, -yCenter))
      .multiplyPoint(this.p1);

    return [p2, p3, p4];
  }

  public moveX(delta: number) {
    this.tx = delta;

    renderCanvas();
  }

  public moveY(delta: number) {
    this.ty = -delta;

    renderCanvas();
  }

  public getLength(): number {
    const [x1, y1] = this.p1.getPair();
    const [x2, y2] = this.p2.getPair();

    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  public setLength(delta: number) {
    this.sx = 1 + delta / this.getLength();
    this.sy = 1 + delta / this.getLength();

    renderCanvas();
  }

  public setupSelector(): void {
    const selector = document.getElementById("selector");
    selector.replaceChildren();

    /* First Div */
    const firstDiv = document.createElement("div");
    firstDiv.className = "transformation-translation";

    const translationSelectorTitle = document.createElement("h1");
    translationSelectorTitle.textContent = "Translation";

    /* Slider X */
    const sliderxTitle = document.createElement("h2");
    sliderxTitle.textContent = "Slider X";

    const sliderXtext = document.createElement("label");
    sliderXtext.textContent = this.tx.toString();

    const sliderX = document.createElement("input");
    sliderX.type = "range";
    sliderX.min = "-600";
    sliderX.max = "600";
    sliderX.value = this.tx.toString();
    sliderX.step = "10";
    sliderX.addEventListener("input", (event) => {
      const delta = (event.target as HTMLInputElement).value;
      sliderXtext.textContent = delta;

      this.moveX(+delta);
    });

    /* Slider Y */
    const slideryTitle = document.createElement("h2");
    slideryTitle.textContent = "Slider Y";

    const sliderYtext = document.createElement("label");
    sliderYtext.textContent = (-this.ty).toString();

    const sliderY = document.createElement("input");
    sliderY.type = "range";
    sliderY.min = "-500";
    sliderY.max = "500";
    sliderY.value = (-this.ty).toString();
    sliderY.step = "10";
    sliderY.addEventListener("input", (event) => {
      const delta = (event.target as HTMLInputElement).value;
      sliderYtext.textContent = delta;

      this.moveY(+delta);
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

    /* Second Div */
    const secondDiv = document.createElement("div");
    secondDiv.className = "transformation-size";

    const sizeSelectorTitle = document.createElement("h1");
    sizeSelectorTitle.textContent = "Size";

    /* Slider Length */
    const sliderLengthTitle = document.createElement("h2");
    sliderLengthTitle.textContent = "Slider Length";

    const sliderLengthtext = document.createElement("label");
    sliderLengthtext.textContent = (
      (this.sx - 1) *
      this.getLength()
    ).toString();

    const sliderLength = document.createElement("input");
    sliderLength.type = "range";
    sliderLength.min = "0";
    sliderLength.max = "500";
    sliderLength.value = ((this.sx - 1) * this.getLength()).toString();
    sliderLength.step = "10";
    sliderLength.addEventListener("input", (event) => {
      const delta = (event.target as HTMLInputElement).value;
      sliderLengthtext.textContent = delta;

      this.setLength(+delta);
    });

    secondDiv.append(
      sizeSelectorTitle,
      sliderLengthTitle,
      sliderLength,
      sliderLengthtext
    );

    /* Third Div */
    const thirdDiv = document.createElement("div");
    thirdDiv.className = "transformation-color";

    const colorSelectorTitle = document.createElement("h1");
    colorSelectorTitle.textContent = "Color";

    thirdDiv.append(colorSelectorTitle);
    selector.append(firstDiv, secondDiv, thirdDiv);
  }
}

export default Square;
