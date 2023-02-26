import Shape from "Objects/shape";
import PolygonInterface from "Main/Interfaces/Objects/polygon-interface";
import ShapeType from "Objects/types";
import Point from "Operations/point";
import convexHull from "Algorithms/convex-hull";
import renderCanvas from "Main/index";

class Polygon extends Shape implements PolygonInterface {
  public arrayOfPoint: Point[];

  public constructor(point: Point) {
    super(ShapeType.POLYGON);

    this.arrayOfPoint = [point];
  }

  public findCenter(): Point {
    let totalX = 0;
    let totalY = 0;

    for (const p of this.arrayOfPoint) {
      const [pX, pY] = p.getPair();

      totalX += pX;
      totalY += pY;
    }

    return new Point([
      totalX / this.arrayOfPoint.length,
      totalY / this.arrayOfPoint.length,
    ]);
  }

  public updatePoint(point: Point): void {
    this.arrayOfPoint = convexHull([...this.arrayOfPoint, point]);
  }

  public addPosition(gl: WebGLRenderingContext): void {
    const positionArray: number[] = [];

    for (const p of this.arrayOfPoint) {
      positionArray.push(...p.getPair());
    }

    const [pInitial] = this.arrayOfPoint;
    positionArray.push(...pInitial.getPair());

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(positionArray),
      gl.STATIC_DRAW
    );
  }

  public addColor(gl: WebGLRenderingContext): void {
    const colorArray: number[] = [];

    for (const p of this.arrayOfPoint) {
      colorArray.push(...p.getColor());
    }

    const [pInitial] = this.arrayOfPoint;
    colorArray.push(...pInitial.getColor());

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(colorArray),
      gl.STATIC_DRAW
    );
  }

  public drawMethod(gl: WebGLRenderingContext): number {
    return this.isPointComplete() ? gl.TRIANGLE_FAN : gl.LINES;
  }

  public count(): number {
    return this.arrayOfPoint.length + 1;
  }

  public isPointComplete(): boolean {
    return this.arrayOfPoint.length >= 2;
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
    let minimumX = Infinity;
    let maximumX = -Infinity;

    for (const p of this.arrayOfPoint) {
      const [pX] = p.getPair();

      if (pX < minimumX) {
        minimumX = pX;
      }

      if (pX > maximumX) {
        maximumX = pX;
      }
    }

    return maximumX - minimumX;
  }

  public getWidth(): number {
    let minimumY = Infinity;
    let maximumY = -Infinity;

    for (const p of this.arrayOfPoint) {
      const [, pY] = p.getPair();

      if (pY < minimumY) {
        minimumY = pY;
      }

      if (pY > maximumY) {
        maximumY = pY;
      }
    }

    return maximumY - minimumY;
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

    fourthDiv.append(colorSelectorTitle);

    selector.append(firstDiv, secondDiv, thirdDiv, fourthDiv);
  }
}

export default Polygon;
