/*
Let d(n) be defined as the sum of proper divisors 
of n (numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b 
are an amicable pair and each of a and b are called 
amicable numbers.

For example, the proper divisors of 220 are 1, 2, 4, 
5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284.
The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

Evaluate the sum of all the amicable numbers under 10000.

THOUGHTS
- never heard of this concept. interesting.
- need efficient way to see if 2 numbers are amicable. 
  If I brute force compared all 10,000 numbers with 
  each other, that's 9999+9998+9997...+1 which is an
  arithmetic series. Sum is n(1 + n)/2, so O(n^2) ~ 100M ops.
  Unless we have constant time comparison, too slow.
- instead, let's first collect proper divisors for all 
  values 1-10,000. we can use hash map where key is sum of 
  proper divisors and value is array of original values.
  At end, we simply loop through hash map values and sum any
  with length > 1.
- time complexity: getting proper divisors for number n costs
  sqrt(n), so if we check 10,000 then 10,000sqrt(10,000) + 10000
  worst case estimate ~ 1M ops. 
*/
// Assume input is positive integers only
function getProperDivisors(n) {
  if (n === 1) {
    return [];
  }

  let divisors = [];
  const squareRoot = Math.sqrt(n);
  for (let i = 2; i < squareRoot; i++) {
    if (n % i === 0) {
      divisors.push(i);
    }
  }

  const otherDivisors = divisors.map(factor => n / factor);
  const properDivisors = [1, ...divisors, ...otherDivisors];
  if (Number.isInteger(squareRoot)) {
    properDivisors.push(squareRoot);
  }

  return properDivisors;
}

function buildDivisorMap() {
  const mapProperDivisorSums = {};
  for (let n = 1; n < 10_000; n++) {
    const properDivisors = getProperDivisors(n);
    const sum = properDivisors.reduce((total, num) => total + num, 0);
    if (mapProperDivisorSums.hasOwnProperty(sum)) {
      mapProperDivisorSums[sum].push(n);
    } else {
      mapProperDivisorSums[sum] = [n];
    }
  }

  return mapProperDivisorSums;
}

function amicableNumbers() {
  const mapProperDivisorSums = buildDivisorMap();
  let amicable = [];
  Object.entries(mapProperDivisorSums).forEach(([divisorSum, numbers]) => {
    const divisorSumNumber = Number(divisorSum);
    numbers.forEach(num => {
      if (
        num !== divisorSumNumber &&
        mapProperDivisorSums.hasOwnProperty(num) &&
        mapProperDivisorSums[num].includes(divisorSumNumber)
      ) {
        amicable.push(num, divisorSumNumber);
      }
    });
  });

  // Divide by 2 to cover duplicates instead of checking in loop
  return amicable.reduce((total, num) => total + num, 0) / 2;
}

console.log(amicableNumbers());
