// First element is pivot
function partition(arr, lo, hi) {
  const pivot = arr[lo];

  let i = lo + 1;
  let j = hi;

  while (true) {
    while (arr[i] < pivot && i < hi) { i++; }

    // j will hit pivot before exiting array, and pivot > pivot is false
    while (arr[j] > pivot) { j--; }

    // When pointers cross, partitioning is complete except for final swap
    if (i >= j) { break; }

    // Exchange values that break invariant (left less, right greater)
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // j now represents partition point, so swap with lo to achieve invariant 
  // that everything to the left of lo is smaller and to the right is greater
  [arr[lo], arr[j]] = [arr[j], arr[lo]];

  // Return pointer where swap occurred for sort to call next partitions
  return j;
}

// SIDE EFFECT: swaps in place
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// SIDE EFFECT: shuffles in place
function knuthShuffle(array) {
  // Skip last element because nothing left to swap with
  for (let i = array.length - 1; i > 0; i--) {
    // i + 1 means inclusive on current element, as opposed to i as exclusive
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }
}

// SIDE EFFECT: mutates input array
function quickSelect(arr, k) {
  knuthShuffle(arr);
  let lo = 0;
  let hi = arr.length - 1;

  // Loop until partition index matches k
  while (true) {
    const pivotIndex = partition(arr, lo, hi);

    // Congratulations, you found kth smallest value!
    if (k === pivotIndex) { return arr[k]; }

    // If kth smallest value is in smaller partition, look there
    if (k < pivotIndex) { hi = pivotIndex - 1; }

    // If kth smallest value is in larger partition, look there
    if (k > pivotIndex) { lo = pivotIndex + 1; }
  }
}

const arr = [1, 4, 2, 3, 9, 1, 6];
const arr2 = [7];
const arr3 = [7, 6, 10, 30, 1, 72, 80, 12];
console.log(6, quickSelect(arr, 5));
console.log(2, quickSelect(arr, 2));
console.log(7, quickSelect(arr2, 0));
console.log(10, quickSelect(arr3, 3));
console.log(arr3);
