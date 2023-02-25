function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(rgba: readonly [number, number, number, number]) {
  return (
    "#" +
    componentToHex(rgba[0]) +
    componentToHex(rgba[1]) +
    componentToHex(rgba[2])
  );
}

function hexToRgb(hex: string): readonly [number, number, number, number] {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b, 1];
}

export { rgbToHex, hexToRgb };
