/*
 * Write a method to count the number of 2s that appear in all the numbers 
 * between 0 and n (inclusive).
 * 
 * EXAMPLE
 * Input: 25
 * Output: 9 (2, 12, 20, 21, 22, 23, 24, 25. Note that 22 counts for two 2s.)
 * 
 * STRATEGY: O(D) time and space where D is number of digits in n (iterative version)
 * Most significant digit (MSD) gives information about what kind of math to 
 * apply. There is also a pattern for how many 2s each place adds at each value. 
 * Notice that for every 10 we add, we see a 2 in the ones place. For every 100 
 * we add, we see those same 2s, but also 10 extra 2s from the 20s. For every 
 * 1000 we add, we see those same 2s as before, but also 100 extra 2s from 200s,
 * and so on. With multiples, say 3000, we would multiply this result for 1000 
 * by 3. The MSD also tells us if we have a series of 2s waiting to be
 * added: when MSD is greater than 2, for example with 3000, we add all 2s from
 * 2000s, which would be 1000 extra 2s. When MSD is 2, not all 2s from that 
 * place will be counted; only the remaining digits plus 1 for trailing zero. 
 * More examples below in comments.
 */
function count2s(n, runningSum = 0) {
  if (n === "") { return runningSum; }
  const digits = String(n);
  const mostSignificantDigit = Number(digits[0]);

  let sum = runningSum;

  // Example for 900,000: add 100,000 for every 2 at front of 200,000s
  if (mostSignificantDigit > 2) {
    const ALL_2S_FROM_MOST_SIGNIFICANT_DIGIT_AT_2 = (10 ** (digits.length - 1));
    sum += ALL_2S_FROM_MOST_SIGNIFICANT_DIGIT_AT_2;
  }

  // Example for 25: only using 2 from 20, 21, 22, 23, 24, 25, but not 26-29
  if (mostSignificantDigit === 2) {
    const COUNT_2S_USED = Number(digits.slice(1));
    const INCLUDE_TRAILING_ZERO = 1;
    sum += COUNT_2S_USED + INCLUDE_TRAILING_ZERO;
  }

  /*
    Example: for 900,000 look at pattern for 100,000:
    1 * 10,000 = 10,000 (from 20,000s)
    10 * 1000 = 10,000 (from 2,000s)
    100 * 100 = 10,000 (from 200s)
    1,000 * 10 = 10,000 (from 20s)
    10,000 * 1 = 10,000 (from 2s)

    Multiply this by 9 because 900,000 is comprised of nine 100,000s.
  */
  const COUNT_2S_AT_PLACE = (10 ** (digits.length - 2)) * (digits.length - 1);
  sum += mostSignificantDigit * COUNT_2S_AT_PLACE;
  return count2s(digits.slice(1), sum);
}

console.log(9, count2s(25));
console.log(550000, count2s(900000));
console.log(550001, count2s(900002));
console.log(550013, count2s(900030));



// ITERATIVE VERSION. Harder to understand but more efficient b/c limits string slicing.
// function count2s(n) {
//   const digits = String(n);
//   let sum = 0;

//   for (let i = 0; i < digits.length; i++) {
//     const mostSignificantDigit = Number(digits[i]);
//     if (mostSignificantDigit > 2) { sum += (10 ** (digits.length - i - 1)); }
//     if (mostSignificantDigit === 2) { sum += Number(digits.slice(i + 1)) + 1; }
//     sum += mostSignificantDigit * (10 ** (digits.length - i - 2)) * (digits.length - i - 1);
//   }

//   return sum;
// }

// BRUTE FORCE
// function count2s(n) {
//   let sum = 0;

//   for (let i = 0; i <= n; i++) {
//     const digits = String(i);
//     for (let j = 0; j < digits.length; j++) {
//       if (digits[j] === '2') { sum++; }
//     }
//   }

//   return sum;
// }
