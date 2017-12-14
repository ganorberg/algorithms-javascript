/*
 * Write a method to compute all permutations of a string whose characters are 
 * not necessarily unique. The list of permutations should not have duplicates.
 * 
 * ASSUMPTIONS
 * - valid inputs
 * - don't want to simply get all perms then filter
 * - should handle super long string of same character (length > 12)
 * 
 * STRATEGY
 * - Build a hash table representing the count of each letter in the string.
 *   We will grab characters using this hash table and will decrement the count
 *   when we use that character. After using each character and recursing, 
 *   backtrack by incrementing the count so that the next character gets its 
 *   chance at being selected. Use a counter to know when you have reached
 *   the appropriate length for the permutation, then push to global results
 *   array.
 */

function permutationsWithDups(str) {
  const frequencyTable = buildFrequencyTable(str);
  return getPerms(frequencyTable, str.length);
}

function buildFrequencyTable(str) {
  const table = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (table.hasOwnProperty(char)) { table[char]++; }
    else { table[char] = 1; }
  }

  return table;
}

function getPerms(frequencyTable, remaining, perm = '', results = []) {
  // console.log('perm: ', perm);
  if (remaining === 0) {
    results.push(perm);
    return;
  }

  // Assume nothing in prototype chain. Otherwise, add check.
  for (const char in frequencyTable) {
    const count = frequencyTable[char];
    if (count <= 0) { continue; }
    frequencyTable[char]--;
    getPerms(frequencyTable, remaining - 1, perm + char, results);
    frequencyTable[char]++;
  }

  return results;
}

debugger;
permutationsWithDups('abb')

// console.log(permutationsWithDups('abb'));
// console.log(permutationsWithDups('abbb'));
// console.log(permutationsWithDups('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));