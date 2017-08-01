function partition(arr, lo, hi) {
  let i = lo;
  let j = hi + 1;
  while (true) {
    while (arr[++i] < arr[lo] && i < hi) {}
    while (arr[--j] > arr[lo] && j > lo) {}
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

function quickSelect(arr, k) {
  knuthShuffle(arr);
  let lo = 0;
  let hi = arr.length - 1;

  // Loop until partition index matches k
  while (true) {
    const pivotIndex = partition(arr, lo, hi);

    // congratulations, you found kth smallest value!
    if (k === pivotIndex) { return arr[k]; }

    // if kth smallest value is in smaller partition, look there
    if (k < pivotIndex) { hi = pivotIndex - 1; }

    // if kth smallest value is in larger partition, look there
    if (k > pivotIndex) { lo = pivotIndex + 1; }
  }
}

const arr = [1, 4, 2, 3, 9, 1, 6];
const arr2 = [7];
console.log(quickSelect(arr, 5)); // 6
console.log(quickSelect(arr, 2)); // 2
console.log(quickSelect(arr2, 0)); // 7