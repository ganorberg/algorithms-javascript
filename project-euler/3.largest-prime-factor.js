/*
The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600_851_475_143?

THOUGHTS
- factors have % === 0
- prime means no factors other than self and 1 (unless < 2). 
- generate list of prime numbers, then loop through those with % on input.
- how to generate prime numbers efficiently? 
- even numbers beside 2 out
- divide remaining by odds
- repeat until square root since one pair of factors found by then
- derive rest
*/
function getFactors(n) {
  const rootFactors = [];
  const squareRoot = Math.sqrt(n);
  for (let i = 1; i <= Math.floor(squareRoot); i++) {
    if (n % i === 0) {
      rootFactors.push(i);
    }
  }

  const derivedFactors = rootFactors.map(factor => n / factor);
  const factors = [...rootFactors, ...derivedFactors];

  // Avoid duplication from derived. Cheaper than checking in loops or filtering array.
  if (Number.isInteger(squareRoot)) {
    factors.push(squareRoot);
  }

  return factors;
}

function isPrime(n) {
  if (n < 2) {
    return false;
  }

  if (n === 2) {
    return true;
  }

  // Evens aside from 2 cannot be prime b/c they divide by 2
  if (n % 2 === 0) {
    return false;
  }

  // Only check odds for above reason
  for (let i = 3; i <= Math.floor(Math.sqrt(n)); i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function getLargestPrimeFactor(n) {
  if (n < 2) {
    return false;
  }

  const factors = getFactors(n);
  factors.sort((a, b) => b - a);
  console.log(factors);

  for (let i = 0; i < factors.length; i++) {
    const factor = factors[i];
    if (isPrime(factor)) {
      return factor;
    }
  }
}

console.log(getLargestPrimeFactor(6));

// Didn't work because filled array is too large for memory. Would need Segmented Sieve.
// function simpleSieve(limit) {
//   const prime = new Array(limit).fill(true);
//   for (let p = 2; p * p < limit; p++) {
//     if (prime[p] === true) {
//       for (i = p * p; i < limit; i += p) {
//         prime[i] = false;
//       }
//     }
//   }

//   let primes = [];
//   for (let i = 2; i < prime.length; i++) {
//     const bool = prime[i];
//     if (bool === true) {
//       primes.push(i);
//     }
//   }

//   return primes;
// }
