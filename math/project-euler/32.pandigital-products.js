/*
We shall say that an n-digit number is pandigital 
if it makes use of all the digits 1 to n exactly 
once; for example, the 5-digit number, 15234, is 
1 through 5 pandigital.

The product 7254 is unusual, as the identity, 
39 × 186 = 7254, containing multiplicand, 
multiplier, and product is 1 through 9 pandigital.

Find the sum of all products whose multiplicand/
multiplier/product identity can be written as a
1 through 9 pandigital.

HINT: Some products can be obtained in more than
one way so be sure to only include it once in 
your sum.

THOUGHTS
- get ceiling using largest product possible with
  digits 1-9. maybe descending order? 98,765,432 * 1 = 
  98,765,432. no b/c swapping 1 and 2 almost doubles
  this. 98,765,431 * 2 = 197,530,862.
- well, we only have 9 digits to work with. so could
  be 8 * 1 or 7 * 2 or 6 * 3 or 5 * 4. This assumes the
  problem intends for only one multiplicand and multiplier.
- maybe largest is 87654321 * 9 = 788,888,889 since in this
  case, 9 multiplies all 8 digits, whereas if 9 on left, only
  multiplies one. and if any other digits join 9, then they lose
  multiplication to 9 also. however, this is probably much
  larger than need be b/c total digits including product has to
  be 9, and this is only looking at multiplicand and multiplier.
- 987 * 65 = 64155, already over 10 digits. so seems like max product
  is less than 100,000. 9 * 8765 = 78885. 
- let's use 80,000 as max product and loop multiplicand/multiplier 
  from 1 to 9876.
- if we brute force multiply that's ~10K^2 = 100M ops. if we then
  check 10 digits each time, that's 1B ops.
- how efficiently pick unique numbers? if we have set 123456789, we
  can generate all permutations (9! = 362,880) then split each into 
  3 parts and check if products are valid. let's try brute force first.
- brute force takes 20 sec and works.
*/

function checkPandigital(n1, n2, n3) {
  const digits = String(n1) + String(n2) + String(n3);
  if (digits.length !== 9) {
    return false;
  }

  const allDigits = new Set();
  for (let i = 0; i < 9; i++) {
    const digit = digits[i];
    if (allDigits.has(digit) || digit === "0") {
      return false;
    }

    allDigits.add(digit);
  }

  return true;
}

function pandigitalProducts() {
  const pandigitalProducts = new Set();
  for (let a = 1; a <= 9876; a++) {
    for (let b = 1; b <= 9876; b++) {
      const product = a * b;
      if (pandigitalProducts.has(product)) {
        continue;
      }

      const isPandigital = checkPandigital(a, b, product);
      if (isPandigital) {
        pandigitalProducts.add(product);
      }
    }
  }

  return [...pandigitalProducts].reduce((total, num) => total + num, 0);
}

console.log(pandigitalProducts());
