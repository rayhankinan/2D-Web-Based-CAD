import Point from "Operations/point";

enum ConvexHullOrientation {
  COUNTERCLOCKWISE,
  COLLINEAR,
  CLOCKWISE,
}

function orientation(p: Point, q: Point, r: Point): ConvexHullOrientation {
  const [pX, pY] = p.getPair();
  const [qX, qY] = q.getPair();
  const [rX, rY] = r.getPair();

  const val = (qY - pY) * (rX - qX) - (qX - pX) * (rY - qY);

  if (val < 0) {
    return ConvexHullOrientation.COUNTERCLOCKWISE;
  } else if (val > 0) {
    return ConvexHullOrientation.CLOCKWISE;
  } else {
    return ConvexHullOrientation.COLLINEAR;
  }
}

/* TODO: Bisa diganti dengan algoritma Quickhull (sebelumnya menggunakan algoritma Jarvis) */
function convexHull(
  arrayOfPoint: readonly [Point, Point, Point, ...Point[]]
): readonly Point[] {
  const hull: Point[] = [];

  let leftmostIndex = 0;
  for (let i = 1; i < arrayOfPoint.length; i++) {
    const [leftmostX] = arrayOfPoint[leftmostIndex].getPair();
    const [pX] = arrayOfPoint[i].getPair();

    if (pX < leftmostX) leftmostIndex = i;
  }

  let currentIndex = leftmostIndex;
  do {
    hull.push(arrayOfPoint[currentIndex]);

    let newIndex = (currentIndex + 1) % arrayOfPoint.length;
    for (let i = 0; i < arrayOfPoint.length; i++) {
      if (
        orientation(
          arrayOfPoint[currentIndex],
          arrayOfPoint[i],
          arrayOfPoint[newIndex]
        ) === ConvexHullOrientation.COUNTERCLOCKWISE
      )
        newIndex = i;
    }

    currentIndex = newIndex;
  } while (currentIndex !== leftmostIndex);

  return hull;
}

export default convexHull;
