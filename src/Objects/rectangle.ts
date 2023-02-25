import Shape from "Objects/shape";
import Point from "Operations/point";
import renderCanvas from "Main/index";

class Rectangle extends Shape {
  private p1: Point;
  private p2: Point;
  private p3: Point;
  private p4: Point;

  public constructor(point: Point) {
    super(4);

    this.p1 = point;
    this.p2 = null;
    this.p3 = null;
    this.p3 = null;
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
    const [p2, p4] = this.getSymmetricalRectanglePoint(p);

    // p1 ----> p2
    // ↑        ↓
    // p4 <---- p3
    this.p2 = p2;
    this.p3 = p;
    this.p4 = p4;
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
    return this.p3 != null;
  }

  public getSymmetricalRectanglePoint(point: Point): [Point, Point] {
    const [a, b] = this.p1.getPair();
    const [c, d] = point.getPair();

    let point1 = new Point([a, d]);
    let point2 = new Point([c, b]);

    return [point1, point2];
  }

  public moveX(delta: number) {
    this.tx = delta;

    renderCanvas();
  }

  public moveY(delta: number) {
    this.ty = -delta;

    renderCanvas();
  }

  public setLength(delta: number) {
    const [p1x] = this.p1.getPair();
    const [p3x] = this.p3.getPair();

    this.sx = 1 + delta / (p3x - p1x);

    renderCanvas();
  }

  public setWidth(delta: number) {
    const [, p1y] = this.p1.getPair();
    const [, p3y] = this.p3.getPair();

    this.sy = 1 - delta / (p3y - p1y);

    renderCanvas();
  }

  public setupSelector(): void {
    const selector = document.getElementById("selector");
    selector.replaceChildren();

    /* First Div  */
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

    const [p1x] = this.p1.getPair();
    const [p3x] = this.p3.getPair();

    const sliderLengthtext = document.createElement("label");
    sliderLengthtext.textContent = ((this.sx - 1) * (p3x - p1x)).toString();

    const sliderLength = document.createElement("input");
    sliderLength.type = "range";
    sliderLength.min = "0";
    sliderLength.max = "500";
    sliderLength.value = ((this.sx - 1) * (p3x - p1x)).toString();
    sliderLength.step = "10";
    sliderLength.addEventListener("input", (event) => {
      const delta = (event.target as HTMLInputElement).value;
      sliderLengthtext.textContent = delta;

      this.setLength(+delta);
    });

    /* Slider Width */
    const sliderWidthTitle = document.createElement("h2");
    sliderWidthTitle.textContent = "Slider Width";

    const [, p1y] = this.p1.getPair();
    const [, p3y] = this.p3.getPair();

    const sliderWidthText = document.createElement("label");
    sliderWidthText.textContent = ((this.sy - 1) * (p1y - p3y)).toString();

    const sliderWidth = document.createElement("input");
    sliderWidth.type = "range";
    sliderWidth.min = "0";
    sliderWidth.max = "500";
    sliderWidth.value = ((this.sy - 1) * (p1y - p3y)).toString();
    sliderWidth.step = "10";
    sliderWidth.addEventListener("input", (event) => {
      const delta = (event.target as HTMLInputElement).value;
      sliderWidthText.textContent = delta;

      this.setWidth(+delta);
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

    /* Third Div */
    const thirdDiv = document.createElement("div");
    thirdDiv.className = "transformation-color";

    const colorSelectorTitle = document.createElement("h1");
    colorSelectorTitle.textContent = "Color";

    thirdDiv.append(colorSelectorTitle);
    selector.append(firstDiv, secondDiv, thirdDiv);
  }
}

export default Rectangle;
