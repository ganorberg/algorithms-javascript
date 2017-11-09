/* A child is running up a staircase with n steps and can hop either 1 step, 2
 * steps, or 3 steps at a time. Implement a method to count how many possible
 * ways the child can run up the stairs.
 *
 * Assumptions:
 * - only accept positive safe integers
 * - cannot overstep. For example, 1 step left means cannot take 2 or 3 steps.
 * - scales poorly without memoizing calculations
 * - call stack will be exceeded for large inputs (>1000ish) if not tail call
 *   optimized
 *
 * Time complexity:
 * - without memoize: O(3^n)
 * - with memoize: O(n)
 */
function tripleStep(n, memo, sum = 0) {
  if (!Number.isSafeInteger(n) || n < 1) {
    return 'Please insert a safe positive integer into tripleStep function';
  }

  if (sum === n) { return 1; }
  if (sum > n) { return 0; }
  return memo(n, memo, sum + 1) + memo(n, memo, sum + 2) + memo(n, memo, sum + 3);
}

function memoize(func) {
  const memo = {};

  return (...args) => {
    const key = JSON.stringify(args);
    return memo.hasOwnProperty(key) ? memo[key] : memo[key] = func(...args);
  }
}

const memoStep = memoize(tripleStep);
// console.log(tripleStep(1));
// console.log(tripleStep(2));
// console.log(tripleStep(3));
// console.log(tripleStep(4));
// console.log(tripleStep(5));
// console.log(tripleStep(6));
// console.log(tripleStep(7));
// console.log(tripleStep(8));
console.log(tripleStep(9, memoStep));
console.log(tripleStep(1000, memoStep));

// 1, 1, 1, 1
// 2, 1, 1
// 1, 2, 1
// 1, 1, 2
// 2, 2
// 3, 1
// 1, 3