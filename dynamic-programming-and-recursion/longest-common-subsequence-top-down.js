/* Find the length of a longest sequence which can be obtained from the first
 * original sequence by deleting some items, and from the second original
 * sequence by deleting other items.
 * eg
 * X: ABCBDAB
 * Y: BDCABA
 *
 * LCS length is 4 for BDAB, BCAB, and BCBA
 *
 * Assumptions:
 * - valid inputs
 *
 * Time complexity: O(A * B), where each character represents length of each input string
 * Space complexity: O(A * B), where each character represents length of each input string
 */
function LCSlength(A, B, indexA = 0, indexB = 0, lookup = {}) {
  const subproblem = stringify(indexA, indexB);
  if (lookup.hasOwnProperty(subproblem)) { return lookup[subproblem]; }
  if (indexA >= A.length || indexB >= B.length) { return 0; }

  if (A[indexA] === B[indexB]) {
    return lookup[subproblem] = 1 + LCSlength(A, B, indexA + 1, indexB + 1, lookup);
  }

  return lookup[subproblem] = Math.max(
    LCSlength(A, B, indexA + 1, indexB, lookup),
    LCSlength(A, B, indexA, indexB + 1, lookup),
  );
}

function stringify(A, B) {
  return `${A}|${B}`;
}

console.log(4, LCSlength('ABCBDAB', 'BDCABA'));
console.log(4, LCSlength('XMJYAUZ', 'MZJAWXU'));
console.log(3, LCSlength('DOGGGIE', 'DOOOOOOG'));
