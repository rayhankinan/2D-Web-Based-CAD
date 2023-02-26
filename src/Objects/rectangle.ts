import Shape from "Objects/shape";
import RectangleInterface from "Main/Interfaces/Objects/rectangle-interface";
import ShapeType from "Objects/types";
import Point from "Operations/point";
import { renderCanvas } from "Main/index";
import { hexToRgb, rgbToHex } from "Main/Utils/tools";

class Rectangle extends Shape implements RectangleInterface {
  public p1: Point;
  public p2: Point;
  public p3: Point;
  public p4: Point;

  public constructor(point: Point) {
    super(ShapeType.RECTANGLE);

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

  public updatePoint(p: Point): void {
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
    return 5;
  }

  public isPointComplete(): boolean {
    return this.p3 != null;
  }

  public getSymmetricalRectanglePoint(point: Point): [Point, Point] {
    const [a, b] = this.p1.getPair();
    const [c, d] = point.getPair();

    const point1 = new Point([a, d]);
    const point2 = new Point([c, b]);

    return [point1, point2];
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

  public getWidth(): number {
    const [p1x, p1y] = this.p1.getPair();
    const [p4x, p4y] = this.p4.getPair();

    return Math.sqrt((p4x - p1x) ** 2 + (p4y - p1y) ** 2);
  }

  public setLength(delta: number): void {
    this.sx = 1 + delta / this.getLength();

    renderCanvas();
  }

  public setWidth(delta: number): void {
    this.sy = 1 + delta / this.getWidth();

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

    switch (index) {
      case 1:
        colorInput.value = rgbToHex(this.p1.getColor());
        colorInput.addEventListener("change", (e) => {
          console.log((e.target as HTMLInputElement).value);
          const hex = (e.target as HTMLInputElement).value;

          console.log(hexToRgb(hex));
          this.p1.setColor(hexToRgb(hex));
        });
        break;

      case 2:
        colorInput.value = rgbToHex(this.p2.getColor());
        colorInput.addEventListener("change", (e) => {
          console.log((e.target as HTMLInputElement).value);
          const hex = (e.target as HTMLInputElement).value;

          console.log(hexToRgb(hex));
          this.p2.setColor(hexToRgb(hex));
        });
        break;

      case 3:
        colorInput.value = rgbToHex(this.p3.getColor());
        colorInput.addEventListener("change", (e) => {
          console.log((e.target as HTMLInputElement).value);
          const hex = (e.target as HTMLInputElement).value;

          console.log(hexToRgb(hex));
          this.p3.setColor(hexToRgb(hex));
        });
        break;

      case 4:
        colorInput.value = rgbToHex(this.p4.getColor());
        colorInput.addEventListener("change", (e) => {
          console.log((e.target as HTMLInputElement).value);
          const hex = (e.target as HTMLInputElement).value;

          console.log(hexToRgb(hex));
          this.p4.setColor(hexToRgb(hex));
        });
        break;
    }

    colorSelector.append(colorTitle, colorInput);
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

    /* Slider Width */
    const sliderWidthTitle = document.createElement("h2");
    sliderWidthTitle.textContent = "Slider Width";

    const sliderWidthText = document.createElement("label");
    sliderWidthText.textContent = ((this.sy - 1) * this.getWidth()).toString();

    const sliderWidth = document.createElement("input");
    sliderWidth.type = "range";
    sliderWidth.min = "0";
    sliderWidth.max = "500";
    sliderWidth.value = ((this.sy - 1) * this.getWidth()).toString();
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
      sliderLengthText,
      sliderWidthTitle,
      sliderWidth,
      sliderWidthText
    );

    /* Third Div */
    const thirdDiv = document.createElement("div");
    thirdDiv.className = "transformation-rotation";

    const rotationSelectorTitle = document.createElement("h1");
    rotationSelectorTitle.textContent = "Rotation";

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

    thirdDiv.append(
      rotationSelectorTitle,
      sliderRotationTitle,
      sliderRotation,
      sliderRotationText
    );

    /* Fourth Div */
    const fourthDiv = document.createElement("div");
    fourthDiv.className = "transformation-color";

    const colorSelectorTitle = document.createElement("h1");
    colorSelectorTitle.textContent = "Color";
    const pointOption = document.createElement("select");
    pointOption.className = "btn";
    pointOption.addEventListener("change", () => {
      const index: number = +pointOption.selectedOptions[0].value;
      var point: Point = null;
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

    const thirdPointOption = document.createElement("option");
    thirdPointOption.value = "3";
    thirdPointOption.text = "point_3";

    const fourthPointOption = document.createElement("option");
    fourthPointOption.value = "4";
    fourthPointOption.text = "point_4";

    pointOption.appendChild(firstPointOption);
    pointOption.appendChild(secondPointOption);
    pointOption.appendChild(thirdPointOption);
    pointOption.appendChild(fourthPointOption);

    const innerFourthDiv = document.createElement("div");
    innerFourthDiv.id = "color-selector";

    fourthDiv.append(colorSelectorTitle, pointOption, innerFourthDiv);

    selector.append(firstDiv, secondDiv, thirdDiv, fourthDiv);

    this.setupColorSelector(1);
  }
}

export default Rectangle;
