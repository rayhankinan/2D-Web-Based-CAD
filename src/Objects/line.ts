import Shape from "Objects/shape";
import Point from "Operations/point";
import renderCanvas from "Main/index";

class Line extends Shape {
  public p1: Point;
  public p2: Point;

  public constructor(p1: Point) {
    super(2);

    this.p1 = p1;
    this.p2 = null;
  }

  public findCenter(): Point {
    const [p1x, p1y] = this.p1.getPair();
    const [p2x, p2y] = this.p2.getPair();

    return new Point([(p1x + p2x) / 2, (p1y + p2y) / 2]);
  }

  public updatePoint(p2: Point) {
    this.p2 = p2;
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
    this.tx = delta;

    renderCanvas();
  }

  public moveY(delta: number) {
    this.ty = -delta;

    renderCanvas();
  }

  public setLength(delta: number) {
    const [p1x] = this.p1.getPair();
    const [p2x] = this.p2.getPair();

    /* Mengikuti sumbu X */
    this.sx = 1 + delta / (p2x - p1x);
    this.sy = 1 + delta / (p2x - p1x);

    renderCanvas();
  }

  public setupSelector() {
    const selector = document.getElementById("selector");
    selector.innerHTML = "";
    selector.replaceChildren();

    /* First Div  */
    const firstDiv = document.createElement("div");
    firstDiv.className = "transformation-translation";

    const translationSelectorTitle = document.createElement("h1");
    translationSelectorTitle.textContent = "Translation";

    /* Slider X */
    const sliderXTitle = document.createElement("h2");
    sliderXTitle.textContent = "Slider X";

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
    const sliderYTitle = document.createElement("h2");
    sliderYTitle.textContent = "Slider Y";

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
      sliderXTitle,
      sliderX,
      sliderXtext,
      sliderYTitle,
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
    const [p2x] = this.p2.getPair();

    const sliderLengthtext = document.createElement("label");
    sliderLengthtext.textContent = ((this.sx - 1) * (p2x - p1x)).toString();

    const sliderLength = document.createElement("input");
    sliderLength.type = "range";
    sliderLength.min = "0";
    sliderLength.max = "500";
    sliderLength.value = ((this.sx - 1) * (p2x - p1x)).toString();
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

export default Line;
