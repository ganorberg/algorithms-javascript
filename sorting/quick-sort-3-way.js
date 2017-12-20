// Dijkstra 3-way partitioning. Shines for many duplicates. Great for small 
// subarrays too, so no need for insertion sort optimization. Reduces running
// time from linearithmic to linear in broad class of applications.

function swapInPlace(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
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

function sort(arr, lo, hi) {
  // Base case: when pointers cross, array is sorted!
  if (hi <= lo) { return; }

  // Select pivot to be first item
  let pivot = lo;

  // Left pointer will directly compare to pivot and right for swapping
  let left = lo + 1;

  // Right pointer values are never directly compared to pivot, but are used
  // to deliver values to left pointer for comparison with pivot and eventually
  // end the loop when it crosses the left pointer
  let right = hi;

  // Partition until pointers cross
  while (left <= right) {
    // Important part of 3-way partitioning is simply moving left pointer on dupes
    if (arr[left] === arr[pivot]) { left++; }

    // Only swap with pivot when left pointer value is lesser
    else if (arr[left] < arr[pivot]) {
      swapInPlace(arr, left, pivot);
      left++;
      pivot++;
    }

    // Cannot swap with pivot, so swap left with right. This creates a region of 
    // values greater than the pivot to the right of the right pointer.
    else if (arr[left] > arr[pivot]) {
      swapInPlace(arr, left, right);
      right--;
    }
  }

  // Pivot is sorted, so now sort left and right subarrays
  sort(arr, lo, pivot - 1);
  sort(arr, pivot + 1, hi);
}

function quickSort(arr) {
  // Randomization necessary to guarantee performance
  knuthShuffle(arr);
  sort(arr, 0, arr.length - 1);
}

const str = 'KRATELEPUIMQDIFUHOA';
const arr = Array.from(str);
quickSort(arr);
console.log(arr);

const str2 = 'RBWWRWBRRWBR';
const arr2 = Array.from(str2);
quickSort(arr2);
console.log(arr2);

