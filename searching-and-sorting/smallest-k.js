/*
 * Design an algorithm to find the smallest K numbers in an array.
 * 
 * ASSUMPTIONS
 * - valid inputs
 * - do not mutate array
 * 
 * STRATEGY: O(N) time and space
 * Use quick select to find kth smallest value, then slice from the array to 
 * that index.
 */
function smallestK(arr, k) {
  const shuffled = knuthShuffle(arr);
  const rankedArray = quickSelect(shuffled, k);
  return rankedArray.slice(0, k + 1);
}

function quickSelect(arr, k) {
  let left = 0;
  let right = arr.length - 1;
  while (true) {
    let pivotIndex = partition(arr, left, right);
    if (k === pivotIndex) { return arr; }
    if (k > pivotIndex) { left = pivotIndex + 1; }
    if (k < pivotIndex) { right = pivotIndex - 1; }
  }
}

function partition(arr, lo, hi) {
  const pivot = lo;
  let left = lo + 1;
  let right = hi;

  while (true) {
    while (arr[left] < arr[pivot] && left < hi) { left++; }
    while (arr[right] > arr[pivot]) { right--; }
    if (left >= right) { break; }
    swap(arr, left, right);
  }

  swap(arr, right, pivot);
  return right;
}

function knuthShuffle(arr) {
  const copy = arr.slice();

  for (let i = copy.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    swap(copy, i, random);
  }

  return copy;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

const testArr = [10, 11, 5, 1, 13, 2];
const testK = 3;

// Any order is fine
console.log([1, 2, 5, 10], smallestK(testArr, testK));
