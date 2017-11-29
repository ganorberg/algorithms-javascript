/* Implement a method to perform basic string compression using the counts of
 * repeated characters. For example, the string aabcccccaaa would become
 * a2b1c5a3. If the "compressed" string would not become smaller than the 
 * original string, your method should return the original string. You can
 * assume the string has only uppercase and lowercase letters (a-z).
 * 
 * ASSUMPTIONS:
 * - upper and lower cases are different and should not be counted together
 * - Interpreter/JITC handles string concat like array. Otherwise, build array 
 *   instead of string to avoid quadratic time from building new strings.
 */
function compressString(str) {
  let compressed = "";

  let tracking = str[0];
  let count = 1;

  for (let i = 1; i < str.length; i++) {
    const letter = str[i];

    if (letter === tracking) {
      count++;
    } else {
      compressed = compressed + tracking + String(count);
      tracking = letter;
      count = 1;
    }
  }

  // Could modify loop checks to include this on last iteration after possible count increment
  compressed = compressed + tracking + String(count);
  return compressed.length < str.length ? compressed : str;
}

// STRATEGY
// Need overall string to return
// Need current letter to track letters, starting at first letter
// Need counter to append to current character added, starting at 1
// Loop through str from second char
// If letter matches tracker, add 1 to counter
// If letter does not match...
// Append letter and count to overall
// Reset current letter and count to 1
// Append letter and count since loop ends without final addition
// If new string longer, return original

console.log("a2b1c5a3", compressString("aabcccccaaa"));
