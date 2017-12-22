/* Given a list of N coins, their values (V1, V2, … , VN), and the total sum S.
 * Find the minimum number of coins the sum of which is S (we can use as many
 * coins of one type as we want), or report that it’s not possible to select
 * coins in such a way that they sum up to S.
 *
 * Assumptions:
 * - valid inputs
 * - adding Infinity + 1 yields Infinity. Otherwise need additional check to
 *   avoid adding to infinity.
 * 
 * STRATEGY: O(N * S) time and O(S) space
 * Use array to track optimal amounts. It will have length of the target S, with
 * 0 ways to make 0 and the rest at Infinity for Math.min checks later. For each
 * coin, iterate through the optimal array (starting at coin's value) to see if
 * this coin can improve the minimum at this index. If the value is Infinity, it
 * will always be replaced. If it is not Infinity, then we decide if taking the
 * coin improves the min. To decide, compare the current value to the value 
 * "coin" amount prior with 1 added to it to represent the path where we chose
 * this coin from that prior amount. If it takes less coins to get to the 
 * current value, then store that new minimum. After all comparisons, return the
 * last value in the optimal array, which represents the minimum numbers of 
 * coins required to reach the target.
 * 
*/

function coinSum(coins, target) {
  // Zero ways to make 0
  const minNumCoins = [0];

  // Start with other values at infinity so first amount is always stored
  for (let i = 1; i <= target; i++) { minNumCoins[i] = Infinity; }

  coins.forEach(coin => {
    for (let i = coin; i < minNumCoins.length; i++) {
      // See previous optimal amount and add 1 for new coin.
      const takeIt = minNumCoins[i - coin] + 1;
      const leaveIt = minNumCoins[i];

      // Store best solution so far.
      minNumCoins[i] = Math.min(takeIt, leaveIt);
    }
  });

  // Visualize cache
  console.log(minNumCoins);

  // Target is final value in minNumCoins array
  return minNumCoins[minNumCoins.length - 1];
}


console.log(3, coinSum([1, 3, 5], 11));
console.log(3, coinSum([1, 3, 5, 20], 11));
console.log(4, coinSum([1, 5, 6], 9));
console.log(2, coinSum([7, 2, 3, 6], 13));
console.log(2, coinSum([2, 3, 6, 7], 13));
console.log(2, coinSum([7, 6, 3, 2], 13));
console.log(2, coinSum([7, 3, 6, 2], 13));