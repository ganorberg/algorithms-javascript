/*
 * Given two squares on a 2D plane, find a line that would cut these 2 squares 
 * in half. Assume that the top and the bottom sides of the square run parallel 
 * to the x-axis.
 * 
 * ASSUMPTIONS
 * - squares are received as objects with top, bottom, left and right properties
 * - line means extends infinitely and is not line segment
 * - allow infinite slope if dividing by 0, meaning vertical line cuts squares
 *   in half
 */
class Line {
  // Give data for line in point-slope form: y - y1 = m(x - x1)
  constructor(point, slope) {
    this.point = point;
    this.slope = slope;
  }
}

class Square {
  constructor(left, right, top, bottom) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }
}

function bisectSquares(s1, s2) {
  const center1 = getCenter(s1);
  const center2 = getCenter(s2);

  if (JSON.stringify(center1) === JSON.stringify(center2)) {
    return new Line(center1, "any");
  }

  // Allow infinite slope
  const slope = (center1[1] - center2[1]) / (center1[0] - center2[0]);
  return new Line(center1, slope);
}

function getCenter(square) {
  return [average(square.left, square.right), average(square.top, square.bottom)];
}

function average(n1, n2) {
  return (n1 + n2) / 2;
}

console.log('point: [1, 1], slope: 1', bisectSquares(new Square(0, 2, 2, 0), new Square(3, 6, 6, 3)));
console.log('point: [1, 1], slope: any', bisectSquares(new Square(0, 2, 2, 0), new Square(0, 2, 2, 0)));
console.log('point: [1, 1], slope: infinite', bisectSquares(new Square(0, 2, 2, 0), new Square(0, 2, 4, 2)));
console.log('point: [103.5, 3.5], slope: really small', bisectSquares(new Square(100, 107, 7, 0), new Square(0, 2, 4, 2)));
