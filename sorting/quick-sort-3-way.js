// Dijkstra 3-way partitioning. Shines for many duplicates. Great for small 
// subarrays too, so no need for insertion sort optimization. Reduces running
// time from linearithmic to linear in broad class of applications.

function swapInPlace(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

function knuthShuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const random = Math.floor(Math.random() * i);
    [arr[i], arr[random]] = [arr[random], arr[i]];
  }
}

function sort(arr, lo, hi) {
  // base case: when pointers cross
  if (hi <= lo) { return; }
 
  // we select pivot to be first item
  let pivot = lo;

  // left pointer carries comparison logic
  let left = lo + 1;

  // right pointer values are never directly compared to pivot, but are used
  // to deliver values to left pointer for comparison with pivot and eventually
  // end the loop when it crosses the left pointer
  let right = hi;

  // partition until pointers cross
  while (left <= right) {
    // important part of 3-way partitioning is simply moving left pointer on dupes
    if (arr[left] === arr[pivot]) {
      left++;
    }

    // swaps with pivot only occur when left pointer value is lesser
    else if (arr[left] < arr[pivot]) {
      swapInPlace(arr, left, pivot);
      left++;
      pivot++;
    }
    
    // cannot swap with pivot, so swap with right. This creates a region of 
    // values greater than the pivot to the right of the right pointer.
    else if (arr[left] > arr[pivot]) {
      swapInPlace(arr, left, right);
      right--;
    }
  }

  // sort left subarray
  sort(arr, lo, pivot - 1);
  // sort right subarray
  sort(arr, right + 1, hi);
}

function quickSort(arr) {
  // randomization necessary to guarantee performance
  knuthShuffle(arr);
  sort(arr, 0, arr.length - 1);
}

const str = 'KRATELEPUIMQCXOSHNASDIFUHOA';
const arr = Array.from(str);
quickSort(arr);
console.log(arr);

const str2 = 'RBWWRWBRRWBR'; 
const arr2 = Array.from(str2);
quickSort(arr2);
console.log(arr2);