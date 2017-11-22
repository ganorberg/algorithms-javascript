/* A child is running up a staircase with n steps and can hop either 1 step, 2
 * steps, or 3 steps at a time. Implement a method to count how many possible
 * ways the child can run up the stairs.
 *
 * Assumptions:
 * - only accept positive safe integers
 * - cannot overstep. For example, 1 step left means cannot take 2 or 3 steps.
 *
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
function tripleStepDP(n) {
  /*
    BASE CASES
    1
  
    1 + 1
    2
  
    1 + 1 + 1
    2 + 1
    1 + 2
    3
  */
  const DP = [null, 1, 2, 4];

  for (let i = 4; i <= n; i++) {
    DP[i] = DP[i - 1] + DP[i - 2] + DP[i - 3];
  }

  return DP[n];
}

console.log(1, tripleStepDP(1));
console.log(2, tripleStepDP(2));
console.log(4, tripleStepDP(3));
console.log(7, tripleStepDP(4));
console.log(13, tripleStepDP(5));
console.log(24, tripleStepDP(6));
console.log(44, tripleStepDP(7));
console.log(81, tripleStepDP(8));
console.log(149, tripleStepDP(9));
console.log('huge: ', tripleStepDP(1000));

// FOUR:
// 1, 1, 1, 1
// 2, 1, 1
// 1, 2, 1
// 1, 1, 2
// 2, 2
// 3, 1
// 1, 3


// WEIRD MEMOIZED VERSION
// function tripleStep(n, memo, sum = 0) {
//   if (!Number.isSafeInteger(n) || n < 1) {
//     return 'Please insert a safe positive integer into tripleStep function';
//   }

//   if (sum === n) { return 1; }
//   if (sum > n) { return 0; }
//   return memo(n, memo, sum + 1) + memo(n, memo, sum + 2) + memo(n, memo, sum + 3);
// }

// function memoize(func) {
//   const memo = {};

//   return (...args) => {
//     const key = JSON.stringify(args);
//     return memo.hasOwnProperty(key) ? memo[key] : memo[key] = func(...args);
//   }
// }

// const memoStep = memoize(tripleStep);