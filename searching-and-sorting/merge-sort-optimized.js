// Use insertion sort in base case to avoid recursive overhead for small arrays
function insertionSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j > 0 && array[j] < array[j - 1]; j--) {
      [array[j], array[j - 1]] = [array[j - 1], array[j]];
    }
  }

  return array;
}

function merge(a, b) {
  const output = [];

  let indexA = 0;
  let indexB = 0;

  while (indexA < a.length && indexB < b.length) {
    a[indexA] <= b[indexB]
      ? output.push(a[indexA++])
      : output.push(b[indexB++]);
  }

  indexA >= a.length
    ? output.push(...b.slice(indexB))
    : output.push(...a.slice(indexA));

  return output;
}

function sort(arr) {
  // Base case: small arrays sorted with insertion sort for ~20% perf gain
  if (arr.length < 8) { return insertionSort(arr); }
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(sort(left), sort(right));
}

const arr = [3, 2, -4, 1, 6, 8, 0, 9, -5, -10, 12, -3, -100, -1000, 20, 70, -89];
const sorted = [1, 2, 3, 5, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
console.log(sort(arr));
console.log(sort(sorted));