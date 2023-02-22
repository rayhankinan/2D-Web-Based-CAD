import Point from "Operations/point";
import Transformation from "Operations/transformation";

abstract class Shape {
	protected readonly n: number;

	public constructor(n: number) {
		this.n = n;
	}

	public abstract findCenter(): Point;
	public abstract addPosition(gl: WebGLRenderingContext): void;
	public abstract addColor(gl: WebGLRenderingContext): void;
	public abstract drawMethod(gl: WebGLRenderingContext): number;
	public abstract count(): number;
	public abstract isPointComplete(): boolean;
	public abstract setupSelector(): void;

	public setupOption(name: string, id: number) {
		var listOfShapes = document.getElementById("list-of-shapes")

		var option = document.createElement("option")
		option.value = (id-1).toString()
		option.text = name

		listOfShapes.appendChild(option)
	}

	public render(
		gl: WebGLRenderingContext,
		program: WebGLProgram,
		positionBuffer: WebGLBuffer,
		colorBuffer: WebGLBuffer
	): void {
		if (!this.isPointComplete()) {
			return
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
		gl.vertexAttribPointer(
			positionLocation,
			positionSize,
			positionType,
			positionNormalized,
			positionStride,
			positionOffset
		);

		/* Setup color */
		gl.enableVertexAttribArray(colorLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		this.addColor(gl);
		const colorSize = 4; /* 4 components per iteration */
		const colorType = gl.FLOAT; /* The data is 32 bit float */
		const colorNormalized = false; /* Don't normalize the data */
		const colorStride = 0; /* 0: Move forward size * sizeof(type) each iteration to get the next position */
		const colorOffset = 0; /* Start at the beginning of the buffer */
		gl.vertexAttribPointer(
			colorLocation,
			colorSize,
			colorType,
			colorNormalized,
			colorStride,
			colorOffset
		);

		/* Count Matrix */
		const { width, height, tx, ty, degree, sx, sy, kx, ky } = {
			width: gl.canvas.width,
			height: gl.canvas.height,
			tx: 0,
			ty: 0,
			degree: 0,
			sx: 1,
			sy: 1,
			kx: 0,
			ky: 0,
		};

		const matrix = Transformation.general(
			width,
			height,
			tx,
			ty,
			degree,
			sx,
			sy,
			kx,
			ky,
			this.findCenter()
		).flatten();

		gl.uniformMatrix3fv(matrixLocation, false, matrix);

		/* Draw scene */
		const primitiveType = this.drawMethod(gl);
		const offset = 0;
		const count = this.count();
		gl.drawArrays(primitiveType, offset, count);

		/* Setup option */
	}
}

export default Shape;
