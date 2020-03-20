/*
Triangle, pentagonal, and hexagonal numbers are generated 
by the following formulae:

Triangle	 	Tn=n(n+1)/2	 	 1, 3, 6, 10, 15, ...
Pentagonal	Pn=n(3n−1)/2	 1, 5, 12, 22, 35, ...
Hexagonal	 	Hn=n(2n−1)	 	 1, 6, 15, 28, 45, ...
It can be verified that T285 = P165 = H143 = 40755.

Find the next triangle number that is also pentagonal 
and hexagonal.

THOUGHTS
- probably a math way to solve, but let's brute force
- can write helpers with formula for each and return first
  number that matches all 3.
- time complexity n, where n is matching digit. can speed up
  by only checking triangle numbers.
*/
function* generateTriangleNumbers() {
  // start after term in problem
  let n = 286;
  while (true) {
    yield (n * (n + 1)) / 2;
    n++;
  }
}

const solveQuadraticFormula = (a, b, c) =>
  (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);

function isPentagonal(term) {
  // 0 = 3n^2 - n - 2t, so a = 3, b = -1, c = -2t
  const value = solveQuadraticFormula(3, -1, -2 * term);
  return Number.isInteger(value);
}

function isHexagonal(term) {
  // 0 = 2n ^ 2 - n - t, so a = 2, b = -1, c = -t
  const value = solveQuadraticFormula(2, -1, -term);
  return Number.isInteger(value);
}

function solution() {
  const triangleNumberGenerator = generateTriangleNumbers();
  while (true) {
    const triangleNumber = triangleNumberGenerator.next().value;
    if (isPentagonal(triangleNumber) && isHexagonal(triangleNumber)) {
      return triangleNumber;
    }
  }
}

console.log(solution());
