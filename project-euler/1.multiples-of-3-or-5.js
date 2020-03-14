/*
If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.

Assume:
- input >= 1
*/
function sumMultiplesOf3Or5(ceiling) {
  let sum = 0;
  for (let n = 1; n < ceiling; n++) {
    if (n % 3 === 0 || n % 5 === 0) {
      sum += n;
    }
  }

  return sum;
}

console.log(sumMultiplesOf3Or5(1000));
