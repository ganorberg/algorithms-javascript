/*
 * Given an infinite number of quarters (25 cents), dimes (10 cents), nickels
 * (5 cents), and pennies (1 cent), write code to calculate the number of ways
 * of representing n cents.
 * 
 * ASSUMPTIONS
 * - input is valid positive safe integer
 * - looking for all possible combinations of coins to sum to n
 * - 1 + 5 is the same as 5 + 1 because it's still a nickel and penny
 * 
 * STRATEGY: O(NM) time with O(N) space, where N is target and M is number of coins
 * Use an array as dynamic programming cache. Fill it with 0s because we have no
 * ways of making change yet. Set 0th index to 1 because we know there is only 
 * 1 way to make 0 cents. Loop through coins. For each coin, loop through array
 * from that amount until end. Each amount is going to be the sum of the current
 * number of ways plus the number of ways unlocked by this coin from previous
 * ways. See example below.
 */
function makeChange(target, coins) {
  // Add 1 because we want to access the array at index = target
  const ways = new Array(target + 1).fill(0);
  ways[0] = 1;

  coins.forEach(coin => {
    for (let amount = coin; amount < ways.length; amount++) {
      // Let's say we're iterating on value 22 with coin 10. If we see 3 
      // previous ways to make 12, then we add that to the previous ways to make 22.
      const previousWays = amount - coin;
      ways[amount] += ways[previousWays];
    }
  });

  return ways[target];
}

const coins = [25, 10, 5, 1];
const coins2 = [1, 5, 10, 25];
const coins3 = [10, 25, 1, 5];
console.log(1, makeChange(1, coins));
console.log(1, makeChange(2, coins));
console.log(1, makeChange(3, coins));
console.log(1, makeChange(4, coins));
console.log(2, makeChange(5, coins));
console.log(4, makeChange(10, coins));
console.log(6, makeChange(15, coins));
console.log(13, makeChange(25, coins));
console.log(13, makeChange(25, coins2));
console.log(13, makeChange(25, coins3));
/*
  1: 1 (1)
  2: 1 (1 + 1)
  3: 1 (1 + 1 + 1)
  4: 1 (1 + 1 + 1 + 1)
  5: 2 (5, 1 + 1 + 1 + 1 + 1)
  6-9: 2 (all pennies or one nickel and pennies)
  10: 4 (dime, 2 nickels, nickel plus pennies, all pennies)
  15: 6: D+N, D+5P, 3N, 2N+5P, N+10P, 15P

  another way of looking at it:
 * 1 = 1
 * 2 = 1
 * 3 = 1
 * 4 = 1
 * 5 = 2
 * 6 = 2
 * 7 = 2
 * 8 = 2
 * 9 = 2
 * 10 = 4 from 10, 5*2, 5 + 1s, 1s
 * 25 = 13, see below:
 * 25
 * 10*2 + 5
 * 10*2 + 1s
 * 10 + 5*3
 * 10 + 5*2 + 1s
 * 10 + 5 + 1s
 * 10 + 1s
 * 5*5
 * 5*4 + 1s
 * 5*3 + 1s
 * 5*2 + 1s
 * 5 + 1s
 * 1s
*/

// BRUTE FORCE RECURSIVE
// function makeChange(amountRemaining, coins, index = 0) {
//   // Success: we have looked at all coins
//   if (index >= coins.length - 1) { return 1; }
//   const value = coins[index];
//   let ways = 0;
//   for (let i = 0; i * value <= amountRemaining; i++) {
//     const newAmount = amountRemaining - i * value;
//     ways += makeChange(newAmount, coins, index + 1);
//   }

//   return ways;
// }



// OLD INEFFICIENT SOLUTION
// function coinCombos(n) {
//   const coins = [25, 10, 5, 1];
//   const coinTable = buildTableOfZeroes(coins);
//   const pathMemory = new Set();
//   let ways = 0;

//   function countCoins(n) {
//     coins.forEach(coin => {
//       // If we can pick a coin...
//       if (n >= coin) {
//         // ... pick that coin!
//         coinTable[coin]++;
//         countCoins(n - coin);

//         // Backtrack to let go of the coin in this context
//         coinTable[coin]--;
//       }
//     });

//     // Path found!
//     if (n === 0) {
//       // Only count new paths
//       const coinsNeeded = JSON.stringify(coinTable);
//       if (pathMemory.has(coinsNeeded)) { return; }
//       pathMemory.add(coinsNeeded);
//       ways++;
//     }

//     // Failure case
//     if (n < 0) { return; }
//   }

//   countCoins(n);
//   return ways;
// }

// function buildTableOfZeroes(arr) {
//   const table = {};
//   arr.forEach(value => table[value] = 0);
//   return table;
// }