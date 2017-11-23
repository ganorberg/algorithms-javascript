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
 *
 * Space complexity can be improved to O(A) since only current and previous rows
 * are needed in calculations. To do this, start with mostly empty cache then
 * delete rows as they are not needed while building new ones.
 */
function LCSLength(X, Y, m = X.length, n = Y.length, lookup = {}) {
  if (m === 0 || n === 0) { return 0; }
  const key = String(m) + '|' + String(n);

  if (lookup.hasOwnProperty(key)) { return lookup[key]; }
  if (X[m - 1] === Y[n - 1]) {
    return lookup[key] = 1 + LCSLength(X, Y, m - 1, n - 1, lookup);
  }

  return lookup[key] = Math.max(
    LCSLength(X, Y, m, n - 1, lookup),
    LCSLength(X, Y, m - 1, n, lookup)
  );
}

console.log(4, LCSLength('ABCBDAB', 'BDCABA'));
console.log(4, LCSLength('XMJYAUZ', 'MZJAWXU'));
console.log(3, LCSLength('DOGGGIE', 'DOOOOOOG'));