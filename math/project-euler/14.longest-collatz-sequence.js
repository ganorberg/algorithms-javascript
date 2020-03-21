/*
The following iterative sequence is defined for the set of positive integers:

n → n/2 (n is even)
n → 3n + 1 (n is odd)

Using the rule above and starting with 13, we generate the following sequence:

13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

Which starting number, under one million, produces the longest chain?

NOTE: Once the chain starts the terms are allowed to go above one million.

THOUGHTS
- create helpers for each pattern
- create isEven helper
- check evenness of each number and apply appropriate pattern
- count every time apply pattern
- stop when n === 1
- track counts to digits
- loop from 1M to 500K since 500K is n/2 of 1M. Therefore, 1M has more terms.
- time complexity depends on average length of chains. Proportional to N?
  So maybe N^2 worst case? 1M^2 is 1T...
- assume only one winner or doesn't matter which winner is returned
*/
const isEven = n => n % 2 === 0;
const cutInHalf = n => n / 2;
const applyOddPattern = n => 3 * n + 1;
function applyCollatz(n) {
  let num = n;
  let count = 0;
  while (num !== 1) {
    if (isEven(num)) {
      num = cutInHalf(num);
    } else {
      num = applyOddPattern(num);
    }

    count++;
  }

  return count;
}

function longestCollatzSequence() {
  let highest = { count: -Infinity, value: null };
  for (let n = 1_000_000; n > 500_000; n--) {
    const count = applyCollatz(n);
    if (count > highest.count) {
      highest.count = count;
      highest.value = n;
    }
  }

  return highest.value;
}

console.log(longestCollatzSequence());
