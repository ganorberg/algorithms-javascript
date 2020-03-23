// Optimal JS implementation with constant space and logarithmic time complexity
function binarySearch(array, val) {
  let left = 0;
  let right = array.length - 1;
  let middle = Math.floor((right + left) / 2);

  while (left <= right) {
    if (val === array[middle]) { return true; }
    if (val < array[middle]) { right = middle - 1; }
    if (val > array[middle]) { left = middle + 1; }
    middle = Math.floor((right + left) / 2);
  }

  return false;
}

const arr = [1, 2, 4, 9, 22, 101, 500];

console.log(false, binarySearch(arr, 0));
console.log(true, binarySearch(arr, 1));
console.log(true, binarySearch(arr, 2));
console.log(false, binarySearch(arr, 100));
console.log(true, binarySearch(arr, 101));
console.log(true, binarySearch(arr, 500));
console.log(false, binarySearch(arr, 501));
