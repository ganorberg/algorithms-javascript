/* Given a knapsack of size S and a collection of items each with a size and
 * value, return the maximum value that the knapsack can hold. Fractional
 * items are not allowed. Items can only be used once.
 *
 * Assumptions:
 * - valid inputs
 *
 * SIMPLIFIED COMPLEXITY ANALYSIS
 * Time complexity: O(n * S), where n is number of items and S is size of knapsack
 * Space complexity: O(n * S), where n is number of items and S is size of knapsack
 *
 * REAL COMPLEXITY ANALYSIS
 * Note this is pseudo-polynomial time because time complexity technically
 * scales with number of bits. Numeric values, such as input S, grow
 * exponentially in terms of bits (2^bits in S). The number of bits in S is
 * proportional to log S. Therefore, the true running time is O(n * 2^log S).
 */
function buildEmptyCache(numberOfRows) {
  const cache = [];
  for (let i = 0; i < numberOfRows; i++) { cache.push([]); }
  return cache;
}

function cacheFirstRow(cache, numberOfColumns) {
  for (let column = 0; column < numberOfColumns; column++) { cache[0][column] = 0; }
}

function cacheFirstColumn(cache) {
  cache.forEach(row => row.push(0));
}

function fillCache(cache, size, items) {
  const numberOfRows = items.length + 1;
  const numberOfColumns = size + 1;

  for (let row = 1; row < numberOfRows; row++) {
    for (let currentSize = 1; currentSize < numberOfColumns; currentSize++) {
      const item = items[row - 1];
      
      // Item cannot fit, so take prior value which is in cell above
      if (item.size > currentSize) {
        cache[row][currentSize] = cache[row - 1][currentSize];
        continue;
      }

      // Include after size check to ensure value in cache is defined
      const takeIt = item.value + cache[row - 1][currentSize - item.size];
      const leaveIt = cache[row - 1][currentSize];
      
      // Determine whether we take or leave item via optimum values using subproblems
      cache[row][currentSize] = Math.max(takeIt, leaveIt);
    }
  }
}

function knapsack(size = 0, items = []) {
  const numberOfRows = items.length + 1;
  const numberOfColumns = size + 1;

  const cache = buildEmptyCache(numberOfRows);
  cacheFirstRow(cache, numberOfColumns);
  cacheFirstColumn(cache);
  fillCache(cache, size, items);
  // console.log(cache);
  return cache[numberOfRows - 1][numberOfColumns - 1];
}

const items = [
  { size: 1, value: 10 },
  { size: 3, value: 1 },
  { size: 2, value: 5 },
  { size: 4, value: 2 },
  { size: 2, value: 8 },
  { size: 3, value: 8 },
  { size: 5, value: 7 },
  { size: 7, value: 4 },
  { size: 8, value: 3 },
  { size: 1, value: 9 },
  { size: 9, value: 6 },
];

const bag = [
  { size: 1, value: 1 },
  { size: 3, value: 4 },
  { size: 4, value: 5 },
  { size: 5, value: 7 },
];

const store = [
  { size: 6, value: 30 },
  { size: 3, value: 14 },
  { size: 4, value: 16 },
  { size: 2, value: 9 },
]

console.log(27, knapsack(5, items));
console.log(47, knapsack(15, items));
console.log(63, knapsack(1000, items));
console.log(9, knapsack(7, bag));
console.log(46, knapsack(10, store));
