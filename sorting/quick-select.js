function partition(arr, lo, hi) {
  let i = lo;
  let j = hi + 1;
  while (true) {
    while (arr[++i] < arr[lo] && i < hi) { }
    while (arr[--j] > arr[lo] && j > lo) { }
    if (i >= j) { break; }
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  [arr[lo], arr[j]] = [arr[j], arr[lo]];
  return j;
}

function knuthShuffle(array) {
  // Skip last element because nothing left to swap with
  for (let i = array.length - 1; i > 0; i--) {
    // i + 1 means inclusive on current element, as opposed to i as exclusive
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }
}

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
