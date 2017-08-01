// unbiased random permutation in linear time. aka fisher-yates shuffle.

function knuthShuffle(array) {
  // loop through array
  for (let i = 0; i < array.length; i++) {
    // generate random index between 0 and current index (exclusive)
    const random = Math.floor(Math.random() * i);

    // swap current element with element at random index
    [array[i], array[random]] = [array[random], array[i]];
  }
}

const arr = [3, 2, -4, 1, 6, 8, 0, 9, -5, -10, 12, -3, -100, -1000];
knuthShuffle(arr);
console.log(arr);