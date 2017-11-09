/* Given a cost matrix Cost[][] where Cost[i][j] denotes the Cost of visiting
 * cell with coordinates (i, j), find a min-cost path to reach a cell (x, y)
 * from cell (0, 0) under the condition that you can only travel one step right
 * or one step down.
 *
 * Assumptions:
 * - all costs are positive integers
 * - cost includes final cell
 * - matrix is rectangular array of subarrays
 * - extra space equivalent to matrix size is available
 */

function buildEmptyCache(matrix) {
  const cache = [];
  for (let row = 0; row < matrix.length; row++) { cache.push([]); }
  return cache;
}

function cacheFirstRow(matrix, cache) {
  // Cache origin
  cache[0][0] = matrix[0][0];

  const row = matrix[0];
  for (let column = 1; column < row.length; column++) {
    // Cost equals total cost so far plus current cell's cost
    cache[0][column] = cache[0][column - 1] + matrix[0][column];
  }
}

function cacheFirstColumn(matrix, cache) {
  // Cache origin
  cache[0][0] = matrix[0][0];
  
  for (let row = 1; row < matrix.length; row++) {
    // Cost equals total cost so far plus current cell's cost
    cache[row][0] = cache[row - 1][0] + matrix[row][0];
  }
}

// Assumes first row and column have been cached
function fillCache(matrix, cache) {
  // Loop from second row to final row, always starting at second column
  for (let row = 1; row < matrix.length; row++) {
    for (let column = 1; column < matrix[0].length; column++) {
      // Find minimum path so far by comparing values above and left
      const minCost = Math.min(cache[row - 1][column], cache[row][column - 1]);
      cache[row][column] = minCost + matrix[row][column];
    }
  }
}

// Bottom-up approach. O(row * column) time and space complexity.
function minCost(matrix, x, y) {
  if (
    !Array.isArray(matrix)
    || matrix.length === 0
    || !Array.isArray(matrix[0])
    || !Number.isSafeInteger(x)
    || x >= matrix.length
    || !Number.isSafeInteger(y)
    || y >= matrix[0].length
  ) {
    throw new Error('Please insert valid inputs. See function documentation.');
  }
  
  const cache = buildEmptyCache(matrix);
  cacheFirstRow(matrix, cache);
  cacheFirstColumn(matrix, cache);
  fillCache(matrix, cache);
  return cache[x][y];
}

const matrix = [
  [0, 3, 1, 2],
  [1, 2, 3, 4],
  [3, 2, 1, 4],
  [4, 2, 3, 1],
];

console.log(10, minCost(matrix, 3, 3));
console.log(1, minCost([[1]], 0, 0));
