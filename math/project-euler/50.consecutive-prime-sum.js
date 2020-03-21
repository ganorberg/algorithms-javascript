/*
The prime 41, can be written as the sum of six 
consecutive primes:

41 = 2 + 3 + 5 + 7 + 11 + 13
This is the longest sum of consecutive primes 
that adds to a prime below one-hundred.

The longest sum of consecutive primes below 
one-thousand that adds to a prime, contains 
21 terms, and is equal to 953.

Which prime, below one-million, can be written 
as the sum of the most consecutive primes?

THOUGHTS
- made it to problem 50 hooray!
- precompute primes up to 1M exclusive. time and space 
  cost with sieve is 1M. can array hold 1M? yes.
- 78,498 primes below 1M
- brute force is to add all sequences of all lengths and
  check all sums while tracking sequence length. starting
  at 2, that's ~78K^2/2 = 3B ops. too slow.
- can improve speed dramatically by stopping when sum is
  larger than largest prime 999,983. maybe 90% faster?
- can also find where adjacent terms are greater than
  largest prime and stop there
*/
function getNextPrimeIndex(primes, index) {
  for (let primeIndex = index + 1; primeIndex < primes.length; primeIndex++) {
    const maybePrime = primes[primeIndex];
    if (maybePrime !== null) {
      return primeIndex;
    }
  }
}

function sieveOfEratosthenes(limit) {
  const primes = [null, null];
  for (let n = 2; n < limit; n++) {
    primes.push(n);
  }

  let primeIndex = 2;

  // Half limit times 2 hits limit, so no more multiples
  // within range
  while (primeIndex < limit / 2) {
    let prime = primes[primeIndex];

    // Don't start at 1 so prime itself isn't nulled
    let multiple = 2;
    let product = prime * multiple;
    while (product < limit) {
      primes[product] = null;
      product = prime * multiple;
      multiple++;
    }

    primeIndex = getNextPrimeIndex(primes, primeIndex);
  }

  return primes.filter(n => n !== null);
}

function findAdjacentSumTooLarge(array, limit) {
  for (let i = 0; i < array.length - 1; i++) {
    const adjacentSum = array[i] + array[i + 1];
    if (adjacentSum > limit) {
      return i;
    }
  }
}

function consecutivePrimeSum(limit) {
  let sequence = {
    maxLength: 0,
    sum: null
  };

  const primes = sieveOfEratosthenes(limit);

  // Could also use isPrime helper if prefer less space
  const primeSet = new Set(primes);
  const stop = findAdjacentSumTooLarge(primes, limit);
  const largestPrime = primes[primes.length - 1];
  for (let start = 0; start < stop; start++) {
    const sequenceStart = primes[start];
    let sum = sequenceStart;

    for (let i = start + 1; i < stop; i++) {
      const nextInSequence = primes[i];
      sum += nextInSequence;
      if (sum > largestPrime) {
        break;
      }

      const sequenceLength = i - start + 1;
      if (primeSet.has(sum) && sequenceLength > sequence.maxLength) {
        sequence.maxLength = sequenceLength;
        sequence.sum = sum;
      }
    }
  }

  return sequence.sum;
}

console.log(consecutivePrimeSum(1_000_000));
