/*
 * Write methods to implement the multiply, subtract, and divide operations for
 * integers. The results of all of these are integers. Use only the add 
 * operator.
 * 
 * ASSUMPTIONS
 * - valid inputs
 * - can assign variables
 * - can use comparison operators
 * - can use ++ shorthand
 * - can use other functions that use only add operator
 * - not allowed to use Math.abs
 * - not allowed to use minus sign to convert a positive integer to a negative one
 */

// Could optimize by using powers of 2 to reach target faster
function negate(num) {
  const swapSign = num > 0 ? -1 : 1;
  let negatedNum = 0;
  let count = num;

  while (count !== 0) {
    negatedNum += swapSign;
    count += swapSign;
  }

  return negatedNum;
}

function subtract(A, B) {
  return A + negate(B);
}

function multiply(A, B) {
  let toAdd = A;
  let numberOfAdditions = B;

  if (B < 0 && A > 0) {
    toAdd = B;
    numberOfAdditions = A;
  }

  if (B < 0 && A < 0) {
    toAdd = negate(A);
    numberOfAdditions = negate(B);
  }

  let count = 0;
  let product = 0;

  while (count < numberOfAdditions) {
    product += toAdd;
    count++;
  }

  return product;
}

function divide(A, B) {
  if (B == 0) { throw new Error("Cannot divide by 0"); }

  let remaining = A;
  let toSubtract = B;

  if (A < 0) { remaining = negate(A); }
  if (B < 0) { toSubtract = negate(B); }

  let quotient = 0;

  while (remaining > 0) {
    remaining = subtract(remaining, toSubtract);
    quotient++;
  }

  return getSign(A, B) > 0 ? quotient : negate(quotient);
}

function getSign(A, B) {
  return ((A > 0 && B > 0) || (A < 0 && B < 0)) ? 1 : -1;
}

console.log(-5, negate(5));
console.log(6, negate(-6));
console.log(9, subtract(16, 7));
console.log(-6, subtract(1, 7));
console.log(0, multiply(0, 10));
console.log(0, multiply(10, 0));
console.log(0, multiply(0, -3));
console.log(0, multiply(-0, 3));
console.log(0, multiply(3, -0));
console.log(42, multiply(6, 7));
console.log(-42, multiply(-6, 7));
console.log(-42, multiply(6, -7));
console.log(42, multiply(-6, -7));
console.log(8, divide(24, 3));
console.log(0, divide(0, 3));
console.log(-4, divide(-12, 3));
console.log(4, divide(-12, -3));
console.log("Error", divide(24, 0));