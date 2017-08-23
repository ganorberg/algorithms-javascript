/* Write a method to replace all spaces in a string with '%20'. You may assume
 * that the string has sufficient space at the end to hold the additional
 * characters, and that you are given the "true" length of the string.
 *
 * EXAMPLE
 * Input: "Mr John Smith    ", 13
 * Output: "Mr%20John%20Smith"
 *
 * My assumptions:
 * - no spaces at the beginning
 * - if multiple spaces between words, URLify all of them
 * - include symbols, letters, numbers
 * - no interpreted compound/whitespace characters
 * - bad inputs should throw error
 *
 * ALTERNATIVE IMPLEMENTATION:
 * - use array to avoid string concat, which may be inefficient in some browsers
 */
function URLify(string, length) {
  if (typeof string !== 'string'
    || !Number.isInteger(length)
    || length < 1
    || length > string.length) {
    throw new Error('Please insert valid inputs');
  }

  let word = '';
  for (let i = 0; i < length; i++) {
    if (string[i] === ' ') { word += '%20'; }
    else { word += string[i]; }
  }

  return word;
}

console.log('Mr%20John%20Smith: ', URLify('Mr John Smith    ', 13))
console.log('Ms%20Jane: ', URLify('Ms Jane', 7))
console.log('error: ', URLify('', 0))