/*
 * Write methods to implement the multiply, subtract, and divide operations for
 * integers. The results of all of these are integers. Use only the add 
 * operator.
 * 
 * ASSUMPTIONS
 * - valid inputs
 * - can use ++ shorthand
 * - can use other functions that use only add operator
 */

// B must be positive integer. A can be any number.
function multiply(A, B) {
  let count = 0;
  let product = 0;

  while (count < B) {
    product += A;
    count++;
  }

  return product;
}

function subtract(A, B) {
  return A + multiply(-1, B);
}

function divide(A, B) {
  let quotient = 0;
  let remaining = A;

  while (remaining > 0) {
    remaining = subtract(remaining, B);
    quotient++;
  }

  return quotient;
}

console.log(42, multiply(6, 7));
console.log(9, subtract(16, 7));
console.log(-6, subtract(1, 7));
console.log(8, divide(24, 3));