/*
A unit fraction contains 1 in the numerator. 
The decimal representation of the unit fractions
 with denominators 2 to 10 are given:

1/2	= 	0.5
1/3	= 	0.(3)
1/4	= 	0.25
1/5	= 	0.2
1/6	= 	0.1(6)
1/7	= 	0.(142857)
1/8	= 	0.125
1/9	= 	0.(1)
1/10	= 	0.1

Where 0.1(6) means 0.166666..., and has a 1-digit 
recurring cycle. It can be seen that 1/7 has a 
6-digit recurring cycle.

Find the value of d < 1000 for which 1/d contains 
the longest recurring cycle in its decimal fraction 
part.

THOUGHTS
- I'm not aware of a pattern, so probably have to check up to 1/999
- how to find repeating pattern efficiently? they go on forever, so
  need to cut off at some point. how know pattern actually continues?
  for example, could have 1.6666666636666, and if we greedily stopped
  at 6 repeating, we wouldn't see the 3. so we probably have to think
  about this mathematically.
- we can remove any values that we know are not recurring. 1/2, 1/4, 1/8, 1/16...
  all denominators that are multiples of 2 are out. let's group patterns into
  recurring and non-recurring.
- seems like patterns stem from multiples of original 9 denominators. can use
  helper then find multiples to see if isRecurring or not.
  - 1/3, 1/9, 1/ 27... multiples of 3 recur
  - 1/10, 1/20, 1/40, 1/80, ... so multiples of 2* 10 do not recur
  - 1/100, 1/200, 1/400 don't recur... so this pattern is multiples of 2 * multiples of 10
  - 4 matches 2
  - 5 okay unless divisible by 3, 7, 11... primes
- after looking at patterns, seems like primes repeat, except for 2 and 5. 
  maybe that is b/c 2 * 5 = 10 to produce the decimal system.
- regardless, how do we check the length of their recurring patterns? maybe
  has to do with process of long division. I'll try on whiteboard.
- seems like any time a number repeats in the cycle, the cycle starts over. makes
  sense since long division must give same outcome for the same number, and so
  the sequence repeats.
- this means we are looking for a sequence that has, at maximum, all digits 0-9.
  and we know to stop searching the sequence when a repeat number is seen. we
  can collect values in a set and check in constant time whether it has been seen.
- I think we can use JS to convert to string and check sequences before scientific
  notation kicks in.
- Quick test shows don't need to worry about scientific notation
- Decimal might extend beyond these bounds, though. So might need to manually divide.
- seems like 0 can repeat adjacently like in 1/777. edge case? no. 1/444 repeats
  225. so seems like theory of unique numbers is wrong. maybe adjacent is edge case
  for that theory, though.
- ignore leading zeros. 
- pattern repeats when long division value repeats. for example, if dividing 444 into
  1, then first divide is really 444 into 1000. after 225, divide into 1000 again, so
  pattern repeats. so seems like we need to track intermediate division values, and when
  that repeats, pattern is over.
- this means we need to manually divide and track intermediate division values in set. 
  when repeat is found, length of that set is length of recurring cycle.
- assuming all numbers 1/d repeat since fraction, which means rational, so repeats
- sequence may not start for a while. how know when to drop early digits? need to track
  order added to set, and if repeat is seen, drop all values before that repeat's first
  entrance. so might need array instead of set to know index and easily slice off early
  values.
- time complexity: not sure longest cycle length, but let's say 1000. so 1K*1K = 1M ops.
*/
function findNextDividend(numerator, denominator) {
  let nextDividend = numerator;
  let count = 0;
  while (denominator > nextDividend) {
    nextDividend *= 10;
    count++;
  }

  return numerator * Math.pow(10, count);
}

function getCycleLength(n) {
  // Could use hash map with indexes to only loop at end
  const intermediateDividends = [];
  let numerator = 1;
  while (numerator !== 0) {
    const nextDividend = findNextDividend(numerator, n);
    if (intermediateDividends.includes(nextDividend)) {
      const repeatIndex = intermediateDividends.indexOf(nextDividend);
      return intermediateDividends.slice(repeatIndex).length;
    }

    intermediateDividends.push(nextDividend);
    const quotient = Math.floor(nextDividend / n);
    const product = n * quotient;
    numerator = nextDividend - product;
  }

  // Numerator of 0 means no remainder, so no cycle
  return 0;
}

function reciprocalCycles() {
  let max = {
    cycleLength: -Infinity,
    digit: null
  };

  for (let n = 2; n < 999; n++) {
    const cycleLength = getCycleLength(n);
    if (cycleLength > max.cycleLength) {
      max.cycleLength = cycleLength;
      max.digit = n;
    }
  }

  return max.digit;
}

console.log(reciprocalCycles());
