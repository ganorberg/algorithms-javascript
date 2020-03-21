/*
The number 3797 has an interesting property. Being 
prime itself, it is possible to continuously remove 
digits from left to right, and remain prime at each 
stage: 3797, 797, 97, and 7. Similarly we can work 
from right to left: 3797, 379, 37, and 3.

Find the sum of the only eleven primes that are both 
truncatable from left to right and right to left.

NOTE: 2, 3, 5, and 7 are not considered to be 
truncatable primes.

THOUGHTS
- brute force need to know when to stop
- can precompute primes up to limit then chop one by one. 
- know 5 from problem statement: 3797, 797, 97, 379, 37
- since always left with single digit at ends, and those must
  be prime, we can skip values that don't lead with 
  2, 3, 5, 7 or lag with 3, 7. Cannot lag w/ 2 or 5 b/c they always
  divide into numbers ending in 2 or 5, making them non-prime. so
  truncatable primes cannot have a 2 or 5 anywhere but in front.
- cannot have non-2 even numbers anywhere, then, since a chopped off
  number with that even number at the end will not be prime. this 
  leaves the following options:
  - leading: 2, 3, 5, 7 
  - middle: 1, 3, 7, 9
  - lagging: 3, 7
- what is stopping a really long number, like 23197979317, from being a
  truncating prime? the bigger it gets, more possible divisors. but 
  doesn't tell us exactly when to stop.
- we know there are 11 truncatable primes, so we can build with these
  rules until we find 11 values.
- start with leading numbers as seeds, then apply all permutations of 
  middle digits (including none), and always end by adding a lagging digit.
  run that value through a truncate checker that uses an isPrime helper and
  store if all prime. stop at 11 stored.
*/
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

// Could also use number % 10, probably faster
function checkTruncatablePrime(numString) {
  let chopRight = numString;
  while (chopRight.length > 0) {
    if (isPrime(Number(chopRight)) === false) {
      return false;
    }

    chopRight = chopRight.slice(0, chopRight.length - 1);
  }

  let chopLeft = numString;
  while (chopLeft.length > 0) {
    if (isPrime(Number(chopLeft)) === false) {
      return false;
    }

    chopLeft = chopLeft.slice(1);
  }

  return true;
}

function sumTruncatablePrimes() {
  const start = ["2", "3", "5", "7"];
  const middle = ["1", "3", "7", "9"];
  const end = ["3", "7"];
  const truncatablePrimes = new Set();
  function build(seed) {
    const first = seed + end[0];
    const second = seed + end[1];
    const isfirstTruncatablePrime = checkTruncatablePrime(first);
    if (isfirstTruncatablePrime) {
      truncatablePrimes.add(first);
    }

    const isSecondTruncatablePrime = checkTruncatablePrime(second);
    if (isSecondTruncatablePrime) {
      truncatablePrimes.add(second);
    }

    for (let i = 0; i < middle.length; i++) {
      // Guessed max seed length. Need this or recursion continues on
      // first branch forever. So shouldn't use recursion for this.
      if (truncatablePrimes.size === 11 || seed.length > 7) {
        return;
      }

      const digit = middle[i];
      build(seed + digit);
    }
  }

  start.forEach(build);

  return [...truncatablePrimes].reduce((total, n) => total + Number(n), 0);
}

console.log(sumTruncatablePrimes());
