// easy to read, but takes extra time and space on sliced clones

const arr = [1, 2, 4, 9, 22, 101, 500];

function binarySearch(array, val) {
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle + 1);

  if (array.length === 1) { return val === array[0]; }
  if (val === array[middle]) { return true; }
  if (val < array[middle]) { return binarySearch(left, val); }
  if (val > array[middle]) { return binarySearch(right, val); }
}

console.log(binarySearch(arr, 0));
console.log(binarySearch(arr, 1));
console.log(binarySearch(arr, 2));
console.log(binarySearch(arr, 100));
console.log(binarySearch(arr, 101));
console.log(binarySearch(arr, 500));
console.log(binarySearch(arr, 501));
