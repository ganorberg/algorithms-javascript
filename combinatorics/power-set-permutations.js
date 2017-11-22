/* NOTE: My other file on bottom-up power set is much cleaner and more performant.
 *
 * Write a method to return all subsets of a set.
 *
 * Assumptions:
 * - include empty set
 * - input data type is array
 *
 * Time complexity: O(2^N)
 * Space complexity: O(2^N)
 *
 * EXAMPLES
 * { 1 } -> [[], [1]]
 * { 1 2 } -> [[], [1], [2], [1, 2]]
 * { 1 2 3 } -> [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
 */

// Not best practice to modify built-in prototypes, so just having fun for algorithm
Set.prototype.deepEquals = function (setB) {
  if (this.size !== setB.size) { return false; }
  for (let elem of this) {
    if (!setB.has(elem)) { return false; }
  }

  return true;
}

Set.prototype.hasSet = function (setB) {
  for (let elem of this) {
    if (elem.deepEquals(setB)) { return true; }
  }

  return false;
}

function findPowerSet(arr) {
  const powerSet = new Set();

  // Permutation "take it or leave it" recursive approach
  function buildSubsets(leftovers, subset = new Set()) {
    if (!powerSet.hasSet(subset)) { powerSet.add(subset); }
    if (subset.size === arr.length) { return; }
    
    for (let i = 0; i < leftovers.length; i++) {
      // Clone to avoid sharing with other recursive branches
      const newSubset = new Set(subset);

      // Add one item to subset
      newSubset.add(leftovers[i]);

      // Leave the items you didn't add
      const newLeftovers = [...leftovers.slice(0, i), ...leftovers.slice(i + 1)];
      buildSubsets(newLeftovers, newSubset);
    }
  }

  buildSubsets(arr);
  return powerSet;
}

const arr0 = [1, 2, 3];
const arr1 = [1, 2, 3, 'a', 'b', 'c'];
const arr2 = [1, 2, 3, 'a', 'b', 'c', 4, 5]; // this alg slows after only 8 inputs!!
console.log(findPowerSet(arr0));
console.log(findPowerSet(arr1));
console.log(findPowerSet(arr2));