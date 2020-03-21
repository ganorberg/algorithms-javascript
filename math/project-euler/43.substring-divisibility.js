/*
The number, 1406357289, is a 0 to 9 pandigital 
number because it is made up of each of the 
digits 0 to 9 in some order, but it also has 
a rather interesting sub-string divisibility 
property.

Let d1 be the 1st digit, d2 be the 2nd digit, 
and so on. In this way, we note the following:

d2d3d4=406 is divisible by 2
d3d4d5=063 is divisible by 3
d4d5d6=635 is divisible by 5
d5d6d7=357 is divisible by 7
d6d7d8=572 is divisible by 11
d7d8d9=728 is divisible by 13
d8d9d10=289 is divisible by 17

Find the sum of all 0 to 9 pandigital numbers 
with this property.

THOUGHTS
- by "this property," I assume they mean digits 2-4 are
  divisible by 2, 3-5 by 3, 4-6 by 5... 8-10 by 17.
- generate all 10-digit pandigital numbers with heap's
  permutation algorithm, then loop digits 3 at a time 
  from index 2. Use % to see if divisible by each number. 
  if all yes, add to sum. return sum.
- assume leading zero doesn't count as 0 for pandigital
- time complexity will be 10*10! = 36,288,000 ops.
*/
const isEven = n => n % 2 === 0;
function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

function heapPermutations(digits) {
  const permutations = [];

  function getPermutations(n) {
    if (n === 1) {
      const completePermutation = digits.join("");
      permutations.push(completePermutation);
      return;
    }

    for (let i = 0; i < n; i++) {
      getPermutations(n - 1);
      const toSwap = isEven(n) ? i : 0;
      swap(digits, toSwap, n - 1);
    }
  }

  getPermutations(digits.length);
  return permutations;
}

function generatePandigitals(digits) {
  return heapPermutations(digits).filter(permutation => permutation[0] !== "0");
}

function checkDivisibility(stringNum) {
  const divisors = [2, 3, 5, 7, 11, 13, 17];
  for (let i = 1; i <= 7; i++) {
    const threeDigits = stringNum[i] + stringNum[i + 1] + stringNum[i + 2];
    const isDivisible = Number(threeDigits) % divisors[i - 1] === 0;
    if (isDivisible === false) {
      return false;
    }
  }

  return true;
}

function substringDivisibility() {
  const pandigitals = generatePandigitals([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  return pandigitals
    .filter(checkDivisibility)
    .reduce((sum, stringNum) => sum + Number(stringNum), 0);
}

console.log(substringDivisibility());
