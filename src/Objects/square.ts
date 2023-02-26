import Shape from "Objects/shape";
import SquareInterface from "Main/Interfaces/Objects/square-interface";
import ShapeType from "Objects/types";
import Point from "Operations/point";
import Transformation from "Main/Operations/transformation";
import { renderCanvas } from "Main/index";
import { hexToRgb, rgbToHex } from "Main/Utils/tools";

class Square extends Shape implements SquareInterface {
  public readonly type: ShapeType.SQUARE;
  public center: Point;
  public p1: Point;
  public p2: Point;
  public p3: Point;
  public p4: Point;

  public constructor(point: Point, id: number) {
    super(id);

    this.type = ShapeType.SQUARE;
    this.center = point;
  }

  public findCenter(): Point {
    return this.center;
  }

  public updatePoint(p: Point): void {
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
    return 5;
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

  public moveX(delta: number): void {
    this.tx = delta;

    renderCanvas();
  }

  public moveY(delta: number): void {
    this.ty = -delta;

    renderCanvas();
  }

  public getLength(): number {
    const [x1, y1] = this.p1.getPair();
    const [x2, y2] = this.p2.getPair();

    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  public setLength(delta: number): void {
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

    fourthDiv.append(pointOption, innerFourthDiv);

    selector.append(firstDiv, secondDiv, thirdDiv, fourthDiv);

    this.setupColorSelector(1);
  }
}

export default Square;
