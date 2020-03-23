// Recursive implementation with pointers

const arr = [1, 2, 4, 9, 22, 101, 500];

function binarySearch(array, val, left = 0, right = array.length - 1) {
  if (left > right) { return false; }
  const middle = Math.floor((right + left) / 2);

  if (val === array[middle]) { return true; }
  if (val < array[middle]) { return binarySearch(array, val, left, middle - 1); }
  if (val > array[middle]) { return binarySearch(array, val, middle + 1, right); }
}

console.log(binarySearch(arr, 0));
console.log(binarySearch(arr, 1));
console.log(binarySearch(arr, 2));
console.log(binarySearch(arr, 100));
console.log(binarySearch(arr, 101));
console.log(binarySearch(arr, 500));
console.log(binarySearch(arr, 501));
