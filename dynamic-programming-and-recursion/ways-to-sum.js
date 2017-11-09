/* You are given a number N. Find the number of different ways to write it as
 * the sum of 1, 3 and 4.
 *
 * e.g. for N = 5, answer is 6:
 * 1 + 1 + 1 + 1 + 1
 * 1 + 4
 * 4 + 1
 * 1 + 1 + 3
 * 1 + 3 + 1
 * 3 + 1 + 1
 */
function waysToSum(N) {
  // Memoize results via bottom up approach
  const DP = [];

  // Base cases: Only 1 way to compute 0, 1 and 2. Only 2 ways to compute 3. 
  DP[0] = DP[1] = DP[2] = 1;
  DP[3] = 2;

  // Next result we need is 4. It uses optimal results of 3, 1 and 0.
  for (let i = 4; i <= N; i++) {
    DP[i] = DP[i - 1] + DP[i - 3] + DP[i - 4];
  }

  // Final iteration of loop calculates the optimal solution for our target!
  return DP[N];
}

console.log(6, waysToSum(5));