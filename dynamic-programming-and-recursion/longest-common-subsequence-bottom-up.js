/* Find the length of a longest sequence which can be obtained from the first
 * original sequence by deleting some items, and from the second original
 * sequence by deleting other items.
 * eg
 * X: ABCBDAB
 * Y: BDCABA
 *
 * LCS length is 4 for BDAB, BCAB, and BCBA
 *
 * Time complexity: O(A * B), where each character represents length of each input string
 * Space complexity: O(A * B), where each character represents length of each input string
 *
 * Space complexity can be improved to O(A) since only current and previous rows
 * are needed in calculations. To do this, start with mostly empty cache then
 * delete rows as they are not needed while building new ones.
 */
function buildEmptyCache(numberOfRows) {
  const cache = [];
  for (let i = 0; i < numberOfRows; i++) { cache.push([]); }
  return cache;
}

// LCS length is 0 comparing empty string with any other string
function cacheFirstRow(cache, numberOfColumns) {
  const firstRow = cache[0];
  for (let i = 0; i < numberOfColumns; i++) { firstRow[i] = 0; }
}

function cacheFirstColumn(cache, numberOfRows) {
  for (let i = 0; i < numberOfRows; i++) { cache[i][0] = 0; }
}

function fillCache(cache, A, B) {
  for (let row = 1; row < cache.length; row++) {
    for (let column = 1; column < cache[0].length; column++) {
      // Subtract 1 from each index because letters in cache start at index 1
      const letterA = A[row - 1];
      const letterB = B[column - 1];

      let length;

      // Add 1 for match and move to subproblem where last letter falls off each string
      if (letterA === letterB) { length = 1 + cache[row - 1][column - 1]; }

      // If no match, take maximum from substrings
      else { length = Math.max(cache[row - 1][column], cache[row][column - 1]); }
      
      // Store new information
      cache[row][column] = length;
    }
  }
}

function LCSLength(A, B) {
  if (typeof A !== 'string' || typeof B !== 'string') {
    throw new Error('Please insert strings in LCS function, my friend!');
  }

  // Add 1 for space to initialize 0s against empty string
  const numberOfRows = A.length + 1;
  const numberOfColumns = B.length + 1;

  const cache = buildEmptyCache(numberOfRows);
  cacheFirstRow(cache, numberOfColumns);
  cacheFirstColumn(cache, numberOfRows);
  fillCache(cache, A, B);
  console.log(cache);
  return cache[numberOfRows - 1][numberOfColumns - 1];
}

console.log(4, LCSLength('ABCBDAB', 'BDCABA'));
console.log(4, LCSLength('XMJYAUZ', 'MZJAWXU'));
console.log(3, LCSLength('DOGGGIE', 'DOOOOOOG'));