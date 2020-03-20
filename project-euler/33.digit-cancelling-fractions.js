/*
The fraction 49/98 is a curious fraction, as an inexperienced
mathematician in attempting to simplify it may incorrectly 
believe that 49/98 = 4/8, which is correct, is obtained by 
cancelling the 9s.

We shall consider fractions like, 30/50 = 3/5, to be trivial 
examples.

There are exactly four non-trivial examples of this type of 
fraction, less than one in value, and containing two digits 
in the numerator and denominator.

If the product of these four fractions is given in its lowest 
common terms, find the value of the denominator.

THOUGHTS
- so no lagging zeros
- brute force check would be ~90*90 = 8.1K ops.
- we need to compare fractional values. rounding errors may be
  problematic given floating point 64. toFixed(15) maybe?
- collect matching numerators and denominators separately, get
  product of each, then find gcd and divide denominator by it
  for the return value
*/
function shareDigit(a, b) {
  const set = new Set([a[0], a[1], b[0], b[1]]);
  return set.size < 4;
}

function divide(a, b) {
  return (Number(a) / Number(b)).toFixed(15);
}

function checkFractions(a, b) {
  let newFractions = [];
  if (a[0] === b[0]) {
    newFractions.push(divide(a[1], b[1]));
  }

  if (a[1] === b[1]) {
    newFractions.push(divide(a[0], b[0]));
  }

  if (a[1] === b[0]) {
    newFractions.push(divide(a[0], b[1]));
  }

  if (a[0] === b[1]) {
    newFractions.push(divide(a[1], b[0]));
  }

  return newFractions;
}

function gcd(a, b) {
  if (a === 0) {
    return b;
  }

  return gcd(b % a, a);
}

function getLowestCommonDenominator(numerators, denominators) {
  const topProduct = [...numerators].reduce((product, n) => product * n, 1);
  const bottomProduct = [...denominators].reduce(
    (product, n) => product * n,
    1
  );

  const greatestCommonDivisor = gcd(topProduct, bottomProduct);
  return bottomProduct / greatestCommonDivisor;
}

function digitCancellingFractions() {
  // Could also multiply immediately instead of collecting values and reducing later
  const numerators = new Set();
  const denominators = new Set();

  // Numerator cannot be larger than 98 b/c largest fraction is 98/99
  for (let numerator = 10; numerator <= 98; numerator++) {
    // Denominator cannot be less than or equal to numerator since value would be >= 1
    for (let denominator = numerator + 1; denominator <= 99; denominator++) {
      const top = String(numerator);
      const bottom = String(denominator);
      const multiplesOfTen = top[1] === "0" && bottom[1] === "0";
      const isInvalid = multiplesOfTen || shareDigit(top, bottom) === false;
      if (isInvalid) {
        continue;
      }

      const value = (numerator / denominator).toFixed(15);
      const newValues = checkFractions(top, bottom);
      if (newValues.includes(value) === false) {
        continue;
      }

      numerators.add(numerator);
      denominators.add(denominator);
    }
  }

  return getLowestCommonDenominator(numerators, denominators);
}

// console.log((0.1 + 0.2).toFixed(15) === (0.3).toFixed(15));
console.log(digitCancellingFractions());
