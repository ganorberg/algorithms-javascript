/* Given a 2-D matrix with M rows and N columns, find the number of ways to
 * reach cell with coordinates (i, j) from starting cell (0, 0) under the
 * condition that you can only travel one step right or one step down.
 *
 * Assumptions:
 * - only 1 way to access first cell and all cells in first row or column
 * - matrix is rectangular array of subarrays
 * - extra space equivalent to matrix size is available
 * - whoever picks letters like M/N or i/j that look the same... why you do dis?
 */

function buildEmptyCache(totalRows) {
  const cache = [];
  for (let row = 0; row < totalRows; row++) { cache.push([]); }
  return cache;
}

// Only one way to travel along top row
function cacheFirstRow(numberOfColumns, cache) {
  for (let column = 0; column < numberOfColumns; column++) {
    cache[0][column] = 1;
  }
}

// Only one way to travel along left column
function cacheFirstColumn(numberOfRows, cache) {
  for (let row = 0; row < numberOfRows; row++) {
    cache[row][0] = 1;
  }
}

// Assumes first row and column have been cached
function fillCache(totalRows, totalColumns, cache) {
  // Loop from second row to final row, always starting at second column
  for (let row = 1; row < totalRows; row++) {
    for (let column = 1; column < totalColumns; column++) {
      // Total paths is simply the sum of paths from left and above
      cache[row][column] = cache[row - 1][column] + cache[row][column - 1];
    }
  }
}

// Bottom-up approach. O(M*N) time and space complexity.
// Could create closure so that cache is built only once.
function countPaths(M, N, i, j) {
  if (
    !Number.isSafeInteger(M)
    || !Number.isSafeInteger(N)
    || !Number.isSafeInteger(i)
    || !Number.isSafeInteger(j)
    || i >= M
    || j >= N
  ) {
    throw new Error('Please insert valid inputs. See function documentation.');
  }

  const cache = buildEmptyCache(M);
  cacheFirstRow(N, cache);
  cacheFirstColumn(M, cache);

  // Could optimize to only build to ith row and jth column
  fillCache(M, N, cache);
  console.log(cache);
  return cache[i][j];
}

console.log(2, countPaths(3, 3, 1, 1));
console.log(70, countPaths(5, 5, 4, 4));
console.log(1, countPaths(1, 1, 0, 0));
