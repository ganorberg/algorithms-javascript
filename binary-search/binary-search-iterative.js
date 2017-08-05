// Optimal JS implementation with constant space and logarithmic time complexity

const arr = [1, 2, 4, 9, 22, 101, 500];

function binarySearch(array, val, leftPointer = 0, rightPointer = array.length - 1) {
  let left = leftPointer;
  let right = rightPointer;
  let middle = Math.floor((right + left) / 2);

  while (left <= right) {
    if (val === array[middle]) { return true; }
    if (val < array[middle]) { right = middle - 1; }
    if (val > array[middle]) { left = middle + 1; }
    middle = Math.floor((right + left) / 2);
  }

  return false;
}

console.log(binarySearch(arr, 0));
console.log(binarySearch(arr, 1));
console.log(binarySearch(arr, 2));
console.log(binarySearch(arr, 100));
console.log(binarySearch(arr, 101));
console.log(binarySearch(arr, 500));
console.log(binarySearch(arr, 501));
