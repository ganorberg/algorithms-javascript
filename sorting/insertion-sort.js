function sort(array) {
  // loop through array
  for (let i = 0; i < array.length; i++) {
    // loop through array left of pointer
    for (let j = i; j > 0 && array[j] < array[j - 1]; j--) {
      // swap until left is sorted
      [array[j], array[j - 1]] = [array[j - 1], array[j]];
    }
  }
}

const arr = [1, -4, 3, 2];
sort(arr);
console.log(arr);