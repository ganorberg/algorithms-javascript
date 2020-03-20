/*
We shall say that an n-digit number is pandigital 
if it makes use of all the digits 1 to n exactly 
once. For example, 2143 is a 4-digit pandigital 
and is also prime.

What is the largest n-digit pandigital prime that 
exists?

THOUGHTS
- probably 9 digits, but might not be
- can create all primes up to 9 digits then filter, or
  create all numbers up to 9 digits with 1-n then filter for
  primes. 
- creating all 9 digit numbers with 1-9 costs 9 * 9! = 3.2M.
  then can sort those in descending order, which costs nlogn = 
  3.2M * log3.2M = 3.2M * 21.6 = 69M. finally, loop with
  isPrime check, which costs 9!*sqrt(9!) = 216M worst
  case. but will finish early given descending order.
- creating all primes with 9 digits costs a loop from
  1M to 10M with isPrime check, meaning 9M * sqrt(9M) =
  27B, so way too slow.
- generate permutations w/ heap's magical algorithm
- if none in 9, try 8, then 7, etc.
*/
const isEven = n => n % 2 === 0;
function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

function isPrime(n) {
  if (n < 2) {
    return false;
  }

  if (n === 2 || n === 3) {
    return true;
  }

  if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }

  let step = 4;
  for (let i = 5; i <= Math.sqrt(n); i += step) {
    if (n % i === 0) {
      return false;
    }

    step = 6 - step;
  }

  return true;
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
  return permutations.map(Number);
}

function pandigitalPrime() {
  const originalDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let digits = [...originalDigits];
  while (digits.length > 0) {
    const permutations = heapPermutations(digits);
    const sorted = permutations.sort((a, b) => b - a);
    for (let i = 0; i < sorted.length; i++) {
      const pandigital = sorted[i];
      if (isPrime(pandigital)) {
        return pandigital;
      }
    }

    // if no pandigital primes with 9 digits, try 8, then 7, then 6, etc.
    originalDigits.pop();
    digits = [...originalDigits];
  }
}

console.log(pandigitalPrime());
