/*
In the United Kingdom the currency is made up of 
pound (£) and pence (p). There are eight coins 
in general circulation:

1p, 2p, 5p, 10p, 20p, 50p, £1 (100p), and £2 (200p).
It is possible to make £2 in the following way:

1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
How many different ways can £2 be made using 
any number of coins?

THOUGHTS
- recursion, or dp b/c overlapping subproblems and optimal substructure
- we can add up to the value or subtract from it toward 0. let's add.
- to brute force, pick any coin, add to sum, recurse. base case is
  if equals amount, then increment result, or if exceeds, stop recursion.
- carry index of loop to next call so know where to start
- is $1 + 50c same as 50c + $1? I think so. Order shouldn't matter, only
  total of each coin.
- if grab in descending order, shouldn't have duplicates. e.g. for $1,
  get $1, then 50c + 50c, then 50 + 20 + 20 + 10, etc.
- brute force time complexity is 2^n since we make choice to keep or not
- dp: check way to hit target with no coins, then smallest coin, then 
  next smallest coin, etc. in table
- compare:
  - don't take the coin = choose value above, which was minimu for previous set
  - take the coin, subtract the amount, choose value at that index
  - if negative value, continue to next coin
*/
function bottomUpDP(target, coins) {
  // build table. width = target + 1. height = number of coins + 1. fill with zeros.
  // first column is ways to make 0, which is 1.
  // first row (excluding first cell) stays 0 b/c can't make amounts with no coins
  // starting at table[1][1], loop to move one cell at a time to the right
  // add value above with value in that row at index - coin and store in
  // current cell. This is ways if take and don't take combined.
  // after loop completes, return final cell

  const width = target + 1;
  const height = coins.length + 1;
  const coinRow = new Array(width).fill(0);
  const ways = new Array(height).fill(0).map(row => coinRow.slice());

  ways.forEach(row => (row[0] = 1));
  for (let row = 1; row < ways.length; row++) {
    for (let column = 1; column < coinRow.length; column++) {
      const newCoin = coins[row - 1];
      const waysWithoutNewCoin = ways[row - 1][column];
      let total = waysWithoutNewCoin;
      const newColumn = column - newCoin;
      if (newColumn >= 0) {
        const waysWithNewCoin = ways[row][column - newCoin];
        total += waysWithNewCoin;
      }

      ways[row][column] = total;
    }
  }

  return ways[height - 1][width - 1];
}

console.log(bottomUpDP(200, [1, 2, 5, 10, 20, 50, 100, 200]));

// function bruteForce(target, coins) {
//   let ways = 0;
//   function addCoins(total = 0, coinIndex = 0) {
//     if (total === target) {
//       ways++;
//       return;
//     }

//     if (total > target) {
//       return;
//     }

//     for (let i = coinIndex; i < coins.length; i++) {
//       const coin = coins[i];
//       addCoins(coin + total, i);
//     }
//   }

//   addCoins();

//   return ways;
// }

// console.log(bruteForce(200, [1, 2, 5, 10, 20, 50, 100, 200]));
