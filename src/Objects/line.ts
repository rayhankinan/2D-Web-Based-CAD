import Shape from "Objects/shape";
import Point from "Operations/point";
import renderCanvas from "Main/index";

class Line extends Shape {
  public p1: Point;
  public p2: Point;
  private originalXPoints: number[];
  private originalYPoints: number[];

  public constructor(p1: Point) {
    super(2);

    this.p1 = p1;
    this.deltaXvalue = 0;
    this.deltaYvalue = 0;
    this.deltaLengthValue = 0;

    this.originalXPoints = [p1.getPair()[0]];
    this.originalYPoints = [p1.getPair()[1]];
  }

  public findCenter(): Point {
    const [p1x, p1y] = this.p1.getPair();
    const [p2x, p2y] = this.p2.getPair();

    return new Point([(p1x + p2x) / 2, (p1y + p2y) / 2]);
  }

  public updatePoint(p2: Point) {
    this.p2 = p2;

    this.originalXPoints[1] = p2.getPair()[0];
    this.originalYPoints[1] = p2.getPair()[1];
  }

  public addPosition(gl: WebGLRenderingContext): void {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([...this.p1.getPair(), ...this.p2.getPair()]),
      gl.STATIC_DRAW
    );
  }

  public addColor(gl: WebGLRenderingContext): void {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([...this.p1.getColor(), ...this.p2.getColor()]),
      gl.STATIC_DRAW
    );
  }

  public drawMethod(gl: WebGLRenderingContext): number {
    return gl.LINES;
  }

  public count(): number {
    return this.n;
  }

  public isPointComplete(): boolean {
    return this.p2 != null;
  }

  public moveX(delta: number) {
    this.p1.setX(this.originalXPoints[0] + delta + this.deltaLengthValue);
    this.p2.setX(this.originalXPoints[1] + delta + this.deltaLengthValue);

    renderCanvas();
  }

  public moveY(delta: number) {
    this.p1.setY(this.originalYPoints[0] + delta);
    this.p2.setY(this.originalYPoints[1] + delta);

    renderCanvas();
  }

  public findY(x: number, x1: number, y1: number, x2: number, y2: number) {
    let m = (y2 - y1) / (x2 - x1);
    let c = y2 - m * x2;

    return m * x + c;
  }

  public setLength(delta: number) {
    this.p1.setX(this.originalXPoints[0] + delta);
    this.p1.setY(
      this.findY(
        this.originalXPoints[0] + delta,
        this.originalXPoints[0] + delta,
        this.originalYPoints[0],
        this.originalXPoints[1] - delta,
        this.originalYPoints[1]
      )
    );

    this.p2.setX(this.originalXPoints[1] - delta);
    this.p2.setY(
      this.findY(
        this.originalXPoints[1] - delta,
        this.originalXPoints[0] + delta,
        this.originalYPoints[0],
        this.originalXPoints[1] - delta,
        this.originalYPoints[1]
      )
    );

    renderCanvas();
  }

  public setupSelector(): void {
    let selector = document.getElementById("selector");
    selector.innerHTML = "";
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

    // slider length, rotation
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

    /* Slider rotation */

    secondDiv.append(
      sizeSelectorTitle,
      sliderLengthTitle,
      sliderLength,
      sliderLengthtext
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

export default Line;
