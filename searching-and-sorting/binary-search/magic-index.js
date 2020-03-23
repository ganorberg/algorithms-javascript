/* A magic index in an array A[0...n-1] is defined to be an index such that
 * A[i] = i. Given a sorted array of distinct integers, write a method to find
 * a magic index, if one exists, in array A.
 *
 * Assumptions:
 * - sort is in ascending order
 * - integers in input array are all safe
 * - if multiple magic indexes, return first one found
 * - return false if no magic index
 *
 * Time complexity:
 * - O(logN)
 */
function magicIndex(arr) {
  if (!Array.isArray(arr)) { return 'Please insert array input'; }

  let lo = 0;
  let hi = arr.length - 1;
  
  let midIndex = Math.floor((hi + lo) / 2);

  while (hi >= lo) {
    if (arr[midIndex] === midIndex) { return midIndex; }
    else if (arr[midIndex] > midIndex) { hi = midIndex - 1; }
    else if (arr[midIndex] < midIndex) { lo = midIndex + 1; }
    midIndex = Math.floor((hi + lo) / 2);
  }

  return false;
}

const arr0 = [0];
const arr1 = [1];
const arr2 = [-1, 1, 2];
const arr3 = [2, 3, 8, 16];
const arr4 = [0, 1, 2, 3, 4];
const arr5 = [-10, -5, 0, 1, 3, 5, 7, 10, 12];

console.log(0, magicIndex(arr0));
console.log(false, magicIndex(arr1));
console.log(1, magicIndex(arr2));
console.log(false, magicIndex(arr3));
console.log(2, magicIndex(arr4));
console.log(5, magicIndex(arr5));
console.log(magicIndex());