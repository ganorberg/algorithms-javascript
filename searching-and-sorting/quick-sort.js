function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

function partition(arr, lo, hi) {
  const pivot = arr[lo];

  /**
   * Outer while loop will adjust these indexes before value
   * comparisons occur. Why not simply adjust here and make
   * smaller = lo + 1 and larger = hi? To prvent a rare case
   * where the outer while loop can get stuck swapping values
   * that are the same as the pivot without ever moving the
   * pointers. So each iteration needs to adjust the pointers,
   * regardless of the pivot value comparisons.
   */
  let smaller = lo;
  let larger = hi + 1;
  while (true) {
    smaller++;
    while (arr[smaller] < pivot && smaller < hi) {
      smaller++;
    }

    larger--;
    while (arr[larger] > pivot) {
      larger--;
    }

    if (smaller >= larger) {
      break;
    }

    swap(arr, smaller, larger);
  }

  /**
   * Before swapping, larger sits at the first value from the right that
   * is less than the pivot. After swapping with the pivot, larger represents
   * the partition point where everything to the left is smaller and everything
   * to the right is greater. That value is now considered sorted, and the sort
   * routine will next sort to the left and right of it.
   */
  swap(arr, lo, larger);
  return larger;
}

function sort(arr, lo = 0, hi = arr.length - 1) {
  if (hi <= lo) {
    return;
  }

  const pivotIndex = partition(arr, lo, hi);
  sort(arr, lo, pivotIndex - 1);
  sort(arr, pivotIndex + 1, hi);
}

function knuthShuffle(array) {
  // Skip last element because nothing left to swap with
  for (let i = array.length - 1; i > 0; i--) {
    // i + 1 makes the swap potentially include the current element
    const random = Math.floor(Math.random() * (i + 1));
    swap(array, i, random);
  }
}

function quickSort(arr) {
  // Randomly shuffle to avoid worst case where array is already sorted
  knuthShuffle(arr);
  sort(arr);
}

const arr = [
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
quickSort(arr);
console.log(arr);

const arr2 = Array.from("KRATELEPUIMQCXOSHNASDIFUGGLG");
quickSort(arr2);
console.log(arr2);
