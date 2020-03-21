/*
The sum of the squares of the first ten natural numbers is: 
1^2+2^2+...+10^2=385

The square of the sum of the first ten natural numbers is: 
(1+2+...+10)^2=55^2=3025

Hence the difference between the sum of the squares of the 
first ten natural numbers and the square of the sum is 
3025−385=2640.

Find the difference between the sum of the squares of the 
first one hundred natural numbers and the square of the sum.
*/
function sumOfSquares() {
  let sum = 0;
  for (let i = 1; i <= 100; i++) {
    sum += Math.pow(i, 2);
  }

  return sum;
}

function squareOfSums() {
  let sum = 0;
  for (let i = 1; i <= 100; i++) {
    sum += i;
  }

  return Math.pow(sum, 2);
}

function sumSquareDifference() {
  const sumSquares = sumOfSquares();
  const squareSums = squareOfSums();
  return Math.abs(sumSquares - squareSums);
}

console.log(sumSquareDifference());
