// Optimization uses custom insertion sort to handle small subarrays

function partition(arr, lo, hi) {
  let i = lo;
  let j = hi + 1;
  
  while (true) {
    while (arr[++i] < arr[lo] && i !== hi) {}
    while (arr[--j] > arr[lo] && j !== lo) {}
    if (i >= j) { break; }
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  [arr[lo], arr[j]] = [arr[j], arr[lo]];
  return j;
}

function knuthShuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const random = Math.floor(Math.random() * i);
    [arr[i], arr[random]] = [arr[random], arr[i]];
  }
}

// modify insertion sort to target subarray in-place
function insertionSort(arr, lo, hi) {
  console.log('lo: ', lo, 'hi: ', hi);
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