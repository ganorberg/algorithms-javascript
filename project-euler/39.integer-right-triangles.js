/*
If p is the perimeter of a right angle triangle 
with integral length sides, {a,b,c}, there are 
exactly three solutions for p = 120.

{20,48,52}, {24,45,51}, {30,40,50}

For which value of p ≤ 1000, is the number of 
solutions maximised?

THOUGHTS
- can track max and value during calculations. otherwise, use
  max priority queue.
- how know right triangle? pythag says a^2 + b^2 = c^2, so we
  could loop a and b then check if c is integer
- could collect all right triangle solutions up to limit in hash map
  where key is p and value is array of solutions. at end, return
  key with longest value.
- if max p is 1000, then what is max side length? sum of two sides of
  triangle must be greater than third. in right triangle, hypotenuse
  is always the longest side. so if the hypotenuse is half p at 500, 
  the other two sides only add to 500, which cannot create a triangle. 
  so hypot must be < 500 and sides can range from 1-500ish.
- brute force loop a and b through 500 each, that's 500*500 = 250K ops.
*/
function getHypotenuse(a, b) {
  const sum = Math.pow(a, 2) + Math.pow(b, 2);
  const c = Math.sqrt(sum);
  return c;
}

function getKeyWithLongestValue(map) {
  let solution = {
    max: -Infinity,
    sum: null
  };

  map.forEach((value, key) => {
    if (value.length > solution.max) {
      solution.max = value.length;
      solution.sum = key;
    }
  });

  return solution.sum;
}

function integerRightTriangles() {
  const map = new Map();
  for (let a = 1; a < 500; a++) {
    for (let b = a + 1; b < 500; b++) {
      const c = getHypotenuse(a, b);
      if (Number.isInteger(c) === false) {
        continue;
      }

      const sum = a + b + c;
      if (sum > 1000) {
        continue;
      }

      if (map.has(sum)) {
        map.get(sum).push([a, b, c]);
      } else {
        map.set(sum, [[a, b, c]]);
      }
    }
  }

  return getKeyWithLongestValue(map);
}

console.log(integerRightTriangles());
