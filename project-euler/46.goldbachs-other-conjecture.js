/*
It was proposed by Christian Goldbach that every odd 
composite number can be written as the sum of a prime 
and twice a square.

9 = 7 + 2×1^2
15 = 7 + 2×2^2
21 = 3 + 2×3^2
25 = 7 + 2×3^2
27 = 19 + 2×2^2
33 = 31 + 2×1^2

It turns out that the conjecture was false.

What is the smallest odd composite that cannot be 
written as the sum of a prime and twice a square?

THOUGHTS
- primes and squares are always positive, so no negatives
- 1 is not odd composite
- generate odd composites, primes, and double squares up to 
  some point, then loop odd composites checking all permutations
  of sums between primes and double squares for values < odd
  composite.
- time complexity: number of odd composites * number of primes * 
  number of double squares
- we can generate primes and double squares as we climb odd
  composites so that aren't needlessly generating values
- since primes are always odd, perhaps we can speed up by
  co-generating primes and composite odds
- so have next prime and double square ready, if less than
  odd composite, add to list. repeat.
- first odd composite is 9. first prime is 2. first double square
  is 2.
- so make primes until reach 9: 2, 3, 5, 7, not 11. make double
  squares until reach 9: 2, 8, not 18.
- check { 2, 3, 5, 7 } + 2 * { 2, 8 }. see 7 + 2 = 9, so keep going.
- 11 and 13 are prime, so add them to primes then check 15. check
  to fill double squares, but 16 > 15, so do nothing. Try 
  { primes } + { double squares }. repeat.
- build as arrays since can quickly append and use for loop with
  early return
*/
function getDoubleSquaresSmallerThan(n, squareBase) {
  const results = [];
  let base = squareBase;
  let doubleSquare = 2 * Math.pow(base, 2);
  while (doubleSquare < n) {
    results.push(doubleSquare);
    base++;
    doubleSquare = 2 * Math.pow(base, 2);
  }

  return results;
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

function checkSum(odd, primes, doubleSquares) {
  for (let primeIndex = 0; primeIndex < primes.length; primeIndex++) {
    for (
      let doubleSquareIndex = 0;
      doubleSquareIndex < doubleSquares.length;
      doubleSquareIndex++
    ) {
      if (odd === primes[primeIndex] + doubleSquares[doubleSquareIndex]) {
        return true;
      }
    }
  }

  return false;
}

function disproveGoldbach() {
  const primes = [2, 3, 5, 7];
  const doubleSquares = [2];
  let odd = 9;
  while (true) {
    if (isPrime(odd)) {
      primes.push(odd);
      odd += 2;
      continue;
    }

    const moreDoubleSquares = getDoubleSquaresSmallerThan(
      odd,
      doubleSquares.length + 1
    );

    // if empty array, no values get pushed
    doubleSquares.push(...moreDoubleSquares);
    const hasSum = checkSum(odd, primes, doubleSquares);
    if (hasSum === false) {
      return odd;
    }

    odd += 2;
  }
}

console.log(disproveGoldbach());
