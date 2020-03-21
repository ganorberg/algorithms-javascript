/* Write a method to sum all subsets of a set.
 *
 * ASSUMPTIONS
 * - valid input
 * - no duplicates, as expected with a mathematical set
 *
 * STRATEGY: O(N) time and O(1) space complexity
 * Each number appears 2^(N - 1) times. So multiply each number by that amount
 * then sum. Factor out 2^(N - 1) term to simplify logic so you can simply get 
 * array sum then multiply it by 2^(N - 1) to get sum of all subsets.
 */
function sumAllSubsets(arr) {
  const frequency = 2 ** (arr.length - 1);
  const arraySum = arr.reduce((total, value) => total + value, 0);
  return frequency * arraySum;
}

const arr0 = [1, 2, 3];
const arr1 = [2, 3, 5];
console.log(24, sumAllSubsets(arr0));
console.log(40, sumAllSubsets(arr1));
