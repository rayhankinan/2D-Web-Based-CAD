/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Algorithms/convex-hull.ts":
/*!***************************************!*\
  !*** ./src/Algorithms/convex-hull.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var ConvexHullOrientation;
(function (ConvexHullOrientation) {
    ConvexHullOrientation[ConvexHullOrientation["COUNTERCLOCKWISE"] = 0] = "COUNTERCLOCKWISE";
    ConvexHullOrientation[ConvexHullOrientation["COLLINEAR"] = 1] = "COLLINEAR";
    ConvexHullOrientation[ConvexHullOrientation["CLOCKWISE"] = 2] = "CLOCKWISE";
})(ConvexHullOrientation || (ConvexHullOrientation = {}));
function orientation(p, q, r) {
    const [pX, pY] = p.getPair();
    const [qX, qY] = q.getPair();
    const [rX, rY] = r.getPair();
    const val = (qY - pY) * (rX - qX) - (qX - pX) * (rY - qY);
    if (val < 0) {
        return ConvexHullOrientation.COUNTERCLOCKWISE;
    }
    else if (val > 0) {
        return ConvexHullOrientation.CLOCKWISE;
    }
    else {
        return ConvexHullOrientation.COLLINEAR;
    }
}
function convexHull(arrayOfPoint) {
    const hull = [];
    let leftmostIndex = 0;
    for (let i = 1; i < arrayOfPoint.length; i++) {
        const [leftmostX] = arrayOfPoint[leftmostIndex].getPair();
        const [pX] = arrayOfPoint[i].getPair();
        if (pX < leftmostX)
            leftmostIndex = i;
    }
    let currentIndex = leftmostIndex;
    do {
        hull.push(arrayOfPoint[currentIndex]);
        let newIndex = (currentIndex + 1) % arrayOfPoint.length;
        for (let i = 0; i < arrayOfPoint.length; i++) {
            if (orientation(arrayOfPoint[currentIndex], arrayOfPoint[i], arrayOfPoint[newIndex]) === ConvexHullOrientation.COUNTERCLOCKWISE)
                newIndex = i;
        }
        currentIndex = newIndex;
    } while (currentIndex !== leftmostIndex);
    return hull;
}
exports["default"] = convexHull;


/***/ }),

/***/ "./src/Factories/Objects/line-factory.ts":
/*!***********************************************!*\
  !*** ./src/Factories/Objects/line-factory.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const line_1 = __importDefault(__webpack_require__(/*! Main/Objects/line */ "./src/Objects/line.ts"));
const point_factory_1 = __importDefault(__webpack_require__(/*! Factories/Operations/point-factory */ "./src/Factories/Operations/point-factory.ts"));
class LineFactory {
    static fromInterface(lineInterface) {
        const line = new line_1.default(point_factory_1.default.fromInterface(lineInterface.p1), lineInterface.id);
        line.p2 = point_factory_1.default.fromInterface(lineInterface.p2);
        return line;
    }
}
exports["default"] = LineFactory;


/***/ }),

/***/ "./src/Factories/Objects/polygon-factory.ts":
/*!**************************************************!*\
  !*** ./src/Factories/Objects/polygon-factory.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const polygon_1 = __importDefault(__webpack_require__(/*! Main/Objects/polygon */ "./src/Objects/polygon.ts"));
const point_factory_1 = __importDefault(__webpack_require__(/*! Factories/Operations/point-factory */ "./src/Factories/Operations/point-factory.ts"));
class PolygonFactory {
    static fromInterface(polygonInterface) {
        const [pInitialInterface, ...pRestInterfaces] = polygonInterface.arrayOfPoint;
        const polygon = new polygon_1.default(point_factory_1.default.fromInterface(pInitialInterface), polygonInterface.id);
        for (const p of pRestInterfaces) {
            polygon.updatePoint(point_factory_1.default.fromInterface(p));
        }
        return polygon;
    }
}
exports["default"] = PolygonFactory;


/***/ }),

/***/ "./src/Factories/Objects/rectangle-factory.ts":
/*!****************************************************!*\
  !*** ./src/Factories/Objects/rectangle-factory.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const rectangle_1 = __importDefault(__webpack_require__(/*! Main/Objects/rectangle */ "./src/Objects/rectangle.ts"));
const point_factory_1 = __importDefault(__webpack_require__(/*! Factories/Operations/point-factory */ "./src/Factories/Operations/point-factory.ts"));
class RectangleFactory {
    static fromInterface(rectangleInterface) {
        const rectangle = new rectangle_1.default(point_factory_1.default.fromInterface(rectangleInterface.p1), rectangleInterface.id);
        rectangle.p2 = point_factory_1.default.fromInterface(rectangleInterface.p2);
        rectangle.p3 = point_factory_1.default.fromInterface(rectangleInterface.p3);
        rectangle.p4 = point_factory_1.default.fromInterface(rectangleInterface.p4);
        return rectangle;
    }
}
exports["default"] = RectangleFactory;


/***/ }),

/***/ "./src/Factories/Objects/shape-factory.ts":
/*!************************************************!*\
  !*** ./src/Factories/Objects/shape-factory.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const types_1 = __importDefault(__webpack_require__(/*! Main/Objects/types */ "./src/Objects/types.ts"));
const line_factory_1 = __importDefault(__webpack_require__(/*! Factories/Objects/line-factory */ "./src/Factories/Objects/line-factory.ts"));
const rectangle_factory_1 = __importDefault(__webpack_require__(/*! Factories/Objects/rectangle-factory */ "./src/Factories/Objects/rectangle-factory.ts"));
const polygon_factory_1 = __importDefault(__webpack_require__(/*! Factories/Objects/polygon-factory */ "./src/Factories/Objects/polygon-factory.ts"));
const square_factory_1 = __importDefault(__webpack_require__(/*! Factories/Objects/square-factory */ "./src/Factories/Objects/square-factory.ts"));
class ShapeFactory {
    static fromInterface(shapeInterface) {
        switch (shapeInterface.type) {
            case types_1.default.LINE:
                return line_factory_1.default.fromInterface(shapeInterface);
            case types_1.default.RECTANGLE:
                return rectangle_factory_1.default.fromInterface(shapeInterface);
            case types_1.default.POLYGON:
                return polygon_factory_1.default.fromInterface(shapeInterface);
            case types_1.default.SQUARE:
                return square_factory_1.default.fromInterface(shapeInterface);
            default:
                throw new Error("Unknown shape type");
        }
    }
}
exports["default"] = ShapeFactory;


/***/ }),

/***/ "./src/Factories/Objects/square-factory.ts":
/*!*************************************************!*\
  !*** ./src/Factories/Objects/square-factory.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const square_1 = __importDefault(__webpack_require__(/*! Main/Objects/square */ "./src/Objects/square.ts"));
const point_factory_1 = __importDefault(__webpack_require__(/*! Factories/Operations/point-factory */ "./src/Factories/Operations/point-factory.ts"));
class SquareFactory {
    static fromInterface(squareInterface) {
        const square = new square_1.default(point_factory_1.default.fromInterface(squareInterface.p1), squareInterface.id);
        square.p2 = point_factory_1.default.fromInterface(squareInterface.p2);
        square.p3 = point_factory_1.default.fromInterface(squareInterface.p3);
        square.p4 = point_factory_1.default.fromInterface(squareInterface.p4);
        return square;
    }
}
exports["default"] = SquareFactory;


/***/ }),

/***/ "./src/Factories/Operations/point-factory.ts":
/*!***************************************************!*\
  !*** ./src/Factories/Operations/point-factory.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const point_1 = __importDefault(__webpack_require__(/*! Main/Operations/point */ "./src/Operations/point.ts"));
class PointFactory {
    static fromInterface(pointInterface) {
        return new point_1.default([pointInterface.x, pointInterface.y], [pointInterface.r, pointInterface.g, pointInterface.b, pointInterface.a]);
    }
}
exports["default"] = PointFactory;


/***/ }),

/***/ "./src/Files/file-handling.ts":
/*!************************************!*\
  !*** ./src/Files/file-handling.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class FileHandling {
    static download(text) {
        const data = new File([text], "shapes.json", { type: "application/json" });
        const url = URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = url;
        a.download = data.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    static upload(callback) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.addEventListener("change", () => {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                callback(reader.result);
            };
            reader.readAsText(file);
        });
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }
}
exports["default"] = FileHandling;


/***/ }),

/***/ "./src/Files/file-system.ts":
/*!**********************************!*\
  !*** ./src/Files/file-system.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const shape_factory_1 = __importDefault(__webpack_require__(/*! Main/Factories/Objects/shape-factory */ "./src/Factories/Objects/shape-factory.ts"));
class FileSystem {
    static load(text) {
        const shapeInterfaces = JSON.parse(text);
        const shapes = [];
        for (const shapeInterface of shapeInterfaces) {
            shapes.push(shape_factory_1.default.fromInterface(shapeInterface));
        }
        return shapes;
    }
    static serialize(shapes) {
        return JSON.stringify(shapes);
    }
}
exports["default"] = FileSystem;


/***/ }),

/***/ "./src/Objects/line.ts":
/*!*****************************!*\
  !*** ./src/Objects/line.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const shape_1 = __importDefault(__webpack_require__(/*! Objects/shape */ "./src/Objects/shape.ts"));
const types_1 = __importDefault(__webpack_require__(/*! Objects/types */ "./src/Objects/types.ts"));
const point_1 = __importDefault(__webpack_require__(/*! Operations/point */ "./src/Operations/point.ts"));
const index_1 = __webpack_require__(/*! Main/index */ "./src/index.ts");
const tools_1 = __webpack_require__(/*! Main/Utils/tools */ "./src/Utils/tools.ts");
class Line extends shape_1.default {
    constructor(p1, id) {
        super(id);
        this.type = types_1.default.LINE;
        this.p1 = p1;
        this.p2 = null;
    }
    findCenter() {
        const [p1x, p1y] = this.p1.getPair();
        const [p2x, p2y] = this.p2.getPair();
        return new point_1.default([(p1x + p2x) / 2, (p1y + p2y) / 2]);
    }
    updatePoint(p2) {
        this.p2 = p2;
    }
    addPosition(gl) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([...this.p1.getPair(), ...this.p2.getPair()]), gl.STATIC_DRAW);
    }
    addColor(gl) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([...this.p1.getColor(), ...this.p2.getColor()]), gl.STATIC_DRAW);
    }
    drawMethod(gl) {
        return gl.LINES;
    }
    count() {
        return 2;
    }
    isPointComplete() {
        return this.p2 != null;
    }
    moveX(delta) {
        this.tx = delta;
        (0, index_1.renderCanvas)();
    }
    moveY(delta) {
        this.ty = -delta;
        (0, index_1.renderCanvas)();
    }
    getLength() {
        const [p1x, p1y] = this.p1.getPair();
        const [p2x, p2y] = this.p2.getPair();
        return Math.sqrt(Math.pow((p2x - p1x), 2) + Math.pow((p2y - p1y), 2));
    }
    setLength(delta) {
        /* Mengikuti sumbu X */
        this.sx = 1 + delta / this.getLength();
        this.sy = 1 + delta / this.getLength();
        (0, index_1.renderCanvas)();
    }
    setRotation(degree) {
        this.degree = (degree * Math.PI) / 180;
        (0, index_1.renderCanvas)();
    }
    setupColorSelector(index) {
        const colorSelector = document.getElementById("color-selector");
        colorSelector.innerHTML = "";
        colorSelector.replaceChildren();
        const colorTitle = document.createElement("h2");
        colorTitle.textContent = "Select color";
        const colorInput = document.createElement("input");
        colorInput.id = "color-input";
        colorInput.type = "color";
        if (index === 1) {
            colorInput.value = (0, tools_1.rgbToHex)(this.p1.getColor());
            colorInput.addEventListener("change", (event) => {
                const hex = event.target.value;
                this.p1.setColor((0, tools_1.hexToRgb)(hex));
            });
        }
        if (index === 2) {
            colorInput.value = (0, tools_1.rgbToHex)(this.p2.getColor());
            colorInput.addEventListener("change", (event) => {
                const hex = event.target.value;
                this.p2.setColor((0, tools_1.hexToRgb)(hex));
            });
        }
        colorSelector.append(colorTitle, colorInput);
    }
    setupSelector() {
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
            const delta = event.target.value;
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
            const delta = event.target.value;
            sliderYtext.textContent = delta;
            this.moveY(+delta);
        });
        firstDiv.append(sliderXTitle, sliderX, sliderXtext, sliderYTitle, sliderY, sliderYtext);
        /* Second Div */
        const secondDiv = document.createElement("div");
        secondDiv.className = "transformation-size";
        /* Slider Length */
        const sliderLengthTitle = document.createElement("h2");
        sliderLengthTitle.textContent = "Slider Length";
        const sliderLengthText = document.createElement("label");
        sliderLengthText.textContent = ((this.sx - 1) *
            this.getLength()).toString();
        const sliderLength = document.createElement("input");
        sliderLength.type = "range";
        sliderLength.min = "0";
        sliderLength.max = "500";
        sliderLength.value = ((this.sx - 1) * this.getLength()).toString();
        sliderLength.step = "10";
        sliderLength.addEventListener("input", (event) => {
            const delta = event.target.value;
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
            const delta = event.target.value;
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
            const index = +pointOption.selectedOptions[0].value;
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
exports["default"] = Line;


/***/ }),

/***/ "./src/Objects/polygon.ts":
/*!********************************!*\
  !*** ./src/Objects/polygon.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const shape_1 = __importDefault(__webpack_require__(/*! Objects/shape */ "./src/Objects/shape.ts"));
const types_1 = __importDefault(__webpack_require__(/*! Objects/types */ "./src/Objects/types.ts"));
const point_1 = __importDefault(__webpack_require__(/*! Operations/point */ "./src/Operations/point.ts"));
const convex_hull_1 = __importDefault(__webpack_require__(/*! Algorithms/convex-hull */ "./src/Algorithms/convex-hull.ts"));
const index_1 = __webpack_require__(/*! Main/index */ "./src/index.ts");
const tools_1 = __webpack_require__(/*! Main/Utils/tools */ "./src/Utils/tools.ts");
class Polygon extends shape_1.default {
    constructor(point, id) {
        super(id);
        this.type = types_1.default.POLYGON;
        this.arrayOfPoint = new Array(point);
    }
    findCenter() {
        let totalX = 0;
        let totalY = 0;
        for (const p of this.arrayOfPoint) {
            const [pX, pY] = p.getPair();
            totalX += pX;
            totalY += pY;
        }
        return new point_1.default([
            totalX / this.arrayOfPoint.length,
            totalY / this.arrayOfPoint.length,
        ]);
    }
    updatePoint(point) {
        this.arrayOfPoint = (0, convex_hull_1.default)([...this.arrayOfPoint, point]);
    }
    addPosition(gl) {
        const positionArray = [];
        for (const p of this.arrayOfPoint) {
            positionArray.push(...p.getPair());
        }
        const [pInitial] = this.arrayOfPoint;
        positionArray.push(...pInitial.getPair());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionArray), gl.STATIC_DRAW);
    }
    addColor(gl) {
        const colorArray = [];
        for (const p of this.arrayOfPoint) {
            colorArray.push(...p.getColor());
        }
        const [pInitial] = this.arrayOfPoint;
        colorArray.push(...pInitial.getColor());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorArray), gl.STATIC_DRAW);
    }
    drawMethod(gl) {
        return this.isPointComplete() ? gl.TRIANGLE_FAN : gl.LINES;
    }
    count() {
        return this.arrayOfPoint.length + 1;
    }
    isPointComplete() {
        return this.arrayOfPoint.length >= 2;
    }
    moveX(delta) {
        this.tx = delta;
        (0, index_1.renderCanvas)();
    }
    moveY(delta) {
        this.ty = -delta;
        (0, index_1.renderCanvas)();
    }
    getLength() {
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
    getWidth() {
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
    setLength(delta) {
        this.sx = 1 + delta / this.getLength();
        (0, index_1.renderCanvas)();
    }
    setWidth(delta) {
        this.sy = 1 + delta / this.getWidth();
        (0, index_1.renderCanvas)();
    }
    setRotation(degree) {
        this.degree = (degree * Math.PI) / 180;
        (0, index_1.renderCanvas)();
    }
    deletePoint(index) {
        var newPoints = [this.arrayOfPoint[index]];
        for (let i = 0; i < this.arrayOfPoint.length; i++) {
            if (i != index) {
                newPoints.push(this.arrayOfPoint[i]);
            }
        }
        this.arrayOfPoint = newPoints.slice(1, this.arrayOfPoint.length);
        // after delete, need to setup option again
        const pointOption = document.getElementById("point-option");
        pointOption.innerHTML = "";
        pointOption.replaceChildren();
        /* All Point */
        for (let i = 0; i < this.arrayOfPoint.length; i++) {
            const option = document.createElement("option");
            option.value = i.toString();
            option.text = "point_" + i;
            pointOption.appendChild(option);
        }
    }
    setupColorSelector(index) {
        const colorSelector = document.getElementById("color-selector");
        colorSelector.innerHTML = "";
        colorSelector.replaceChildren();
        const colorTitle = document.createElement("h2");
        colorTitle.textContent = "Select color";
        const colorInput = document.createElement("input");
        colorInput.id = "color-input";
        colorInput.type = "color";
        colorInput.value = (0, tools_1.rgbToHex)(this.arrayOfPoint[index].getColor());
        colorInput.addEventListener("change", (event) => {
            const hex = event.target.value;
            this.arrayOfPoint[index].setColor((0, tools_1.hexToRgb)(hex));
        });
        const deletePointButton = document.createElement("button");
        deletePointButton.textContent = "delete point";
        deletePointButton.className = "btn";
        deletePointButton.addEventListener("click", () => {
            this.deletePoint(index);
            (0, index_1.renderCanvas)();
        });
        colorSelector.append(colorTitle, colorInput, deletePointButton);
    }
    setupSelector(index) {
        const selector = document.getElementById("selector");
        selector.replaceChildren();
        /* Add Point Button */
        const addPointButton = document.createElement("button");
        addPointButton.textContent = "Add New Points";
        addPointButton.className = "btn";
        addPointButton.addEventListener("click", () => {
            (0, index_1.setIsDrawing)(true);
            (0, index_1.setPolygonRedrawIndex)(index);
            (0, index_1.setShapeType)(types_1.default.POLYGON_REDRAW);
        });
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
            const delta = event.target.value;
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
            const delta = event.target.value;
            sliderYtext.textContent = delta;
            this.moveY(+delta);
        });
        firstDiv.append(sliderxTitle, sliderX, sliderXtext, slideryTitle, sliderY, sliderYtext);
        /* Second Div */
        const secondDiv = document.createElement("div");
        secondDiv.className = "transformation-size";
        /* Slider Length */
        const sliderLengthTitle = document.createElement("h2");
        sliderLengthTitle.textContent = "Slider Length";
        const sliderLengthText = document.createElement("label");
        sliderLengthText.textContent = ((this.sx - 1) *
            this.getLength()).toString();
        const sliderLength = document.createElement("input");
        sliderLength.type = "range";
        sliderLength.min = "0";
        sliderLength.max = "500";
        sliderLength.value = ((this.sx - 1) * this.getLength()).toString();
        sliderLength.step = "10";
        sliderLength.addEventListener("input", (event) => {
            const delta = event.target.value;
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
            const delta = event.target.value;
            sliderWidthText.textContent = delta;
            this.setWidth(+delta);
        });
        secondDiv.append(sliderLengthTitle, sliderLength, sliderLengthText, sliderWidthTitle, sliderWidth, sliderWidthText);
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
            const delta = event.target.value;
            sliderRotationText.textContent = delta;
            this.setRotation(+delta);
        });
        thirdDiv.append(sliderRotationTitle, sliderRotation, sliderRotationText);
        /* Fourth Div */
        const fourthDiv = document.createElement("div");
        fourthDiv.className = "transformation-color";
        const pointOption = document.createElement("select");
        pointOption.id = "point-option";
        pointOption.className = "btn";
        pointOption.addEventListener("change", () => {
            const index = +pointOption.selectedOptions[0].value;
            var point = null;
            this.setupColorSelector(index);
        });
        /* All Point */
        for (let i = 0; i < this.arrayOfPoint.length; i++) {
            const option = document.createElement("option");
            option.value = i.toString();
            option.text = "point_" + i;
            pointOption.appendChild(option);
        }
        const innerFourthDiv = document.createElement("div");
        innerFourthDiv.id = "color-selector";
        fourthDiv.append(pointOption, innerFourthDiv);
        selector.append(addPointButton, firstDiv, secondDiv, thirdDiv, fourthDiv);
        this.setupColorSelector(0);
    }
}
exports["default"] = Polygon;


/***/ }),

/***/ "./src/Objects/rectangle.ts":
/*!**********************************!*\
  !*** ./src/Objects/rectangle.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const shape_1 = __importDefault(__webpack_require__(/*! Objects/shape */ "./src/Objects/shape.ts"));
const types_1 = __importDefault(__webpack_require__(/*! Objects/types */ "./src/Objects/types.ts"));
const point_1 = __importDefault(__webpack_require__(/*! Operations/point */ "./src/Operations/point.ts"));
const index_1 = __webpack_require__(/*! Main/index */ "./src/index.ts");
const tools_1 = __webpack_require__(/*! Main/Utils/tools */ "./src/Utils/tools.ts");
class Rectangle extends shape_1.default {
    constructor(point, id) {
        super(id);
        this.type = types_1.default.RECTANGLE;
        this.p1 = point;
        this.p2 = null;
        this.p3 = null;
        this.p3 = null;
    }
    findCenter() {
        const [p1x, p1y] = this.p1.getPair();
        const [p2x, p2y] = this.p2.getPair();
        const [p3x, p3y] = this.p3.getPair();
        const [p4x, p4y] = this.p4.getPair();
        return new point_1.default([
            (p1x + p2x + p3x + p4x) / 4,
            (p1y + p2y + p3y + p4y) / 4,
        ]);
    }
    updatePoint(p) {
        const [p2, p4] = this.getSymmetricalRectanglePoint(p);
        // p1 ----> p2
        // ↑        ↓
        // p4 <---- p3
        this.p2 = p2;
        this.p3 = p;
        this.p4 = p4;
    }
    addPosition(gl) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            ...this.p1.getPair(),
            ...this.p2.getPair(),
            ...this.p3.getPair(),
            ...this.p4.getPair(),
            ...this.p1.getPair(),
        ]), gl.STATIC_DRAW);
    }
    addColor(gl) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            ...this.p1.getColor(),
            ...this.p2.getColor(),
            ...this.p3.getColor(),
            ...this.p4.getColor(),
            ...this.p1.getColor(),
        ]), gl.STATIC_DRAW);
    }
    drawMethod(gl) {
        return gl.TRIANGLE_FAN;
    }
    count() {
        return 5;
    }
    isPointComplete() {
        return this.p3 != null;
    }
    getSymmetricalRectanglePoint(point) {
        const [a, b] = this.p1.getPair();
        const [c, d] = point.getPair();
        const point1 = new point_1.default([a, d]);
        const point2 = new point_1.default([c, b]);
        return [point1, point2];
    }
    moveX(delta) {
        this.tx = delta;
        (0, index_1.renderCanvas)();
    }
    moveY(delta) {
        this.ty = -delta;
        (0, index_1.renderCanvas)();
    }
    getLength() {
        const [p1x, p1y] = this.p1.getPair();
        const [p2x, p2y] = this.p2.getPair();
        return Math.sqrt(Math.pow((p2x - p1x), 2) + Math.pow((p2y - p1y), 2));
    }
    getWidth() {
        const [p1x, p1y] = this.p1.getPair();
        const [p4x, p4y] = this.p4.getPair();
        return Math.sqrt(Math.pow((p4x - p1x), 2) + Math.pow((p4y - p1y), 2));
    }
    setLength(delta) {
        this.sx = 1 + delta / this.getLength();
        (0, index_1.renderCanvas)();
    }
    setWidth(delta) {
        this.sy = 1 + delta / this.getWidth();
        (0, index_1.renderCanvas)();
    }
    setRotation(degree) {
        this.degree = (degree * Math.PI) / 180;
        (0, index_1.renderCanvas)();
    }
    setupColorSelector(index) {
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
                colorInput.value = (0, tools_1.rgbToHex)(this.p1.getColor());
                colorInput.addEventListener("change", (event) => {
                    const hex = event.target.value;
                    this.p1.setColor((0, tools_1.hexToRgb)(hex));
                });
                break;
            case 2:
                colorInput.value = (0, tools_1.rgbToHex)(this.p2.getColor());
                colorInput.addEventListener("change", (event) => {
                    const hex = event.target.value;
                    this.p2.setColor((0, tools_1.hexToRgb)(hex));
                });
                break;
            case 3:
                colorInput.value = (0, tools_1.rgbToHex)(this.p3.getColor());
                colorInput.addEventListener("change", (event) => {
                    const hex = event.target.value;
                    this.p3.setColor((0, tools_1.hexToRgb)(hex));
                });
                break;
            case 4:
                colorInput.value = (0, tools_1.rgbToHex)(this.p4.getColor());
                colorInput.addEventListener("change", (event) => {
                    const hex = event.target.value;
                    this.p4.setColor((0, tools_1.hexToRgb)(hex));
                });
                break;
        }
        colorSelector.append(colorTitle, colorInput);
    }
    setupSelector() {
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
            const delta = event.target.value;
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
            const delta = event.target.value;
            sliderYtext.textContent = delta;
            this.moveY(+delta);
        });
        firstDiv.append(sliderxTitle, sliderX, sliderXtext, slideryTitle, sliderY, sliderYtext);
        /* Second Div */
        const secondDiv = document.createElement("div");
        secondDiv.className = "transformation-size";
        /* Slider Length */
        const sliderLengthTitle = document.createElement("h2");
        sliderLengthTitle.textContent = "Slider Length";
        const sliderLengthText = document.createElement("label");
        sliderLengthText.textContent = ((this.sx - 1) *
            this.getLength()).toString();
        const sliderLength = document.createElement("input");
        sliderLength.type = "range";
        sliderLength.min = "0";
        sliderLength.max = "500";
        sliderLength.value = ((this.sx - 1) * this.getLength()).toString();
        sliderLength.step = "10";
        sliderLength.addEventListener("input", (event) => {
            const delta = event.target.value;
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
            const delta = event.target.value;
            sliderWidthText.textContent = delta;
            this.setWidth(+delta);
        });
        secondDiv.append(sliderLengthTitle, sliderLength, sliderLengthText, sliderWidthTitle, sliderWidth, sliderWidthText);
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
            const delta = event.target.value;
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
            const index = +pointOption.selectedOptions[0].value;
            var point = null;
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
exports["default"] = Rectangle;


/***/ }),

/***/ "./src/Objects/shape.ts":
/*!******************************!*\
  !*** ./src/Objects/shape.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const transformation_1 = __importDefault(__webpack_require__(/*! Operations/transformation */ "./src/Operations/transformation.ts"));
class Shape {
    constructor(id) {
        this.id = id;
        this.tx = 0;
        this.ty = 0;
        this.degree = 0;
        this.sx = 1;
        this.sy = 1;
        this.kx = 0;
        this.ky = 0;
    }
    getType() {
        return this.type;
    }
    setupOption(isFirstDrawing) {
        const option = document.createElement("option");
        option.value = this.id.toString();
        option.text = `${this.type}_${this.id}`;
        if (isFirstDrawing) {
            const listOfShapes = document.getElementById("list-of-shapes");
            listOfShapes.appendChild(option);
            listOfShapes.value = this.id.toString();
        }
        this.setupSelector();
    }
    render(gl, program, positionBuffer, colorBuffer) {
        if (!this.isPointComplete()) {
            return;
        }
        const positionLocation = gl.getAttribLocation(program, "a_position");
        const colorLocation = gl.getAttribLocation(program, "a_color");
        const matrixLocation = gl.getUniformLocation(program, "u_matrix");
        /* Setup position */
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        this.addPosition(gl);
        const positionSize = 2; /* 2 components per iteration */
        const positionType = gl.FLOAT; /* The data is 32 bit float */
        const positionNormalized = false; /* Don't normalize the data */
        const positionStride = 0; /* 0: Move forward size * sizeof(type) each iteration to get the next position */
        const positionOffset = 0; /* Start at the beginning of the buffer */
        gl.vertexAttribPointer(positionLocation, positionSize, positionType, positionNormalized, positionStride, positionOffset);
        /* Setup color */
        gl.enableVertexAttribArray(colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        this.addColor(gl);
        const colorSize = 4; /* 4 components per iteration */
        const colorType = gl.FLOAT; /* The data is 32 bit float */
        const colorNormalized = false; /* Don't normalize the data */
        const colorStride = 0; /* 0: Move forward size * sizeof(type) each iteration to get the next position */
        const colorOffset = 0; /* Start at the beginning of the buffer */
        gl.vertexAttribPointer(colorLocation, colorSize, colorType, colorNormalized, colorStride, colorOffset);
        const matrix = transformation_1.default.general(gl.canvas.width, gl.canvas.height, this.tx, this.ty, this.degree, this.sx, this.sy, this.kx, this.ky, this.findCenter()).flatten();
        gl.uniformMatrix3fv(matrixLocation, false, matrix);
        /* Draw scene */
        const primitiveType = this.drawMethod(gl);
        const offset = 0;
        const count = this.count();
        gl.drawArrays(primitiveType, offset, count);
    }
}
exports["default"] = Shape;


/***/ }),

/***/ "./src/Objects/square.ts":
/*!*******************************!*\
  !*** ./src/Objects/square.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const shape_1 = __importDefault(__webpack_require__(/*! Objects/shape */ "./src/Objects/shape.ts"));
const types_1 = __importDefault(__webpack_require__(/*! Objects/types */ "./src/Objects/types.ts"));
const transformation_1 = __importDefault(__webpack_require__(/*! Main/Operations/transformation */ "./src/Operations/transformation.ts"));
const index_1 = __webpack_require__(/*! Main/index */ "./src/index.ts");
const tools_1 = __webpack_require__(/*! Main/Utils/tools */ "./src/Utils/tools.ts");
class Square extends shape_1.default {
    constructor(point, id) {
        super(id);
        this.type = types_1.default.SQUARE;
        this.center = point;
    }
    findCenter() {
        return this.center;
    }
    updatePoint(p) {
        this.p1 = p;
        [this.p2, this.p3, this.p4] = this.getSymmetricalSquarePoint();
    }
    addPosition(gl) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            ...this.p1.getPair(),
            ...this.p2.getPair(),
            ...this.p3.getPair(),
            ...this.p4.getPair(),
            ...this.p1.getPair(),
        ]), gl.STATIC_DRAW);
    }
    addColor(gl) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            ...this.p1.getColor(),
            ...this.p2.getColor(),
            ...this.p3.getColor(),
            ...this.p4.getColor(),
            ...this.p1.getColor(),
        ]), gl.STATIC_DRAW);
    }
    drawMethod(gl) {
        return gl.TRIANGLE_FAN;
    }
    count() {
        return 5;
    }
    isPointComplete() {
        return this.p1 != null;
    }
    getSymmetricalSquarePoint() {
        const [xCenter, yCenter] = this.center.getPair();
        const p2 = transformation_1.default.translation(xCenter, yCenter)
            .multiplyMatrix(transformation_1.default.rotation(0.5 * Math.PI))
            .multiplyMatrix(transformation_1.default.translation(-xCenter, -yCenter))
            .multiplyPoint(this.p1);
        const p3 = transformation_1.default.translation(xCenter, yCenter)
            .multiplyMatrix(transformation_1.default.rotation(Math.PI))
            .multiplyMatrix(transformation_1.default.translation(-xCenter, -yCenter))
            .multiplyPoint(this.p1);
        const p4 = transformation_1.default.translation(xCenter, yCenter)
            .multiplyMatrix(transformation_1.default.rotation(1.5 * Math.PI))
            .multiplyMatrix(transformation_1.default.translation(-xCenter, -yCenter))
            .multiplyPoint(this.p1);
        return [p2, p3, p4];
    }
    moveX(delta) {
        this.tx = delta;
        (0, index_1.renderCanvas)();
    }
    moveY(delta) {
        this.ty = -delta;
        (0, index_1.renderCanvas)();
    }
    getLength() {
        const [x1, y1] = this.p1.getPair();
        const [x2, y2] = this.p2.getPair();
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }
    setLength(delta) {
        this.sx = 1 + delta / this.getLength();
        this.sy = 1 + delta / this.getLength();
        (0, index_1.renderCanvas)();
    }
    setRotation(degree) {
        this.degree = (degree * Math.PI) / 180;
        (0, index_1.renderCanvas)();
    }
    setupColorSelector(index) {
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
                colorInput.value = (0, tools_1.rgbToHex)(this.p1.getColor());
                colorInput.addEventListener("change", (event) => {
                    const hex = event.target.value;
                    this.p1.setColor((0, tools_1.hexToRgb)(hex));
                });
                break;
            case 2:
                colorInput.value = (0, tools_1.rgbToHex)(this.p2.getColor());
                colorInput.addEventListener("change", (event) => {
                    const hex = event.target.value;
                    this.p2.setColor((0, tools_1.hexToRgb)(hex));
                });
                break;
            case 3:
                colorInput.value = (0, tools_1.rgbToHex)(this.p3.getColor());
                colorInput.addEventListener("change", (event) => {
                    const hex = event.target.value;
                    this.p3.setColor((0, tools_1.hexToRgb)(hex));
                });
                break;
            case 4:
                colorInput.value = (0, tools_1.rgbToHex)(this.p4.getColor());
                colorInput.addEventListener("change", (event) => {
                    const hex = event.target.value;
                    this.p4.setColor((0, tools_1.hexToRgb)(hex));
                });
                break;
        }
        colorSelector.append(colorTitle, colorInput);
    }
    setupSelector() {
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
            const delta = event.target.value;
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
            const delta = event.target.value;
            sliderYtext.textContent = delta;
            this.moveY(+delta);
        });
        firstDiv.append(sliderxTitle, sliderX, sliderXtext, slideryTitle, sliderY, sliderYtext);
        /* Second Div */
        const secondDiv = document.createElement("div");
        secondDiv.className = "transformation-size";
        /* Slider Length */
        const sliderLengthTitle = document.createElement("h2");
        sliderLengthTitle.textContent = "Slider Length";
        const sliderLengthText = document.createElement("label");
        sliderLengthText.textContent = ((this.sx - 1) *
            this.getLength()).toString();
        const sliderLength = document.createElement("input");
        sliderLength.type = "range";
        sliderLength.min = "0";
        sliderLength.max = "500";
        sliderLength.value = ((this.sx - 1) * this.getLength()).toString();
        sliderLength.step = "10";
        sliderLength.addEventListener("input", (event) => {
            const delta = event.target.value;
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
            const delta = event.target.value;
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
            const index = +pointOption.selectedOptions[0].value;
            var point = null;
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
exports["default"] = Square;


/***/ }),

/***/ "./src/Objects/types.ts":
/*!******************************!*\
  !*** ./src/Objects/types.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var ShapeType;
(function (ShapeType) {
    ShapeType["LINE"] = "line";
    ShapeType["SQUARE"] = "square";
    ShapeType["RECTANGLE"] = "rectangle";
    ShapeType["POLYGON"] = "polygon";
    ShapeType["POLYGON_REDRAW"] = "polygon_redraw";
})(ShapeType || (ShapeType = {}));
exports["default"] = ShapeType;


/***/ }),

/***/ "./src/Operations/coordinate.ts":
/*!**************************************!*\
  !*** ./src/Operations/coordinate.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Coordinate {
    constructor(position) {
        const [x, y, w] = position;
        this.x = x;
        this.y = y;
        this.w = w;
    }
    getTriplet() {
        return [this.x, this.y, this.w];
    }
    setTriplet(position) {
        const [x, y, w] = position;
        this.x = x;
        this.y = y;
        this.w = w;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    dot(other) {
        return this.x * other.x + this.y * other.y + this.w * other.w;
    }
}
exports["default"] = Coordinate;


/***/ }),

/***/ "./src/Operations/matrix.ts":
/*!**********************************!*\
  !*** ./src/Operations/matrix.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const coordinate_1 = __importDefault(__webpack_require__(/*! Operations/coordinate */ "./src/Operations/coordinate.ts"));
const point_1 = __importDefault(__webpack_require__(/*! Operations/point */ "./src/Operations/point.ts"));
class Matrix {
    constructor(tuple) {
        const [a1, a2, a3] = tuple;
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
    }
    getTuple() {
        return [this.a1, this.a2, this.a3];
    }
    flatten() {
        return [
            ...this.a1.getTriplet(),
            ...this.a2.getTriplet(),
            ...this.a3.getTriplet(),
        ];
    }
    multiplyMatrix(other) {
        /* Unpack "this" matrix */
        const [a11, a21, a31] = this.a1.getTriplet();
        const [a12, a22, a32] = this.a2.getTriplet();
        const [a13, a23, a33] = this.a3.getTriplet();
        /* Create transpose coordinate */
        const a1 = new coordinate_1.default([a11, a12, a13]);
        const a2 = new coordinate_1.default([a21, a22, a23]);
        const a3 = new coordinate_1.default([a31, a32, a33]);
        /* Matrix multiplication */
        const b11 = a1.dot(other.a1);
        const b12 = a1.dot(other.a2);
        const b13 = a1.dot(other.a3);
        const b21 = a2.dot(other.a1);
        const b22 = a2.dot(other.a2);
        const b23 = a2.dot(other.a3);
        const b31 = a3.dot(other.a1);
        const b32 = a3.dot(other.a2);
        const b33 = a3.dot(other.a3);
        /* Create result coordinate */
        const b1 = new coordinate_1.default([b11, b21, b31]);
        const b2 = new coordinate_1.default([b12, b22, b32]);
        const b3 = new coordinate_1.default([b13, b23, b33]);
        /* Create new matrix */
        const matrix = new Matrix([b1, b2, b3]);
        return matrix;
    }
    multiplyPoint(point) {
        /* Unpack "this" matrix */
        const [a11, a21] = this.a1.getTriplet();
        const [a12, a22] = this.a2.getTriplet();
        const [a13, a23] = this.a3.getTriplet();
        /* Create transpose coordinate */
        const a1 = new coordinate_1.default([a11, a12, a13]);
        const a2 = new coordinate_1.default([a21, a22, a23]);
        const x1 = a1.dot(point);
        const y1 = a2.dot(point);
        const coordinate1 = new point_1.default([x1, y1]);
        return coordinate1;
    }
}
exports["default"] = Matrix;


/***/ }),

/***/ "./src/Operations/point.ts":
/*!*********************************!*\
  !*** ./src/Operations/point.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const coordinate_1 = __importDefault(__webpack_require__(/*! Operations/coordinate */ "./src/Operations/coordinate.ts"));
class Point extends coordinate_1.default {
    constructor(position, color = [0, 0, 0, 1]) {
        super([...position, 1]);
        const [r, g, b, a] = color;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    getPair() {
        return [this.x, this.y];
    }
    getColor() {
        return [this.r, this.g, this.b, this.a];
    }
    setColor(color) {
        const [r, g, b, a] = color;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
exports["default"] = Point;


/***/ }),

/***/ "./src/Operations/transformation.ts":
/*!******************************************!*\
  !*** ./src/Operations/transformation.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const point_1 = __importDefault(__webpack_require__(/*! Operations/point */ "./src/Operations/point.ts"));
const vector_1 = __importDefault(__webpack_require__(/*! Operations/vector */ "./src/Operations/vector.ts"));
const matrix_1 = __importDefault(__webpack_require__(/*! Operations/matrix */ "./src/Operations/matrix.ts"));
class Transformation {
    static projection(width, height) {
        /* Create transformation matrix */
        const p1 = new vector_1.default([2 / width, 0]);
        const p2 = new vector_1.default([0, -2 / height]);
        const p3 = new point_1.default([-1, 1]);
        const matrix = new matrix_1.default([p1, p2, p3]);
        return matrix;
    }
    static translation(tx, ty) {
        /* Create transformation matrix */
        const v1 = new vector_1.default([1, 0]);
        const v2 = new vector_1.default([0, 1]);
        const pivot = new point_1.default([tx, ty]);
        const matrix = new matrix_1.default([v1, v2, pivot]);
        return matrix;
    }
    static rotation(degree) {
        /* Create transformation matrix */
        const v1 = new vector_1.default([Math.cos(degree), Math.sin(degree)]);
        const v2 = new vector_1.default([-Math.sin(degree), Math.cos(degree)]);
        const pivot = new point_1.default([0, 0]);
        const matrix = new matrix_1.default([v1, v2, pivot]);
        return matrix;
    }
    static scale(sx, sy) {
        /* Create transformation matrix */
        const v1 = new vector_1.default([sx, 0]);
        const v2 = new vector_1.default([0, sy]);
        const pivot = new point_1.default([0, 0]);
        const matrix = new matrix_1.default([v1, v2, pivot]);
        return matrix;
    }
    static shearX(kx) {
        /* Create transformation matrix */
        const v1 = new vector_1.default([1, 0]);
        const v2 = new vector_1.default([kx, 1]);
        const pivot = new point_1.default([0, 0]);
        const matrix = new matrix_1.default([v1, v2, pivot]);
        return matrix;
    }
    static shearY(ky) {
        /* Create transformation matrix */
        const v1 = new vector_1.default([1, ky]);
        const v2 = new vector_1.default([0, 1]);
        const pivot = new point_1.default([0, 0]);
        const matrix = new matrix_1.default([v1, v2, pivot]);
        return matrix;
    }
    static general(width, height, tx, ty, degree, sx, sy, kx, ky, pivot) {
        const [pivotX, pivotY] = pivot.getPair();
        return Transformation.projection(width, height)
            .multiplyMatrix(Transformation.translation(tx, ty))
            .multiplyMatrix(Transformation.translation(pivotX, pivotY))
            .multiplyMatrix(Transformation.rotation(degree))
            .multiplyMatrix(Transformation.scale(sx, sy))
            .multiplyMatrix(Transformation.shearX(kx))
            .multiplyMatrix(Transformation.shearY(ky))
            .multiplyMatrix(Transformation.translation(-pivotX, -pivotY));
    }
}
exports["default"] = Transformation;


/***/ }),

/***/ "./src/Operations/vector.ts":
/*!**********************************!*\
  !*** ./src/Operations/vector.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const coordinate_1 = __importDefault(__webpack_require__(/*! Operations/coordinate */ "./src/Operations/coordinate.ts"));
class Vector extends coordinate_1.default {
    constructor(position) {
        super([...position, 0]);
    }
    getPair() {
        return [this.x, this.y];
    }
}
exports["default"] = Vector;


/***/ }),

/***/ "./src/Utils/program.ts":
/*!******************************!*\
  !*** ./src/Utils/program.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        gl.deleteProgram(program);
        throw Error("Failed to link program!");
    }
    return program;
}
exports["default"] = createProgram;


/***/ }),

/***/ "./src/Utils/resize-canvas.ts":
/*!************************************!*\
  !*** ./src/Utils/resize-canvas.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function resizeCanvasToDisplaySize(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
}
exports["default"] = resizeCanvasToDisplaySize;


/***/ }),

/***/ "./src/Utils/shader.ts":
/*!*****************************!*\
  !*** ./src/Utils/shader.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        gl.deleteShader(shader);
        throw Error("Failed to compile shader!");
    }
    return shader;
}
exports["default"] = createShader;


/***/ }),

/***/ "./src/Utils/tools.ts":
/*!****************************!*\
  !*** ./src/Utils/tools.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hexToRgb = exports.rgbToHex = void 0;
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}
function rgbToHex(rgba) {
    const [r, g, b] = rgba;
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}
exports.rgbToHex = rgbToHex;
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r / 255, g / 255, b / 255, 1];
}
exports.hexToRgb = hexToRgb;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setPolygonRedrawIndex = exports.setIsDrawing = exports.setShapeType = exports.renderCanvas = void 0;
const shader_1 = __importDefault(__webpack_require__(/*! Utils/shader */ "./src/Utils/shader.ts"));
const program_1 = __importDefault(__webpack_require__(/*! Utils/program */ "./src/Utils/program.ts"));
const resize_canvas_1 = __importDefault(__webpack_require__(/*! Utils/resize-canvas */ "./src/Utils/resize-canvas.ts"));
const line_1 = __importDefault(__webpack_require__(/*! Objects/line */ "./src/Objects/line.ts"));
const point_1 = __importDefault(__webpack_require__(/*! Operations/point */ "./src/Operations/point.ts"));
const rectangle_1 = __importDefault(__webpack_require__(/*! Objects/rectangle */ "./src/Objects/rectangle.ts"));
const polygon_1 = __importDefault(__webpack_require__(/*! Objects/polygon */ "./src/Objects/polygon.ts"));
const square_1 = __importDefault(__webpack_require__(/*! Objects/square */ "./src/Objects/square.ts"));
const types_1 = __importDefault(__webpack_require__(/*! Objects/types */ "./src/Objects/types.ts"));
const file_system_1 = __importDefault(__webpack_require__(/*! Files/file-system */ "./src/Files/file-system.ts"));
const file_handling_1 = __importDefault(__webpack_require__(/*! ./Files/file-handling */ "./src/Files/file-handling.ts"));
/* Global variables */
let objects = [];
let shapeType;
let isDrawing = false;
let polygonRedrawIndex = 0;
let isFirstDrawing = true;
/* Create Program */
const canvas = document.getElementById("webgl-canvas");
const gl = canvas.getContext("webgl");
const vertexShaderElement = document.getElementById("vertex-shader");
const fragmentShaderElement = document.getElementById("fragment-shader");
const vertexShaderSource = vertexShaderElement.textContent;
const fragmentShaderSource = fragmentShaderElement.textContent;
const vertexShader = (0, shader_1.default)(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = (0, shader_1.default)(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = (0, program_1.default)(gl, vertexShader, fragmentShader);
/* Setup Program */
gl.useProgram(program);
/* Setup Viewport */
(0, resize_canvas_1.default)(gl.canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
/* Clear Color */
gl.clear(gl.COLOR_BUFFER_BIT);
const positionBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();
/* List of Shapes Listener */
const listOfShapes = document.getElementById("list-of-shapes");
listOfShapes.addEventListener("change", () => {
    const index = +listOfShapes.selectedOptions[0].value;
    objects[index].setupSelector(index);
});
/* Button Listener */
const lineBtn = document.getElementById("line-btn");
lineBtn.addEventListener("click", () => {
    shapeType = types_1.default.LINE;
    isDrawing = false;
});
const squareBtn = document.getElementById("square-btn");
squareBtn.addEventListener("click", () => {
    shapeType = types_1.default.SQUARE;
    isDrawing = false;
});
const rectangleBtn = document.getElementById("rectangle-btn");
rectangleBtn.addEventListener("click", () => {
    shapeType = types_1.default.RECTANGLE;
    isDrawing = false;
});
const polygonBtn = document.getElementById("polygon-btn");
polygonBtn.addEventListener("click", () => {
    shapeType = types_1.default.POLYGON;
    isDrawing = false;
    isFirstDrawing = true;
});
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
    file_handling_1.default.download(file_system_1.default.serialize(objects));
});
const uploadBtn = document.getElementById("load-btn");
uploadBtn.addEventListener("click", () => {
    file_handling_1.default.upload((text) => {
        objects = file_system_1.default.load(text);
        for (const object of objects) {
            object.setupOption(true);
        }
        (0, exports.renderCanvas)();
    });
});
/* Canvas Listener */
canvas.addEventListener("mousedown", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const point = new point_1.default([x, y]);
    switch (shapeType) {
        case types_1.default.LINE:
            if (!isDrawing) {
                const line = new line_1.default(point, objects.length);
                objects.push(line);
                isDrawing = true;
            }
            else {
                const line = objects[objects.length - 1];
                line.updatePoint(point);
                line.render(gl, program, positionBuffer, colorBuffer);
                line.setupOption(true);
                isDrawing = false;
            }
            break;
        case types_1.default.SQUARE:
            if (!isDrawing) {
                const square = new square_1.default(point, objects.length);
                objects.push(square);
                isDrawing = true;
            }
            else {
                const square = objects[objects.length - 1];
                square.updatePoint(point);
                square.render(gl, program, positionBuffer, colorBuffer);
                square.setupOption(true);
                isDrawing = false;
            }
            break;
        case types_1.default.RECTANGLE:
            if (!isDrawing) {
                const rectangle = new rectangle_1.default(point, objects.length);
                objects.push(rectangle);
                isDrawing = true;
            }
            else {
                const rectangle = objects[objects.length - 1];
                rectangle.updatePoint(point);
                rectangle.render(gl, program, positionBuffer, colorBuffer);
                rectangle.setupOption(true);
                isDrawing = false;
            }
            break;
        case types_1.default.POLYGON:
            if (!isDrawing) {
                const polygon = new polygon_1.default(point, objects.length);
                objects.push(polygon);
                isDrawing = true;
            }
            else {
                const polygon = objects[objects.length - 1];
                polygon.updatePoint(point);
                polygon.render(gl, program, positionBuffer, colorBuffer);
                polygon.setupOption(isFirstDrawing);
                isFirstDrawing = false;
            }
            break;
        case types_1.default.POLYGON_REDRAW:
            const polygon = objects[polygonRedrawIndex];
            polygon.updatePoint(point);
            polygon.render(gl, program, positionBuffer, colorBuffer);
            break;
    }
});
canvas.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const point = new point_1.default([x, y]);
    if (isDrawing) {
        switch (shapeType) {
            case types_1.default.LINE:
                const line = objects[objects.length - 1];
                line.updatePoint(point);
                line.render(gl, program, positionBuffer, colorBuffer);
                break;
            case types_1.default.SQUARE:
                const square = objects[objects.length - 1];
                square.updatePoint(point);
                square.render(gl, program, positionBuffer, colorBuffer);
                break;
            case types_1.default.RECTANGLE:
                const rectangle = objects[objects.length - 1];
                rectangle.updatePoint(point);
                rectangle.render(gl, program, positionBuffer, colorBuffer);
                break;
            case types_1.default.POLYGON:
                /* Do Nothing */
                break;
            default:
                throw new Error("Shape type is not defined");
        }
    }
});
/* Export Function */
const renderCanvas = () => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    for (const object of objects) {
        object.render(gl, program, positionBuffer, colorBuffer);
    }
    window.requestAnimationFrame(exports.renderCanvas);
};
exports.renderCanvas = renderCanvas;
const setShapeType = (newShapeType) => {
    shapeType = newShapeType;
};
exports.setShapeType = setShapeType;
const setIsDrawing = (newIsDrawing) => {
    isDrawing = newIsDrawing;
};
exports.setIsDrawing = setIsDrawing;
const setPolygonRedrawIndex = (newPolygonRedrawIndex) => {
    polygonRedrawIndex;
};
exports.setPolygonRedrawIndex = setPolygonRedrawIndex;
/* DOM Listener */
document.addEventListener("DOMContentLoaded", exports.renderCanvas);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBa0M7UUFDbEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxnQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxlQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFM0MsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBVTtRQUM3QixrQ0FBa0M7UUFDbEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxnQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxlQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFM0MsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBVTtRQUM3QixrQ0FBa0M7UUFDbEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxnQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxnQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxlQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFM0MsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPLENBQ25CLEtBQWEsRUFDYixNQUFjLEVBQ2QsRUFBVSxFQUNWLEVBQVUsRUFDVixNQUFjLEVBQ2QsRUFBVSxFQUNWLEVBQVUsRUFDVixFQUFVLEVBQ1YsRUFBVSxFQUNWLEtBQVk7UUFFWixNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUV6QyxPQUFPLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQzthQUM1QyxjQUFjLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbEQsY0FBYyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzFELGNBQWMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQy9DLGNBQWMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM1QyxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN6QyxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN6QyxjQUFjLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNGO0FBRUQscUJBQWUsY0FBYyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDekY5Qix5SEFBK0M7QUFFL0MsTUFBTSxNQUFPLFNBQVEsb0JBQVU7SUFDN0IsWUFBbUIsUUFBbUM7UUFDcEQsS0FBSyxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFFRCxxQkFBZSxNQUFNLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNidEIsU0FBUyxhQUFhLENBQ3BCLEVBQXlCLEVBQ3pCLFlBQXlCLEVBQ3pCLGNBQTJCO0lBRTNCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNuQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN2QyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN6QyxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXhCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBWSxDQUFDO0lBQzNFLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFCLE1BQU0sS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7S0FDeEM7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQscUJBQWUsYUFBYSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDcEI3QixTQUFTLHlCQUF5QixDQUFDLE1BQXlCO0lBQzFELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDakMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUVuQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN6QixDQUFDO0FBRUQscUJBQWUseUJBQXlCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNSekMsU0FBUyxZQUFZLENBQ25CLEVBQXlCLEVBQ3pCLElBQVksRUFDWixNQUFjO0lBRWQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoQyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXpCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBWSxDQUFDO0lBQzVFLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhCLE1BQU0sS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7S0FDMUM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQscUJBQWUsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ25CNUIsU0FBUyxjQUFjLENBQUMsQ0FBUztJQUMvQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUM1QyxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsSUFBK0M7SUFDL0QsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRXZCLE9BQU8sSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3pFLENBQUM7QUFVUSw0QkFBUTtBQVJqQixTQUFTLFFBQVEsQ0FBQyxHQUFXO0lBQzNCLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4QyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXhDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRWtCLDRCQUFROzs7Ozs7Ozs7Ozs7Ozs7OztBQ25CM0IsbUdBQXdDO0FBQ3hDLHNHQUEwQztBQUMxQyx3SEFBNEQ7QUFFNUQsaUdBQWdDO0FBRWhDLDBHQUFxQztBQUNyQyxnSEFBMEM7QUFDMUMsMEdBQXNDO0FBQ3RDLHVHQUFvQztBQUNwQyxvR0FBc0M7QUFFdEMsa0hBQTJDO0FBQzNDLDBIQUFpRDtBQUVqRCxzQkFBc0I7QUFDdEIsSUFBSSxPQUFPLEdBQVksRUFBRSxDQUFDO0FBRTFCLElBQUksU0FBb0IsQ0FBQztBQUN6QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBRTFCLG9CQUFvQjtBQUNwQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQztBQUM1RSxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXRDLE1BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNyRSxNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUV6RSxNQUFNLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDLFdBQVcsQ0FBQztBQUMzRCxNQUFNLG9CQUFvQixHQUFHLHFCQUFxQixDQUFDLFdBQVcsQ0FBQztBQUUvRCxNQUFNLFlBQVksR0FBRyxvQkFBWSxFQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDNUUsTUFBTSxjQUFjLEdBQUcsb0JBQVksRUFDakMsRUFBRSxFQUNGLEVBQUUsQ0FBQyxlQUFlLEVBQ2xCLG9CQUFvQixDQUNyQixDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUcscUJBQWEsRUFBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBRWhFLG1CQUFtQjtBQUNuQixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRXZCLG9CQUFvQjtBQUNwQiwyQkFBeUIsRUFBQyxFQUFFLENBQUMsTUFBMkIsQ0FBQyxDQUFDO0FBQzFELEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXJELGlCQUFpQjtBQUNqQixFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRTlCLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUN6QyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7QUFFdEMsNkJBQTZCO0FBQzdCLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQzFDLGdCQUFnQixDQUNJLENBQUM7QUFDdkIsWUFBWSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7SUFDM0MsTUFBTSxLQUFLLEdBQVcsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUU3RCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBRUgscUJBQXFCO0FBQ3JCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDckMsU0FBUyxHQUFHLGVBQVMsQ0FBQyxJQUFJLENBQUM7SUFDM0IsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEQsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDdkMsU0FBUyxHQUFHLGVBQVMsQ0FBQyxNQUFNLENBQUM7SUFDN0IsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDOUQsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDMUMsU0FBUyxHQUFHLGVBQVMsQ0FBQyxTQUFTLENBQUM7SUFDaEMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUQsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFDeEMsU0FBUyxHQUFHLGVBQVMsQ0FBQyxPQUFPLENBQUM7SUFDOUIsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNsQixjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwRCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUNyQyx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxxQkFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0RCxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUN2Qyx1QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzNCLE9BQU8sR0FBRyxxQkFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUM1QixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO1FBRUQsd0JBQVksR0FBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxxQkFBcUI7QUFDckIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQzdDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDeEIsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWhDLFFBQVEsU0FBUyxFQUFFO1FBQ2pCLEtBQUssZUFBUyxDQUFDLElBQUk7WUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZCxNQUFNLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVuQixTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBUyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV2QixTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQ25CO1lBQ0QsTUFBTTtRQUVSLEtBQUssZUFBUyxDQUFDLE1BQU07WUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZCxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFckIsU0FBUyxHQUFHLElBQUksQ0FBQzthQUNsQjtpQkFBTTtnQkFDTCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQVcsQ0FBQztnQkFDckQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDeEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFekIsU0FBUyxHQUFHLEtBQUssQ0FBQzthQUNuQjtZQUNELE1BQU07UUFFUixLQUFLLGVBQVMsQ0FBQyxTQUFTO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2QsTUFBTSxTQUFTLEdBQUcsSUFBSSxtQkFBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRXhCLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0wsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFjLENBQUM7Z0JBRTNELFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdCLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzNELFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTVCLFNBQVMsR0FBRyxLQUFLLENBQUM7YUFDbkI7WUFDRCxNQUFNO1FBRVIsS0FBSyxlQUFTLENBQUMsT0FBTztZQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUV0QixTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO2lCQUFNO2dCQUNMLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBWSxDQUFDO2dCQUV2RCxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN6RCxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUVwQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1lBQ0QsTUFBTTtRQUVSLEtBQUssZUFBUyxDQUFDLGNBQWM7WUFDM0IsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFZLENBQUM7WUFFdkQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBRXpELE1BQU07S0FDVDtBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQzdDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDeEIsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWhDLElBQUksU0FBUyxFQUFFO1FBQ2IsUUFBUSxTQUFTLEVBQUU7WUFDakIsS0FBSyxlQUFTLENBQUMsSUFBSTtnQkFDakIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFTLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3RELE1BQU07WUFFUixLQUFLLGVBQVMsQ0FBQyxNQUFNO2dCQUNuQixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQVcsQ0FBQztnQkFDckQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDeEQsTUFBTTtZQUVSLEtBQUssZUFBUyxDQUFDLFNBQVM7Z0JBQ3RCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBYyxDQUFDO2dCQUMzRCxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUMzRCxNQUFNO1lBRVIsS0FBSyxlQUFTLENBQUMsT0FBTztnQkFDcEIsZ0JBQWdCO2dCQUNoQixNQUFNO1lBRVI7Z0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQ2hEO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILHFCQUFxQjtBQUNkLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtJQUMvQixFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBRTlCLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO1FBQzVCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDekQ7SUFFRCxNQUFNLENBQUMscUJBQXFCLENBQUMsb0JBQVksQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQztBQVJXLG9CQUFZLGdCQVF2QjtBQUVLLE1BQU0sWUFBWSxHQUFHLENBQUMsWUFBdUIsRUFBRSxFQUFFO0lBQ3RELFNBQVMsR0FBRyxZQUFZLENBQUM7QUFDM0IsQ0FBQyxDQUFDO0FBRlcsb0JBQVksZ0JBRXZCO0FBRUssTUFBTSxZQUFZLEdBQUcsQ0FBQyxZQUFxQixFQUFFLEVBQUU7SUFDcEQsU0FBUyxHQUFHLFlBQVksQ0FBQztBQUMzQixDQUFDLENBQUM7QUFGVyxvQkFBWSxnQkFFdkI7QUFFSyxNQUFNLHFCQUFxQixHQUFHLENBQUMscUJBQTZCLEVBQUUsRUFBRTtJQUNyRSxrQkFBa0IsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFGVyw2QkFBcUIseUJBRWhDO0FBRUYsa0JBQWtCO0FBQ2xCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxvQkFBWSxDQUFDLENBQUM7Ozs7Ozs7VUMzUDVEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8yRC1XZWItQmFzZWQtQ0FELy4vc3JjL0FsZ29yaXRobXMvY29udmV4LWh1bGwudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9GYWN0b3JpZXMvT2JqZWN0cy9saW5lLWZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9GYWN0b3JpZXMvT2JqZWN0cy9wb2x5Z29uLWZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9GYWN0b3JpZXMvT2JqZWN0cy9yZWN0YW5nbGUtZmFjdG9yeS50cyIsIndlYnBhY2s6Ly8yRC1XZWItQmFzZWQtQ0FELy4vc3JjL0ZhY3Rvcmllcy9PYmplY3RzL3NoYXBlLWZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9GYWN0b3JpZXMvT2JqZWN0cy9zcXVhcmUtZmFjdG9yeS50cyIsIndlYnBhY2s6Ly8yRC1XZWItQmFzZWQtQ0FELy4vc3JjL0ZhY3Rvcmllcy9PcGVyYXRpb25zL3BvaW50LWZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9GaWxlcy9maWxlLWhhbmRsaW5nLnRzIiwid2VicGFjazovLzJELVdlYi1CYXNlZC1DQUQvLi9zcmMvRmlsZXMvZmlsZS1zeXN0ZW0udHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9PYmplY3RzL2xpbmUudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9PYmplY3RzL3BvbHlnb24udHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9PYmplY3RzL3JlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly8yRC1XZWItQmFzZWQtQ0FELy4vc3JjL09iamVjdHMvc2hhcGUudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9PYmplY3RzL3NxdWFyZS50cyIsIndlYnBhY2s6Ly8yRC1XZWItQmFzZWQtQ0FELy4vc3JjL09iamVjdHMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9PcGVyYXRpb25zL2Nvb3JkaW5hdGUudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9PcGVyYXRpb25zL21hdHJpeC50cyIsIndlYnBhY2s6Ly8yRC1XZWItQmFzZWQtQ0FELy4vc3JjL09wZXJhdGlvbnMvcG9pbnQudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9PcGVyYXRpb25zL3RyYW5zZm9ybWF0aW9uLnRzIiwid2VicGFjazovLzJELVdlYi1CYXNlZC1DQUQvLi9zcmMvT3BlcmF0aW9ucy92ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC8uL3NyYy9VdGlscy9wcm9ncmFtLnRzIiwid2VicGFjazovLzJELVdlYi1CYXNlZC1DQUQvLi9zcmMvVXRpbHMvcmVzaXplLWNhbnZhcy50cyIsIndlYnBhY2s6Ly8yRC1XZWItQmFzZWQtQ0FELy4vc3JjL1V0aWxzL3NoYWRlci50cyIsIndlYnBhY2s6Ly8yRC1XZWItQmFzZWQtQ0FELy4vc3JjL1V0aWxzL3Rvb2xzLnRzIiwid2VicGFjazovLzJELVdlYi1CYXNlZC1DQUQvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8yRC1XZWItQmFzZWQtQ0FEL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vMkQtV2ViLUJhc2VkLUNBRC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvaW50IGZyb20gXCJPcGVyYXRpb25zL3BvaW50XCI7XG5cbmVudW0gQ29udmV4SHVsbE9yaWVudGF0aW9uIHtcbiAgQ09VTlRFUkNMT0NLV0lTRSxcbiAgQ09MTElORUFSLFxuICBDTE9DS1dJU0UsXG59XG5cbmZ1bmN0aW9uIG9yaWVudGF0aW9uKHA6IFBvaW50LCBxOiBQb2ludCwgcjogUG9pbnQpOiBDb252ZXhIdWxsT3JpZW50YXRpb24ge1xuICBjb25zdCBbcFgsIHBZXSA9IHAuZ2V0UGFpcigpO1xuICBjb25zdCBbcVgsIHFZXSA9IHEuZ2V0UGFpcigpO1xuICBjb25zdCBbclgsIHJZXSA9IHIuZ2V0UGFpcigpO1xuXG4gIGNvbnN0IHZhbCA9IChxWSAtIHBZKSAqIChyWCAtIHFYKSAtIChxWCAtIHBYKSAqIChyWSAtIHFZKTtcblxuICBpZiAodmFsIDwgMCkge1xuICAgIHJldHVybiBDb252ZXhIdWxsT3JpZW50YXRpb24uQ09VTlRFUkNMT0NLV0lTRTtcbiAgfSBlbHNlIGlmICh2YWwgPiAwKSB7XG4gICAgcmV0dXJuIENvbnZleEh1bGxPcmllbnRhdGlvbi5DTE9DS1dJU0U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIENvbnZleEh1bGxPcmllbnRhdGlvbi5DT0xMSU5FQVI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29udmV4SHVsbChhcnJheU9mUG9pbnQ6IFBvaW50W10pOiBQb2ludFtdIHtcbiAgY29uc3QgaHVsbDogUG9pbnRbXSA9IFtdO1xuXG4gIGxldCBsZWZ0bW9zdEluZGV4ID0gMDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcnJheU9mUG9pbnQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBbbGVmdG1vc3RYXSA9IGFycmF5T2ZQb2ludFtsZWZ0bW9zdEluZGV4XS5nZXRQYWlyKCk7XG4gICAgY29uc3QgW3BYXSA9IGFycmF5T2ZQb2ludFtpXS5nZXRQYWlyKCk7XG5cbiAgICBpZiAocFggPCBsZWZ0bW9zdFgpIGxlZnRtb3N0SW5kZXggPSBpO1xuICB9XG5cbiAgbGV0IGN1cnJlbnRJbmRleCA9IGxlZnRtb3N0SW5kZXg7XG4gIGRvIHtcbiAgICBodWxsLnB1c2goYXJyYXlPZlBvaW50W2N1cnJlbnRJbmRleF0pO1xuXG4gICAgbGV0IG5ld0luZGV4ID0gKGN1cnJlbnRJbmRleCArIDEpICUgYXJyYXlPZlBvaW50Lmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5T2ZQb2ludC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBvcmllbnRhdGlvbihcbiAgICAgICAgICBhcnJheU9mUG9pbnRbY3VycmVudEluZGV4XSxcbiAgICAgICAgICBhcnJheU9mUG9pbnRbaV0sXG4gICAgICAgICAgYXJyYXlPZlBvaW50W25ld0luZGV4XVxuICAgICAgICApID09PSBDb252ZXhIdWxsT3JpZW50YXRpb24uQ09VTlRFUkNMT0NLV0lTRVxuICAgICAgKVxuICAgICAgICBuZXdJbmRleCA9IGk7XG4gICAgfVxuXG4gICAgY3VycmVudEluZGV4ID0gbmV3SW5kZXg7XG4gIH0gd2hpbGUgKGN1cnJlbnRJbmRleCAhPT0gbGVmdG1vc3RJbmRleCk7XG5cbiAgcmV0dXJuIGh1bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnZleEh1bGw7XG4iLCJpbXBvcnQgTGluZUludGVyZmFjZSBmcm9tIFwiTWFpbi9JbnRlcmZhY2VzL09iamVjdHMvbGluZS1pbnRlcmZhY2VcIjtcbmltcG9ydCBMaW5lIGZyb20gXCJNYWluL09iamVjdHMvbGluZVwiO1xuaW1wb3J0IFBvaW50RmFjdG9yeSBmcm9tIFwiRmFjdG9yaWVzL09wZXJhdGlvbnMvcG9pbnQtZmFjdG9yeVwiO1xuXG5jbGFzcyBMaW5lRmFjdG9yeSB7XG4gIHB1YmxpYyBzdGF0aWMgZnJvbUludGVyZmFjZShsaW5lSW50ZXJmYWNlOiBMaW5lSW50ZXJmYWNlKTogTGluZSB7XG4gICAgY29uc3QgbGluZSA9IG5ldyBMaW5lKFxuICAgICAgUG9pbnRGYWN0b3J5LmZyb21JbnRlcmZhY2UobGluZUludGVyZmFjZS5wMSksXG4gICAgICBsaW5lSW50ZXJmYWNlLmlkXG4gICAgKTtcbiAgICBsaW5lLnAyID0gUG9pbnRGYWN0b3J5LmZyb21JbnRlcmZhY2UobGluZUludGVyZmFjZS5wMik7XG5cbiAgICByZXR1cm4gbGluZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaW5lRmFjdG9yeTtcbiIsImltcG9ydCBQb2x5Z29uSW50ZXJmYWNlIGZyb20gXCJNYWluL0ludGVyZmFjZXMvT2JqZWN0cy9wb2x5Z29uLWludGVyZmFjZVwiO1xuaW1wb3J0IFBvbHlnb24gZnJvbSBcIk1haW4vT2JqZWN0cy9wb2x5Z29uXCI7XG5pbXBvcnQgUG9pbnRGYWN0b3J5IGZyb20gXCJGYWN0b3JpZXMvT3BlcmF0aW9ucy9wb2ludC1mYWN0b3J5XCI7XG5cbmNsYXNzIFBvbHlnb25GYWN0b3J5IHtcbiAgcHVibGljIHN0YXRpYyBmcm9tSW50ZXJmYWNlKHBvbHlnb25JbnRlcmZhY2U6IFBvbHlnb25JbnRlcmZhY2UpOiBQb2x5Z29uIHtcbiAgICBjb25zdCBbcEluaXRpYWxJbnRlcmZhY2UsIC4uLnBSZXN0SW50ZXJmYWNlc10gPVxuICAgICAgcG9seWdvbkludGVyZmFjZS5hcnJheU9mUG9pbnQ7XG5cbiAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb24oXG4gICAgICBQb2ludEZhY3RvcnkuZnJvbUludGVyZmFjZShwSW5pdGlhbEludGVyZmFjZSksXG4gICAgICBwb2x5Z29uSW50ZXJmYWNlLmlkXG4gICAgKTtcbiAgICBmb3IgKGNvbnN0IHAgb2YgcFJlc3RJbnRlcmZhY2VzKSB7XG4gICAgICBwb2x5Z29uLnVwZGF0ZVBvaW50KFBvaW50RmFjdG9yeS5mcm9tSW50ZXJmYWNlKHApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9seWdvbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2x5Z29uRmFjdG9yeTtcbiIsImltcG9ydCBSZWN0YW5nbGVJbnRlcmZhY2UgZnJvbSBcIk1haW4vSW50ZXJmYWNlcy9PYmplY3RzL3JlY3RhbmdsZS1pbnRlcmZhY2VcIjtcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIk1haW4vT2JqZWN0cy9yZWN0YW5nbGVcIjtcbmltcG9ydCBQb2ludEZhY3RvcnkgZnJvbSBcIkZhY3Rvcmllcy9PcGVyYXRpb25zL3BvaW50LWZhY3RvcnlcIjtcblxuY2xhc3MgUmVjdGFuZ2xlRmFjdG9yeSB7XG4gIHB1YmxpYyBzdGF0aWMgZnJvbUludGVyZmFjZShcbiAgICByZWN0YW5nbGVJbnRlcmZhY2U6IFJlY3RhbmdsZUludGVyZmFjZVxuICApOiBSZWN0YW5nbGUge1xuICAgIGNvbnN0IHJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoXG4gICAgICBQb2ludEZhY3RvcnkuZnJvbUludGVyZmFjZShyZWN0YW5nbGVJbnRlcmZhY2UucDEpLFxuICAgICAgcmVjdGFuZ2xlSW50ZXJmYWNlLmlkXG4gICAgKTtcbiAgICByZWN0YW5nbGUucDIgPSBQb2ludEZhY3RvcnkuZnJvbUludGVyZmFjZShyZWN0YW5nbGVJbnRlcmZhY2UucDIpO1xuICAgIHJlY3RhbmdsZS5wMyA9IFBvaW50RmFjdG9yeS5mcm9tSW50ZXJmYWNlKHJlY3RhbmdsZUludGVyZmFjZS5wMyk7XG4gICAgcmVjdGFuZ2xlLnA0ID0gUG9pbnRGYWN0b3J5LmZyb21JbnRlcmZhY2UocmVjdGFuZ2xlSW50ZXJmYWNlLnA0KTtcblxuICAgIHJldHVybiByZWN0YW5nbGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVjdGFuZ2xlRmFjdG9yeTtcbiIsImltcG9ydCBTaGFwZUludGVyZmFjZSBmcm9tIFwiTWFpbi9JbnRlcmZhY2VzL09iamVjdHMvc2hhcGUtaW50ZXJmYWNlXCI7XG5pbXBvcnQgU2hhcGUgZnJvbSBcIk1haW4vT2JqZWN0cy9zaGFwZVwiO1xuaW1wb3J0IFNoYXBlVHlwZSBmcm9tIFwiTWFpbi9PYmplY3RzL3R5cGVzXCI7XG5pbXBvcnQgTGluZUZhY3RvcnkgZnJvbSBcIkZhY3Rvcmllcy9PYmplY3RzL2xpbmUtZmFjdG9yeVwiO1xuaW1wb3J0IFJlY3RhbmdsZUZhY3RvcnkgZnJvbSBcIkZhY3Rvcmllcy9PYmplY3RzL3JlY3RhbmdsZS1mYWN0b3J5XCI7XG5pbXBvcnQgUG9seWdvbkZhY3RvcnkgZnJvbSBcIkZhY3Rvcmllcy9PYmplY3RzL3BvbHlnb24tZmFjdG9yeVwiO1xuaW1wb3J0IFNxdWFyZUZhY3RvcnkgZnJvbSBcIkZhY3Rvcmllcy9PYmplY3RzL3NxdWFyZS1mYWN0b3J5XCI7XG5pbXBvcnQgTGluZUludGVyZmFjZSBmcm9tIFwiTWFpbi9JbnRlcmZhY2VzL09iamVjdHMvbGluZS1pbnRlcmZhY2VcIjtcbmltcG9ydCBSZWN0YW5nbGVJbnRlcmZhY2UgZnJvbSBcIk1haW4vSW50ZXJmYWNlcy9PYmplY3RzL3JlY3RhbmdsZS1pbnRlcmZhY2VcIjtcbmltcG9ydCBQb2x5Z29uSW50ZXJmYWNlIGZyb20gXCJNYWluL0ludGVyZmFjZXMvT2JqZWN0cy9wb2x5Z29uLWludGVyZmFjZVwiO1xuaW1wb3J0IFNxdWFyZUludGVyZmFjZSBmcm9tIFwiTWFpbi9JbnRlcmZhY2VzL09iamVjdHMvc3F1YXJlLWludGVyZmFjZVwiO1xuXG5jbGFzcyBTaGFwZUZhY3Rvcnkge1xuICBwdWJsaWMgc3RhdGljIGZyb21JbnRlcmZhY2Uoc2hhcGVJbnRlcmZhY2U6IFNoYXBlSW50ZXJmYWNlKTogU2hhcGUge1xuICAgIHN3aXRjaCAoc2hhcGVJbnRlcmZhY2UudHlwZSkge1xuICAgICAgY2FzZSBTaGFwZVR5cGUuTElORTpcbiAgICAgICAgcmV0dXJuIExpbmVGYWN0b3J5LmZyb21JbnRlcmZhY2Uoc2hhcGVJbnRlcmZhY2UgYXMgTGluZUludGVyZmFjZSk7XG4gICAgICBjYXNlIFNoYXBlVHlwZS5SRUNUQU5HTEU6XG4gICAgICAgIHJldHVybiBSZWN0YW5nbGVGYWN0b3J5LmZyb21JbnRlcmZhY2UoXG4gICAgICAgICAgc2hhcGVJbnRlcmZhY2UgYXMgUmVjdGFuZ2xlSW50ZXJmYWNlXG4gICAgICAgICk7XG4gICAgICBjYXNlIFNoYXBlVHlwZS5QT0xZR09OOlxuICAgICAgICByZXR1cm4gUG9seWdvbkZhY3RvcnkuZnJvbUludGVyZmFjZShzaGFwZUludGVyZmFjZSBhcyBQb2x5Z29uSW50ZXJmYWNlKTtcbiAgICAgIGNhc2UgU2hhcGVUeXBlLlNRVUFSRTpcbiAgICAgICAgcmV0dXJuIFNxdWFyZUZhY3RvcnkuZnJvbUludGVyZmFjZShzaGFwZUludGVyZmFjZSBhcyBTcXVhcmVJbnRlcmZhY2UpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBzaGFwZSB0eXBlXCIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGFwZUZhY3Rvcnk7XG4iLCJpbXBvcnQgU3F1YXJlSW50ZXJmYWNlIGZyb20gXCJNYWluL0ludGVyZmFjZXMvT2JqZWN0cy9zcXVhcmUtaW50ZXJmYWNlXCI7XG5pbXBvcnQgU3F1YXJlIGZyb20gXCJNYWluL09iamVjdHMvc3F1YXJlXCI7XG5pbXBvcnQgUG9pbnRGYWN0b3J5IGZyb20gXCJGYWN0b3JpZXMvT3BlcmF0aW9ucy9wb2ludC1mYWN0b3J5XCI7XG5cbmNsYXNzIFNxdWFyZUZhY3Rvcnkge1xuICBwdWJsaWMgc3RhdGljIGZyb21JbnRlcmZhY2Uoc3F1YXJlSW50ZXJmYWNlOiBTcXVhcmVJbnRlcmZhY2UpOiBTcXVhcmUge1xuICAgIGNvbnN0IHNxdWFyZSA9IG5ldyBTcXVhcmUoXG4gICAgICBQb2ludEZhY3RvcnkuZnJvbUludGVyZmFjZShzcXVhcmVJbnRlcmZhY2UucDEpLFxuICAgICAgc3F1YXJlSW50ZXJmYWNlLmlkXG4gICAgKTtcbiAgICBzcXVhcmUucDIgPSBQb2ludEZhY3RvcnkuZnJvbUludGVyZmFjZShzcXVhcmVJbnRlcmZhY2UucDIpO1xuICAgIHNxdWFyZS5wMyA9IFBvaW50RmFjdG9yeS5mcm9tSW50ZXJmYWNlKHNxdWFyZUludGVyZmFjZS5wMyk7XG4gICAgc3F1YXJlLnA0ID0gUG9pbnRGYWN0b3J5LmZyb21JbnRlcmZhY2Uoc3F1YXJlSW50ZXJmYWNlLnA0KTtcblxuICAgIHJldHVybiBzcXVhcmU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3F1YXJlRmFjdG9yeTtcbiIsImltcG9ydCBQb2ludEludGVyZmFjZSBmcm9tIFwiTWFpbi9JbnRlcmZhY2VzL09wZXJhdGlvbnMvcG9pbnQtaW50ZXJmYWNlXCI7XG5pbXBvcnQgUG9pbnQgZnJvbSBcIk1haW4vT3BlcmF0aW9ucy9wb2ludFwiO1xuXG5jbGFzcyBQb2ludEZhY3Rvcnkge1xuICBwdWJsaWMgc3RhdGljIGZyb21JbnRlcmZhY2UocG9pbnRJbnRlcmZhY2U6IFBvaW50SW50ZXJmYWNlKTogUG9pbnQge1xuICAgIHJldHVybiBuZXcgUG9pbnQoXG4gICAgICBbcG9pbnRJbnRlcmZhY2UueCwgcG9pbnRJbnRlcmZhY2UueV0sXG4gICAgICBbcG9pbnRJbnRlcmZhY2UuciwgcG9pbnRJbnRlcmZhY2UuZywgcG9pbnRJbnRlcmZhY2UuYiwgcG9pbnRJbnRlcmZhY2UuYV1cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBvaW50RmFjdG9yeTtcbiIsImNsYXNzIEZpbGVIYW5kbGluZyB7XG4gIHB1YmxpYyBzdGF0aWMgZG93bmxvYWQodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZGF0YSA9IG5ldyBGaWxlKFt0ZXh0XSwgXCJzaGFwZXMuanNvblwiLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiIH0pO1xuXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhKTtcblxuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGRhdGEubmFtZTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYS5jbGljaygpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG5cbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHVwbG9hZChjYWxsYmFjazogKHRleHQ6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnR5cGUgPSBcImZpbGVcIjtcbiAgICBpbnB1dC5hY2NlcHQgPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcblxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgZmlsZSA9IGlucHV0LmZpbGVzWzBdO1xuXG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY2FsbGJhY2socmVhZGVyLnJlc3VsdCBhcyBzdHJpbmcpO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgaW5wdXQuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlucHV0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGaWxlSGFuZGxpbmc7XG4iLCJpbXBvcnQgU2hhcGVGYWN0b3J5IGZyb20gXCJNYWluL0ZhY3Rvcmllcy9PYmplY3RzL3NoYXBlLWZhY3RvcnlcIjtcbmltcG9ydCBTaGFwZUludGVyZmFjZSBmcm9tIFwiTWFpbi9JbnRlcmZhY2VzL09iamVjdHMvc2hhcGUtaW50ZXJmYWNlXCI7XG5pbXBvcnQgU2hhcGUgZnJvbSBcIk1haW4vT2JqZWN0cy9zaGFwZVwiO1xuXG5jbGFzcyBGaWxlU3lzdGVtIHtcbiAgcHVibGljIHN0YXRpYyBsb2FkKHRleHQ6IHN0cmluZyk6IFNoYXBlW10ge1xuICAgIGNvbnN0IHNoYXBlSW50ZXJmYWNlcyA9IEpTT04ucGFyc2UodGV4dCkgYXMgU2hhcGVJbnRlcmZhY2VbXTtcblxuICAgIGNvbnN0IHNoYXBlczogU2hhcGVbXSA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2hhcGVJbnRlcmZhY2Ugb2Ygc2hhcGVJbnRlcmZhY2VzKSB7XG4gICAgICBzaGFwZXMucHVzaChTaGFwZUZhY3RvcnkuZnJvbUludGVyZmFjZShzaGFwZUludGVyZmFjZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBzaGFwZXM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNlcmlhbGl6ZShzaGFwZXM6IFNoYXBlW10pOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShzaGFwZXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbGVTeXN0ZW07XG4iLCJpbXBvcnQgU2hhcGUgZnJvbSBcIk9iamVjdHMvc2hhcGVcIjtcbmltcG9ydCBMaW5lSW50ZXJmYWNlIGZyb20gXCJNYWluL0ludGVyZmFjZXMvT2JqZWN0cy9saW5lLWludGVyZmFjZVwiO1xuaW1wb3J0IFNoYXBlVHlwZSBmcm9tIFwiT2JqZWN0cy90eXBlc1wiO1xuaW1wb3J0IFBvaW50IGZyb20gXCJPcGVyYXRpb25zL3BvaW50XCI7XG5pbXBvcnQgeyByZW5kZXJDYW52YXMgfSBmcm9tIFwiTWFpbi9pbmRleFwiO1xuaW1wb3J0IHsgaGV4VG9SZ2IsIHJnYlRvSGV4IH0gZnJvbSBcIk1haW4vVXRpbHMvdG9vbHNcIjtcblxuY2xhc3MgTGluZSBleHRlbmRzIFNoYXBlIGltcGxlbWVudHMgTGluZUludGVyZmFjZSB7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlOiBTaGFwZVR5cGUuTElORTtcbiAgcHVibGljIHAxOiBQb2ludDtcbiAgcHVibGljIHAyOiBQb2ludDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocDE6IFBvaW50LCBpZDogbnVtYmVyKSB7XG4gICAgc3VwZXIoaWQpO1xuXG4gICAgdGhpcy50eXBlID0gU2hhcGVUeXBlLkxJTkU7XG4gICAgdGhpcy5wMSA9IHAxO1xuICAgIHRoaXMucDIgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIGZpbmRDZW50ZXIoKTogUG9pbnQge1xuICAgIGNvbnN0IFtwMXgsIHAxeV0gPSB0aGlzLnAxLmdldFBhaXIoKTtcbiAgICBjb25zdCBbcDJ4LCBwMnldID0gdGhpcy5wMi5nZXRQYWlyKCk7XG5cbiAgICByZXR1cm4gbmV3IFBvaW50KFsocDF4ICsgcDJ4KSAvIDIsIChwMXkgKyBwMnkpIC8gMl0pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVBvaW50KHAyOiBQb2ludCkge1xuICAgIHRoaXMucDIgPSBwMjtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQb3NpdGlvbihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KTogdm9pZCB7XG4gICAgZ2wuYnVmZmVyRGF0YShcbiAgICAgIGdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoWy4uLnRoaXMucDEuZ2V0UGFpcigpLCAuLi50aGlzLnAyLmdldFBhaXIoKV0pLFxuICAgICAgZ2wuU1RBVElDX0RSQVdcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGFkZENvbG9yKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpOiB2b2lkIHtcbiAgICBnbC5idWZmZXJEYXRhKFxuICAgICAgZ2wuQVJSQVlfQlVGRkVSLFxuICAgICAgbmV3IEZsb2F0MzJBcnJheShbLi4udGhpcy5wMS5nZXRDb2xvcigpLCAuLi50aGlzLnAyLmdldENvbG9yKCldKSxcbiAgICAgIGdsLlNUQVRJQ19EUkFXXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBkcmF3TWV0aG9kKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpOiBudW1iZXIge1xuICAgIHJldHVybiBnbC5MSU5FUztcbiAgfVxuXG4gIHB1YmxpYyBjb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiAyO1xuICB9XG5cbiAgcHVibGljIGlzUG9pbnRDb21wbGV0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wMiAhPSBudWxsO1xuICB9XG5cbiAgcHVibGljIG1vdmVYKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnR4ID0gZGVsdGE7XG5cbiAgICByZW5kZXJDYW52YXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlWShkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50eSA9IC1kZWx0YTtcblxuICAgIHJlbmRlckNhbnZhcygpO1xuICB9XG5cbiAgcHVibGljIGdldExlbmd0aCgpOiBudW1iZXIge1xuICAgIGNvbnN0IFtwMXgsIHAxeV0gPSB0aGlzLnAxLmdldFBhaXIoKTtcbiAgICBjb25zdCBbcDJ4LCBwMnldID0gdGhpcy5wMi5nZXRQYWlyKCk7XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KChwMnggLSBwMXgpICoqIDIgKyAocDJ5IC0gcDF5KSAqKiAyKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRMZW5ndGgoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIC8qIE1lbmdpa3V0aSBzdW1idSBYICovXG4gICAgdGhpcy5zeCA9IDEgKyBkZWx0YSAvIHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgdGhpcy5zeSA9IDEgKyBkZWx0YSAvIHRoaXMuZ2V0TGVuZ3RoKCk7XG5cbiAgICByZW5kZXJDYW52YXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRSb3RhdGlvbihkZWdyZWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGVncmVlID0gKGRlZ3JlZSAqIE1hdGguUEkpIC8gMTgwO1xuXG4gICAgcmVuZGVyQ2FudmFzKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBDb2xvclNlbGVjdG9yKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjb2xvclNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xvci1zZWxlY3RvclwiKTtcbiAgICBjb2xvclNlbGVjdG9yLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY29sb3JTZWxlY3Rvci5yZXBsYWNlQ2hpbGRyZW4oKTtcblxuICAgIGNvbnN0IGNvbG9yVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgY29sb3JUaXRsZS50ZXh0Q29udGVudCA9IFwiU2VsZWN0IGNvbG9yXCI7XG5cbiAgICBjb25zdCBjb2xvcklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNvbG9ySW5wdXQuaWQgPSBcImNvbG9yLWlucHV0XCI7XG4gICAgY29sb3JJbnB1dC50eXBlID0gXCJjb2xvclwiO1xuXG4gICAgaWYgKGluZGV4ID09PSAxKSB7XG4gICAgICBjb2xvcklucHV0LnZhbHVlID0gcmdiVG9IZXgodGhpcy5wMS5nZXRDb2xvcigpKTtcbiAgICAgIGNvbG9ySW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgaGV4ID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcblxuICAgICAgICB0aGlzLnAxLnNldENvbG9yKGhleFRvUmdiKGhleCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGluZGV4ID09PSAyKSB7XG4gICAgICBjb2xvcklucHV0LnZhbHVlID0gcmdiVG9IZXgodGhpcy5wMi5nZXRDb2xvcigpKTtcbiAgICAgIGNvbG9ySW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgaGV4ID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcblxuICAgICAgICB0aGlzLnAyLnNldENvbG9yKGhleFRvUmdiKGhleCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29sb3JTZWxlY3Rvci5hcHBlbmQoY29sb3JUaXRsZSwgY29sb3JJbnB1dCk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBTZWxlY3RvcigpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0b3JcIik7XG4gICAgc2VsZWN0b3IuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBzZWxlY3Rvci5yZXBsYWNlQ2hpbGRyZW4oKTtcblxuICAgIC8qIEZpcnN0IERpdiAgKi9cbiAgICBjb25zdCBmaXJzdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZmlyc3REaXYuY2xhc3NOYW1lID0gXCJ0cmFuc2Zvcm1hdGlvbi10cmFuc2xhdGlvblwiO1xuXG4gICAgLyogU2xpZGVyIFggKi9cbiAgICBjb25zdCBzbGlkZXJYVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgc2xpZGVyWFRpdGxlLnRleHRDb250ZW50ID0gXCJTbGlkZXIgWFwiO1xuXG4gICAgY29uc3Qgc2xpZGVyWHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgc2xpZGVyWHRleHQudGV4dENvbnRlbnQgPSB0aGlzLnR4LnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCBzbGlkZXJYID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHNsaWRlclgudHlwZSA9IFwicmFuZ2VcIjtcbiAgICBzbGlkZXJYLm1pbiA9IFwiLTYwMFwiO1xuICAgIHNsaWRlclgubWF4ID0gXCI2MDBcIjtcbiAgICBzbGlkZXJYLnZhbHVlID0gdGhpcy50eC50b1N0cmluZygpO1xuICAgIHNsaWRlclguc3RlcCA9IFwiMTBcIjtcbiAgICBzbGlkZXJYLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRlbHRhID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgIHNsaWRlclh0ZXh0LnRleHRDb250ZW50ID0gZGVsdGE7XG5cbiAgICAgIHRoaXMubW92ZVgoK2RlbHRhKTtcbiAgICB9KTtcblxuICAgIC8qIFNsaWRlciBZICovXG4gICAgY29uc3Qgc2xpZGVyWVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNsaWRlcllUaXRsZS50ZXh0Q29udGVudCA9IFwiU2xpZGVyIFlcIjtcblxuICAgIGNvbnN0IHNsaWRlcll0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHNsaWRlcll0ZXh0LnRleHRDb250ZW50ID0gKC10aGlzLnR5KS50b1N0cmluZygpO1xuXG4gICAgY29uc3Qgc2xpZGVyWSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBzbGlkZXJZLnR5cGUgPSBcInJhbmdlXCI7XG4gICAgc2xpZGVyWS5taW4gPSBcIi01MDBcIjtcbiAgICBzbGlkZXJZLm1heCA9IFwiNTAwXCI7XG4gICAgc2xpZGVyWS52YWx1ZSA9ICgtdGhpcy50eSkudG9TdHJpbmcoKTtcbiAgICBzbGlkZXJZLnN0ZXAgPSBcIjEwXCI7XG4gICAgc2xpZGVyWS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkZWx0YSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICBzbGlkZXJZdGV4dC50ZXh0Q29udGVudCA9IGRlbHRhO1xuXG4gICAgICB0aGlzLm1vdmVZKCtkZWx0YSk7XG4gICAgfSk7XG5cbiAgICBmaXJzdERpdi5hcHBlbmQoXG4gICAgICBzbGlkZXJYVGl0bGUsXG4gICAgICBzbGlkZXJYLFxuICAgICAgc2xpZGVyWHRleHQsXG4gICAgICBzbGlkZXJZVGl0bGUsXG4gICAgICBzbGlkZXJZLFxuICAgICAgc2xpZGVyWXRleHRcbiAgICApO1xuXG4gICAgLyogU2Vjb25kIERpdiAqL1xuICAgIGNvbnN0IHNlY29uZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2Vjb25kRGl2LmNsYXNzTmFtZSA9IFwidHJhbnNmb3JtYXRpb24tc2l6ZVwiO1xuXG4gICAgLyogU2xpZGVyIExlbmd0aCAqL1xuICAgIGNvbnN0IHNsaWRlckxlbmd0aFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNsaWRlckxlbmd0aFRpdGxlLnRleHRDb250ZW50ID0gXCJTbGlkZXIgTGVuZ3RoXCI7XG5cbiAgICBjb25zdCBzbGlkZXJMZW5ndGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHNsaWRlckxlbmd0aFRleHQudGV4dENvbnRlbnQgPSAoXG4gICAgICAodGhpcy5zeCAtIDEpICpcbiAgICAgIHRoaXMuZ2V0TGVuZ3RoKClcbiAgICApLnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCBzbGlkZXJMZW5ndGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgc2xpZGVyTGVuZ3RoLnR5cGUgPSBcInJhbmdlXCI7XG4gICAgc2xpZGVyTGVuZ3RoLm1pbiA9IFwiMFwiO1xuICAgIHNsaWRlckxlbmd0aC5tYXggPSBcIjUwMFwiO1xuICAgIHNsaWRlckxlbmd0aC52YWx1ZSA9ICgodGhpcy5zeCAtIDEpICogdGhpcy5nZXRMZW5ndGgoKSkudG9TdHJpbmcoKTtcbiAgICBzbGlkZXJMZW5ndGguc3RlcCA9IFwiMTBcIjtcbiAgICBzbGlkZXJMZW5ndGguYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgZGVsdGEgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgc2xpZGVyTGVuZ3RoVGV4dC50ZXh0Q29udGVudCA9IGRlbHRhO1xuXG4gICAgICB0aGlzLnNldExlbmd0aCgrZGVsdGEpO1xuICAgIH0pO1xuXG4gICAgc2Vjb25kRGl2LmFwcGVuZChzbGlkZXJMZW5ndGhUaXRsZSwgc2xpZGVyTGVuZ3RoLCBzbGlkZXJMZW5ndGhUZXh0KTtcblxuICAgIC8qIFRoaXJkIERpdiAqL1xuICAgIGNvbnN0IHRoaXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlyZERpdi5jbGFzc05hbWUgPSBcInRyYW5zZm9ybWF0aW9uLXJvdGF0aW9uXCI7XG5cbiAgICAvKiBTbGlkZXIgUm90YXRpb24gKi9cbiAgICBjb25zdCBzbGlkZXJSb3RhdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNsaWRlclJvdGF0aW9uVGl0bGUudGV4dENvbnRlbnQgPSBcIlNsaWRlciBSb3RhdGlvblwiO1xuXG4gICAgY29uc3Qgc2xpZGVyUm90YXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHNsaWRlclJvdGF0aW9uVGV4dC50ZXh0Q29udGVudCA9ICgoMTgwICogdGhpcy5kZWdyZWUpIC8gTWF0aC5QSSkudG9TdHJpbmcoKTtcblxuICAgIGNvbnN0IHNsaWRlclJvdGF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHNsaWRlclJvdGF0aW9uLnR5cGUgPSBcInJhbmdlXCI7XG4gICAgc2xpZGVyUm90YXRpb24ubWluID0gXCIwXCI7XG4gICAgc2xpZGVyUm90YXRpb24ubWF4ID0gXCIzNjBcIjtcbiAgICBzbGlkZXJSb3RhdGlvbi52YWx1ZSA9ICgoMTgwICogdGhpcy5kZWdyZWUpIC8gTWF0aC5QSSkudG9TdHJpbmcoKTtcbiAgICBzbGlkZXJSb3RhdGlvbi5zdGVwID0gXCIxMFwiO1xuICAgIHNsaWRlclJvdGF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRlbHRhID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgIHNsaWRlclJvdGF0aW9uVGV4dC50ZXh0Q29udGVudCA9IGRlbHRhO1xuXG4gICAgICB0aGlzLnNldFJvdGF0aW9uKCtkZWx0YSk7XG4gICAgfSk7XG5cbiAgICB0aGlyZERpdi5hcHBlbmQoc2xpZGVyUm90YXRpb25UaXRsZSwgc2xpZGVyUm90YXRpb24sIHNsaWRlclJvdGF0aW9uVGV4dCk7XG5cbiAgICAvKiBGb3VydGggRGl2ICovXG4gICAgY29uc3QgZm91cnRoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3VydGhEaXYuY2xhc3NOYW1lID0gXCJ0cmFuc2Zvcm1hdGlvbi1jb2xvclwiO1xuXG4gICAgY29uc3QgcG9pbnRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgIHBvaW50T3B0aW9uLmNsYXNzTmFtZSA9IFwiYnRuXCI7XG4gICAgcG9pbnRPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gK3BvaW50T3B0aW9uLnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICAgIHRoaXMuc2V0dXBDb2xvclNlbGVjdG9yKGluZGV4KTtcbiAgICB9KTtcblxuICAgIC8qIEZpcnN0IFBvaW50ICovXG4gICAgY29uc3QgZmlyc3RQb2ludE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgZmlyc3RQb2ludE9wdGlvbi52YWx1ZSA9IFwiMVwiO1xuICAgIGZpcnN0UG9pbnRPcHRpb24udGV4dCA9IFwicG9pbnRfMVwiO1xuXG4gICAgLyogU2Vjb25kIFBvaW50ICovXG4gICAgY29uc3Qgc2Vjb25kUG9pbnRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHNlY29uZFBvaW50T3B0aW9uLnZhbHVlID0gXCIyXCI7XG4gICAgc2Vjb25kUG9pbnRPcHRpb24udGV4dCA9IFwicG9pbnRfMlwiO1xuXG4gICAgcG9pbnRPcHRpb24uYXBwZW5kQ2hpbGQoZmlyc3RQb2ludE9wdGlvbik7XG4gICAgcG9pbnRPcHRpb24uYXBwZW5kQ2hpbGQoc2Vjb25kUG9pbnRPcHRpb24pO1xuXG4gICAgY29uc3QgaW5uZXJGb3VydGhEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlubmVyRm91cnRoRGl2LmlkID0gXCJjb2xvci1zZWxlY3RvclwiO1xuXG4gICAgZm91cnRoRGl2LmFwcGVuZChwb2ludE9wdGlvbiwgaW5uZXJGb3VydGhEaXYpO1xuXG4gICAgc2VsZWN0b3IuYXBwZW5kKGZpcnN0RGl2LCBzZWNvbmREaXYsIHRoaXJkRGl2LCBmb3VydGhEaXYpO1xuXG4gICAgdGhpcy5zZXR1cENvbG9yU2VsZWN0b3IoMSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGluZTtcbiIsImltcG9ydCBTaGFwZSBmcm9tIFwiT2JqZWN0cy9zaGFwZVwiO1xuaW1wb3J0IFBvbHlnb25JbnRlcmZhY2UgZnJvbSBcIk1haW4vSW50ZXJmYWNlcy9PYmplY3RzL3BvbHlnb24taW50ZXJmYWNlXCI7XG5pbXBvcnQgU2hhcGVUeXBlIGZyb20gXCJPYmplY3RzL3R5cGVzXCI7XG5pbXBvcnQgUG9pbnQgZnJvbSBcIk9wZXJhdGlvbnMvcG9pbnRcIjtcbmltcG9ydCBjb252ZXhIdWxsIGZyb20gXCJBbGdvcml0aG1zL2NvbnZleC1odWxsXCI7XG5pbXBvcnQge1xuICByZW5kZXJDYW52YXMsXG4gIHNldElzRHJhd2luZyxcbiAgc2V0UG9seWdvblJlZHJhd0luZGV4LFxuICBzZXRTaGFwZVR5cGUsXG59IGZyb20gXCJNYWluL2luZGV4XCI7XG5pbXBvcnQgeyBoZXhUb1JnYiwgcmdiVG9IZXggfSBmcm9tIFwiTWFpbi9VdGlscy90b29sc1wiO1xuXG5jbGFzcyBQb2x5Z29uIGV4dGVuZHMgU2hhcGUgaW1wbGVtZW50cyBQb2x5Z29uSW50ZXJmYWNlIHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFNoYXBlVHlwZS5QT0xZR09OO1xuICBwdWJsaWMgYXJyYXlPZlBvaW50OiBQb2ludFtdO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQsIGlkOiBudW1iZXIpIHtcbiAgICBzdXBlcihpZCk7XG5cbiAgICB0aGlzLnR5cGUgPSBTaGFwZVR5cGUuUE9MWUdPTjtcbiAgICB0aGlzLmFycmF5T2ZQb2ludCA9IG5ldyBBcnJheShwb2ludCk7XG4gIH1cblxuICBwdWJsaWMgZmluZENlbnRlcigpOiBQb2ludCB7XG4gICAgbGV0IHRvdGFsWCA9IDA7XG4gICAgbGV0IHRvdGFsWSA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IHAgb2YgdGhpcy5hcnJheU9mUG9pbnQpIHtcbiAgICAgIGNvbnN0IFtwWCwgcFldID0gcC5nZXRQYWlyKCk7XG5cbiAgICAgIHRvdGFsWCArPSBwWDtcbiAgICAgIHRvdGFsWSArPSBwWTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBvaW50KFtcbiAgICAgIHRvdGFsWCAvIHRoaXMuYXJyYXlPZlBvaW50Lmxlbmd0aCxcbiAgICAgIHRvdGFsWSAvIHRoaXMuYXJyYXlPZlBvaW50Lmxlbmd0aCxcbiAgICBdKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVQb2ludChwb2ludDogUG9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLmFycmF5T2ZQb2ludCA9IGNvbnZleEh1bGwoWy4uLnRoaXMuYXJyYXlPZlBvaW50LCBwb2ludF0pO1xuICB9XG5cbiAgcHVibGljIGFkZFBvc2l0aW9uKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpOiB2b2lkIHtcbiAgICBjb25zdCBwb3NpdGlvbkFycmF5OiBudW1iZXJbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBwIG9mIHRoaXMuYXJyYXlPZlBvaW50KSB7XG4gICAgICBwb3NpdGlvbkFycmF5LnB1c2goLi4ucC5nZXRQYWlyKCkpO1xuICAgIH1cblxuICAgIGNvbnN0IFtwSW5pdGlhbF0gPSB0aGlzLmFycmF5T2ZQb2ludDtcbiAgICBwb3NpdGlvbkFycmF5LnB1c2goLi4ucEluaXRpYWwuZ2V0UGFpcigpKTtcblxuICAgIGdsLmJ1ZmZlckRhdGEoXG4gICAgICBnbC5BUlJBWV9CVUZGRVIsXG4gICAgICBuZXcgRmxvYXQzMkFycmF5KHBvc2l0aW9uQXJyYXkpLFxuICAgICAgZ2wuU1RBVElDX0RSQVdcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGFkZENvbG9yKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpOiB2b2lkIHtcbiAgICBjb25zdCBjb2xvckFycmF5OiBudW1iZXJbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBwIG9mIHRoaXMuYXJyYXlPZlBvaW50KSB7XG4gICAgICBjb2xvckFycmF5LnB1c2goLi4ucC5nZXRDb2xvcigpKTtcbiAgICB9XG5cbiAgICBjb25zdCBbcEluaXRpYWxdID0gdGhpcy5hcnJheU9mUG9pbnQ7XG4gICAgY29sb3JBcnJheS5wdXNoKC4uLnBJbml0aWFsLmdldENvbG9yKCkpO1xuXG4gICAgZ2wuYnVmZmVyRGF0YShcbiAgICAgIGdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoY29sb3JBcnJheSksXG4gICAgICBnbC5TVEFUSUNfRFJBV1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZHJhd01ldGhvZChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pc1BvaW50Q29tcGxldGUoKSA/IGdsLlRSSUFOR0xFX0ZBTiA6IGdsLkxJTkVTO1xuICB9XG5cbiAgcHVibGljIGNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYXJyYXlPZlBvaW50Lmxlbmd0aCArIDE7XG4gIH1cblxuICBwdWJsaWMgaXNQb2ludENvbXBsZXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFycmF5T2ZQb2ludC5sZW5ndGggPj0gMjtcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlWChkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50eCA9IGRlbHRhO1xuXG4gICAgcmVuZGVyQ2FudmFzKCk7XG4gIH1cblxuICBwdWJsaWMgbW92ZVkoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudHkgPSAtZGVsdGE7XG5cbiAgICByZW5kZXJDYW52YXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMZW5ndGgoKTogbnVtYmVyIHtcbiAgICBsZXQgbWluaW11bVggPSBJbmZpbml0eTtcbiAgICBsZXQgbWF4aW11bVggPSAtSW5maW5pdHk7XG5cbiAgICBmb3IgKGNvbnN0IHAgb2YgdGhpcy5hcnJheU9mUG9pbnQpIHtcbiAgICAgIGNvbnN0IFtwWF0gPSBwLmdldFBhaXIoKTtcblxuICAgICAgaWYgKHBYIDwgbWluaW11bVgpIHtcbiAgICAgICAgbWluaW11bVggPSBwWDtcbiAgICAgIH1cblxuICAgICAgaWYgKHBYID4gbWF4aW11bVgpIHtcbiAgICAgICAgbWF4aW11bVggPSBwWDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF4aW11bVggLSBtaW5pbXVtWDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIGxldCBtaW5pbXVtWSA9IEluZmluaXR5O1xuICAgIGxldCBtYXhpbXVtWSA9IC1JbmZpbml0eTtcblxuICAgIGZvciAoY29uc3QgcCBvZiB0aGlzLmFycmF5T2ZQb2ludCkge1xuICAgICAgY29uc3QgWywgcFldID0gcC5nZXRQYWlyKCk7XG5cbiAgICAgIGlmIChwWSA8IG1pbmltdW1ZKSB7XG4gICAgICAgIG1pbmltdW1ZID0gcFk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwWSA+IG1heGltdW1ZKSB7XG4gICAgICAgIG1heGltdW1ZID0gcFk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heGltdW1ZIC0gbWluaW11bVk7XG4gIH1cblxuICBwdWJsaWMgc2V0TGVuZ3RoKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnN4ID0gMSArIGRlbHRhIC8gdGhpcy5nZXRMZW5ndGgoKTtcblxuICAgIHJlbmRlckNhbnZhcygpO1xuICB9XG5cbiAgcHVibGljIHNldFdpZHRoKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnN5ID0gMSArIGRlbHRhIC8gdGhpcy5nZXRXaWR0aCgpO1xuXG4gICAgcmVuZGVyQ2FudmFzKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0Um90YXRpb24oZGVncmVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmRlZ3JlZSA9IChkZWdyZWUgKiBNYXRoLlBJKSAvIDE4MDtcblxuICAgIHJlbmRlckNhbnZhcygpO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZVBvaW50KGluZGV4OiBudW1iZXIpIHtcbiAgICB2YXIgbmV3UG9pbnRzOiBQb2ludFtdID0gW3RoaXMuYXJyYXlPZlBvaW50W2luZGV4XV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFycmF5T2ZQb2ludC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgIT0gaW5kZXgpIHtcbiAgICAgICAgbmV3UG9pbnRzLnB1c2godGhpcy5hcnJheU9mUG9pbnRbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYXJyYXlPZlBvaW50ID0gbmV3UG9pbnRzLnNsaWNlKDEsIHRoaXMuYXJyYXlPZlBvaW50Lmxlbmd0aCk7XG5cbiAgICAvLyBhZnRlciBkZWxldGUsIG5lZWQgdG8gc2V0dXAgb3B0aW9uIGFnYWluXG4gICAgY29uc3QgcG9pbnRPcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvaW50LW9wdGlvblwiKTtcbiAgICBwb2ludE9wdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHBvaW50T3B0aW9uLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIC8qIEFsbCBQb2ludCAqL1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hcnJheU9mUG9pbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICBvcHRpb24udmFsdWUgPSBpLnRvU3RyaW5nKCk7XG4gICAgICBvcHRpb24udGV4dCA9IFwicG9pbnRfXCIgKyBpO1xuICAgICAgcG9pbnRPcHRpb24uYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0dXBDb2xvclNlbGVjdG9yKGluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCBjb2xvclNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xvci1zZWxlY3RvclwiKTtcbiAgICBjb2xvclNlbGVjdG9yLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY29sb3JTZWxlY3Rvci5yZXBsYWNlQ2hpbGRyZW4oKTtcblxuICAgIGNvbnN0IGNvbG9yVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgY29sb3JUaXRsZS50ZXh0Q29udGVudCA9IFwiU2VsZWN0IGNvbG9yXCI7XG5cbiAgICBjb25zdCBjb2xvcklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNvbG9ySW5wdXQuaWQgPSBcImNvbG9yLWlucHV0XCI7XG4gICAgY29sb3JJbnB1dC50eXBlID0gXCJjb2xvclwiO1xuXG4gICAgY29sb3JJbnB1dC52YWx1ZSA9IHJnYlRvSGV4KHRoaXMuYXJyYXlPZlBvaW50W2luZGV4XS5nZXRDb2xvcigpKTtcbiAgICBjb2xvcklucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBoZXggPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuXG4gICAgICB0aGlzLmFycmF5T2ZQb2ludFtpbmRleF0uc2V0Q29sb3IoaGV4VG9SZ2IoaGV4KSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBkZWxldGVQb2ludEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgZGVsZXRlUG9pbnRCdXR0b24udGV4dENvbnRlbnQgPSBcImRlbGV0ZSBwb2ludFwiO1xuICAgIGRlbGV0ZVBvaW50QnV0dG9uLmNsYXNzTmFtZSA9IFwiYnRuXCI7XG4gICAgZGVsZXRlUG9pbnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuZGVsZXRlUG9pbnQoaW5kZXgpO1xuICAgICAgcmVuZGVyQ2FudmFzKCk7XG4gICAgfSk7XG5cbiAgICBjb2xvclNlbGVjdG9yLmFwcGVuZChjb2xvclRpdGxlLCBjb2xvcklucHV0LCBkZWxldGVQb2ludEJ1dHRvbik7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBTZWxlY3RvcihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdG9yXCIpO1xuICAgIHNlbGVjdG9yLnJlcGxhY2VDaGlsZHJlbigpO1xuXG4gICAgLyogQWRkIFBvaW50IEJ1dHRvbiAqL1xuICAgIGNvbnN0IGFkZFBvaW50QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBhZGRQb2ludEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQWRkIE5ldyBQb2ludHNcIjtcbiAgICBhZGRQb2ludEJ1dHRvbi5jbGFzc05hbWUgPSBcImJ0blwiO1xuICAgIGFkZFBvaW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBzZXRJc0RyYXdpbmcodHJ1ZSk7XG4gICAgICBzZXRQb2x5Z29uUmVkcmF3SW5kZXgoaW5kZXgpO1xuICAgICAgc2V0U2hhcGVUeXBlKFNoYXBlVHlwZS5QT0xZR09OX1JFRFJBVyk7XG4gICAgfSk7XG5cbiAgICAvKiBGaXJzdCBEaXYgKi9cbiAgICBjb25zdCBmaXJzdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZmlyc3REaXYuY2xhc3NOYW1lID0gXCJ0cmFuc2Zvcm1hdGlvbi10cmFuc2xhdGlvblwiO1xuXG4gICAgLyogU2xpZGVyIFggKi9cbiAgICBjb25zdCBzbGlkZXJ4VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgc2xpZGVyeFRpdGxlLnRleHRDb250ZW50ID0gXCJTbGlkZXIgWFwiO1xuXG4gICAgY29uc3Qgc2xpZGVyWHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgc2xpZGVyWHRleHQudGV4dENvbnRlbnQgPSB0aGlzLnR4LnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCBzbGlkZXJYID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHNsaWRlclgudHlwZSA9IFwicmFuZ2VcIjtcbiAgICBzbGlkZXJYLm1pbiA9IFwiLTYwMFwiO1xuICAgIHNsaWRlclgubWF4ID0gXCI2MDBcIjtcbiAgICBzbGlkZXJYLnZhbHVlID0gdGhpcy50eC50b1N0cmluZygpO1xuICAgIHNsaWRlclguc3RlcCA9IFwiMTBcIjtcbiAgICBzbGlkZXJYLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRlbHRhID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgIHNsaWRlclh0ZXh0LnRleHRDb250ZW50ID0gZGVsdGE7XG5cbiAgICAgIHRoaXMubW92ZVgoK2RlbHRhKTtcbiAgICB9KTtcblxuICAgIC8qIFNsaWRlciBZICovXG4gICAgY29uc3Qgc2xpZGVyeVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNsaWRlcnlUaXRsZS50ZXh0Q29udGVudCA9IFwiU2xpZGVyIFlcIjtcblxuICAgIGNvbnN0IHNsaWRlcll0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHNsaWRlcll0ZXh0LnRleHRDb250ZW50ID0gKC10aGlzLnR5KS50b1N0cmluZygpO1xuXG4gICAgY29uc3Qgc2xpZGVyWSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBzbGlkZXJZLnR5cGUgPSBcInJhbmdlXCI7XG4gICAgc2xpZGVyWS5taW4gPSBcIi01MDBcIjtcbiAgICBzbGlkZXJZLm1heCA9IFwiNTAwXCI7XG4gICAgc2xpZGVyWS52YWx1ZSA9ICgtdGhpcy50eSkudG9TdHJpbmcoKTtcbiAgICBzbGlkZXJZLnN0ZXAgPSBcIjEwXCI7XG4gICAgc2xpZGVyWS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkZWx0YSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICBzbGlkZXJZdGV4dC50ZXh0Q29udGVudCA9IGRlbHRhO1xuXG4gICAgICB0aGlzLm1vdmVZKCtkZWx0YSk7XG4gICAgfSk7XG5cbiAgICBmaXJzdERpdi5hcHBlbmQoXG4gICAgICBzbGlkZXJ4VGl0bGUsXG4gICAgICBzbGlkZXJYLFxuICAgICAgc2xpZGVyWHRleHQsXG4gICAgICBzbGlkZXJ5VGl0bGUsXG4gICAgICBzbGlkZXJZLFxuICAgICAgc2xpZGVyWXRleHRcbiAgICApO1xuXG4gICAgLyogU2Vjb25kIERpdiAqL1xuICAgIGNvbnN0IHNlY29uZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2Vjb25kRGl2LmNsYXNzTmFtZSA9IFwidHJhbnNmb3JtYXRpb24tc2l6ZVwiO1xuXG4gICAgLyogU2xpZGVyIExlbmd0aCAqL1xuICAgIGNvbnN0IHNsaWRlckxlbmd0aFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNsaWRlckxlbmd0aFRpdGxlLnRleHRDb250ZW50ID0gXCJTbGlkZXIgTGVuZ3RoXCI7XG5cbiAgICBjb25zdCBzbGlkZXJMZW5ndGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHNsaWRlckxlbmd0aFRleHQudGV4dENvbnRlbnQgPSAoXG4gICAgICAodGhpcy5zeCAtIDEpICpcbiAgICAgIHRoaXMuZ2V0TGVuZ3RoKClcbiAgICApLnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCBzbGlkZXJMZW5ndGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgc2xpZGVyTGVuZ3RoLnR5cGUgPSBcInJhbmdlXCI7XG4gICAgc2xpZGVyTGVuZ3RoLm1pbiA9IFwiMFwiO1xuICAgIHNsaWRlckxlbmd0aC5tYXggPSBcIjUwMFwiO1xuICAgIHNsaWRlckxlbmd0aC52YWx1ZSA9ICgodGhpcy5zeCAtIDEpICogdGhpcy5nZXRMZW5ndGgoKSkudG9TdHJpbmcoKTtcbiAgICBzbGlkZXJMZW5ndGguc3RlcCA9IFwiMTBcIjtcbiAgICBzbGlkZXJMZW5ndGguYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgZGVsdGEgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgc2xpZGVyTGVuZ3RoVGV4dC50ZXh0Q29udGVudCA9IGRlbHRhO1xuXG4gICAgICB0aGlzLnNldExlbmd0aCgrZGVsdGEpO1xuICAgIH0pO1xuXG4gICAgLyogU2xpZGVyIFdpZHRoICovXG4gICAgY29uc3Qgc2xpZGVyV2lkdGhUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBzbGlkZXJXaWR0aFRpdGxlLnRleHRDb250ZW50ID0gXCJTbGlkZXIgV2lkdGhcIjtcblxuICAgIGNvbnN0IHNsaWRlcldpZHRoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBzbGlkZXJXaWR0aFRleHQudGV4dENvbnRlbnQgPSAoKHRoaXMuc3kgLSAxKSAqIHRoaXMuZ2V0V2lkdGgoKSkudG9TdHJpbmcoKTtcblxuICAgIGNvbnN0IHNsaWRlcldpZHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHNsaWRlcldpZHRoLnR5cGUgPSBcInJhbmdlXCI7XG4gICAgc2xpZGVyV2lkdGgubWluID0gXCIwXCI7XG4gICAgc2xpZGVyV2lkdGgubWF4ID0gXCI1MDBcIjtcbiAgICBzbGlkZXJXaWR0aC52YWx1ZSA9ICgodGhpcy5zeSAtIDEpICogdGhpcy5nZXRXaWR0aCgpKS50b1N0cmluZygpO1xuICAgIHNsaWRlcldpZHRoLnN0ZXAgPSBcIjEwXCI7XG4gICAgc2xpZGVyV2lkdGguYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgZGVsdGEgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgc2xpZGVyV2lkdGhUZXh0LnRleHRDb250ZW50ID0gZGVsdGE7XG5cbiAgICAgIHRoaXMuc2V0V2lkdGgoK2RlbHRhKTtcbiAgICB9KTtcblxuICAgIHNlY29uZERpdi5hcHBlbmQoXG4gICAgICBzbGlkZXJMZW5ndGhUaXRsZSxcbiAgICAgIHNsaWRlckxlbmd0aCxcbiAgICAgIHNsaWRlckxlbmd0aFRleHQsXG4gICAgICBzbGlkZXJXaWR0aFRpdGxlLFxuICAgICAgc2xpZGVyV2lkdGgsXG4gICAgICBzbGlkZXJXaWR0aFRleHRcbiAgICApO1xuXG4gICAgLyogVGhpcmQgRGl2ICovXG4gICAgY29uc3QgdGhpcmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXJkRGl2LmNsYXNzTmFtZSA9IFwidHJhbnNmb3JtYXRpb24tcm90YXRpb25cIjtcblxuICAgIC8qIFNsaWRlciBSb3RhdGlvbiAqL1xuICAgIGNvbnN0IHNsaWRlclJvdGF0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgc2xpZGVyUm90YXRpb25UaXRsZS50ZXh0Q29udGVudCA9IFwiU2xpZGVyIFJvdGF0aW9uXCI7XG5cbiAgICBjb25zdCBzbGlkZXJSb3RhdGlvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgc2xpZGVyUm90YXRpb25UZXh0LnRleHRDb250ZW50ID0gKCgxODAgKiB0aGlzLmRlZ3JlZSkgLyBNYXRoLlBJKS50b1N0cmluZygpO1xuXG4gICAgY29uc3Qgc2xpZGVyUm90YXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgc2xpZGVyUm90YXRpb24udHlwZSA9IFwicmFuZ2VcIjtcbiAgICBzbGlkZXJSb3RhdGlvbi5taW4gPSBcIjBcIjtcbiAgICBzbGlkZXJSb3RhdGlvbi5tYXggPSBcIjM2MFwiO1xuICAgIHNsaWRlclJvdGF0aW9uLnZhbHVlID0gKCgxODAgKiB0aGlzLmRlZ3JlZSkgLyBNYXRoLlBJKS50b1N0cmluZygpO1xuICAgIHNsaWRlclJvdGF0aW9uLnN0ZXAgPSBcIjEwXCI7XG4gICAgc2xpZGVyUm90YXRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgZGVsdGEgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgc2xpZGVyUm90YXRpb25UZXh0LnRleHRDb250ZW50ID0gZGVsdGE7XG5cbiAgICAgIHRoaXMuc2V0Um90YXRpb24oK2RlbHRhKTtcbiAgICB9KTtcblxuICAgIHRoaXJkRGl2LmFwcGVuZChzbGlkZXJSb3RhdGlvblRpdGxlLCBzbGlkZXJSb3RhdGlvbiwgc2xpZGVyUm90YXRpb25UZXh0KTtcblxuICAgIC8qIEZvdXJ0aCBEaXYgKi9cbiAgICBjb25zdCBmb3VydGhEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvdXJ0aERpdi5jbGFzc05hbWUgPSBcInRyYW5zZm9ybWF0aW9uLWNvbG9yXCI7XG5cbiAgICBjb25zdCBwb2ludE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgcG9pbnRPcHRpb24uaWQgPSBcInBvaW50LW9wdGlvblwiO1xuICAgIHBvaW50T3B0aW9uLmNsYXNzTmFtZSA9IFwiYnRuXCI7XG4gICAgcG9pbnRPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gK3BvaW50T3B0aW9uLnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICAgIHZhciBwb2ludDogUG9pbnQgPSBudWxsO1xuICAgICAgdGhpcy5zZXR1cENvbG9yU2VsZWN0b3IoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLyogQWxsIFBvaW50ICovXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFycmF5T2ZQb2ludC5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IGkudG9TdHJpbmcoKTtcbiAgICAgIG9wdGlvbi50ZXh0ID0gXCJwb2ludF9cIiArIGk7XG4gICAgICBwb2ludE9wdGlvbi5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgIH1cblxuICAgIGNvbnN0IGlubmVyRm91cnRoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpbm5lckZvdXJ0aERpdi5pZCA9IFwiY29sb3Itc2VsZWN0b3JcIjtcblxuICAgIGZvdXJ0aERpdi5hcHBlbmQocG9pbnRPcHRpb24sIGlubmVyRm91cnRoRGl2KTtcblxuICAgIHNlbGVjdG9yLmFwcGVuZChhZGRQb2ludEJ1dHRvbiwgZmlyc3REaXYsIHNlY29uZERpdiwgdGhpcmREaXYsIGZvdXJ0aERpdik7XG5cbiAgICB0aGlzLnNldHVwQ29sb3JTZWxlY3RvcigwKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2x5Z29uO1xuIiwiaW1wb3J0IFNoYXBlIGZyb20gXCJPYmplY3RzL3NoYXBlXCI7XG5pbXBvcnQgUmVjdGFuZ2xlSW50ZXJmYWNlIGZyb20gXCJNYWluL0ludGVyZmFjZXMvT2JqZWN0cy9yZWN0YW5nbGUtaW50ZXJmYWNlXCI7XG5pbXBvcnQgU2hhcGVUeXBlIGZyb20gXCJPYmplY3RzL3R5cGVzXCI7XG5pbXBvcnQgUG9pbnQgZnJvbSBcIk9wZXJhdGlvbnMvcG9pbnRcIjtcbmltcG9ydCB7IHJlbmRlckNhbnZhcyB9IGZyb20gXCJNYWluL2luZGV4XCI7XG5pbXBvcnQgeyBoZXhUb1JnYiwgcmdiVG9IZXggfSBmcm9tIFwiTWFpbi9VdGlscy90b29sc1wiO1xuXG5jbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBTaGFwZSBpbXBsZW1lbnRzIFJlY3RhbmdsZUludGVyZmFjZSB7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlOiBTaGFwZVR5cGUuUkVDVEFOR0xFO1xuICBwdWJsaWMgcDE6IFBvaW50O1xuICBwdWJsaWMgcDI6IFBvaW50O1xuICBwdWJsaWMgcDM6IFBvaW50O1xuICBwdWJsaWMgcDQ6IFBvaW50O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQsIGlkOiBudW1iZXIpIHtcbiAgICBzdXBlcihpZCk7XG5cbiAgICB0aGlzLnR5cGUgPSBTaGFwZVR5cGUuUkVDVEFOR0xFO1xuICAgIHRoaXMucDEgPSBwb2ludDtcbiAgICB0aGlzLnAyID0gbnVsbDtcbiAgICB0aGlzLnAzID0gbnVsbDtcbiAgICB0aGlzLnAzID0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kQ2VudGVyKCk6IFBvaW50IHtcbiAgICBjb25zdCBbcDF4LCBwMXldID0gdGhpcy5wMS5nZXRQYWlyKCk7XG4gICAgY29uc3QgW3AyeCwgcDJ5XSA9IHRoaXMucDIuZ2V0UGFpcigpO1xuICAgIGNvbnN0IFtwM3gsIHAzeV0gPSB0aGlzLnAzLmdldFBhaXIoKTtcbiAgICBjb25zdCBbcDR4LCBwNHldID0gdGhpcy5wNC5nZXRQYWlyKCk7XG5cbiAgICByZXR1cm4gbmV3IFBvaW50KFtcbiAgICAgIChwMXggKyBwMnggKyBwM3ggKyBwNHgpIC8gNCxcbiAgICAgIChwMXkgKyBwMnkgKyBwM3kgKyBwNHkpIC8gNCxcbiAgICBdKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVQb2ludChwOiBQb2ludCk6IHZvaWQge1xuICAgIGNvbnN0IFtwMiwgcDRdID0gdGhpcy5nZXRTeW1tZXRyaWNhbFJlY3RhbmdsZVBvaW50KHApO1xuXG4gICAgLy8gcDEgLS0tLT4gcDJcbiAgICAvLyDihpEgICAgICAgIOKGk1xuICAgIC8vIHA0IDwtLS0tIHAzXG4gICAgdGhpcy5wMiA9IHAyO1xuICAgIHRoaXMucDMgPSBwO1xuICAgIHRoaXMucDQgPSBwNDtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQb3NpdGlvbihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KTogdm9pZCB7XG4gICAgZ2wuYnVmZmVyRGF0YShcbiAgICAgIGdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAuLi50aGlzLnAxLmdldFBhaXIoKSxcbiAgICAgICAgLi4udGhpcy5wMi5nZXRQYWlyKCksXG4gICAgICAgIC4uLnRoaXMucDMuZ2V0UGFpcigpLFxuICAgICAgICAuLi50aGlzLnA0LmdldFBhaXIoKSxcbiAgICAgICAgLi4udGhpcy5wMS5nZXRQYWlyKCksXG4gICAgICBdKSxcbiAgICAgIGdsLlNUQVRJQ19EUkFXXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDb2xvcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KTogdm9pZCB7XG4gICAgZ2wuYnVmZmVyRGF0YShcbiAgICAgIGdsLkFSUkFZX0JVRkZFUixcbiAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAuLi50aGlzLnAxLmdldENvbG9yKCksXG4gICAgICAgIC4uLnRoaXMucDIuZ2V0Q29sb3IoKSxcbiAgICAgICAgLi4udGhpcy5wMy5nZXRDb2xvcigpLFxuICAgICAgICAuLi50aGlzLnA0LmdldENvbG9yKCksXG4gICAgICAgIC4uLnRoaXMucDEuZ2V0Q29sb3IoKSxcbiAgICAgIF0pLFxuICAgICAgZ2wuU1RBVElDX0RSQVdcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGRyYXdNZXRob2QoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGdsLlRSSUFOR0xFX0ZBTjtcbiAgfVxuXG4gIHB1YmxpYyBjb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiA1O1xuICB9XG5cbiAgcHVibGljIGlzUG9pbnRDb21wbGV0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wMyAhPSBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldFN5bW1ldHJpY2FsUmVjdGFuZ2xlUG9pbnQocG9pbnQ6IFBvaW50KTogW1BvaW50LCBQb2ludF0ge1xuICAgIGNvbnN0IFthLCBiXSA9IHRoaXMucDEuZ2V0UGFpcigpO1xuICAgIGNvbnN0IFtjLCBkXSA9IHBvaW50LmdldFBhaXIoKTtcblxuICAgIGNvbnN0IHBvaW50MSA9IG5ldyBQb2ludChbYSwgZF0pO1xuICAgIGNvbnN0IHBvaW50MiA9IG5ldyBQb2ludChbYywgYl0pO1xuXG4gICAgcmV0dXJuIFtwb2ludDEsIHBvaW50Ml07XG4gIH1cblxuICBwdWJsaWMgbW92ZVgoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudHggPSBkZWx0YTtcblxuICAgIHJlbmRlckNhbnZhcygpO1xuICB9XG5cbiAgcHVibGljIG1vdmVZKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnR5ID0gLWRlbHRhO1xuXG4gICAgcmVuZGVyQ2FudmFzKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGVuZ3RoKCk6IG51bWJlciB7XG4gICAgY29uc3QgW3AxeCwgcDF5XSA9IHRoaXMucDEuZ2V0UGFpcigpO1xuICAgIGNvbnN0IFtwMngsIHAyeV0gPSB0aGlzLnAyLmdldFBhaXIoKTtcblxuICAgIHJldHVybiBNYXRoLnNxcnQoKHAyeCAtIHAxeCkgKiogMiArIChwMnkgLSBwMXkpICoqIDIpO1xuICB9XG5cbiAgcHVibGljIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgY29uc3QgW3AxeCwgcDF5XSA9IHRoaXMucDEuZ2V0UGFpcigpO1xuICAgIGNvbnN0IFtwNHgsIHA0eV0gPSB0aGlzLnA0LmdldFBhaXIoKTtcblxuICAgIHJldHVybiBNYXRoLnNxcnQoKHA0eCAtIHAxeCkgKiogMiArIChwNHkgLSBwMXkpICoqIDIpO1xuICB9XG5cbiAgcHVibGljIHNldExlbmd0aChkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zeCA9IDEgKyBkZWx0YSAvIHRoaXMuZ2V0TGVuZ3RoKCk7XG5cbiAgICByZW5kZXJDYW52YXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRXaWR0aChkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zeSA9IDEgKyBkZWx0YSAvIHRoaXMuZ2V0V2lkdGgoKTtcblxuICAgIHJlbmRlckNhbnZhcygpO1xuICB9XG5cbiAgcHVibGljIHNldFJvdGF0aW9uKGRlZ3JlZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5kZWdyZWUgPSAoZGVncmVlICogTWF0aC5QSSkgLyAxODA7XG5cbiAgICByZW5kZXJDYW52YXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cENvbG9yU2VsZWN0b3IoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGNvbG9yU2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbG9yLXNlbGVjdG9yXCIpO1xuICAgIGNvbG9yU2VsZWN0b3IuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjb2xvclNlbGVjdG9yLnJlcGxhY2VDaGlsZHJlbigpO1xuXG4gICAgY29uc3QgY29sb3JUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBjb2xvclRpdGxlLnRleHRDb250ZW50ID0gXCJTZWxlY3QgY29sb3JcIjtcblxuICAgIGNvbnN0IGNvbG9ySW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY29sb3JJbnB1dC5pZCA9IFwiY29sb3ItaW5wdXRcIjtcbiAgICBjb2xvcklucHV0LnR5cGUgPSBcImNvbG9yXCI7XG5cbiAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGNvbG9ySW5wdXQudmFsdWUgPSByZ2JUb0hleCh0aGlzLnAxLmdldENvbG9yKCkpO1xuICAgICAgICBjb2xvcklucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgaGV4ID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcblxuICAgICAgICAgIHRoaXMucDEuc2V0Q29sb3IoaGV4VG9SZ2IoaGV4KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAyOlxuICAgICAgICBjb2xvcklucHV0LnZhbHVlID0gcmdiVG9IZXgodGhpcy5wMi5nZXRDb2xvcigpKTtcbiAgICAgICAgY29sb3JJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhleCA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG5cbiAgICAgICAgICB0aGlzLnAyLnNldENvbG9yKGhleFRvUmdiKGhleCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzpcbiAgICAgICAgY29sb3JJbnB1dC52YWx1ZSA9IHJnYlRvSGV4KHRoaXMucDMuZ2V0Q29sb3IoKSk7XG4gICAgICAgIGNvbG9ySW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBoZXggPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuXG4gICAgICAgICAgdGhpcy5wMy5zZXRDb2xvcihoZXhUb1JnYihoZXgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGNvbG9ySW5wdXQudmFsdWUgPSByZ2JUb0hleCh0aGlzLnA0LmdldENvbG9yKCkpO1xuICAgICAgICBjb2xvcklucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgaGV4ID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcblxuICAgICAgICAgIHRoaXMucDQuc2V0Q29sb3IoaGV4VG9SZ2IoaGV4KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb2xvclNlbGVjdG9yLmFwcGVuZChjb2xvclRpdGxlLCBjb2xvcklucHV0KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cFNlbGVjdG9yKCk6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3RvclwiKTtcbiAgICBzZWxlY3Rvci5yZXBsYWNlQ2hpbGRyZW4oKTtcblxuICAgIC8qIEZpcnN0IERpdiAqL1xuICAgIGNvbnN0IGZpcnN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmaXJzdERpdi5jbGFzc05hbWUgPSBcInRyYW5zZm9ybWF0aW9uLXRyYW5zbGF0aW9uXCI7XG5cbiAgICAvKiBTbGlkZXIgWCAqL1xuICAgIGNvbnN0IHNsaWRlcnhUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBzbGlkZXJ4VGl0bGUudGV4dENvbnRlbnQgPSBcIlNsaWRlciBYXCI7XG5cbiAgICBjb25zdCBzbGlkZXJYdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBzbGlkZXJYdGV4dC50ZXh0Q29udGVudCA9IHRoaXMudHgudG9TdHJpbmcoKTtcblxuICAgIGNvbnN0IHNsaWRlclggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgc2xpZGVyWC50eXBlID0gXCJyYW5nZVwiO1xuICAgIHNsaWRlclgubWluID0gXCItNjAwXCI7XG4gICAgc2xpZGVyWC5tYXggPSBcIjYwMFwiO1xuICAgIHNsaWRlclgudmFsdWUgPSB0aGlzLnR4LnRvU3RyaW5nKCk7XG4gICAgc2xpZGVyWC5zdGVwID0gXCIxMFwiO1xuICAgIHNsaWRlclguYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgZGVsdGEgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgc2xpZGVyWHRleHQudGV4dENvbnRlbnQgPSBkZWx0YTtcblxuICAgICAgdGhpcy5tb3ZlWCgrZGVsdGEpO1xuICAgIH0pO1xuXG4gICAgLyogU2xpZGVyIFkgKi9cbiAgICBjb25zdCBzbGlkZXJ5VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgc2xpZGVyeVRpdGxlLnRleHRDb250ZW50ID0gXCJTbGlkZXIgWVwiO1xuXG4gICAgY29uc3Qgc2xpZGVyWXRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgc2xpZGVyWXRleHQudGV4dENvbnRlbnQgPSAoLXRoaXMudHkpLnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCBzbGlkZXJZID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHNsaWRlclkudHlwZSA9IFwicmFuZ2VcIjtcbiAgICBzbGlkZXJZLm1pbiA9IFwiLTUwMFwiO1xuICAgIHNsaWRlclkubWF4ID0gXCI1MDBcIjtcbiAgICBzbGlkZXJZLnZhbHVlID0gKC10aGlzLnR5KS50b1N0cmluZygpO1xuICAgIHNsaWRlclkuc3RlcCA9IFwiMTBcIjtcbiAgICBzbGlkZXJZLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRlbHRhID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgIHNsaWRlcll0ZXh0LnRleHRDb250ZW50ID0gZGVsdGE7XG5cbiAgICAgIHRoaXMubW92ZVkoK2RlbHRhKTtcbiAgICB9KTtcblxuICAgIGZpcnN0RGl2LmFwcGVuZChcbiAgICAgIHNsaWRlcnhUaXRsZSxcbiAgICAgIHNsaWRlclgsXG4gICAgICBzbGlkZXJYdGV4dCxcbiAgICAgIHNsaWRlcnlUaXRsZSxcbiAgICAgIHNsaWRlclksXG4gICAgICBzbGlkZXJZdGV4dFxuICAgICk7XG5cbiAgICAvKiBTZWNvbmQgRGl2ICovXG4gICAgY29uc3Qgc2Vjb25kRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzZWNvbmREaXYuY2xhc3NOYW1lID0gXCJ0cmFuc2Zvcm1hdGlvbi1zaXplXCI7XG5cbiAgICAvKiBTbGlkZXIgTGVuZ3RoICovXG4gICAgY29uc3Qgc2xpZGVyTGVuZ3RoVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgc2xpZGVyTGVuZ3RoVGl0bGUudGV4dENvbnRlbnQgPSBcIlNsaWRlciBMZW5ndGhcIjtcblxuICAgIGNvbnN0IHNsaWRlckxlbmd0aFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgc2xpZGVyTGVuZ3RoVGV4dC50ZXh0Q29udGVudCA9IChcbiAgICAgICh0aGlzLnN4IC0gMSkgKlxuICAgICAgdGhpcy5nZXRMZW5ndGgoKVxuICAgICkudG9TdHJpbmcoKTtcblxuICAgIGNvbnN0IHNsaWRlckxlbmd0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBzbGlkZXJMZW5ndGgudHlwZSA9IFwicmFuZ2VcIjtcbiAgICBzbGlkZXJMZW5ndGgubWluID0gXCIwXCI7XG4gICAgc2xpZGVyTGVuZ3RoLm1heCA9IFwiNTAwXCI7XG4gICAgc2xpZGVyTGVuZ3RoLnZhbHVlID0gKCh0aGlzLnN4IC0gMSkgKiB0aGlzLmdldExlbmd0aCgpKS50b1N0cmluZygpO1xuICAgIHNsaWRlckxlbmd0aC5zdGVwID0gXCIxMFwiO1xuICAgIHNsaWRlckxlbmd0aC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkZWx0YSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICBzbGlkZXJMZW5ndGhUZXh0LnRleHRDb250ZW50ID0gZGVsdGE7XG5cbiAgICAgIHRoaXMuc2V0TGVuZ3RoKCtkZWx0YSk7XG4gICAgfSk7XG5cbiAgICAvKiBTbGlkZXIgV2lkdGggKi9cbiAgICBjb25zdCBzbGlkZXJXaWR0aFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNsaWRlcldpZHRoVGl0bGUudGV4dENvbnRlbnQgPSBcIlNsaWRlciBXaWR0aFwiO1xuXG4gICAgY29uc3Qgc2xpZGVyV2lkdGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHNsaWRlcldpZHRoVGV4dC50ZXh0Q29udGVudCA9ICgodGhpcy5zeSAtIDEpICogdGhpcy5nZXRXaWR0aCgpKS50b1N0cmluZygpO1xuXG4gICAgY29uc3Qgc2xpZGVyV2lkdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgc2xpZGVyV2lkdGgudHlwZSA9IFwicmFuZ2VcIjtcbiAgICBzbGlkZXJXaWR0aC5taW4gPSBcIjBcIjtcbiAgICBzbGlkZXJXaWR0aC5tYXggPSBcIjUwMFwiO1xuICAgIHNsaWRlcldpZHRoLnZhbHVlID0gKCh0aGlzLnN5IC0gMSkgKiB0aGlzLmdldFdpZHRoKCkpLnRvU3RyaW5nKCk7XG4gICAgc2xpZGVyV2lkdGguc3RlcCA9IFwiMTBcIjtcbiAgICBzbGlkZXJXaWR0aC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkZWx0YSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICBzbGlkZXJXaWR0aFRleHQudGV4dENvbnRlbnQgPSBkZWx0YTtcblxuICAgICAgdGhpcy5zZXRXaWR0aCgrZGVsdGEpO1xuICAgIH0pO1xuXG4gICAgc2Vjb25kRGl2LmFwcGVuZChcbiAgICAgIHNsaWRlckxlbmd0aFRpdGxlLFxuICAgICAgc2xpZGVyTGVuZ3RoLFxuICAgICAgc2xpZGVyTGVuZ3RoVGV4dCxcbiAgICAgIHNsaWRlcldpZHRoVGl0bGUsXG4gICAgICBzbGlkZXJXaWR0aCxcbiAgICAgIHNsaWRlcldpZHRoVGV4dFxuICAgICk7XG5cbiAgICAvKiBUaGlyZCBEaXYgKi9cbiAgICBjb25zdCB0aGlyZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcmREaXYuY2xhc3NOYW1lID0gXCJ0cmFuc2Zvcm1hdGlvbi1yb3RhdGlvblwiO1xuXG4gICAgLyogU2xpZGVyIFJvdGF0aW9uICovXG4gICAgY29uc3Qgc2xpZGVyUm90YXRpb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBzbGlkZXJSb3RhdGlvblRpdGxlLnRleHRDb250ZW50ID0gXCJTbGlkZXIgUm90YXRpb25cIjtcblxuICAgIGNvbnN0IHNsaWRlclJvdGF0aW9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBzbGlkZXJSb3RhdGlvblRleHQudGV4dENvbnRlbnQgPSAoKDE4MCAqIHRoaXMuZGVncmVlKSAvIE1hdGguUEkpLnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCBzbGlkZXJSb3RhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBzbGlkZXJSb3RhdGlvbi50eXBlID0gXCJyYW5nZVwiO1xuICAgIHNsaWRlclJvdGF0aW9uLm1pbiA9IFwiMFwiO1xuICAgIHNsaWRlclJvdGF0aW9uLm1heCA9IFwiMzYwXCI7XG4gICAgc2xpZGVyUm90YXRpb24udmFsdWUgPSAoKDE4MCAqIHRoaXMuZGVncmVlKSAvIE1hdGguUEkpLnRvU3RyaW5nKCk7XG4gICAgc2xpZGVyUm90YXRpb24uc3RlcCA9IFwiMTBcIjtcbiAgICBzbGlkZXJSb3RhdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkZWx0YSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICBzbGlkZXJSb3RhdGlvblRleHQudGV4dENvbnRlbnQgPSBkZWx0YTtcblxuICAgICAgdGhpcy5zZXRSb3RhdGlvbigrZGVsdGEpO1xuICAgIH0pO1xuXG4gICAgdGhpcmREaXYuYXBwZW5kKHNsaWRlclJvdGF0aW9uVGl0bGUsIHNsaWRlclJvdGF0aW9uLCBzbGlkZXJSb3RhdGlvblRleHQpO1xuXG4gICAgLyogRm91cnRoIERpdiAqL1xuICAgIGNvbnN0IGZvdXJ0aERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm91cnRoRGl2LmNsYXNzTmFtZSA9IFwidHJhbnNmb3JtYXRpb24tY29sb3JcIjtcblxuICAgIGNvbnN0IHBvaW50T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICBwb2ludE9wdGlvbi5jbGFzc05hbWUgPSBcImJ0blwiO1xuICAgIHBvaW50T3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9ICtwb2ludE9wdGlvbi5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XG4gICAgICB2YXIgcG9pbnQ6IFBvaW50ID0gbnVsbDtcbiAgICAgIHRoaXMuc2V0dXBDb2xvclNlbGVjdG9yKGluZGV4KTtcbiAgICB9KTtcblxuICAgIC8qIEZpcnN0IFBvaW50ICovXG4gICAgY29uc3QgZmlyc3RQb2ludE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgZmlyc3RQb2ludE9wdGlvbi52YWx1ZSA9IFwiMVwiO1xuICAgIGZpcnN0UG9pbnRPcHRpb24udGV4dCA9IFwicG9pbnRfMVwiO1xuXG4gICAgLyogU2Vjb25kIFBvaW50ICovXG4gICAgY29uc3Qgc2Vjb25kUG9pbnRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHNlY29uZFBvaW50T3B0aW9uLnZhbHVlID0gXCIyXCI7XG4gICAgc2Vjb25kUG9pbnRPcHRpb24udGV4dCA9IFwicG9pbnRfMlwiO1xuXG4gICAgY29uc3QgdGhpcmRQb2ludE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgdGhpcmRQb2ludE9wdGlvbi52YWx1ZSA9IFwiM1wiO1xuICAgIHRoaXJkUG9pbnRPcHRpb24udGV4dCA9IFwicG9pbnRfM1wiO1xuXG4gICAgY29uc3QgZm91cnRoUG9pbnRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIGZvdXJ0aFBvaW50T3B0aW9uLnZhbHVlID0gXCI0XCI7XG4gICAgZm91cnRoUG9pbnRPcHRpb24udGV4dCA9IFwicG9pbnRfNFwiO1xuXG4gICAgcG9pbnRPcHRpb24uYXBwZW5kQ2hpbGQoZmlyc3RQb2ludE9wdGlvbik7XG4gICAgcG9pbnRPcHRpb24uYXBwZW5kQ2hpbGQoc2Vjb25kUG9pbnRPcHRpb24pO1xuICAgIHBvaW50T3B0aW9uLmFwcGVuZENoaWxkKHRoaXJkUG9pbnRPcHRpb24pO1xuICAgIHBvaW50T3B0aW9uLmFwcGVuZENoaWxkKGZvdXJ0aFBvaW50T3B0aW9uKTtcblxuICAgIGNvbnN0IGlubmVyRm91cnRoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpbm5lckZvdXJ0aERpdi5pZCA9IFwiY29sb3Itc2VsZWN0b3JcIjtcblxuICAgIGZvdXJ0aERpdi5hcHBlbmQocG9pbnRPcHRpb24sIGlubmVyRm91cnRoRGl2KTtcblxuICAgIHNlbGVjdG9yLmFwcGVuZChmaXJzdERpdiwgc2Vjb25kRGl2LCB0aGlyZERpdiwgZm91cnRoRGl2KTtcblxuICAgIHRoaXMuc2V0dXBDb2xvclNlbGVjdG9yKDEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlY3RhbmdsZTtcbiIsImltcG9ydCBTaGFwZUludGVyZmFjZSBmcm9tIFwiTWFpbi9JbnRlcmZhY2VzL09iamVjdHMvc2hhcGUtaW50ZXJmYWNlXCI7XG5pbXBvcnQgU2hhcGVUeXBlIGZyb20gXCJPYmplY3RzL3R5cGVzXCI7XG5pbXBvcnQgUG9pbnQgZnJvbSBcIk9wZXJhdGlvbnMvcG9pbnRcIjtcbmltcG9ydCBUcmFuc2Zvcm1hdGlvbiBmcm9tIFwiT3BlcmF0aW9ucy90cmFuc2Zvcm1hdGlvblwiO1xuXG5hYnN0cmFjdCBjbGFzcyBTaGFwZSBpbXBsZW1lbnRzIFNoYXBlSW50ZXJmYWNlIHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFNoYXBlVHlwZTtcbiAgcHVibGljIHR4OiBudW1iZXI7XG4gIHB1YmxpYyB0eTogbnVtYmVyO1xuICBwdWJsaWMgZGVncmVlOiBudW1iZXI7XG4gIHB1YmxpYyBzeDogbnVtYmVyO1xuICBwdWJsaWMgc3k6IG51bWJlcjtcbiAgcHVibGljIGt4OiBudW1iZXI7XG4gIHB1YmxpYyBreTogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgaWQ6IG51bWJlcikge1xuICAgIHRoaXMudHggPSAwO1xuICAgIHRoaXMudHkgPSAwO1xuICAgIHRoaXMuZGVncmVlID0gMDtcbiAgICB0aGlzLnN4ID0gMTtcbiAgICB0aGlzLnN5ID0gMTtcbiAgICB0aGlzLmt4ID0gMDtcbiAgICB0aGlzLmt5ID0gMDtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBmaW5kQ2VudGVyKCk6IFBvaW50O1xuICBwdWJsaWMgYWJzdHJhY3QgYWRkUG9zaXRpb24oZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCk6IHZvaWQ7XG4gIHB1YmxpYyBhYnN0cmFjdCBhZGRDb2xvcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KTogdm9pZDtcbiAgcHVibGljIGFic3RyYWN0IGRyYXdNZXRob2QoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCk6IG51bWJlcjtcbiAgcHVibGljIGFic3RyYWN0IGNvdW50KCk6IG51bWJlcjtcbiAgcHVibGljIGFic3RyYWN0IGlzUG9pbnRDb21wbGV0ZSgpOiBib29sZWFuO1xuICBwdWJsaWMgYWJzdHJhY3Qgc2V0dXBTZWxlY3RvcihpbmRleD86IG51bWJlcik6IHZvaWQ7XG4gIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGVQb2ludChwb2ludDogUG9pbnQpOiB2b2lkO1xuXG4gIHB1YmxpYyBnZXRUeXBlKCk6IFNoYXBlVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cE9wdGlvbihpc0ZpcnN0RHJhd2luZzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gdGhpcy5pZC50b1N0cmluZygpO1xuICAgIG9wdGlvbi50ZXh0ID0gYCR7dGhpcy50eXBlfV8ke3RoaXMuaWR9YDtcblxuICAgIGlmIChpc0ZpcnN0RHJhd2luZykge1xuICAgICAgY29uc3QgbGlzdE9mU2hhcGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgIFwibGlzdC1vZi1zaGFwZXNcIlxuICAgICAgKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICAgIGxpc3RPZlNoYXBlcy5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgbGlzdE9mU2hhcGVzLnZhbHVlID0gdGhpcy5pZC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0dXBTZWxlY3RvcigpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlcihcbiAgICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICAgIHByb2dyYW06IFdlYkdMUHJvZ3JhbSxcbiAgICBwb3NpdGlvbkJ1ZmZlcjogV2ViR0xCdWZmZXIsXG4gICAgY29sb3JCdWZmZXI6IFdlYkdMQnVmZmVyXG4gICk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1BvaW50Q29tcGxldGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBvc2l0aW9uTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBcImFfcG9zaXRpb25cIik7XG4gICAgY29uc3QgY29sb3JMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIFwiYV9jb2xvclwiKTtcbiAgICBjb25zdCBtYXRyaXhMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInVfbWF0cml4XCIpO1xuXG4gICAgLyogU2V0dXAgcG9zaXRpb24gKi9cbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbkxvY2F0aW9uKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgcG9zaXRpb25CdWZmZXIpO1xuICAgIHRoaXMuYWRkUG9zaXRpb24oZ2wpO1xuXG4gICAgY29uc3QgcG9zaXRpb25TaXplID0gMjsgLyogMiBjb21wb25lbnRzIHBlciBpdGVyYXRpb24gKi9cbiAgICBjb25zdCBwb3NpdGlvblR5cGUgPSBnbC5GTE9BVDsgLyogVGhlIGRhdGEgaXMgMzIgYml0IGZsb2F0ICovXG4gICAgY29uc3QgcG9zaXRpb25Ob3JtYWxpemVkID0gZmFsc2U7IC8qIERvbid0IG5vcm1hbGl6ZSB0aGUgZGF0YSAqL1xuICAgIGNvbnN0IHBvc2l0aW9uU3RyaWRlID0gMDsgLyogMDogTW92ZSBmb3J3YXJkIHNpemUgKiBzaXplb2YodHlwZSkgZWFjaCBpdGVyYXRpb24gdG8gZ2V0IHRoZSBuZXh0IHBvc2l0aW9uICovXG4gICAgY29uc3QgcG9zaXRpb25PZmZzZXQgPSAwOyAvKiBTdGFydCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBidWZmZXIgKi9cbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgcG9zaXRpb25Mb2NhdGlvbixcbiAgICAgIHBvc2l0aW9uU2l6ZSxcbiAgICAgIHBvc2l0aW9uVHlwZSxcbiAgICAgIHBvc2l0aW9uTm9ybWFsaXplZCxcbiAgICAgIHBvc2l0aW9uU3RyaWRlLFxuICAgICAgcG9zaXRpb25PZmZzZXRcbiAgICApO1xuXG4gICAgLyogU2V0dXAgY29sb3IgKi9cbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShjb2xvckxvY2F0aW9uKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgY29sb3JCdWZmZXIpO1xuICAgIHRoaXMuYWRkQ29sb3IoZ2wpO1xuXG4gICAgY29uc3QgY29sb3JTaXplID0gNDsgLyogNCBjb21wb25lbnRzIHBlciBpdGVyYXRpb24gKi9cbiAgICBjb25zdCBjb2xvclR5cGUgPSBnbC5GTE9BVDsgLyogVGhlIGRhdGEgaXMgMzIgYml0IGZsb2F0ICovXG4gICAgY29uc3QgY29sb3JOb3JtYWxpemVkID0gZmFsc2U7IC8qIERvbid0IG5vcm1hbGl6ZSB0aGUgZGF0YSAqL1xuICAgIGNvbnN0IGNvbG9yU3RyaWRlID0gMDsgLyogMDogTW92ZSBmb3J3YXJkIHNpemUgKiBzaXplb2YodHlwZSkgZWFjaCBpdGVyYXRpb24gdG8gZ2V0IHRoZSBuZXh0IHBvc2l0aW9uICovXG4gICAgY29uc3QgY29sb3JPZmZzZXQgPSAwOyAvKiBTdGFydCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBidWZmZXIgKi9cbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgY29sb3JMb2NhdGlvbixcbiAgICAgIGNvbG9yU2l6ZSxcbiAgICAgIGNvbG9yVHlwZSxcbiAgICAgIGNvbG9yTm9ybWFsaXplZCxcbiAgICAgIGNvbG9yU3RyaWRlLFxuICAgICAgY29sb3JPZmZzZXRcbiAgICApO1xuXG4gICAgY29uc3QgbWF0cml4ID0gVHJhbnNmb3JtYXRpb24uZ2VuZXJhbChcbiAgICAgIGdsLmNhbnZhcy53aWR0aCxcbiAgICAgIGdsLmNhbnZhcy5oZWlnaHQsXG4gICAgICB0aGlzLnR4LFxuICAgICAgdGhpcy50eSxcbiAgICAgIHRoaXMuZGVncmVlLFxuICAgICAgdGhpcy5zeCxcbiAgICAgIHRoaXMuc3ksXG4gICAgICB0aGlzLmt4LFxuICAgICAgdGhpcy5reSxcbiAgICAgIHRoaXMuZmluZENlbnRlcigpXG4gICAgKS5mbGF0dGVuKCk7XG5cbiAgICBnbC51bmlmb3JtTWF0cml4M2Z2KG1hdHJpeExvY2F0aW9uLCBmYWxzZSwgbWF0cml4KTtcblxuICAgIC8qIERyYXcgc2NlbmUgKi9cbiAgICBjb25zdCBwcmltaXRpdmVUeXBlID0gdGhpcy5kcmF3TWV0aG9kKGdsKTtcbiAgICBjb25zdCBvZmZzZXQgPSAwO1xuICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jb3VudCgpO1xuXG4gICAgZ2wuZHJhd0FycmF5cyhwcmltaXRpdmVUeXBlLCBvZmZzZXQsIGNvdW50KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGFwZTtcbiIsImltcG9ydCBTaGFwZSBmcm9tIFwiT2JqZWN0cy9zaGFwZVwiO1xuaW1wb3J0IFNxdWFyZUludGVyZmFjZSBmcm9tIFwiTWFpbi9JbnRlcmZhY2VzL09iamVjdHMvc3F1YXJlLWludGVyZmFjZVwiO1xuaW1wb3J0IFNoYXBlVHlwZSBmcm9tIFwiT2JqZWN0cy90eXBlc1wiO1xuaW1wb3J0IFBvaW50IGZyb20gXCJPcGVyYXRpb25zL3BvaW50XCI7XG5pbXBvcnQgVHJhbnNmb3JtYXRpb24gZnJvbSBcIk1haW4vT3BlcmF0aW9ucy90cmFuc2Zvcm1hdGlvblwiO1xuaW1wb3J0IHsgcmVuZGVyQ2FudmFzIH0gZnJvbSBcIk1haW4vaW5kZXhcIjtcbmltcG9ydCB7IGhleFRvUmdiLCByZ2JUb0hleCB9IGZyb20gXCJNYWluL1V0aWxzL3Rvb2xzXCI7XG5cbmNsYXNzIFNxdWFyZSBleHRlbmRzIFNoYXBlIGltcGxlbWVudHMgU3F1YXJlSW50ZXJmYWNlIHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGU6IFNoYXBlVHlwZS5TUVVBUkU7XG4gIHB1YmxpYyBjZW50ZXI6IFBvaW50O1xuICBwdWJsaWMgcDE6IFBvaW50O1xuICBwdWJsaWMgcDI6IFBvaW50O1xuICBwdWJsaWMgcDM6IFBvaW50O1xuICBwdWJsaWMgcDQ6IFBvaW50O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwb2ludDogUG9pbnQsIGlkOiBudW1iZXIpIHtcbiAgICBzdXBlcihpZCk7XG5cbiAgICB0aGlzLnR5cGUgPSBTaGFwZVR5cGUuU1FVQVJFO1xuICAgIHRoaXMuY2VudGVyID0gcG9pbnQ7XG4gIH1cblxuICBwdWJsaWMgZmluZENlbnRlcigpOiBQb2ludCB7XG4gICAgcmV0dXJuIHRoaXMuY2VudGVyO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVBvaW50KHA6IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy5wMSA9IHA7XG4gICAgW3RoaXMucDIsIHRoaXMucDMsIHRoaXMucDRdID0gdGhpcy5nZXRTeW1tZXRyaWNhbFNxdWFyZVBvaW50KCk7XG4gIH1cblxuICBwdWJsaWMgYWRkUG9zaXRpb24oZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCk6IHZvaWQge1xuICAgIGdsLmJ1ZmZlckRhdGEoXG4gICAgICBnbC5BUlJBWV9CVUZGRVIsXG4gICAgICBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgLi4udGhpcy5wMS5nZXRQYWlyKCksXG4gICAgICAgIC4uLnRoaXMucDIuZ2V0UGFpcigpLFxuICAgICAgICAuLi50aGlzLnAzLmdldFBhaXIoKSxcbiAgICAgICAgLi4udGhpcy5wNC5nZXRQYWlyKCksXG4gICAgICAgIC4uLnRoaXMucDEuZ2V0UGFpcigpLFxuICAgICAgXSksXG4gICAgICBnbC5TVEFUSUNfRFJBV1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ29sb3IoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCk6IHZvaWQge1xuICAgIGdsLmJ1ZmZlckRhdGEoXG4gICAgICBnbC5BUlJBWV9CVUZGRVIsXG4gICAgICBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgLi4udGhpcy5wMS5nZXRDb2xvcigpLFxuICAgICAgICAuLi50aGlzLnAyLmdldENvbG9yKCksXG4gICAgICAgIC4uLnRoaXMucDMuZ2V0Q29sb3IoKSxcbiAgICAgICAgLi4udGhpcy5wNC5nZXRDb2xvcigpLFxuICAgICAgICAuLi50aGlzLnAxLmdldENvbG9yKCksXG4gICAgICBdKSxcbiAgICAgIGdsLlNUQVRJQ19EUkFXXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBkcmF3TWV0aG9kKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpOiBudW1iZXIge1xuICAgIHJldHVybiBnbC5UUklBTkdMRV9GQU47XG4gIH1cblxuICBwdWJsaWMgY291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gNTtcbiAgfVxuXG4gIHB1YmxpYyBpc1BvaW50Q29tcGxldGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucDEgIT0gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRTeW1tZXRyaWNhbFNxdWFyZVBvaW50KCk6IHJlYWRvbmx5IFtQb2ludCwgUG9pbnQsIFBvaW50XSB7XG4gICAgY29uc3QgW3hDZW50ZXIsIHlDZW50ZXJdID0gdGhpcy5jZW50ZXIuZ2V0UGFpcigpO1xuXG4gICAgY29uc3QgcDIgPSBUcmFuc2Zvcm1hdGlvbi50cmFuc2xhdGlvbih4Q2VudGVyLCB5Q2VudGVyKVxuICAgICAgLm11bHRpcGx5TWF0cml4KFRyYW5zZm9ybWF0aW9uLnJvdGF0aW9uKDAuNSAqIE1hdGguUEkpKVxuICAgICAgLm11bHRpcGx5TWF0cml4KFRyYW5zZm9ybWF0aW9uLnRyYW5zbGF0aW9uKC14Q2VudGVyLCAteUNlbnRlcikpXG4gICAgICAubXVsdGlwbHlQb2ludCh0aGlzLnAxKTtcblxuICAgIGNvbnN0IHAzID0gVHJhbnNmb3JtYXRpb24udHJhbnNsYXRpb24oeENlbnRlciwgeUNlbnRlcilcbiAgICAgIC5tdWx0aXBseU1hdHJpeChUcmFuc2Zvcm1hdGlvbi5yb3RhdGlvbihNYXRoLlBJKSlcbiAgICAgIC5tdWx0aXBseU1hdHJpeChUcmFuc2Zvcm1hdGlvbi50cmFuc2xhdGlvbigteENlbnRlciwgLXlDZW50ZXIpKVxuICAgICAgLm11bHRpcGx5UG9pbnQodGhpcy5wMSk7XG5cbiAgICBjb25zdCBwNCA9IFRyYW5zZm9ybWF0aW9uLnRyYW5zbGF0aW9uKHhDZW50ZXIsIHlDZW50ZXIpXG4gICAgICAubXVsdGlwbHlNYXRyaXgoVHJhbnNmb3JtYXRpb24ucm90YXRpb24oMS41ICogTWF0aC5QSSkpXG4gICAgICAubXVsdGlwbHlNYXRyaXgoVHJhbnNmb3JtYXRpb24udHJhbnNsYXRpb24oLXhDZW50ZXIsIC15Q2VudGVyKSlcbiAgICAgIC5tdWx0aXBseVBvaW50KHRoaXMucDEpO1xuXG4gICAgcmV0dXJuIFtwMiwgcDMsIHA0XTtcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlWChkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50eCA9IGRlbHRhO1xuXG4gICAgcmVuZGVyQ2FudmFzKCk7XG4gIH1cblxuICBwdWJsaWMgbW92ZVkoZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudHkgPSAtZGVsdGE7XG5cbiAgICByZW5kZXJDYW52YXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMZW5ndGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBbeDEsIHkxXSA9IHRoaXMucDEuZ2V0UGFpcigpO1xuICAgIGNvbnN0IFt4MiwgeTJdID0gdGhpcy5wMi5nZXRQYWlyKCk7XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh4MSAtIHgyKSAqKiAyICsgKHkxIC0geTIpICoqIDIpO1xuICB9XG5cbiAgcHVibGljIHNldExlbmd0aChkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zeCA9IDEgKyBkZWx0YSAvIHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgdGhpcy5zeSA9IDEgKyBkZWx0YSAvIHRoaXMuZ2V0TGVuZ3RoKCk7XG5cbiAgICByZW5kZXJDYW52YXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRSb3RhdGlvbihkZWdyZWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGVncmVlID0gKGRlZ3JlZSAqIE1hdGguUEkpIC8gMTgwO1xuXG4gICAgcmVuZGVyQ2FudmFzKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBDb2xvclNlbGVjdG9yKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjb2xvclNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xvci1zZWxlY3RvclwiKTtcbiAgICBjb2xvclNlbGVjdG9yLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY29sb3JTZWxlY3Rvci5yZXBsYWNlQ2hpbGRyZW4oKTtcblxuICAgIGNvbnN0IGNvbG9yVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgY29sb3JUaXRsZS50ZXh0Q29udGVudCA9IFwiU2VsZWN0IGNvbG9yXCI7XG5cbiAgICBjb25zdCBjb2xvcklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNvbG9ySW5wdXQuaWQgPSBcImNvbG9yLWlucHV0XCI7XG4gICAgY29sb3JJbnB1dC50eXBlID0gXCJjb2xvclwiO1xuXG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBjb2xvcklucHV0LnZhbHVlID0gcmdiVG9IZXgodGhpcy5wMS5nZXRDb2xvcigpKTtcbiAgICAgICAgY29sb3JJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhleCA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG5cbiAgICAgICAgICB0aGlzLnAxLnNldENvbG9yKGhleFRvUmdiKGhleCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY29sb3JJbnB1dC52YWx1ZSA9IHJnYlRvSGV4KHRoaXMucDIuZ2V0Q29sb3IoKSk7XG4gICAgICAgIGNvbG9ySW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBoZXggPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuXG4gICAgICAgICAgdGhpcy5wMi5zZXRDb2xvcihoZXhUb1JnYihoZXgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM6XG4gICAgICAgIGNvbG9ySW5wdXQudmFsdWUgPSByZ2JUb0hleCh0aGlzLnAzLmdldENvbG9yKCkpO1xuICAgICAgICBjb2xvcklucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgaGV4ID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcblxuICAgICAgICAgIHRoaXMucDMuc2V0Q29sb3IoaGV4VG9SZ2IoaGV4KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA0OlxuICAgICAgICBjb2xvcklucHV0LnZhbHVlID0gcmdiVG9IZXgodGhpcy5wNC5nZXRDb2xvcigpKTtcbiAgICAgICAgY29sb3JJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhleCA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG5cbiAgICAgICAgICB0aGlzLnA0LnNldENvbG9yKGhleFRvUmdiKGhleCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29sb3JTZWxlY3Rvci5hcHBlbmQoY29sb3JUaXRsZSwgY29sb3JJbnB1dCk7XG4gIH1cblxuICBwdWJsaWMgc2V0dXBTZWxlY3RvcigpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0b3JcIik7XG4gICAgc2VsZWN0b3IucmVwbGFjZUNoaWxkcmVuKCk7XG5cbiAgICAvKiBGaXJzdCBEaXYgKi9cbiAgICBjb25zdCBmaXJzdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZmlyc3REaXYuY2xhc3NOYW1lID0gXCJ0cmFuc2Zvcm1hdGlvbi10cmFuc2xhdGlvblwiO1xuXG4gICAgLyogU2xpZGVyIFggKi9cbiAgICBjb25zdCBzbGlkZXJ4VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgc2xpZGVyeFRpdGxlLnRleHRDb250ZW50ID0gXCJTbGlkZXIgWFwiO1xuXG4gICAgY29uc3Qgc2xpZGVyWHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgc2xpZGVyWHRleHQudGV4dENvbnRlbnQgPSB0aGlzLnR4LnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCBzbGlkZXJYID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHNsaWRlclgudHlwZSA9IFwicmFuZ2VcIjtcbiAgICBzbGlkZXJYLm1pbiA9IFwiLTYwMFwiO1xuICAgIHNsaWRlclgubWF4ID0gXCI2MDBcIjtcbiAgICBzbGlkZXJYLnZhbHVlID0gdGhpcy50eC50b1N0cmluZygpO1xuICAgIHNsaWRlclguc3RlcCA9IFwiMTBcIjtcbiAgICBzbGlkZXJYLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRlbHRhID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgIHNsaWRlclh0ZXh0LnRleHRDb250ZW50ID0gZGVsdGE7XG5cbiAgICAgIHRoaXMubW92ZVgoK2RlbHRhKTtcbiAgICB9KTtcblxuICAgIC8qIFNsaWRlciBZICovXG4gICAgY29uc3Qgc2xpZGVyeVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNsaWRlcnlUaXRsZS50ZXh0Q29udGVudCA9IFwiU2xpZGVyIFlcIjtcblxuICAgIGNvbnN0IHNsaWRlcll0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHNsaWRlcll0ZXh0LnRleHRDb250ZW50ID0gKC10aGlzLnR5KS50b1N0cmluZygpO1xuXG4gICAgY29uc3Qgc2xpZGVyWSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBzbGlkZXJZLnR5cGUgPSBcInJhbmdlXCI7XG4gICAgc2xpZGVyWS5taW4gPSBcIi01MDBcIjtcbiAgICBzbGlkZXJZLm1heCA9IFwiNTAwXCI7XG4gICAgc2xpZGVyWS52YWx1ZSA9ICgtdGhpcy50eSkudG9TdHJpbmcoKTtcbiAgICBzbGlkZXJZLnN0ZXAgPSBcIjEwXCI7XG4gICAgc2xpZGVyWS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBkZWx0YSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICBzbGlkZXJZdGV4dC50ZXh0Q29udGVudCA9IGRlbHRhO1xuXG4gICAgICB0aGlzLm1vdmVZKCtkZWx0YSk7XG4gICAgfSk7XG5cbiAgICBmaXJzdERpdi5hcHBlbmQoXG4gICAgICBzbGlkZXJ4VGl0bGUsXG4gICAgICBzbGlkZXJYLFxuICAgICAgc2xpZGVyWHRleHQsXG4gICAgICBzbGlkZXJ5VGl0bGUsXG4gICAgICBzbGlkZXJZLFxuICAgICAgc2xpZGVyWXRleHRcbiAgICApO1xuXG4gICAgLyogU2Vjb25kIERpdiAqL1xuICAgIGNvbnN0IHNlY29uZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2Vjb25kRGl2LmNsYXNzTmFtZSA9IFwidHJhbnNmb3JtYXRpb24tc2l6ZVwiO1xuXG4gICAgLyogU2xpZGVyIExlbmd0aCAqL1xuICAgIGNvbnN0IHNsaWRlckxlbmd0aFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNsaWRlckxlbmd0aFRpdGxlLnRleHRDb250ZW50ID0gXCJTbGlkZXIgTGVuZ3RoXCI7XG5cbiAgICBjb25zdCBzbGlkZXJMZW5ndGhUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHNsaWRlckxlbmd0aFRleHQudGV4dENvbnRlbnQgPSAoXG4gICAgICAodGhpcy5zeCAtIDEpICpcbiAgICAgIHRoaXMuZ2V0TGVuZ3RoKClcbiAgICApLnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCBzbGlkZXJMZW5ndGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgc2xpZGVyTGVuZ3RoLnR5cGUgPSBcInJhbmdlXCI7XG4gICAgc2xpZGVyTGVuZ3RoLm1pbiA9IFwiMFwiO1xuICAgIHNsaWRlckxlbmd0aC5tYXggPSBcIjUwMFwiO1xuICAgIHNsaWRlckxlbmd0aC52YWx1ZSA9ICgodGhpcy5zeCAtIDEpICogdGhpcy5nZXRMZW5ndGgoKSkudG9TdHJpbmcoKTtcbiAgICBzbGlkZXJMZW5ndGguc3RlcCA9IFwiMTBcIjtcbiAgICBzbGlkZXJMZW5ndGguYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgZGVsdGEgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgc2xpZGVyTGVuZ3RoVGV4dC50ZXh0Q29udGVudCA9IGRlbHRhO1xuXG4gICAgICB0aGlzLnNldExlbmd0aCgrZGVsdGEpO1xuICAgIH0pO1xuXG4gICAgc2Vjb25kRGl2LmFwcGVuZChzbGlkZXJMZW5ndGhUaXRsZSwgc2xpZGVyTGVuZ3RoLCBzbGlkZXJMZW5ndGhUZXh0KTtcblxuICAgIC8qIFRoaXJkIERpdiAqL1xuICAgIGNvbnN0IHRoaXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlyZERpdi5jbGFzc05hbWUgPSBcInRyYW5zZm9ybWF0aW9uLXJvdGF0aW9uXCI7XG5cbiAgICAvKiBTbGlkZXIgUm90YXRpb24gKi9cbiAgICBjb25zdCBzbGlkZXJSb3RhdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNsaWRlclJvdGF0aW9uVGl0bGUudGV4dENvbnRlbnQgPSBcIlNsaWRlciBSb3RhdGlvblwiO1xuXG4gICAgY29uc3Qgc2xpZGVyUm90YXRpb25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHNsaWRlclJvdGF0aW9uVGV4dC50ZXh0Q29udGVudCA9ICgoMTgwICogdGhpcy5kZWdyZWUpIC8gTWF0aC5QSSkudG9TdHJpbmcoKTtcblxuICAgIGNvbnN0IHNsaWRlclJvdGF0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHNsaWRlclJvdGF0aW9uLnR5cGUgPSBcInJhbmdlXCI7XG4gICAgc2xpZGVyUm90YXRpb24ubWluID0gXCIwXCI7XG4gICAgc2xpZGVyUm90YXRpb24ubWF4ID0gXCIzNjBcIjtcbiAgICBzbGlkZXJSb3RhdGlvbi52YWx1ZSA9ICgoMTgwICogdGhpcy5kZWdyZWUpIC8gTWF0aC5QSSkudG9TdHJpbmcoKTtcbiAgICBzbGlkZXJSb3RhdGlvbi5zdGVwID0gXCIxMFwiO1xuICAgIHNsaWRlclJvdGF0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRlbHRhID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICAgIHNsaWRlclJvdGF0aW9uVGV4dC50ZXh0Q29udGVudCA9IGRlbHRhO1xuXG4gICAgICB0aGlzLnNldFJvdGF0aW9uKCtkZWx0YSk7XG4gICAgfSk7XG5cbiAgICB0aGlyZERpdi5hcHBlbmQoc2xpZGVyUm90YXRpb25UaXRsZSwgc2xpZGVyUm90YXRpb24sIHNsaWRlclJvdGF0aW9uVGV4dCk7XG5cbiAgICAvKiBGb3VydGggRGl2ICovXG4gICAgY29uc3QgZm91cnRoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3VydGhEaXYuY2xhc3NOYW1lID0gXCJ0cmFuc2Zvcm1hdGlvbi1jb2xvclwiO1xuXG4gICAgY29uc3QgcG9pbnRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgIHBvaW50T3B0aW9uLmNsYXNzTmFtZSA9IFwiYnRuXCI7XG4gICAgcG9pbnRPcHRpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbmRleDogbnVtYmVyID0gK3BvaW50T3B0aW9uLnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcbiAgICAgIHZhciBwb2ludDogUG9pbnQgPSBudWxsO1xuICAgICAgdGhpcy5zZXR1cENvbG9yU2VsZWN0b3IoaW5kZXgpO1xuICAgIH0pO1xuXG4gICAgLyogRmlyc3QgUG9pbnQgKi9cbiAgICBjb25zdCBmaXJzdFBvaW50T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBmaXJzdFBvaW50T3B0aW9uLnZhbHVlID0gXCIxXCI7XG4gICAgZmlyc3RQb2ludE9wdGlvbi50ZXh0ID0gXCJwb2ludF8xXCI7XG5cbiAgICAvKiBTZWNvbmQgUG9pbnQgKi9cbiAgICBjb25zdCBzZWNvbmRQb2ludE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgc2Vjb25kUG9pbnRPcHRpb24udmFsdWUgPSBcIjJcIjtcbiAgICBzZWNvbmRQb2ludE9wdGlvbi50ZXh0ID0gXCJwb2ludF8yXCI7XG5cbiAgICBjb25zdCB0aGlyZFBvaW50T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICB0aGlyZFBvaW50T3B0aW9uLnZhbHVlID0gXCIzXCI7XG4gICAgdGhpcmRQb2ludE9wdGlvbi50ZXh0ID0gXCJwb2ludF8zXCI7XG5cbiAgICBjb25zdCBmb3VydGhQb2ludE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgZm91cnRoUG9pbnRPcHRpb24udmFsdWUgPSBcIjRcIjtcbiAgICBmb3VydGhQb2ludE9wdGlvbi50ZXh0ID0gXCJwb2ludF80XCI7XG5cbiAgICBwb2ludE9wdGlvbi5hcHBlbmRDaGlsZChmaXJzdFBvaW50T3B0aW9uKTtcbiAgICBwb2ludE9wdGlvbi5hcHBlbmRDaGlsZChzZWNvbmRQb2ludE9wdGlvbik7XG4gICAgcG9pbnRPcHRpb24uYXBwZW5kQ2hpbGQodGhpcmRQb2ludE9wdGlvbik7XG4gICAgcG9pbnRPcHRpb24uYXBwZW5kQ2hpbGQoZm91cnRoUG9pbnRPcHRpb24pO1xuXG4gICAgY29uc3QgaW5uZXJGb3VydGhEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlubmVyRm91cnRoRGl2LmlkID0gXCJjb2xvci1zZWxlY3RvclwiO1xuXG4gICAgZm91cnRoRGl2LmFwcGVuZChwb2ludE9wdGlvbiwgaW5uZXJGb3VydGhEaXYpO1xuXG4gICAgc2VsZWN0b3IuYXBwZW5kKGZpcnN0RGl2LCBzZWNvbmREaXYsIHRoaXJkRGl2LCBmb3VydGhEaXYpO1xuXG4gICAgdGhpcy5zZXR1cENvbG9yU2VsZWN0b3IoMSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3F1YXJlO1xuIiwiZW51bSBTaGFwZVR5cGUge1xuICBMSU5FID0gXCJsaW5lXCIsXG4gIFNRVUFSRSA9IFwic3F1YXJlXCIsXG4gIFJFQ1RBTkdMRSA9IFwicmVjdGFuZ2xlXCIsXG4gIFBPTFlHT04gPSBcInBvbHlnb25cIixcbiAgUE9MWUdPTl9SRURSQVcgPSBcInBvbHlnb25fcmVkcmF3XCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hhcGVUeXBlO1xuIiwiaW1wb3J0IENvb3JkaW5hdGVJbnRlcmZhY2UgZnJvbSBcIk1haW4vSW50ZXJmYWNlcy9PcGVyYXRpb25zL2Nvb3JkaW5hdGUtaW50ZXJmYWNlXCI7XG5cbmNsYXNzIENvb3JkaW5hdGUgaW1wbGVtZW50cyBDb29yZGluYXRlSW50ZXJmYWNlIHtcbiAgcHVibGljIHg6IG51bWJlcjtcbiAgcHVibGljIHk6IG51bWJlcjtcbiAgcHVibGljIHc6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocG9zaXRpb246IHJlYWRvbmx5IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSkge1xuICAgIGNvbnN0IFt4LCB5LCB3XSA9IHBvc2l0aW9uO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLncgPSB3O1xuICB9XG5cbiAgcHVibGljIGdldFRyaXBsZXQoKTogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgICByZXR1cm4gW3RoaXMueCwgdGhpcy55LCB0aGlzLnddO1xuICB9XG5cbiAgcHVibGljIHNldFRyaXBsZXQocG9zaXRpb246IHJlYWRvbmx5IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSk6IHZvaWQge1xuICAgIGNvbnN0IFt4LCB5LCB3XSA9IHBvc2l0aW9uO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLncgPSB3O1xuICB9XG5cbiAgcHVibGljIHNldFgoeDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy54ID0geDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRZKHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBwdWJsaWMgZG90KG90aGVyOiBDb29yZGluYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54ICogb3RoZXIueCArIHRoaXMueSAqIG90aGVyLnkgKyB0aGlzLncgKiBvdGhlci53O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvb3JkaW5hdGU7XG4iLCJpbXBvcnQgTWF0cml4SW50ZXJmYWNlIGZyb20gXCJNYWluL0ludGVyZmFjZXMvT3BlcmF0aW9ucy9tYXRyaXgtaW50ZXJmYWNlXCI7XG5pbXBvcnQgQ29vcmRpbmF0ZSBmcm9tIFwiT3BlcmF0aW9ucy9jb29yZGluYXRlXCI7XG5pbXBvcnQgUG9pbnQgZnJvbSBcIk9wZXJhdGlvbnMvcG9pbnRcIjtcblxuY2xhc3MgTWF0cml4IGltcGxlbWVudHMgTWF0cml4SW50ZXJmYWNlIHtcbiAgcHVibGljIGExOiBDb29yZGluYXRlO1xuICBwdWJsaWMgYTI6IENvb3JkaW5hdGU7XG4gIHB1YmxpYyBhMzogQ29vcmRpbmF0ZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IodHVwbGU6IHJlYWRvbmx5IFtDb29yZGluYXRlLCBDb29yZGluYXRlLCBDb29yZGluYXRlXSkge1xuICAgIGNvbnN0IFthMSwgYTIsIGEzXSA9IHR1cGxlO1xuICAgIHRoaXMuYTEgPSBhMTtcbiAgICB0aGlzLmEyID0gYTI7XG4gICAgdGhpcy5hMyA9IGEzO1xuICB9XG5cbiAgcHVibGljIGdldFR1cGxlKCk6IHJlYWRvbmx5IFtDb29yZGluYXRlLCBDb29yZGluYXRlLCBDb29yZGluYXRlXSB7XG4gICAgcmV0dXJuIFt0aGlzLmExLCB0aGlzLmEyLCB0aGlzLmEzXTtcbiAgfVxuXG4gIHB1YmxpYyBmbGF0dGVuKCk6IHJlYWRvbmx5IG51bWJlcltdIHtcbiAgICByZXR1cm4gW1xuICAgICAgLi4udGhpcy5hMS5nZXRUcmlwbGV0KCksXG4gICAgICAuLi50aGlzLmEyLmdldFRyaXBsZXQoKSxcbiAgICAgIC4uLnRoaXMuYTMuZ2V0VHJpcGxldCgpLFxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgbXVsdGlwbHlNYXRyaXgob3RoZXI6IE1hdHJpeCk6IE1hdHJpeCB7XG4gICAgLyogVW5wYWNrIFwidGhpc1wiIG1hdHJpeCAqL1xuICAgIGNvbnN0IFthMTEsIGEyMSwgYTMxXSA9IHRoaXMuYTEuZ2V0VHJpcGxldCgpO1xuICAgIGNvbnN0IFthMTIsIGEyMiwgYTMyXSA9IHRoaXMuYTIuZ2V0VHJpcGxldCgpO1xuICAgIGNvbnN0IFthMTMsIGEyMywgYTMzXSA9IHRoaXMuYTMuZ2V0VHJpcGxldCgpO1xuXG4gICAgLyogQ3JlYXRlIHRyYW5zcG9zZSBjb29yZGluYXRlICovXG4gICAgY29uc3QgYTEgPSBuZXcgQ29vcmRpbmF0ZShbYTExLCBhMTIsIGExM10pO1xuICAgIGNvbnN0IGEyID0gbmV3IENvb3JkaW5hdGUoW2EyMSwgYTIyLCBhMjNdKTtcbiAgICBjb25zdCBhMyA9IG5ldyBDb29yZGluYXRlKFthMzEsIGEzMiwgYTMzXSk7XG5cbiAgICAvKiBNYXRyaXggbXVsdGlwbGljYXRpb24gKi9cbiAgICBjb25zdCBiMTEgPSBhMS5kb3Qob3RoZXIuYTEpO1xuICAgIGNvbnN0IGIxMiA9IGExLmRvdChvdGhlci5hMik7XG4gICAgY29uc3QgYjEzID0gYTEuZG90KG90aGVyLmEzKTtcbiAgICBjb25zdCBiMjEgPSBhMi5kb3Qob3RoZXIuYTEpO1xuICAgIGNvbnN0IGIyMiA9IGEyLmRvdChvdGhlci5hMik7XG4gICAgY29uc3QgYjIzID0gYTIuZG90KG90aGVyLmEzKTtcbiAgICBjb25zdCBiMzEgPSBhMy5kb3Qob3RoZXIuYTEpO1xuICAgIGNvbnN0IGIzMiA9IGEzLmRvdChvdGhlci5hMik7XG4gICAgY29uc3QgYjMzID0gYTMuZG90KG90aGVyLmEzKTtcblxuICAgIC8qIENyZWF0ZSByZXN1bHQgY29vcmRpbmF0ZSAqL1xuICAgIGNvbnN0IGIxID0gbmV3IENvb3JkaW5hdGUoW2IxMSwgYjIxLCBiMzFdKTtcbiAgICBjb25zdCBiMiA9IG5ldyBDb29yZGluYXRlKFtiMTIsIGIyMiwgYjMyXSk7XG4gICAgY29uc3QgYjMgPSBuZXcgQ29vcmRpbmF0ZShbYjEzLCBiMjMsIGIzM10pO1xuXG4gICAgLyogQ3JlYXRlIG5ldyBtYXRyaXggKi9cbiAgICBjb25zdCBtYXRyaXggPSBuZXcgTWF0cml4KFtiMSwgYjIsIGIzXSk7XG5cbiAgICByZXR1cm4gbWF0cml4O1xuICB9XG5cbiAgcHVibGljIG11bHRpcGx5UG9pbnQocG9pbnQ6IFBvaW50KTogUG9pbnQge1xuICAgIC8qIFVucGFjayBcInRoaXNcIiBtYXRyaXggKi9cbiAgICBjb25zdCBbYTExLCBhMjFdID0gdGhpcy5hMS5nZXRUcmlwbGV0KCk7XG4gICAgY29uc3QgW2ExMiwgYTIyXSA9IHRoaXMuYTIuZ2V0VHJpcGxldCgpO1xuICAgIGNvbnN0IFthMTMsIGEyM10gPSB0aGlzLmEzLmdldFRyaXBsZXQoKTtcblxuICAgIC8qIENyZWF0ZSB0cmFuc3Bvc2UgY29vcmRpbmF0ZSAqL1xuICAgIGNvbnN0IGExID0gbmV3IENvb3JkaW5hdGUoW2ExMSwgYTEyLCBhMTNdKTtcbiAgICBjb25zdCBhMiA9IG5ldyBDb29yZGluYXRlKFthMjEsIGEyMiwgYTIzXSk7XG5cbiAgICBjb25zdCB4MSA9IGExLmRvdChwb2ludCk7XG4gICAgY29uc3QgeTEgPSBhMi5kb3QocG9pbnQpO1xuXG4gICAgY29uc3QgY29vcmRpbmF0ZTEgPSBuZXcgUG9pbnQoW3gxLCB5MV0pO1xuXG4gICAgcmV0dXJuIGNvb3JkaW5hdGUxO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hdHJpeDtcbiIsImltcG9ydCBQb2ludEludGVyZmFjZSBmcm9tIFwiTWFpbi9JbnRlcmZhY2VzL09wZXJhdGlvbnMvcG9pbnQtaW50ZXJmYWNlXCI7XG5pbXBvcnQgQ29vcmRpbmF0ZSBmcm9tIFwiT3BlcmF0aW9ucy9jb29yZGluYXRlXCI7XG5cbmNsYXNzIFBvaW50IGV4dGVuZHMgQ29vcmRpbmF0ZSBpbXBsZW1lbnRzIFBvaW50SW50ZXJmYWNlIHtcbiAgcHVibGljIHI6IG51bWJlcjtcbiAgcHVibGljIGc6IG51bWJlcjtcbiAgcHVibGljIGI6IG51bWJlcjtcbiAgcHVibGljIGE6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcG9zaXRpb246IHJlYWRvbmx5IFtudW1iZXIsIG51bWJlcl0sXG4gICAgY29sb3I6IHJlYWRvbmx5IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdID0gWzAsIDAsIDAsIDFdXG4gICkge1xuICAgIHN1cGVyKFsuLi5wb3NpdGlvbiwgMV0pO1xuXG4gICAgY29uc3QgW3IsIGcsIGIsIGFdID0gY29sb3I7XG4gICAgdGhpcy5yID0gcjtcbiAgICB0aGlzLmcgPSBnO1xuICAgIHRoaXMuYiA9IGI7XG4gICAgdGhpcy5hID0gYTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQYWlyKCk6IHJlYWRvbmx5IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnldO1xuICB9XG5cbiAgcHVibGljIGdldENvbG9yKCk6IHJlYWRvbmx5IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgICByZXR1cm4gW3RoaXMuciwgdGhpcy5nLCB0aGlzLmIsIHRoaXMuYV07XG4gIH1cblxuICBwdWJsaWMgc2V0Q29sb3IoY29sb3I6IHJlYWRvbmx5IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdKTogdm9pZCB7XG4gICAgY29uc3QgW3IsIGcsIGIsIGFdID0gY29sb3I7XG4gICAgdGhpcy5yID0gcjtcbiAgICB0aGlzLmcgPSBnO1xuICAgIHRoaXMuYiA9IGI7XG4gICAgdGhpcy5hID0gYTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb2ludDtcbiIsImltcG9ydCBQb2ludCBmcm9tIFwiT3BlcmF0aW9ucy9wb2ludFwiO1xuaW1wb3J0IFZlY3RvciBmcm9tIFwiT3BlcmF0aW9ucy92ZWN0b3JcIjtcbmltcG9ydCBNYXRyaXggZnJvbSBcIk9wZXJhdGlvbnMvbWF0cml4XCI7XG5cbmNsYXNzIFRyYW5zZm9ybWF0aW9uIHtcbiAgcHVibGljIHN0YXRpYyBwcm9qZWN0aW9uKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogTWF0cml4IHtcbiAgICAvKiBDcmVhdGUgdHJhbnNmb3JtYXRpb24gbWF0cml4ICovXG4gICAgY29uc3QgcDEgPSBuZXcgVmVjdG9yKFsyIC8gd2lkdGgsIDBdKTtcbiAgICBjb25zdCBwMiA9IG5ldyBWZWN0b3IoWzAsIC0yIC8gaGVpZ2h0XSk7XG4gICAgY29uc3QgcDMgPSBuZXcgUG9pbnQoWy0xLCAxXSk7XG4gICAgY29uc3QgbWF0cml4ID0gbmV3IE1hdHJpeChbcDEsIHAyLCBwM10pO1xuXG4gICAgcmV0dXJuIG1hdHJpeDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgdHJhbnNsYXRpb24odHg6IG51bWJlciwgdHk6IG51bWJlcik6IE1hdHJpeCB7XG4gICAgLyogQ3JlYXRlIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCAqL1xuICAgIGNvbnN0IHYxID0gbmV3IFZlY3RvcihbMSwgMF0pO1xuICAgIGNvbnN0IHYyID0gbmV3IFZlY3RvcihbMCwgMV0pO1xuICAgIGNvbnN0IHBpdm90ID0gbmV3IFBvaW50KFt0eCwgdHldKTtcbiAgICBjb25zdCBtYXRyaXggPSBuZXcgTWF0cml4KFt2MSwgdjIsIHBpdm90XSk7XG5cbiAgICByZXR1cm4gbWF0cml4O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyByb3RhdGlvbihkZWdyZWU6IG51bWJlcik6IE1hdHJpeCB7XG4gICAgLyogQ3JlYXRlIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCAqL1xuICAgIGNvbnN0IHYxID0gbmV3IFZlY3RvcihbTWF0aC5jb3MoZGVncmVlKSwgTWF0aC5zaW4oZGVncmVlKV0pO1xuICAgIGNvbnN0IHYyID0gbmV3IFZlY3RvcihbLU1hdGguc2luKGRlZ3JlZSksIE1hdGguY29zKGRlZ3JlZSldKTtcbiAgICBjb25zdCBwaXZvdCA9IG5ldyBQb2ludChbMCwgMF0pO1xuICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBNYXRyaXgoW3YxLCB2MiwgcGl2b3RdKTtcblxuICAgIHJldHVybiBtYXRyaXg7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNjYWxlKHN4OiBudW1iZXIsIHN5OiBudW1iZXIpOiBNYXRyaXgge1xuICAgIC8qIENyZWF0ZSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggKi9cbiAgICBjb25zdCB2MSA9IG5ldyBWZWN0b3IoW3N4LCAwXSk7XG4gICAgY29uc3QgdjIgPSBuZXcgVmVjdG9yKFswLCBzeV0pO1xuICAgIGNvbnN0IHBpdm90ID0gbmV3IFBvaW50KFswLCAwXSk7XG4gICAgY29uc3QgbWF0cml4ID0gbmV3IE1hdHJpeChbdjEsIHYyLCBwaXZvdF0pO1xuXG4gICAgcmV0dXJuIG1hdHJpeDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2hlYXJYKGt4OiBudW1iZXIpOiBNYXRyaXgge1xuICAgIC8qIENyZWF0ZSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggKi9cbiAgICBjb25zdCB2MSA9IG5ldyBWZWN0b3IoWzEsIDBdKTtcbiAgICBjb25zdCB2MiA9IG5ldyBWZWN0b3IoW2t4LCAxXSk7XG4gICAgY29uc3QgcGl2b3QgPSBuZXcgUG9pbnQoWzAsIDBdKTtcbiAgICBjb25zdCBtYXRyaXggPSBuZXcgTWF0cml4KFt2MSwgdjIsIHBpdm90XSk7XG5cbiAgICByZXR1cm4gbWF0cml4O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzaGVhclkoa3k6IG51bWJlcik6IE1hdHJpeCB7XG4gICAgLyogQ3JlYXRlIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCAqL1xuICAgIGNvbnN0IHYxID0gbmV3IFZlY3RvcihbMSwga3ldKTtcbiAgICBjb25zdCB2MiA9IG5ldyBWZWN0b3IoWzAsIDFdKTtcbiAgICBjb25zdCBwaXZvdCA9IG5ldyBQb2ludChbMCwgMF0pO1xuICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBNYXRyaXgoW3YxLCB2MiwgcGl2b3RdKTtcblxuICAgIHJldHVybiBtYXRyaXg7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdlbmVyYWwoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB0eDogbnVtYmVyLFxuICAgIHR5OiBudW1iZXIsXG4gICAgZGVncmVlOiBudW1iZXIsXG4gICAgc3g6IG51bWJlcixcbiAgICBzeTogbnVtYmVyLFxuICAgIGt4OiBudW1iZXIsXG4gICAga3k6IG51bWJlcixcbiAgICBwaXZvdDogUG9pbnRcbiAgKTogTWF0cml4IHtcbiAgICBjb25zdCBbcGl2b3RYLCBwaXZvdFldID0gcGl2b3QuZ2V0UGFpcigpO1xuXG4gICAgcmV0dXJuIFRyYW5zZm9ybWF0aW9uLnByb2plY3Rpb24od2lkdGgsIGhlaWdodClcbiAgICAgIC5tdWx0aXBseU1hdHJpeChUcmFuc2Zvcm1hdGlvbi50cmFuc2xhdGlvbih0eCwgdHkpKVxuICAgICAgLm11bHRpcGx5TWF0cml4KFRyYW5zZm9ybWF0aW9uLnRyYW5zbGF0aW9uKHBpdm90WCwgcGl2b3RZKSlcbiAgICAgIC5tdWx0aXBseU1hdHJpeChUcmFuc2Zvcm1hdGlvbi5yb3RhdGlvbihkZWdyZWUpKVxuICAgICAgLm11bHRpcGx5TWF0cml4KFRyYW5zZm9ybWF0aW9uLnNjYWxlKHN4LCBzeSkpXG4gICAgICAubXVsdGlwbHlNYXRyaXgoVHJhbnNmb3JtYXRpb24uc2hlYXJYKGt4KSlcbiAgICAgIC5tdWx0aXBseU1hdHJpeChUcmFuc2Zvcm1hdGlvbi5zaGVhclkoa3kpKVxuICAgICAgLm11bHRpcGx5TWF0cml4KFRyYW5zZm9ybWF0aW9uLnRyYW5zbGF0aW9uKC1waXZvdFgsIC1waXZvdFkpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmFuc2Zvcm1hdGlvbjtcbiIsImltcG9ydCBWZWN0b3JJbnRlcmZhY2UgZnJvbSBcIk1haW4vSW50ZXJmYWNlcy9PcGVyYXRpb25zL3ZlY3Rvci1pbnRlcmZhY2VcIjtcbmltcG9ydCBDb29yZGluYXRlIGZyb20gXCJPcGVyYXRpb25zL2Nvb3JkaW5hdGVcIjtcblxuY2xhc3MgVmVjdG9yIGV4dGVuZHMgQ29vcmRpbmF0ZSBpbXBsZW1lbnRzIFZlY3RvckludGVyZmFjZSB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXSkge1xuICAgIHN1cGVyKFsuLi5wb3NpdGlvbiwgMF0pO1xuICB9XG5cbiAgcHVibGljIGdldFBhaXIoKTogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXSB7XG4gICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueV07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmVjdG9yO1xuIiwiZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShcbiAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgdmVydGV4U2hhZGVyOiBXZWJHTFNoYWRlcixcbiAgZnJhZ21lbnRTaGFkZXI6IFdlYkdMU2hhZGVyXG4pOiBXZWJHTFByb2dyYW0ge1xuICBjb25zdCBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG5cbiAgY29uc3Qgc3VjY2VzcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpIGFzIGJvb2xlYW47XG4gIGlmICghc3VjY2Vzcykge1xuICAgIGdsLmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICB0aHJvdyBFcnJvcihcIkZhaWxlZCB0byBsaW5rIHByb2dyYW0hXCIpO1xuICB9XG5cbiAgcmV0dXJuIHByb2dyYW07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVByb2dyYW07XG4iLCJmdW5jdGlvbiByZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgY29uc3Qgd2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XG4gIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG5cbiAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlc2l6ZUNhbnZhc1RvRGlzcGxheVNpemU7XG4iLCJmdW5jdGlvbiBjcmVhdGVTaGFkZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHR5cGU6IG51bWJlcixcbiAgc291cmNlOiBzdHJpbmdcbik6IFdlYkdMU2hhZGVyIHtcbiAgY29uc3Qgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG5cbiAgY29uc3Qgc3VjY2VzcyA9IGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSBhcyBib29sZWFuO1xuICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICBnbC5kZWxldGVTaGFkZXIoc2hhZGVyKTtcblxuICAgIHRocm93IEVycm9yKFwiRmFpbGVkIHRvIGNvbXBpbGUgc2hhZGVyIVwiKTtcbiAgfVxuXG4gIHJldHVybiBzaGFkZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNoYWRlcjtcbiIsImZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGM6IG51bWJlcikge1xuICB2YXIgaGV4ID0gYy50b1N0cmluZygxNik7XG4gIHJldHVybiBoZXgubGVuZ3RoID09PSAxID8gYDAke2hleH1gIDogaGV4O1xufVxuXG5mdW5jdGlvbiByZ2JUb0hleChyZ2JhOiByZWFkb25seSBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSk6IHN0cmluZyB7XG4gIGNvbnN0IFtyLCBnLCBiXSA9IHJnYmE7XG5cbiAgcmV0dXJuIGAjJHtjb21wb25lbnRUb0hleChyKX0ke2NvbXBvbmVudFRvSGV4KGcpfSR7Y29tcG9uZW50VG9IZXgoYil9YDtcbn1cblxuZnVuY3Rpb24gaGV4VG9SZ2IoaGV4OiBzdHJpbmcpOiByZWFkb25seSBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IHIgPSBwYXJzZUludChoZXguc2xpY2UoMSwgMyksIDE2KTtcbiAgY29uc3QgZyA9IHBhcnNlSW50KGhleC5zbGljZSgzLCA1KSwgMTYpO1xuICBjb25zdCBiID0gcGFyc2VJbnQoaGV4LnNsaWNlKDUsIDcpLCAxNik7XG5cbiAgcmV0dXJuIFtyIC8gMjU1LCBnIC8gMjU1LCBiIC8gMjU1LCAxXTtcbn1cblxuZXhwb3J0IHsgcmdiVG9IZXgsIGhleFRvUmdiIH07XG4iLCJpbXBvcnQgY3JlYXRlU2hhZGVyIGZyb20gXCJVdGlscy9zaGFkZXJcIjtcbmltcG9ydCBjcmVhdGVQcm9ncmFtIGZyb20gXCJVdGlscy9wcm9ncmFtXCI7XG5pbXBvcnQgcmVzaXplQ2FudmFzVG9EaXNwbGF5U2l6ZSBmcm9tIFwiVXRpbHMvcmVzaXplLWNhbnZhc1wiO1xuXG5pbXBvcnQgTGluZSBmcm9tIFwiT2JqZWN0cy9saW5lXCI7XG5pbXBvcnQgU2hhcGUgZnJvbSBcIk9iamVjdHMvc2hhcGVcIjtcbmltcG9ydCBQb2ludCBmcm9tIFwiT3BlcmF0aW9ucy9wb2ludFwiO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tIFwiT2JqZWN0cy9yZWN0YW5nbGVcIjtcbmltcG9ydCBQb2x5Z29uIGZyb20gXCJPYmplY3RzL3BvbHlnb25cIjtcbmltcG9ydCBTcXVhcmUgZnJvbSBcIk9iamVjdHMvc3F1YXJlXCI7XG5pbXBvcnQgU2hhcGVUeXBlIGZyb20gXCJPYmplY3RzL3R5cGVzXCI7XG5cbmltcG9ydCBGaWxlU3lzdGVtIGZyb20gXCJGaWxlcy9maWxlLXN5c3RlbVwiO1xuaW1wb3J0IEZpbGVIYW5kbGluZyBmcm9tIFwiLi9GaWxlcy9maWxlLWhhbmRsaW5nXCI7XG5cbi8qIEdsb2JhbCB2YXJpYWJsZXMgKi9cbmxldCBvYmplY3RzOiBTaGFwZVtdID0gW107XG5cbmxldCBzaGFwZVR5cGU6IFNoYXBlVHlwZTtcbmxldCBpc0RyYXdpbmcgPSBmYWxzZTtcbmxldCBwb2x5Z29uUmVkcmF3SW5kZXggPSAwO1xubGV0IGlzRmlyc3REcmF3aW5nID0gdHJ1ZTtcblxuLyogQ3JlYXRlIFByb2dyYW0gKi9cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2ViZ2wtY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsXCIpO1xuXG5jb25zdCB2ZXJ0ZXhTaGFkZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2ZXJ0ZXgtc2hhZGVyXCIpO1xuY29uc3QgZnJhZ21lbnRTaGFkZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcmFnbWVudC1zaGFkZXJcIik7XG5cbmNvbnN0IHZlcnRleFNoYWRlclNvdXJjZSA9IHZlcnRleFNoYWRlckVsZW1lbnQudGV4dENvbnRlbnQ7XG5jb25zdCBmcmFnbWVudFNoYWRlclNvdXJjZSA9IGZyYWdtZW50U2hhZGVyRWxlbWVudC50ZXh0Q29udGVudDtcblxuY29uc3QgdmVydGV4U2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UpO1xuY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBjcmVhdGVTaGFkZXIoXG4gIGdsLFxuICBnbC5GUkFHTUVOVF9TSEFERVIsXG4gIGZyYWdtZW50U2hhZGVyU291cmNlXG4pO1xuXG5jb25zdCBwcm9ncmFtID0gY3JlYXRlUHJvZ3JhbShnbCwgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XG5cbi8qIFNldHVwIFByb2dyYW0gKi9cbmdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG5cbi8qIFNldHVwIFZpZXdwb3J0ICovXG5yZXNpemVDYW52YXNUb0Rpc3BsYXlTaXplKGdsLmNhbnZhcyBhcyBIVE1MQ2FudmFzRWxlbWVudCk7XG5nbC52aWV3cG9ydCgwLCAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpO1xuXG4vKiBDbGVhciBDb2xvciAqL1xuZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG5cbmNvbnN0IHBvc2l0aW9uQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG5jb25zdCBjb2xvckJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuXG4vKiBMaXN0IG9mIFNoYXBlcyBMaXN0ZW5lciAqL1xuY29uc3QgbGlzdE9mU2hhcGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1vZi1zaGFwZXNcIlxuKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbmxpc3RPZlNoYXBlcy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgY29uc3QgaW5kZXg6IG51bWJlciA9ICtsaXN0T2ZTaGFwZXMuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xuXG4gIG9iamVjdHNbaW5kZXhdLnNldHVwU2VsZWN0b3IoaW5kZXgpO1xufSk7XG5cbi8qIEJ1dHRvbiBMaXN0ZW5lciAqL1xuY29uc3QgbGluZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGluZS1idG5cIik7XG5saW5lQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHNoYXBlVHlwZSA9IFNoYXBlVHlwZS5MSU5FO1xuICBpc0RyYXdpbmcgPSBmYWxzZTtcbn0pO1xuXG5jb25zdCBzcXVhcmVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNxdWFyZS1idG5cIik7XG5zcXVhcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgc2hhcGVUeXBlID0gU2hhcGVUeXBlLlNRVUFSRTtcbiAgaXNEcmF3aW5nID0gZmFsc2U7XG59KTtcblxuY29uc3QgcmVjdGFuZ2xlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWN0YW5nbGUtYnRuXCIpO1xucmVjdGFuZ2xlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHNoYXBlVHlwZSA9IFNoYXBlVHlwZS5SRUNUQU5HTEU7XG4gIGlzRHJhd2luZyA9IGZhbHNlO1xufSk7XG5cbmNvbnN0IHBvbHlnb25CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvbHlnb24tYnRuXCIpO1xucG9seWdvbkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBzaGFwZVR5cGUgPSBTaGFwZVR5cGUuUE9MWUdPTjtcbiAgaXNEcmF3aW5nID0gZmFsc2U7XG4gIGlzRmlyc3REcmF3aW5nID0gdHJ1ZTtcbn0pO1xuXG5jb25zdCBzYXZlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYXZlLWJ0blwiKTtcbnNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgRmlsZUhhbmRsaW5nLmRvd25sb2FkKEZpbGVTeXN0ZW0uc2VyaWFsaXplKG9iamVjdHMpKTtcbn0pO1xuXG5jb25zdCB1cGxvYWRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWQtYnRuXCIpO1xudXBsb2FkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIEZpbGVIYW5kbGluZy51cGxvYWQoKHRleHQpID0+IHtcbiAgICBvYmplY3RzID0gRmlsZVN5c3RlbS5sb2FkKHRleHQpO1xuXG4gICAgZm9yIChjb25zdCBvYmplY3Qgb2Ygb2JqZWN0cykge1xuICAgICAgb2JqZWN0LnNldHVwT3B0aW9uKHRydWUpO1xuICAgIH1cblxuICAgIHJlbmRlckNhbnZhcygpO1xuICB9KTtcbn0pO1xuXG4vKiBDYW52YXMgTGlzdGVuZXIgKi9cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldmVudCkgPT4ge1xuICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WDtcbiAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFk7XG4gIGNvbnN0IHBvaW50ID0gbmV3IFBvaW50KFt4LCB5XSk7XG5cbiAgc3dpdGNoIChzaGFwZVR5cGUpIHtcbiAgICBjYXNlIFNoYXBlVHlwZS5MSU5FOlxuICAgICAgaWYgKCFpc0RyYXdpbmcpIHtcbiAgICAgICAgY29uc3QgbGluZSA9IG5ldyBMaW5lKHBvaW50LCBvYmplY3RzLmxlbmd0aCk7XG4gICAgICAgIG9iamVjdHMucHVzaChsaW5lKTtcblxuICAgICAgICBpc0RyYXdpbmcgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGluZSA9IG9iamVjdHNbb2JqZWN0cy5sZW5ndGggLSAxXSBhcyBMaW5lO1xuICAgICAgICBsaW5lLnVwZGF0ZVBvaW50KHBvaW50KTtcbiAgICAgICAgbGluZS5yZW5kZXIoZ2wsIHByb2dyYW0sIHBvc2l0aW9uQnVmZmVyLCBjb2xvckJ1ZmZlcik7XG4gICAgICAgIGxpbmUuc2V0dXBPcHRpb24odHJ1ZSk7XG5cbiAgICAgICAgaXNEcmF3aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgU2hhcGVUeXBlLlNRVUFSRTpcbiAgICAgIGlmICghaXNEcmF3aW5nKSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IG5ldyBTcXVhcmUocG9pbnQsIG9iamVjdHMubGVuZ3RoKTtcbiAgICAgICAgb2JqZWN0cy5wdXNoKHNxdWFyZSk7XG5cbiAgICAgICAgaXNEcmF3aW5nID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IG9iamVjdHNbb2JqZWN0cy5sZW5ndGggLSAxXSBhcyBTcXVhcmU7XG4gICAgICAgIHNxdWFyZS51cGRhdGVQb2ludChwb2ludCk7XG4gICAgICAgIHNxdWFyZS5yZW5kZXIoZ2wsIHByb2dyYW0sIHBvc2l0aW9uQnVmZmVyLCBjb2xvckJ1ZmZlcik7XG4gICAgICAgIHNxdWFyZS5zZXR1cE9wdGlvbih0cnVlKTtcblxuICAgICAgICBpc0RyYXdpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBTaGFwZVR5cGUuUkVDVEFOR0xFOlxuICAgICAgaWYgKCFpc0RyYXdpbmcpIHtcbiAgICAgICAgY29uc3QgcmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZShwb2ludCwgb2JqZWN0cy5sZW5ndGgpO1xuICAgICAgICBvYmplY3RzLnB1c2gocmVjdGFuZ2xlKTtcblxuICAgICAgICBpc0RyYXdpbmcgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVjdGFuZ2xlID0gb2JqZWN0c1tvYmplY3RzLmxlbmd0aCAtIDFdIGFzIFJlY3RhbmdsZTtcblxuICAgICAgICByZWN0YW5nbGUudXBkYXRlUG9pbnQocG9pbnQpO1xuICAgICAgICByZWN0YW5nbGUucmVuZGVyKGdsLCBwcm9ncmFtLCBwb3NpdGlvbkJ1ZmZlciwgY29sb3JCdWZmZXIpO1xuICAgICAgICByZWN0YW5nbGUuc2V0dXBPcHRpb24odHJ1ZSk7XG5cbiAgICAgICAgaXNEcmF3aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgU2hhcGVUeXBlLlBPTFlHT046XG4gICAgICBpZiAoIWlzRHJhd2luZykge1xuICAgICAgICBjb25zdCBwb2x5Z29uID0gbmV3IFBvbHlnb24ocG9pbnQsIG9iamVjdHMubGVuZ3RoKTtcbiAgICAgICAgb2JqZWN0cy5wdXNoKHBvbHlnb24pO1xuXG4gICAgICAgIGlzRHJhd2luZyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwb2x5Z29uID0gb2JqZWN0c1tvYmplY3RzLmxlbmd0aCAtIDFdIGFzIFBvbHlnb247XG5cbiAgICAgICAgcG9seWdvbi51cGRhdGVQb2ludChwb2ludCk7XG4gICAgICAgIHBvbHlnb24ucmVuZGVyKGdsLCBwcm9ncmFtLCBwb3NpdGlvbkJ1ZmZlciwgY29sb3JCdWZmZXIpO1xuICAgICAgICBwb2x5Z29uLnNldHVwT3B0aW9uKGlzRmlyc3REcmF3aW5nKTtcblxuICAgICAgICBpc0ZpcnN0RHJhd2luZyA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFNoYXBlVHlwZS5QT0xZR09OX1JFRFJBVzpcbiAgICAgIGNvbnN0IHBvbHlnb24gPSBvYmplY3RzW3BvbHlnb25SZWRyYXdJbmRleF0gYXMgUG9seWdvbjtcblxuICAgICAgcG9seWdvbi51cGRhdGVQb2ludChwb2ludCk7XG4gICAgICBwb2x5Z29uLnJlbmRlcihnbCwgcHJvZ3JhbSwgcG9zaXRpb25CdWZmZXIsIGNvbG9yQnVmZmVyKTtcblxuICAgICAgYnJlYWs7XG4gIH1cbn0pO1xuXG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZXZlbnQpID0+IHtcbiAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFg7XG4gIGNvbnN0IHkgPSBldmVudC5jbGllbnRZO1xuICBjb25zdCBwb2ludCA9IG5ldyBQb2ludChbeCwgeV0pO1xuXG4gIGlmIChpc0RyYXdpbmcpIHtcbiAgICBzd2l0Y2ggKHNoYXBlVHlwZSkge1xuICAgICAgY2FzZSBTaGFwZVR5cGUuTElORTpcbiAgICAgICAgY29uc3QgbGluZSA9IG9iamVjdHNbb2JqZWN0cy5sZW5ndGggLSAxXSBhcyBMaW5lO1xuICAgICAgICBsaW5lLnVwZGF0ZVBvaW50KHBvaW50KTtcbiAgICAgICAgbGluZS5yZW5kZXIoZ2wsIHByb2dyYW0sIHBvc2l0aW9uQnVmZmVyLCBjb2xvckJ1ZmZlcik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNoYXBlVHlwZS5TUVVBUkU6XG4gICAgICAgIGNvbnN0IHNxdWFyZSA9IG9iamVjdHNbb2JqZWN0cy5sZW5ndGggLSAxXSBhcyBTcXVhcmU7XG4gICAgICAgIHNxdWFyZS51cGRhdGVQb2ludChwb2ludCk7XG4gICAgICAgIHNxdWFyZS5yZW5kZXIoZ2wsIHByb2dyYW0sIHBvc2l0aW9uQnVmZmVyLCBjb2xvckJ1ZmZlcik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNoYXBlVHlwZS5SRUNUQU5HTEU6XG4gICAgICAgIGNvbnN0IHJlY3RhbmdsZSA9IG9iamVjdHNbb2JqZWN0cy5sZW5ndGggLSAxXSBhcyBSZWN0YW5nbGU7XG4gICAgICAgIHJlY3RhbmdsZS51cGRhdGVQb2ludChwb2ludCk7XG4gICAgICAgIHJlY3RhbmdsZS5yZW5kZXIoZ2wsIHByb2dyYW0sIHBvc2l0aW9uQnVmZmVyLCBjb2xvckJ1ZmZlcik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFNoYXBlVHlwZS5QT0xZR09OOlxuICAgICAgICAvKiBEbyBOb3RoaW5nICovXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGFwZSB0eXBlIGlzIG5vdCBkZWZpbmVkXCIpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8qIEV4cG9ydCBGdW5jdGlvbiAqL1xuZXhwb3J0IGNvbnN0IHJlbmRlckNhbnZhcyA9ICgpID0+IHtcbiAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG5cbiAgZm9yIChjb25zdCBvYmplY3Qgb2Ygb2JqZWN0cykge1xuICAgIG9iamVjdC5yZW5kZXIoZ2wsIHByb2dyYW0sIHBvc2l0aW9uQnVmZmVyLCBjb2xvckJ1ZmZlcik7XG4gIH1cblxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckNhbnZhcyk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0U2hhcGVUeXBlID0gKG5ld1NoYXBlVHlwZTogU2hhcGVUeXBlKSA9PiB7XG4gIHNoYXBlVHlwZSA9IG5ld1NoYXBlVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRJc0RyYXdpbmcgPSAobmV3SXNEcmF3aW5nOiBib29sZWFuKSA9PiB7XG4gIGlzRHJhd2luZyA9IG5ld0lzRHJhd2luZztcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRQb2x5Z29uUmVkcmF3SW5kZXggPSAobmV3UG9seWdvblJlZHJhd0luZGV4OiBudW1iZXIpID0+IHtcbiAgcG9seWdvblJlZHJhd0luZGV4O1xufTtcblxuLyogRE9NIExpc3RlbmVyICovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCByZW5kZXJDYW52YXMpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9