/*
Euler discovered the remarkable quadratic formula:

n^2+n+41

It turns out that the formula will produce 40 primes
 for the consecutive integer values 0≤n≤39. However, 
 when n=40,40^2+40+41=40(40+1)+41 is divisible by 41, 
 and certainly when n=41,41^2+41+41 is clearly divisible 
 by 41.

The incredible formula n^2−79n+1601 was discovered, 
which produces 80 primes for the consecutive values 
0≤n≤79. The product of the coefficients, −79 and 
1601, is −126479.

Considering quadratics of the form:

n^2+an+b, where |a|<1000 and |b|≤1000

where |n| is the modulus/absolute value of n
e.g. |11|=11 and |−4|=4
Find the product of the coefficients, a and b, for 
the quadratic expression that produces the maximum 
number of primes for consecutive values of n, 
starting with n=0.

THOUGHTS
- product easy once find quadratic expression, so focus on expression
- create set of primes up to a large number so can instant check in loops?
- brute force through a and b ranges = 2K*2K = 4M ops. then, loop n is 
  ~100, and check prime for each of those is sqrt(100) so 4M * 1K = 4B ops. Slow.
- could build up prime set during loops and check if in set before running isPrime.
  Could do this for nonPrimes too so values already seen are cached, saving time.
- count primes in loop and track largest (store a and b that gave that value).
  let's use fact that all primes except 2 and 3 are in 6x+1 or 6x-1 to speed up 
  prime check by 66%.
- might be a math way of limiting a and b range, but nothing apparent
*/
function isPrime(n) {
  if (n < 2) {
    return false;
  }

  if (n <= 3) {
    return true;
  }

  if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }

  const squareRoot = Math.sqrt(n);
  let jump = 4;
  for (let i = 5; i <= squareRoot; i += jump) {
    if (n % i === 0) {
      return false;
    }

    /**
     * Exploit fact that all primes are in set 6x +/- 1 by
     * jumping either 2 or 4 at a time.
     *
     * Since we are starting at 5, which is in set 6x - 1, we
     * next want 7, which is in 6x + 1, so we jump 2. Then,
     * next number in 6x - 1 is 11, so we jump 4. Next in
     * 6x + 1 is 13, so we jump 2. And so on, using a jump
     * of 2 to cross between 6x - 1 and 6x + 1 and a jump
     * of 4 to go from 6x + 1 to 6x - 1.
     */
    jump = 6 - jump;
  }

  return true;
}

function quadraticPrimes() {
  let max = {
    a: null,
    b: null,
    consecutivePrimes: 0
  };

  for (let a = -999; a < 1000; a++) {
    for (let b = -1000; b <= 1000; b++) {
      let n = 0;
      let stillPrime = true;
      while (stillPrime) {
        const quadraticFormulaSum = Math.pow(n, 2) + a * n + b;
        if (isPrime(quadraticFormulaSum)) {
          n++;
        } else {
          stillPrime = false;
          if (n > max.consecutivePrimes) {
            max.a = a;
            max.b = b;
            max.consecutivePrimes = n;
          }
        }
      }
    }
  }

  return max.a * max.b;
}

console.log(quadraticPrimes());
