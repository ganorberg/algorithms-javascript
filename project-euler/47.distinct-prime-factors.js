/*
The first two consecutive numbers to have two
distinct prime factors are:

14 = 2 × 7
15 = 3 × 5

The first three consecutive numbers to have 
three distinct prime factors are:

644 = 2² × 7 × 23
645 = 3 × 5 × 43
646 = 2 × 17 × 19.

Find the first four consecutive integers to 
have four distinct prime factors each. What 
is the first of these numbers?

THOUGHTS
- what is the most efficient way to do prime factorization?
- can use set to dedup prime factors
- brute force is loop all numbers, calculate prime factors
  for that number and the 3 numbers ahead of it, each time
  checking if 4 distinct prime factors. store values along
  way and dump if any false.
- should probably precompute primes up to some limit.
- all numbers > 1 can break all factors into prime factors. so 
  prime factorization would include a binary search on primes for
  values < half number then look for divisors. when one is found,
  divide by that divisor and repeat until down to 1.
- could also keep dividing a number by small primes until none
  divide in that are > sqrt(n). e.g. for 5678, divide by 2 = 2839,
  so store 2. now doesn't divide by 2, so divide by 3. doesn't work,
  so try 5, 7, 11, 13, 15, finally 17 works. store 17 and divide to
  get 167. repeat and find that no primes divide in and 13 > sqrt(167), 
  so 167 is prime. therefore the prime factors of 5678 are 2, 17, 167.
  we didn't get 4 unique factors, so move on to 5679.
- how store enough primes? could guess or detect when need more based
  on last prime and number's square root.
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

function* generatePrimes() {
  yield 2;
  let n = 3;
  while (true) {
    if (isPrime(n)) {
      yield n;
    }

    n += 2;
  }
}

function getPrimeFactors(n, primes, primeGenerator) {
  const primeFactors = new Set();

  // Make sure enough primes to divide by
  let lastPrime = primes[primes.length - 1];
  while (lastPrime < Math.sqrt(n)) {
    const nextPrime = primeGenerator.next().value;
    lastPrime = nextPrime;
    primes.push(nextPrime);
  }

  // Collect factors
  let value = n;
  while (value > 1) {
    if (isPrime(value)) {
      primeFactors.add(value);
      break;
    }

    for (let i = 0; i < primes.length; i++) {
      const prime = primes[i];
      if (value % prime === 0) {
        primeFactors.add(prime);
        value = value / prime;
        break;
      }
    }
  }

  return primeFactors;
}

function distinctPrimeFactors() {
  const primeGenerator = generatePrimes();

  // Mutated in getPrimeFactors to efficiently generate only
  // the primes necessary for each value
  const primes = [primeGenerator.next().value];
  const FIRST_POSSIBLE_INTEGER = 647;
  let n = FIRST_POSSIBLE_INTEGER;
  let consecutive = [];
  while (consecutive.length < 4) {
    const primeFactors = getPrimeFactors(n, primes, primeGenerator);
    if (primeFactors.size === 4) {
      consecutive.push(n);
    } else {
      consecutive = [];
    }

    n++;
  }

  return consecutive[0];
}

console.log(distinctPrimeFactors());
