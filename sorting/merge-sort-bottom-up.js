// no recursion required :)

function sort(arr) {
  // break arr into subarrays of length 1
  let subarrays = arr.map(el => [el]);

  // loop through array merging pairs into one sorted array
  while (subarrays.length > 1) {
    const merged = [];
    for (let i = 0; i < subarrays.length; i += 2) {
      // OR operator handles final item in odd arrays to avoid TypeError
      merged.push(merge(subarrays[i], subarrays[i + 1] || []));
    }

    subarrays = merged;
  }

  return subarrays[0];
}

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

const arr = [3, 2, -4, 1, -10, 12, -3];
console.log(sort(arr));
