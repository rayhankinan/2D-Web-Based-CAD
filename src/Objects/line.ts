import Shape from "Objects/shape";
import LineInterface from "Main/Interfaces/Objects/line-interface";
import ShapeType from "Objects/types";
import Point from "Operations/point";
import { renderCanvas } from "Main/index";
import { hexToRgb, rgbToHex } from "Main/Utils/tools";

class Line extends Shape implements LineInterface {
  public readonly type: ShapeType.LINE;
  public p1: Point;
  public p2: Point;

  public constructor(p1: Point, id: number) {
    super(id);

    this.type = ShapeType.LINE;
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
    return 2;
  }

  public isPointComplete(): boolean {
    return this.p2 != null;
  }

  public moveX(delta: number): void {
    this.tx = delta;

    renderCanvas();
  }

  public moveY(delta: number): void {
    this.ty = -delta;

    renderCanvas();
  }

  public getLength(): number {
    const [p1x, p1y] = this.p1.getPair();
    const [p2x, p2y] = this.p2.getPair();

    return Math.sqrt((p2x - p1x) ** 2 + (p2y - p1y) ** 2);
  }

  public setLength(delta: number): void {
    /* Mengikuti sumbu X */
    this.sx = 1 + delta / this.getLength();
    this.sy = 1 + delta / this.getLength();

    renderCanvas();
  }

  public setRotation(degree: number): void {
    this.degree = (degree * Math.PI) / 180;

    renderCanvas();
  }

  public setupColorSelector(index: number): void {
    const colorSelector = document.getElementById("color-selector");
    colorSelector.innerHTML = "";
    colorSelector.replaceChildren();

    const colorTitle = document.createElement("h2");
    colorTitle.textContent = "Select color";

    const colorInput = document.createElement("input");
    colorInput.id = "color-input";
    colorInput.type = "color";

    if (index === 1) {
      colorInput.value = rgbToHex(this.p1.getColor());
      colorInput.addEventListener("change", (event) => {
        const hex = (event.target as HTMLInputElement).value;

        this.p1.setColor(hexToRgb(hex));
      });
    }

    if (index === 2) {
      colorInput.value = rgbToHex(this.p2.getColor());
      colorInput.addEventListener("change", (event) => {
        const hex = (event.target as HTMLInputElement).value;

        this.p2.setColor(hexToRgb(hex));
      });
    }

    colorSelector.append(colorTitle, colorInput);
  }

  public setupSelector(): void {
    const selector = document.getElementById("selector");
    selector.innerHTML = "";
    selector.replaceChildren();

    /* First Div  */
    const firstDiv = document.createElement("div");
    firstDiv.className = "transformation-translation";

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

    /* Slider Length */
    const sliderLengthTitle = document.createElement("h2");
    sliderLengthTitle.textContent = "Slider Length";

    const sliderLengthText = document.createElement("label");
    sliderLengthText.textContent = (
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
      sliderLengthText.textContent = delta;

      this.setLength(+delta);
    });

    secondDiv.append(sliderLengthTitle, sliderLength, sliderLengthText);

    /* Third Div */
    const thirdDiv = document.createElement("div");
    thirdDiv.className = "transformation-rotation";

    /* Slider Rotation */
    const sliderRotationTitle = document.createElement("h2");
    sliderRotationTitle.textContent = "Slider Rotation";

    const sliderRotationText = document.createElement("label");
    sliderRotationText.textContent = ((180 * this.degree) / Math.PI).toString();

    const sliderRotation = document.createElement("input");
    sliderRotation.type = "range";
    sliderRotation.min = "0";
    sliderRotation.max = "360";
    sliderRotation.value = ((180 * this.degree) / Math.PI).toString();
    sliderRotation.step = "10";
    sliderRotation.addEventListener("input", (event) => {
      const delta = (event.target as HTMLInputElement).value;
      sliderRotationText.textContent = delta;

      this.setRotation(+delta);
    });

    thirdDiv.append(sliderRotationTitle, sliderRotation, sliderRotationText);

    /* Fourth Div */
    const fourthDiv = document.createElement("div");
    fourthDiv.className = "transformation-color";

    const pointOption = document.createElement("select");
    pointOption.className = "btn";
    pointOption.addEventListener("change", () => {
      const index: number = +pointOption.selectedOptions[0].value;
      this.setupColorSelector(index);
    });

    /* First Point */
    const firstPointOption = document.createElement("option");
    firstPointOption.value = "1";
    firstPointOption.text = "point_1";

    /* Second Point */
    const secondPointOption = document.createElement("option");
    secondPointOption.value = "2";
    secondPointOption.text = "point_2";

    pointOption.appendChild(firstPointOption);
    pointOption.appendChild(secondPointOption);

    const innerFourthDiv = document.createElement("div");
    innerFourthDiv.id = "color-selector";

    fourthDiv.append(pointOption, innerFourthDiv);

    selector.append(firstDiv, secondDiv, thirdDiv, fourthDiv);

    this.setupColorSelector(1);
  }
}

export default Line;
