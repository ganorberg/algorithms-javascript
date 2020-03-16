/*
Surprisingly there are only three numbers that can be written
as the sum of fourth powers of their digits:

1634 = 1^4 + 6^4 + 3^4 + 4^4
8208 = 8^4 + 2^4 + 0^4 + 8^4
9474 = 9^4 + 4^4 + 7^4 + 4^4
As 1 = 1^4 is not a sum it is not included.

The sum of these numbers is 1634 + 8208 + 9474 = 19316.

Find the sum of all the numbers that can be written as the 
sum of fifth powers of their digits.

THOUGHTS
- when to stop loop? how do we know we've reached the final number?
- given how 4 maxed out so soon, it seems number of digits scales
  faster than the sum of powers
- 9 is the largest digit, so what would a bunch of 9^5s added together
  look like?
1 * 9^5 = 59049
2 * 9^5 = 118098
3 * 9^5 = 177147
4 * 9^5 = 236196
5 * 9^5 = 295245
6 * 9^5 = 354294
7 * 9^5 = 413343
- looks like we can't make a seven digit number that is the sum of its
  digits' fifth powers b/c 9,999,999 only adds to 413,343, and after
  that, it goes to 8 digits. presumably, this pattern continues.
8 * 9^5 = 472392
- so yeah, let's use 6 digit max as the limit
- time complexity: O(limit * limit.length)
*/
function sumDigitsToFifthPower(n) {
  const fifthPowers = Array.from(n)
    .map(Number)
    .map(num => Math.pow(num, 5));
  const sum = fifthPowers.reduce((total, num) => total + num, 0);
  return String(sum) === n;
}

function digitFifthPowers() {
  const sumOfFifthPowers = [];
  for (let i = 2; i <= 354_294; i++) {
    const stringNumber = String(i);
    const isSumOfFifthPowersOfDigits = sumDigitsToFifthPower(stringNumber);
    if (isSumOfFifthPowersOfDigits) {
      sumOfFifthPowers.push(i);
    }
  }

  return sumOfFifthPowers.reduce((total, num) => total + num, 0);
}

console.log(digitFifthPowers());
