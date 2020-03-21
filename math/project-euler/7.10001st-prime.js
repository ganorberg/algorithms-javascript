/*
By listing the first six prime numbers: 
2, 3, 5, 7, 11, and 13, 
we can see that the 6th prime is 13.

What is the 10,001st prime number?

THOUGHTS
- brute force cost of finding if a number is prime is sqrt(n), 
  so total cost would be sqrt(1) + sqrt(2) + ... + sqrt(10001).
  So 10001sqrt(10001) ~ 10001*100 ~ 1,000,100 calls worst case estimate.
*/
function isPrime(n) {
  if (n < 2) {
    return false;
  }

  if (n === 2) {
    return true;
  }

  if (n % 2 === 0) {
    return false;
  }

  for (let i = 3; i <= Math.floor(Math.sqrt(n)); i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function get10001stPrime() {
  let count = 0;
  let lastPrime;
  for (let i = 2; count < 10001; i++) {
    if (isPrime(i)) {
      count++;
      lastPrime = i;
    }
  }

  return lastPrime;
}

console.log(get10001stPrime());
