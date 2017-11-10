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
  // Zero revenue for 0 length
  const optimalRevenue = [0];
  
  // Don't know revenues for any length yet
  for (let inches = 1; inches <= rodLength; inches++) {
    optimalRevenue[inches] = -Infinity;
  }

  // Outer loop moves through price table
  for (let inches = 1; inches <= rodLength; inches++) {
    if (!priceTable.hasOwnProperty(inches)) { continue; }
    const revenue = priceTable[inches];

    // Inner loop moves through optimal revenue cache
    for (let revenueIndex = inches; revenueIndex <= rodLength; revenueIndex++) {
      // Look back at each price to see if you can improve
      const takeIt = optimalRevenue[revenueIndex - inches] + revenue;
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

// BRUTE FORCE
// function maxRodRevenue(rodLength, priceTable, revenue = 0) {
//   if (rodLength < 0) { return 0; }
//   if (rodLength === 0) { return revenue; }
//   console.log(revenue);
//   return Math.max(
//     maxRodRevenue(rodLength - 1, priceTable, revenue + priceTable[1]),
//     maxRodRevenue(rodLength - 2, priceTable, revenue + priceTable[2]),
//     maxRodRevenue(rodLength - 3, priceTable, revenue + priceTable[3])
//   );
// }