/*
Pentagonal numbers are generated by the formula, 
Pn=n(3n−1)/2. The first ten pentagonal numbers are:

1, 5, 12, 22, 35, 51, 70, 92, 117, 145, ...

It can be seen that P4 + P7 = 22 + 70 = 92 = P8. 
However, their difference, 70 − 22 = 48, is not 
pentagonal.

Find the pair of pentagonal numbers, Pj and Pk, 
for which their sum and difference are pentagonal 
and D = |Pk − Pj| is minimised; what is the value 
of D?

THOUGHTS
- brute force is create pentagonal numbers up to limit,
  then calculate all sums and differences while tracking
  numbers that generate them, filter pentagonal values out,
  then subtract all sums and differences. return min value.
- what is limit? quadratic growth, so smallest difference is
  likely found early in pattern. but how early?
- if want smallest difference, and that difference is a 
  pentagonal number, maybe can see if each number from 1 is
  a difference of other pentagonal numbers, and if so, check
  sum. if sum is also pentagonal, then found answer.
- difference between pentagonal numbers increases by 3 each time.
  p2-p1 = 4, p3-p2 = 7, p4-p3 = 10, etc.
- as pentagonal numbers grow, difference grows. so adjacent values
  would give smallest difference, then next adjacent, then one more,
  and so on.
- since don't know limit, can use iterator to produce pentagonal numbers
  on the fly with dynamic programming
- to see sum ahead, can use helper isPentagonalNumber with quadratic
  formula. could also use for differences instead of building set.
- let's try brute force for first 10,000 values. time should be 10K^2=100M.
*/
function generatePentagonalNumbers(limit) {
  const pentagonalNumbers = [];
  for (let n = 1; n <= limit; n++) {
    const pentagonalNumber = (n * (3 * n - 1)) / 2;
    pentagonalNumbers.push(pentagonalNumber);
  }

  return pentagonalNumbers;
}

function isPentagonal(term) {
  /*
    Quadratic formula is n = (-b +/- squareRoot(b^2 - 4ac))/(2a).
    We can ignore negative case since pentagonal numbers are positive.

    t = (3n^2 - n)/2
    2t = 3n^2 - n
    0 = 3n^2 - n - 2t
    so a = 3, b = -1, and c is -2 * input
  */
  const value = (1 + Math.sqrt(1 + 24 * term)) / 6;
  return Number.isInteger(value);
}

function pentagonNumbers(limit) {
  const pentagonalNumbers = generatePentagonalNumbers(limit);
  const validDifferences = [];
  for (let j = 0; j < limit; j++) {
    const Pj = pentagonalNumbers[j];
    for (let k = j + 1; k <= limit; k++) {
      const Pk = pentagonalNumbers[k];
      if (isPentagonal(Pk - Pj) === false) {
        continue;
      }

      if (isPentagonal(Pk + Pj)) {
        validDifferences.push(Pk - Pj);
      }
    }
  }

  return Math.min(...validDifferences);
}

console.log(pentagonNumbers(10000));
