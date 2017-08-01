// could be used in quick select to approximate true median for optimized pivot
function medianOf3(arr, lo, mid, hi) {
  return [arr[lo], arr[mid], arr[hi]].sort((a, b) => a < b)[1];
}

const array = [5, 3, 7, 2, 1];
const letters = ['A', 'E', 'T', 'C', 'J'];
console.log(medianOf3(array, 0, 2, 4)); // 5
console.log(medianOf3(letters, 0, 2, 4)); // J