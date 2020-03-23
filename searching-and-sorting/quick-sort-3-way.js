function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

/**
 * Dijkstra 3-way partitioning shines for many duplicates. Great for small
 * subarrays, too, so no need for insertion sort optimization. Reduces running
 * time from linearithmic to linear in a broad class of applications.
 */
function partition3Way(arr, lo, hi) {
  let pivot = lo;
  let left = lo + 1;
  let right = hi;

  while (left <= right) {
    if (arr[left] === arr[pivot]) {
      left++;
    } else if (arr[left] < arr[pivot]) {
      swap(arr, left, pivot);
      left++;
      pivot++;
    } else {
      swap(arr, left, right);
      right--;
    }
  }

  return right;
}

function sort(arr, lo = 0, hi = arr.length - 1) {
  if (hi <= lo) {
    return;
  }

  const pivot = partition3Way(arr, lo, hi);
  sort(arr, lo, pivot - 1);
  sort(arr, pivot + 1, hi);
}

function knuthShuffle(array) {
  // Skip last element because nothing left to swap with
  for (let i = array.length - 1; i > 0; i--) {
    // i + 1 makes the swap potentially include the current element
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }
}

function quickSort(arr) {
  // Randomly shuffle to avoid worst case where array is already sorted
  knuthShuffle(arr);
  sort(arr);
}

const str = "KRATELEPUIMQDIFUHOA";
const arr = Array.from(str);
quickSort(arr);
console.log(arr);

const str2 = "RBWWRWBRRWBR";
const arr2 = Array.from(str2);
quickSort(arr2);
console.log(arr2);

const arr3 = [
  3,
  2,
  -4,
  1,
  6,
  8,
  9,
  0,
  9,
  -5,
  -10,
  12,
  -3,
  -100,
  -1000,
  20,
  70,
  -89
];
quickSort(arr3);
console.log(arr3);
