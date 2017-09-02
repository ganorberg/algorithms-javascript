// Assume input is sorted array of numbers
function findRotation(arr) {
  // Track indices during binary search
  let lo = 0;
  let hi = arr.length;

  // No rotation returns first element
  if (arr[hi - 1] > arr[lo]) { return lo; }

  let middle = Math.floor(arr.length / 2);

  // Loop until rotation is found at middle
  while (arr[middle] > arr[middle - 1]) {
    // Move right if middle and lo are part of same ascending sequence
    if (arr[middle] > arr[lo]) { 
      lo = middle;
      middle = Math.floor((hi + lo) / 2);
    
    // Move left if middle and hi are part of same ascending sequence
    } else {
      hi = middle;
      middle = Math.floor((hi + lo) / 2);
    }
  }

  return middle;
}

const arr = [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4];
console.log(7, findRotation(arr));
const arr2 = [5, 0, 1, 2, 3, 4];
console.log(1, findRotation(arr2));
const arr3 = [0, 1, 2, 3, 4];
console.log(0, findRotation(arr3));
const arr4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
console.log(11, findRotation(arr4));
const arr5 = [1];
console.log(0, findRotation(arr5));
