function sort(array) {
  // loop through array
  for (let i = 0; i < array.length; i++) {
    // track index of minimum value initialized to current item
    let minIndex = i;

    // loop through rest of array
    for (let j = i + 1; j < array.length; j++) {
      // update min index if find smaller value
      if (array[j] < array[minIndex]) { minIndex = j; }
    }

    // now that we have min, swap ith item with min
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
}

const arr = [1, -4, 3, 2];
sort(arr);
console.log(arr);