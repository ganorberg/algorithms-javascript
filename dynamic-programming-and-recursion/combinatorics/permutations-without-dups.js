/*
 * Write a method to compute all permutations of a string of unique characters.
 * 
 * ASSUMPTIONS
 * - valid input data type
 * - no funky business with multi-unicode characters or weird symbols
 * - one space allowed as unique character
 * - capitalized letters are distinct from lowercase
 * 
 * STRATEGY: TOP DOWN O(N^2 * N!) time
 * - Select one character and add to permutation, grab the rest of the string.
 *   Repeat.
 * 
 * STRATEGY: BOTTOM UP O(N^2 * N!) time
 * - Add each character to the current permutations at all indices.
 * 
 * STRATEGY: HEAP'S ALGORITHM O(N * N!) time
 * - Use a wise man's research
 * 
 * TIME COMPLEXITY ANALYSIS
 * There are N! permutations, each with N characters, and my implementations use 
 * slicing and concatenation for an additional O(N). Heap's algorithm gets 
 * running time down to O(N * N!) without slicing by clever use of swaps.
 */

// Heap's algorithm
function permutationsWithoutDups(str) {
  const arr = Array.from(str);
  const permutations = [];

  function getPermutations(n) {
    if (n === 1) {
      const completePermutation = arr.join('');
      permutations.push(completePermutation);
      return;
    }

    for (let i = 0; i < n; i++) {
      getPermutations(n - 1);

      // Odd length swaps first element. Even length swaps ith element.
      swap(arr, n % 2 ? 0 : i, n - 1);
    }
  }

  getPermutations(arr.length);
  return permutations;
}

function swap(arr, a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

/*
// TOP DOWN
function permutationsWithoutDups(str, perm = '', result = []) {
 if (str.length === 0) { result.push(perm); }
 for (let i = 0; i < str.length; i++) {
   const selected = str[i];
   const rest = str.slice(0, i) + str.slice(i + 1);
   permutationsWithoutDups(rest, perm + selected, result);
 }

 return result;
}
*/

/*
// BOTTOM UP
function permutationsWithoutDups(str) {
  let results = [''];

  for (let i = 0; i < str.length; i++) {
    const tempResults = [];
    const char = str[i];

    results.forEach(permutation => {
      const permutationsWithCharAdded = insertAtEachIndex(permutation, char);
      permutationsWithCharAdded.forEach(perm => tempResults.push(perm));
    });

    results = tempResults;
  }

  return results;
}

function insertAtEachIndex(str, char) {
  const results = [];
  const ALL_INDICES = str.length + 1;

  for (let i = 0; i < ALL_INDICES; i++) {
    const inserted = str.slice(0, i) + char + str.slice(i);
    results.push(inserted);
  }

  return results;
}
*/

console.log(permutationsWithoutDups('abcdefghij')); // extremely slow after 10
// console.log(permutationsWithoutDups(''));
