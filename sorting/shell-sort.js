// insertion sort but multiple times with different h values

function shellSort(array) {
  // find largest h-sort value based on knuth's 3x+1 pattern
  let h;
  for (let x = 1; x <= array.length; x = 3 * x + 1) {
    h = x;
  }

  // apply insertion sort with each h value in descending order
  while (h >= 1) {
    for (let i = 0; i < array.length; i += h) {
      for (let j = i; j > 0 && array[j - h] > array[j]; j -= h) {
        [array[j - h], array[j]] = [array[j], array[j - h]];
      }
    }

    // move to smaller h-sort value in knuth's 3x+1 pattern
    h = (h - 1) / 3;
  }


}

const arr = [3, 2, -4, 1, 6, 8, 0, 9, -5, -10, 12, -3, -100, -1000];
shellSort(arr);
console.log(arr);