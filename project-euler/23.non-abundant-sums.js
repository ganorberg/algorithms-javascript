/*
A perfect number is a number for which the sum 
of its proper divisors is exactly equal to the 
number. For example, the sum of the proper 
divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28,
which means that 28 is a perfect number.

A number n is called deficient if the sum of its 
proper divisors is less than n and it is called 
abundant if this sum exceeds n.

As 12 is the smallest abundant number, 1 + 2 + 
3 + 4 + 6 = 16, the smallest number that can be 
written as the sum of two abundant numbers is 24. 
By mathematical analysis, it can be shown that all 
integers greater than 28123 can be written as the 
sum of two abundant numbers. However, this upper 
limit cannot be reduced any further by analysis 
even though it is known that the greatest number 
that cannot be expressed as the sum of two abundant 
numbers is less than this limit.

Find the sum of all the positive integers which 
cannot be written as the sum of two abundant numbers.

THOUGHTS
- never heard of perfect, deficient, or abundant numbers but makes sense
- need method to determine which category a number falls into. brute
  force is just get proper divisors, add, and compare. Costs sqrt(n).
- range to compare sum of two abundant numbers is 1-28123 inclusive
- probably need complement map to check difference with abundant numbers
  in constant time. so get all abundant numbers up to 28123 - 12 = 28111
  since 12 is smallest abundant number and any abundant number after 28111
  will add with 12 to > 28123.
- not sure how long list of abundant numbers will be. let's say 10000. 
  building abundant set will then cost 10K * sqrt(10K) ~ 1M ops.
- once set is built, main operation will cost 28K * 10K ~ 28M ops.
*/
function getProperDivisors(n) {
  if (n <= 1) {
    return [];
  }

  const earlyDivisors = [];
  const squareRoot = Math.sqrt(n);
  for (let i = 2; i < squareRoot; i++) {
    if (n % i === 0) {
      earlyDivisors.push(i);
    }
  }

  const lateDivisors = earlyDivisors.map(divisor => n / divisor);
  const properDivisors = [1, ...earlyDivisors, ...lateDivisors];
  if (Number.isInteger(squareRoot)) {
    properDivisors.push(squareRoot);
  }

  return properDivisors;
}

function isAbundant(n) {
  const properDivisors = getProperDivisors(n);
  const sum = properDivisors.reduce((total, divisor) => total + divisor, 0);
  return sum > n;
}

function buildAbundantSet() {
  const abundant = new Set();
  for (let n = 2; n <= 28111; n++) {
    if (isAbundant(n)) {
      abundant.add(n);
    }
  }

  return abundant;
}

// Pass in set so only build once in main function
function checkAbundantSum(n, abundantSet) {
  for (const abundantNumber of abundantSet) {
    // a1 + a2 = n, so if n is smaller than either, not possible so short-circuit.
    // Assumes set loops in ascending order. If not, remove this condition.
    if (n < abundantNumber) {
      return false;
    }

    const complement = n - abundantNumber;
    if (abundantSet.has(complement)) {
      return true;
    }
  }

  return false;
}

function nonAbundantSums() {
  const noAbundantSum = [];
  const abundantSet = buildAbundantSet();
  for (let n = 1; n <= 28123; n++) {
    const hasAbundantSum = checkAbundantSum(n, abundantSet);
    if (hasAbundantSum === false) {
      noAbundantSum.push(n);
    }
  }

  return noAbundantSum.reduce((total, num) => total + num, 0);
}

console.log(nonAbundantSums());
