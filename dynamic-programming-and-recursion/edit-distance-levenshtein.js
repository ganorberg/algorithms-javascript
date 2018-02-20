/* Find the Levenshtein distance (edit distance) between two words.
 *
 * This is the minimum number of single-character edits (i.e. insertions,
 * deletions, or replacements) required to change one word into the other.
 *
 * For example, the Levenshtein distance between kitten and sitting is 3.
 * On kitten, replace k with s, then replace e with i, then insert g at end.
 * 
 * STRATEGY:
 * Recurrence relation is:
 * if same, get diagonal and move both
 * else cell = 1 + min(
 *   prev best + insert (keep A, move B),
 *   prev best + delete(move A, keep B),
 *   prev best + replace(move both)
 * )
*/
const cacheFuncs = {
  buildEmptyCache(numberOfRows) {
    const cache = [];
    for (let i = 0; i < numberOfRows; i++) { cache.push([]); }
    return cache;
  },

  // First row compares to empty string, which means each character adds 1 insertion
  cacheFirstRow(cache, numberOfColumns) {
    for (let i = 0; i < numberOfColumns; i++) { cache[0][i] = i; }
  },

  // First column compares to empty string, which means each character adds 1 insertion
  cacheFirstColumn(cache, numberOfRows) {
    for (let i = 0; i < numberOfRows; i++) { cache[i][0] = i; }
  },

  // Bottom-up dynamic programming approach
  fillCache(cache, A, B) {
    const LETTER_START_INDEX = 1;
    for (let row = LETTER_START_INDEX; row < cache.length; row++) {
      for (let column = LETTER_START_INDEX; column < cache[0].length; column++) {
        const letterA = A[row - LETTER_START_INDEX];
        const letterB = B[column - LETTER_START_INDEX];

        // No cost, so move to subproblem where last letter falls off each string
        if (letterA === letterB) {
          cache[row][column] = cache[row - 1][column - 1];
          continue;
        }

        const OPERATION_COST = 1;
        cache[row][column] = OPERATION_COST + Math.min(
          // Replace
          cache[row - 1][column - 1],
          // Delete
          cache[row - 1][column],
          // Insert
          cache[row][column - 1]
        );
      }
    }
  }
}

function editDistanceDP(A, B) {
  // Add 1 for empty string initialization in cache's first row and column
  const numberOfRows = A.length + 1;
  const numberOfColumns = B.length + 1;

  const cache = cacheFuncs.buildEmptyCache(numberOfRows);
  cacheFuncs.cacheFirstRow(cache, numberOfColumns);
  cacheFuncs.cacheFirstColumn(cache, numberOfRows);
  cacheFuncs.fillCache(cache, A, B);
  console.log(cache);
  return cache[numberOfRows - 1][numberOfColumns - 1];
}

console.log(3, editDistanceDP('kitten', 'sitting'));
console.log(3, editDistanceDP('abcdef', 'azced'));
console.log(4, editDistanceDP('a', 'azced'));
console.log(5, editDistanceDP('azced', 'b'));
console.log(2, editDistanceDP('ab', 'yz'));
console.log(3, editDistanceDP('', 'xyz'));





// BRUTE FORCE PREFIX APPROACH
// function editDistance(A, B, distance = 0) {
//   if (A === '') { return distance + B.length; }
//   if (B === '') { return distance + A.length; }

//   // Same letter, so skip it
//   if (A[0] === B[0]) { return editDistance(A.slice(1), B.slice(1), distance); }

//   // Search all possible distances in O(3^N) time
//   return Math.min(
//     // Case 1: Replace character in A
//     editDistance(A.slice(1), B.slice(1), distance + 1),

//     // Case 2: Insert character in A
//     editDistance(A, B.slice(1), distance + 1),

//     // Case 3: Delete character in A
//     editDistance(A.slice(1), B, distance + 1)
//   );
// }

// console.log(3, editDistance('kitten', 'sitting'));
// console.log(3, editDistance('abcdef', 'azced'));
// console.log(4, editDistance('a', 'azced'));
// console.log(5, editDistance('azced', 'b'));
// console.log(2, editDistance('ab', 'yz'));