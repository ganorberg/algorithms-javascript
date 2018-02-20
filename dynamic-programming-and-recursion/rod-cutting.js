/* Given a rod of length n inches and a table of prices p, i=1,2,...,n, write an
 * algorithm to find the maximum revenue r obtainable by cutting up the rod and
 * selling the pieces.
 *
 * Assumptions:
 * - valid inputs
 * - prices are safe positive numbers without conversions like cents to dollars
 * - price table is an object with keys as lengths as values as prices
 *
 * Time complexity: O(rodLength * max length of rod piece)
 * Space complexity: O(max length of rod piece)
 */
function maxRodRevenue(rodLength, priceTable) {
  // Initialize DP array for loop below
  const optimalRevenue = [0];
  for (let cut = 1; cut <= rodLength; cut++) { optimalRevenue[cut] = -Infinity; }

  for (const cut in priceTable) {
    // Avoid prototype chain from for in loop
    if (!priceTable.hasOwnProperty(cut)) { continue; }
    for (let revenueIndex = cut; revenueIndex <= rodLength; revenueIndex++) {
      // Look back at each price to see if you can improve
      const takeIt = optimalRevenue[revenueIndex - cut] + priceTable[cut];
      const leaveIt = optimalRevenue[revenueIndex];
      optimalRevenue[revenueIndex] = Math.max(takeIt, leaveIt);
    }
  }

  console.log(optimalRevenue);
  return optimalRevenue[rodLength];
}

// Length: price
const priceTable = {
  1: 1,
  2: 5,
  3: 8,
  4: 9,
  5: 10,
  6: 17,
  7: 17,
  8: 20,
  9: 24,
  10: 30,
}

console.log(10, maxRodRevenue(4, priceTable));
console.log(22, maxRodRevenue(8, priceTable));
