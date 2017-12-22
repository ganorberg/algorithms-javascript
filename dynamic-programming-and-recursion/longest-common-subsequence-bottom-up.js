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
const cacheFuncs = {
  buildEmptyCache(numberOfRows) {
    const cache = [];
    for (let row = 0; row < numberOfRows; row++) { cache.push([]); }
    return cache;
  },

  // SIDE EFFECT: mutates cache
  cacheFirstRow(cache, numberOfColumns) {
    for (let column = 0; column < numberOfColumns; column++) { cache[0].push(0); }
  },

  // SIDE EFFECT: mutates cache
  cacheFirstColumn(cache, numberOfRows) {
    for (let row = 0; row < numberOfRows; row++) { cache[row][0] = 0; }
  },

  // SIDE EFFECT: mutates cache
  fillCache(cache, numberOfRows, numberOfColumns, A, B) {
    for (let row = 1; row < numberOfRows; row++) {
      for (let column = 1; column < numberOfColumns; column++) {
        const letterA = A[row - 1];
        const letterB = B[column - 1];

        let maxLength;

        // Optimal subproblem is where last letter falls off each string. This
        // is the top-left diagonal in the cache. Add 1 to it for new optimum
        // length between these two substrings.
        if (letterA === letterB) { maxLength = 1 + cache[row - 1][column - 1]; }

        // Optimum value lies in substrings
        else { maxLength = Math.max(cache[row - 1][column], cache[row][column - 1]); }

        cache[row][column] = maxLength;
      }
    }
  },

  getLCSfromCache(cache, A) {
    let LCS = "";
    let row = cache.length - 1;
    let column = cache[0].length - 1;
    let length = cache[row][column];

    while (length > 0) {
      // Matching length above or left means those values had match, not current
      if (length === cache[row - 1][column]) {
        row--;
      } else if (length === cache[row][column - 1]) {
        column--;

        // If value does not match left or above, then must come from match!
      } else {
        // Subtract 1 because cache index is 1 ahead of string for each character
        LCS = A[row - 1] + LCS;

        // Move to diagonal and take on its value
        row--;
        column--;
        length--;
      }
    }

    return LCS;
  },
}

function LCSlength(A, B) {
  if (typeof A !== 'string' || typeof B !== 'string') {
    throw new Error('Please insert strings in LCSlength function, my friend!');
  }

  // Add 1 for space to initialize 0s against empty string
  const numberOfRows = A.length + 1;
  const numberOfColumns = B.length + 1;

  const cache = cacheFuncs.buildEmptyCache(numberOfRows);
  cacheFuncs.cacheFirstRow(cache, numberOfColumns);
  cacheFuncs.cacheFirstColumn(cache, numberOfRows);
  cacheFuncs.fillCache(cache, numberOfRows, numberOfColumns, A, B);
  console.log('cache: ', cache, 'one LCS: ', cacheFuncs.getLCSfromCache(cache, A));
  return cache[numberOfRows - 1][numberOfColumns - 1];
}

console.log(4, LCSlength('BDCABA', 'ABCBDAB'));
console.log(4, LCSlength('XMJYAUZ', 'MZJAWXU'));
console.log(3, LCSlength('DOGGGIE', 'DOOOOOOG'));
console.log(3, LCSlength('DOGE', 'DOOG'));
