/* Find the Levenshtein distance (edit distance) between two words.
 *
 * This is the minimum number of single-character edits (i.e. insertions,
 * deletions, or replacements) required to change one word into the other.
 *
 * For example, the Levenshtein distance between kitten and sitting is 3.
 * On kitten, replace k with s, then replace e with i, then insert g at end.
 */
function buildEmptyCache(numberOfRows) {
  const cache = [];
  for (let i = 0; i < numberOfRows; i++) { cache.push([]); }
  return cache;
}

// First row compares to empty string, which means each character adds 1 insertion
function cacheFirstRow(cache, numberOfColumns) {
  for (let i = 0; i < numberOfColumns; i++) { cache[0][i] = i; }
}

// First column compares to empty string, which means each character adds 1 insertion
function cacheFirstColumn(cache, numberOfRows) {
  for (let i = 0; i < numberOfRows; i++) {cache[i][0] = i; }
}

// Bottom-up dynamic programming approach
function fillCache(cache, A, B) {
  for (let row = 1; row < cache.length; row++) {
    for (let column = 1; column < cache[0].length; column++) {
      // Subtract 1 from each index because letters in cache start at index 1
      const letterA = A[row - 1];
      const letterB = B[column - 1];

      // No cost, so move to subproblem where last letter falls off each string
      if (letterA === letterB) {
        cache[row][column] = cache[row - 1][column - 1];
        continue;
      }

      const minCost = Math.min(
        // Replace
        cache[row - 1][column - 1],
        // Delete
        cache[row - 1][column],
        // Insert
        cache[row][column - 1]
      );

      // Adding 1 represents cost for insertion, deletion or replacement
      cache[row][column] = minCost + 1;
    }
  }
}

/*
Recurrence relation is:

if same, get diagonal and move both
else cell = 1 + min(
  prev best + insert (keep A, move B),
  prev best + delete(move A, keep B),
  prev best + replace(move both)
)
*/
function editDistanceDP(A, B) {
  // Add 1 for empty string initialization in cache's first row and column
  const numberOfRows = A.length + 1;
  const numberOfColumns = B.length + 1;

  const cache = buildEmptyCache(numberOfRows);
  cacheFirstRow(cache, numberOfColumns);
  cacheFirstColumn(cache, numberOfRows);
  fillCache(cache, A, B);
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

//   // Search all possible distances in O(N^3) time
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