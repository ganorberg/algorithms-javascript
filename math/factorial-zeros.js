/*
 * Write an algorithm which computes the number of trailing zeros in n factorial.
 */
function trailingZerosInNFactorial(N) {
  /* 
  count prime 5s of current number and all previous numbers
  5, 10, 15 ,20, 30, 35, 40, 45, 55, 60, 65, 70, 80, 85, 90, 95, 105, 110, 115, 120
  25, 50, 75, 100 (150, 175, 200, 225...)
  125 (250, 375, 500)
  (625)
  count 5s from current number, then subtract 5 and count that number, and so on

  To optimize, recognize that you can get number of multiples of each group by
  dividing N by 5, then 25, then 125, and so on. For example, 625 would give
  625/5 = 125 5s, then 625/25 = 25 5s, then 625/125 = 5 5s, then 625/625 = one 5.
  Each group contributes its own 5 to be added.
  */
  let count = 0;
  for (let multipleOf5 = 5; N / multipleOf5 >= 1; multipleOf5 *= 5) {
    count += Math.floor(N / multipleOf5);
  }

  return count;
}

console.log(0, trailingZerosInNFactorial(4));
console.log(1, trailingZerosInNFactorial(5));
console.log(1, trailingZerosInNFactorial(8));
console.log(2, trailingZerosInNFactorial(10));
console.log(2, trailingZerosInNFactorial(14));
console.log(3, trailingZerosInNFactorial(15));
console.log(4, trailingZerosInNFactorial(20));
console.log(31, trailingZerosInNFactorial(125));
console.log(62, trailingZerosInNFactorial(250));
console.log(156, trailingZerosInNFactorial(625));
