function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  console.log(width);
  console.log(height);

  canvas.width = width;
  canvas.height = height;
}

export default resizeCanvasToDisplaySize;
