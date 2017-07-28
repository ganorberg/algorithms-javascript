function merge(a, b) {
  const output = [];

  let indexA = 0;
  let indexB = 0;

  // push smallest item every time, then increment index to compare next item
  while (indexA < a.length && indexB < b.length) {
    a[indexA] <= b[indexB]
      ? output.push(a[indexA++])
      : output.push(b[indexB++]);
  }

  // append leftover items from other array
  indexA >= a.length
    ? output.push(...b.slice(indexB))
    : output.push(...a.slice(indexA));

  return output;
}

function sort(arr) {
  // base case: provide unit arrays to merge function to begin merging pieces
  if (arr.length < 8) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // deliver merged pieces up to parent sort call to provide arguments
  // to parent merge call
  return merge(sort(left), sort(right));
}

const arr = [3, 2, -4, 1, 6, 8, 0, 9, -5, -10, 12, -3, -100, -1000];
console.log(sort(arr));