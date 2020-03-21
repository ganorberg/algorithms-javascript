/*
The arithmetic sequence, 1487, 4817, 8147, in which 
each of the terms increases by 3330, is unusual in 
two ways: (i) each of the three terms are prime, and, 
(ii) each of the 4-digit numbers are permutations of 
one another.

There are no arithmetic sequences made up of three 
1-, 2-, or 3-digit primes, exhibiting this property, 
but there is one other 4-digit increasing sequence.

What 12-digit number do you form by concatenating the 
three terms in this sequence?

THOUGHTS
- search space limited to 1K-10K exclusive
- generate primes in that search space
- since need three 4-digit numbers, largest arithmetic 
  difference is 4.5K exclusive (1K + 4.5K + 4.5K = 10K)
- smallest arithmetic difference is likely larger than 1,
  but let's use that since doesn't affect time too much
- use isPrime and hasSameDigits helpers
- for each prime in search space, try all arithmetic
  differences from 1-4,499. if second value is prime and
  has same digits, try third. if third matches, return
  concat of all 3.
- worst case time complexity will be number of primes 
  between 1 and 10K * 4500 * 4 * 3, so maybe 1K*54K = 54M ops
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

function generatePrimes(start, stop) {
  const primes = [];
  let n = start;
  while (n < stop) {
    if (isPrime(n)) {
      primes.push(n);
    }

    n += 2;
  }

  return primes;
}

function checkDigitsMatch(a, b) {
  const digitCounts = new Map();
  const aString = a.toString();
  const bString = b.toString();
  Array.from(aString).forEach(digit => {
    if (digitCounts.has(digit)) {
      const count = digitCounts.get(digit);
      digitCounts.set(digit, count + 1);
    } else {
      digitCounts.set(digit, 1);
    }
  });

  for (let i = 0; i < bString.length; i++) {
    const digit = bString[i];
    if (digitCounts.has(digit) === false) {
      return false;
    }

    const count = digitCounts.get(digit);
    digitCounts.set(digit, count - 1);
  }

  for (let [digit, count] of digitCounts) {
    if (count !== 0) {
      return false;
    }
  }

  return true;
}

function primePermutations() {
  const primes = generatePrimes(1_001, 10_000);
  for (let primeIndex = 0; primeIndex < primes.length; primeIndex++) {
    const prime = primes[primeIndex];

    // Ignore example sequence in problem
    if (prime === 1487) {
      continue;
    }

    for (let difference = 1; difference <= 4_499; difference++) {
      const second = prime + difference;
      if (isPrime(second) === false) {
        continue;
      }

      const matchesSecond = checkDigitsMatch(prime, second);
      if (matchesSecond === false) {
        continue;
      }

      const third = second + difference;
      if (isPrime(third) === false) {
        continue;
      }

      const matchesThird = checkDigitsMatch(prime, third);
      if (matchesThird) {
        return prime.toString() + second.toString() + third.toString();
      }
    }
  }
}

console.log(primePermutations());
