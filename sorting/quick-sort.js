// First element is pivot
function partition(arr, lo, hi) {
  const pivot = arr[lo];

  let i = lo;
  let j = hi + 1;

  while (true) {
    while (arr[++i] < pivot && i < hi) { }

    // j will hit pivot before exiting array, and pivot > pivot is false
    while (arr[--j] > pivot) { }

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

function knuthShuffle(array) {
  // Skip last element because nothing left to swap with
  for (let i = array.length - 1; i > 0; i--) {
    // i + 1 means inclusive on current element, as opposed to i as exclusive
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }
}

function sort(arr, lo = 0, hi = arr.length - 1) {
  if (hi <= lo) { return; }
  const pivotIndex = partition(arr, lo, hi);

  // Add and subtract 1 to leave pivot in place, as it is already sorted
  sort(arr, lo, pivotIndex - 1);
  sort(arr, pivotIndex + 1, hi);
}

function quickSort(arr) {
  // Randomly shuffle to guarantee performance
  knuthShuffle(arr);
  sort(arr);
}

const arr = Array.from('KRATELEPUIMQCXOSHNASDIFUHOA');
quickSort(arr);
console.log(arr);

// Middle element is pivot. Hoare partition scheme.
function partitionHoare(arr, lo, hi) {
  let pivotIndex = Math.floor((lo + hi) / 2);
  const pivot = arr[pivotIndex];
  let left = lo;
  let right = hi;

  while (left <= right) {
    while (arr[left] < pivot) { left++; }
    while (arr[right] > pivot) { right--; }
    if (left <= right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];

      // Need these to exit loop
      left++;
      right--;
    }
  }

  return left;
}

function sortHoare(arr, lo = 0, hi = arr.length - 1) {
  if (hi <= lo) { return; }
  const pivotIndex = partitionHoare(arr, lo, hi);
  sortHoare(arr, lo, pivotIndex - 1);

  // Do not add 1 to lo for this implementation
  sortHoare(arr, pivotIndex, hi);
}

function quicksortHoare(arr) {
  // Requires random shuffle to guarantee performance over time
  knuthShuffle(arr);
  sortHoare(arr);
}

// const arrMiddle = Array.from('KRATELEPUIMQCXOS');
// quicksortHoare(arrMiddle);
// console.log(arrMiddle);