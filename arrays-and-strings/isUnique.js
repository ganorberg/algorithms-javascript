/* Implement an algorithm to determine if a string has all unique characters.
 * What if you cannot use additional data structures?
 *
 * My assumptions:
 * - Spaces, numbers and symbols count as characters
 * - Case matters
 * - Empty string returns true
 * - Non-string input throws error
 * - Unicode character set
 * - No compound characters/named entities/interpretations
 * 
 * ALTERNATIVE IMPLEMENTATION:
 * - Use set to check in linear time with linear space (assuming length of
 *   string matters and size of character set does not)
 * - If preprocessing is allowed, sort string first then compare characters
 *   with next character
 */
function isUnique(string) {
  if (typeof string !== 'string') { throw new Error('Please insert string'); }

  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    for (let j = i + 1; j < string.length; j++) {
      if (char === string[j]) { return false; }
    }
  }

  return true;
}

console.log('true: ', isUnique('dog'));
console.log('true: ', isUnique('dogs bark'));
console.log('false: ', isUnique('woof'));
console.log('false: ', isUnique('111'));
console.log('false: ', isUnique('1 2 3'));
console.log('true: ', isUnique(''));