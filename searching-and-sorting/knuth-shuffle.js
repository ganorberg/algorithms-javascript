// Unbiased random permutation in linear time (aka fisher-yates shuffle).

function knuthShuffle(array) {
  // Skip last element because nothing left to swap with
  for (let i = array.length - 1; i > 0; i--) {
    // i + 1 means inclusive on current element, as opposed to i as exclusive
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }
}

const arr = [3, 2, -4, 1, 6, 8, 0, 9, -5, -10, 12, -3, -100, -1000];
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);
knuthShuffle(arr);
console.log(arr);