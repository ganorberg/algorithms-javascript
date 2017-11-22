/* Write a method to return all subsets of a set.
 *
 * Assumptions:
 * - include empty set
 * - input data type is array
 * - input length does not exceed 20 since 2^20 requires ~1 second to compute
 *   and each additional unit of length will double that already slow time
 *
 * Time complexity: O(2^N)
 * Space complexity: O(2^N)
 *
 * EXAMPLES
 * [1] -> [[], [1]]
 * [1, 2] -> [[], [1], [2], [1, 2]]
 * [1, 2, 3] -> [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
 */
function findPowerSet(arr) {
  const powerSet = [[]];

  arr.forEach(value => {
    powerSet.forEach(subset => {
      const newSubset = [...subset, value];
      powerSet.push(newSubset);
    });
  });

  return powerSet;
}

const arr0 = [1, 2, 3];
const arr1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];  // gets really slow after length 20 because 2^20 takes ~1 second
console.log(findPowerSet(arr0));
console.log(findPowerSet(arr1));