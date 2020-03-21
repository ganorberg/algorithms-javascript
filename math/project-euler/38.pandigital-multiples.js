/*
Take the number 192 and multiply it by each of 1, 2, and 3:

192 × 1 = 192
192 × 2 = 384
192 × 3 = 576
By concatenating each product we get the 1 to 9 pandigital, 
192384576. We will call 192384576 the concatenated product 
of 192 and (1,2,3)

The same can be achieved by starting with 9 and multiplying 
by 1, 2, 3, 4, and 5, giving the pandigital, 918273645, 
which is the concatenated product of 9 and (1,2,3,4,5).

What is the largest 1 to 9 pandigital 9-digit number that 
can be formed as the concatenated product of an integer 
with (1,2, ... , n) where n > 1?

THOUGHTS
- brute force would be to check all numbers from 1 to limit, multiply
  each by 1-9 with sums, and see if pandigital. if so, compare to max.
  return max.
- limit has less than 5 digits since 10K * 1 + 10K * 2 concats to 10
  digits. so let's say 9,999.
- concatentation is same as saying all products have unique digits 1-9, so
  can track total length === 9 then full set of digits or false. no need
  to incur concatenation costs until end when need to know largest pandigital.
- so for each pandigital found, need to also track what we multiplied it by
  to find largest concatenated product in the end.
- time complexity to find pandigital products would be 9*10K. then finding
  largest product would cost number of pandigitals * number of integers
  multiplied, which is likely less than 90K.
- need to filter out any products with 0s since not included in pandigital range.
*/
function checkUniqueDigits(str) {
  const unique = new Set();
  for (let i = 0; i < str.length; i++) {
    const digit = str[i];
    unique.add(digit);
  }

  return unique.size === str.length;
}

function largestPandigitalMultiples() {
  let max = -Infinity;

  for (let n = 1; n <= 9_999; n++) {
    let concatenatedProduct = "";
    for (let i = 1; i <= 9; i++) {
      const product = n * i;
      const stringProduct = String(product);
      if (Array.from(stringProduct).includes("0")) {
        break;
      }

      concatenatedProduct += stringProduct;
      const hasUniqueDigits = checkUniqueDigits(concatenatedProduct);
      const isValid = hasUniqueDigits && concatenatedProduct.length <= 9;
      if (isValid === false) {
        break;
      }

      if (concatenatedProduct.length === 9) {
        max = Math.max(max, Number(concatenatedProduct));
      }
    }
  }

  return max;
}

console.log(largestPandigitalMultiples());
