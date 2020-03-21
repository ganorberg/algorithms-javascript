/*
The number, 197, is called a circular prime because 
all rotations of the digits: 197, 971, and 719, are themselves prime.

There are thirteen such primes below 100: 2, 3, 5, 
7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

How many circular primes are there below one million?

THOUGHTS
- brute force would be isPrime cost * number of digits in n * 1M. so about
  (1/3)sqrt(1M) * 1M * 6 = 2B ops.
- could precompute primes to speed up main process by isPrime cost, leaving 6M ops.
- if chance of prime is ~1/ln(n), then we would collect ~1/ln(1M) * 1M = ~72K primes.
  that will fit comfortably in a Set that we can use to check primes in constant time.
- brute force loops up to limit creating all rotations and checking if in prime set.
- do 197, 971, and 719 each add 1 to number of circular primes? I think so. we could
  potentially save compute by adding all 3 to circular primes set and checking if
  already in set, but let's try without first since cost might be greater than gain.
- for 109 -> 910 -> 091, does 091 count even though leads with 0? I think so.
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

function generatePrimes(exclusiveLimit) {
  const primes = new Set();
  for (let n = 2; n < exclusiveLimit; n++) {
    if (isPrime(n)) {
      primes.add(n);
    }
  }

  return primes;
}

function getRotations(n) {
  const digits = n.toString();
  const rotations = [digits];

  // e.g. 3 digit number has 3 rotations, so loop twice
  while (rotations.length < digits.length) {
    // e.g. 971 becomes 1 + 97 = 197
    const lastValue = rotations[rotations.length - 1];
    const newRotation =
      lastValue[lastValue.length - 1] +
      lastValue.slice(0, lastValue.length - 1);
    rotations.push(newRotation);
  }

  return rotations.map(num => Number(num));
}

function getCircularPrimes(exclusiveLimit) {
  const primes = generatePrimes(exclusiveLimit);
  const circularPrimes = new Set();
  for (let n = 2; n < exclusiveLimit; n++) {
    if (primes.has(n) === false) {
      continue;
    }

    const rotations = getRotations(n);
    const hasAllPrimes = rotations.every(rotation => primes.has(rotation));
    if (hasAllPrimes === false) {
      continue;
    }

    circularPrimes.add(n);
  }

  return circularPrimes.size;
}

console.log(getCircularPrimes(1_000_000));
