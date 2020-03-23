// Optimization uses custom insertion sort to handle small subarrays

function partition(arr, lo, hi) {
  let i = lo;
  let j = hi + 1;

  while (true) {
    while (arr[++i] < arr[lo] && i !== hi) { }
    while (arr[--j] > arr[lo] && j !== lo) { }
    if (i >= j) { break; }
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  [arr[lo], arr[j]] = [arr[j], arr[lo]];
  return j;
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

// modify insertion sort to target subarray in-place
function insertionSort(arr, lo, hi) {
  // i now represents beginning and end of subarray
  for (let i = lo; i <= hi; i++) {
    // inner loop stops when j reaches beginning of subarray
    for (let j = i; j > lo && arr[j] < arr[j - 1]; j--) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
    }
  }

  return arr;
}

function sort(arr, lo, hi) {
  // create cutoff for small subarrays to avoid recursive overhead
  const CUTOFF = 10;

  // insertion sort quickly sorts small subarrays in-place for ~20% improved performance
  if (hi <= lo + CUTOFF) { return insertionSort(arr, lo, hi); }
  const pivotIndex = partition(arr, lo, hi);
  sort(arr, lo, pivotIndex - 1);
  sort(arr, pivotIndex + 1, hi);
}

function quickSort(arr) {
  knuthShuffle(arr);
  sort(arr, 0, arr.length - 1);
}

const str = 'KRATELEPUIMQCXOSHNASDIFUHOA';
const arr = Array.from(str);
quickSort(arr);
console.log(arr);