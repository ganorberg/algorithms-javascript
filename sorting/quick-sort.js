// pivot is first value in subarray
function partition(arr, lo, hi) {
    // Don't add 1 because increment occurs before comparison is made.
  let i = lo;
  
  // Add 1 because decrement occurs before comparison is made.
  let j = hi + 1;
  
  while (true) {
    // Scan i from left to right until find character larger than initial value
    while (arr[++i] < arr[lo] && i !== hi) {}

    // Scan j from right to left until find character smaller than initial value
    while (arr[--j] > arr[lo] && j !== lo) {}
    
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

function knuthShuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const random = Math.floor(Math.random() * i);
    [arr[i], arr[random]] = [arr[random], arr[i]];
  }
}

function sort(arr, lo, hi) {
  // Base case: when pointers cross, array segment is sorted.
  if (hi <= lo) { return; }

  // Partitions array segment in-place and returns partition index.
  const pivotIndex = partition(arr, lo, hi);

  // Specifies left subarray with pivotIndex - 1 as input for hi parameter 
  sort(arr, lo, pivotIndex - 1);

  // Specifies right subarray with pivotIndex + 1 as input for lo parameter
  sort(arr, pivotIndex + 1, hi);
}

function quickSort(arr) {
  // Requires random shuffle to guarantee performance
  knuthShuffle(arr);
  sort(arr, 0, arr.length - 1);
}



const str = 'KRATELEPUIMQCXOS';
const arr = Array.from(str);
quickSort(arr);
console.log(arr);