/*
An irrational decimal fraction is created by 
concatenating the positive integers:

0.123456789101112131415161718192021...

It can be seen that the 12th digit of the 
fractional part is 1.

If dn represents the nth digit of the fractional 
part, find the value of the following expression.

d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000

THOUGHTS
- need to find digits at locations at powers of 10, then multiply them
- brute force would be concat positive integers until string length is
  1M then access values at each index. Max string length is 2^53 - 1 = 
  9*10^15, so okay.
*/
function champernowne() {
  // Offset by one character to allow index access to match d
  let positiveIntegers = ".";

  for (let n = 1; n <= 1_000_000; n++) {
    positiveIntegers += n.toString();
  }

  let digits = [];
  for (let i = 1; i <= 1_000_000; i *= 10) {
    const digit = positiveIntegers[i];
    digits.push(digit);
  }

  return digits.map(Number).reduce((product, num) => product * num, 1);
}

console.log(champernowne());
