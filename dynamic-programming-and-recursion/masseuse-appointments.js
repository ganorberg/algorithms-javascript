/*
 * A popular masseuse receives a sequence of back-to-back appointment requests 
 * and is debating which ones to accept. She needs a 15-minute break between 
 * appointments and therefore she cannot accept any adjacent requests. Given a 
 * sequence of back-to-back appointment requests (all multiples of 15 minutes, 
 * none overalap, and none can be moved), find the optimal (highest total booked
 * minutes) set the masseuse can honor. Return the number of minutes.
 * 
 * REPHRASE
 * Given a list of numbers, find the greatest sum such that no two numbers added
 * are adjacent.
 * 
 * EXAMPLE
 * Input: [30, 15, 60, 75, 45, 15, 15, 45]
 * Output: 180 (30 + 60 + 45 + 45)
 * 
 * ASSUMPTIONS
 * - valid array input with only positive integers
 */
function maxSumWithoutAdjacent(values, index = 0, sum = 0, memo = {}) {
  if (index >= values.length) { return sum; }
  if (memo.hasOwnProperty(index)) { return memo[index]; }

  const takeIt = maxSumWithoutAdjacent(values, index + 2, sum + values[index], memo);
  const leaveIt = maxSumWithoutAdjacent(values, index + 1, sum, memo);
  return memo[index] = Math.max(takeIt, leaveIt);
}

// No memoization without location logic to compare sums in same frame
function iterative(values) {
  let maxSum = 0;
  const callStack = [{ index: 0, sum: 0 }];

  while (callStack.length > 0) {
    const { index, sum } = callStack.pop();
    if (sum > maxSum) { maxSum = sum; }

    if (index < values.length) {
      const takeIt = { index: index + 2, sum: sum + values[index] }
      const leaveIt = { index: index + 1, sum }
      callStack.push(takeIt);
      callStack.push(leaveIt);
    }
  }

  return maxSum;
}

const arr = [30, 15, 60, 75, 45, 15, 15, 45];
// console.log(180, maxSumWithoutAdjacent(arr));
console.log(180, iterative(arr));