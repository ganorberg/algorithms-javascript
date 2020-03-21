/*
2520 is the smallest number that can be divided by
each of the numbers from 1 to 10 without any remainder.
 
What is the smallest positive number that is evenly 
divisible by all of the numbers from 1 to 20?

THOUGHTS
- brute force by incrementing from 2520 and dividing each by 1-20
- if divisible by 20, then also divisible by 10, 5, 4, 2, 1 so can cut those
- if divisible by 18, then also divisible by 9, 6, 3 so can cut those
- if divisible by 16, then also divisible by 8 (and 4, 2) so can cut those
- 15 then 5 (and 3)
- 14 then 7 (and 2)
- 12 factors already covered, so exclude
- keep primes above 10
- so can optimize by only checking 20, 19, 18, 17, 16, 15, 14, 13, 11
*/
function hasAllFactors(n) {
  for (let i = 2; i <= 20; i++) {
    if (n % i !== 0) {
      return false;
    }
  }

  return true;
}

function getSmallestMultiple() {
  for (let i = 2520; i < Infinity; i++) {
    if (hasAllFactors(i) === true) {
      return i;
    }
  }
}

console.log(getSmallestMultiple());
