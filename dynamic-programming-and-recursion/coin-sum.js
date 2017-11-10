/* Given a list of N coins, their values (V1, V2, … , VN), and the total sum S.
 * Find the minimum number of coins the sum of which is S (we can use as many
 * coins of one type as we want), or report that it’s not possible to select
 * coins in such a way that they sum up to S.
 *
 * Assumptions:
 * - valid inputs
 * - adding Infinity + 1 yields Infinity. Otherwise need additional check to
 *   avoid adding to infinity.
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