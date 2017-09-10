// could be used in quick select to approximate true median for optimized pivot
function medianOfMedians(arr, ...indices) {
  const medianIndex = Math.floor(indices.length / 2);
  const values = indices
    .map(idx => arr[idx])
    .sort((a, b) => a > b);
  
  return values[medianIndex];
}

const array = [5, 3, 7, 2, 1];
const letters = ['A', 'E', 'T', 'C', 'J', 'H'];
console.log(medianOfMedians(array, 0, 2, 4)); // 571 -> 157 -> 5
console.log(medianOfMedians(letters, 0, 2, 4, 5)); // ATJH -> AHJT -> J