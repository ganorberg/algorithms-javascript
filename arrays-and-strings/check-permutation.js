/* Given two strings, write a method to decide if one is a permutation of the
 * other.
 *
 * My assumptions:
 * - Spaces, numbers, symbols and case matter
 * - Empty string against empty string returns true
 * - Non-string input throws error
 * - Unicode character set
 * - No compound characters/named entities/interpretations
 * 
 * ALTERNATIVE IMPLEMENTATION:
 * - sort both strings and compare letter by letter
 * - use object instead of Map (see below)
 */
function checkPermutation(str1, str2) {
  // fail fast
  if (str1.length !== str2.length) { return false; }

  const table = new Map();

  // build table for first word with keys=characters and values=counts
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];
    table.has(char) ? table.set(char, table.get(char) + 1) : table.set(char, 1);
  }

  // decrement counts and remove key-value pair when value hits 0
  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];
    if (table.has(char)) {
      table.set(char, table.get(char) - 1);
      if (table.get(char) === 0) { table.delete(char); }
    } else {

      // fast fail if character in str2 is not in str1
      return false;
    }
  }

  // empty table means they are permutations of each other!
  return table.size === 0;
}

// function checkPermutation(str1, str2) {
//   // fail fast
//   if (str1.length !== str2.length) { return false; }

//   const table = {};

//   // build table for first word where keys are characters and values are counts
//   for (let i = 0; i < str1.length; i++) {
//     const char = str1[i];
//     table.hasOwnProperty(char) ? table[char]++ : table[char] = 1;
//   }

//   // decrement counts and remove key-value pair when value hits 0
//   for (let i = 0; i < str2.length; i++) {
//     const char = str2[i];
//     if (table.hasOwnProperty(char)) {
//       table[char]--;
//       if (table[char] === 0) { delete table[char]; }
//     } else {

//       // fast fail if character in str2 is not in str1
//       return false;
//     }
//   }

//   // empty table means they are permutations of each other!
//   return Object.keys(table).length === 0;
// }

console.log('true: ', checkPermutation('dog', 'god'));
console.log('false: ', checkPermutation('d', 'god'));
console.log('false: ', checkPermutation('dogg', 'god'));
console.log('true: ', checkPermutation('', ''));
console.log('true: ', checkPermutation('space a', 'a space'));
console.log('false: ', checkPermutation('casematters', 'CASEMATTERS'));