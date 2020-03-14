/*
A permutation is an ordered arrangement of objects. 
For example, 3124 is one possible permutation of 
the digits 1, 2, 3 and 4. If all of the permutations
are listed numerically or alphabetically, we call 
it lexicographic order. The lexicographic permutations 
of 0, 1 and 2 are:

012   021   102   120   201   210

What is the millionth lexicographic permutation of the 
digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

THOUGHTS
- reminds me of Heap's algorithm for getting permutations
  with swapping
- might be a mathematical way to calculate digit order instead
  of generating 1M permutations
- getting all permutations with brute force is stupid slow, like
  O(n^2 * n!). so for n = 10, that's 100 * 10! = 
  100 * 3.6M = 360M ops.
- practicing method: 
0123
0132
0213
0231
0312
0321
1023
1032
1203
1230
1302
1320
2013
2031
2103
2130
2301
2310
3012
3021
3102
3120
3201
3210
- might be easiest and possibly fastest to do heap's then sort
- let's learn lexicographic permutation algorithm 
  - need to find tail with non-increasing values. e.g. for 2031, that's 31.
  - value to left of tail is pivot, or 0.
  - swap pivot with smallest value in tail that is > pivot (to keep head 
    minimized). so 0 swaps with 1 to make 2130.
  - if multiple copies, take rightmost
  - sort tail in non-decreasing order (we increased head, so make tail 
    as small as possible). Or, just reverse tail since was already high -> low.
    So 2130 from previous step becomes 2103.
  - more practice: 
  0130235
  0130253
  0130352 -> 0130325 // remember to reverse tail after swap
  0130352
  0130532 -> 0130523
  0130532
  0132530 -> 0132035
*/
function swap(arr, index1, index2) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

/*
  TERMINOLOGY
  pivot = element to left of non-increasing sequence
  at end of array. 
  e.g. For 0125330, sequence is 5330 so pivot is 2.

  A single element can be its own sequence. 
  e.g. For 1234, 4 is the sequence and 3 is the pivot.
  For 5768, 8 is the sequence and 6 is the pivot. 
*/

function findPivot(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const current = array[i];
    const previous = array[i - 1];
    if (previous < current) {
      return i - 1;
    }
  }

  // Means final permutation has been reached
  // because its values are in descending order
  // so you can't make the number any bigger.
  return -1;
}

// "Next largest" means smallest rightmost number that is larger
// e.g. For 0125330, if pivot is 2, then next largest is last 3 at index 5
function findNextLargest(array, pivotIndex) {
  const minimum = { value: Infinity, index: null };
  const pivot = array[pivotIndex];
  for (let i = pivotIndex + 1; i < array.length; i++) {
    const current = array[i];
    if (current > pivot && current <= minimum.value) {
      minimum.value = current;
      minimum.index = i;
    }
  }

  return minimum.index;
}

function reverseAfterPivot(array, pivotIndex) {
  let start = pivotIndex + 1;
  let end = array.length - 1;
  while (start < end) {
    swap(array, start, end);
    start++;
    end--;
  }
}

function* generateNextPermutation(array) {
  while (true) {
    // If don't want original array, put yield at end
    yield array.slice().join("");
    const pivotIndex = findPivot(array);
    if (pivotIndex < 0) {
      return;
    }

    const nextLargestIndex = findNextLargest(array, pivotIndex);
    swap(array, pivotIndex, nextLargestIndex);
    reverseAfterPivot(array, pivotIndex);
  }
}

function lexicographicPermutations(array, rank) {
  const permutationGenerator = generateNextPermutation(array);
  // If want to see permutations, set permutation = [] and push in loop
  let permutation;
  let count = 0;
  while (count < rank) {
    permutation = permutationGenerator.next().value;
    count++;
  }

  return permutation;
}

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arr2 = [0, 3, 3, 5];
console.log(lexicographicPermutations(array, 1_000_000));
console.log(lexicographicPermutations(arr2, 16));

// Brute force w/ Heap's Algorithm then sort and pick millionth
// function permuteHeap(str) {
//   const arr = Array.from(str);
//   const permutations = [];

//   function getPermutations(n) {
//     if (n === 1) {
//       const completePermutation = arr.join("");
//       permutations.push(completePermutation);
//       return;
//     }

//     for (let i = 0; i < n; i++) {
//       getPermutations(n - 1);

//       // Odd swaps first element. Even swaps ith element. MAGIC.
//       swap(arr, n % 2 ? 0 : i, n - 1);
//     }
//   }

//   getPermutations(arr.length);
//   return permutations;
// }

// // Takes ~8 seconds
// function lexicographicPermutations() {
//   const permutations = permuteHeap("0123456789");
//   const sorted = permutations
//     .map(permutation => Number(permutation))
//     .sort((a, b) => a - b);
//   return sorted[999_999];
// }
