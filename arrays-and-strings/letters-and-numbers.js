/*
 * Given an array filled with letters and numbers, find the longest subarray 
 * with an equal number of letters and numbers.
 * 
 * ASSUMPTIONS
 * - valid array input of letters and numbers
 * - number are represented in number data type, not string
 * - NaN, Infinities, and all number types are valid
 * - return pair of indexes from start to end (inclusive) as array
 * - if more than one longest, return any one
 * 
 * STRATEGY: O(N) time and space
 * The values don't matter, so think of this as a sequence of A's and B's where
 * we need to find the longest subarray of equal A's and B's. Loop through array
 * to store difference between A and B at each index. For example, if we add 1
 * for every A and subtract 1 for every B, the sequence AABBABA would have 
 * differences 1, 2, 1, 0, 1, 0, 1. Notice the value 0 tells us equal subarrays
 * from index 0. But to find the longest subarray from any other index, we want
 * to check for the longest span of the same difference. In the above example,
 * we have 1 more A than B going into index 1, and the same difference at 
 * indexes 2, 4, and 6. This means from index 1 to all those indexes, there is 
 * an equal number of A's and B's. Thus, get the longest span between any two 
 * equal differences to find the longest subarray, which in the above example
 * would be 1 to 6 (which happens to be the same length as 0 to 5).
 */
function longestEqualSubarray(arr) {
  return longestMatch(runningDifferences(arr));
}

function runningDifferences(arr) {
  const differences = [];
  let counter = 0;

  arr.forEach(el => {
    if (typeof el === "string") { counter++; }
    if (typeof el === "number") { counter--; }
    differences.push(counter);
  });

  return differences;
}

function longestMatch(arr) {
  const earliest = {};
  let maxEqualLength = -Infinity;
  let maxSubarrayIndexes = [null, null];

  arr.forEach((difference, index) => {
    if (!earliest.hasOwnProperty(difference)) {
      earliest[difference] = index;
      return;
    }

    const equalSequenceLength = index - earliest[difference];

    if (equalSequenceLength > maxEqualLength) {
      maxEqualLength = equalSequenceLength;
      const EQUAL_SEQUENCE_BEGINS = 1;
      maxSubarrayIndexes = [earliest[difference] + EQUAL_SEQUENCE_BEGINS, index];
    }
  });

  return maxSubarrayIndexes;
}

// function bruteForce(arr) {
//   let longestEqual = 0;
//   let longestIndexes = [null, null];

//   for (let start = 0; start < arr.length; start++) {
//     for (let end = 0; end < arr.length; end++) {
//       let letterCount = 0;
//       let numberCount = 0;

//       for (let index = start; index <= end; index++) {
//         if (typeof arr[index] === "number") { numberCount++; }
//         if (typeof arr[index] === "string") { letterCount++; }
//       }

//       if (letterCount === numberCount) {
//         const lengthEqual = letterCount + numberCount;
//         if (lengthEqual > longestEqual) {
//           longestEqual = lengthEqual;
//           longestIndexes = [start, end];
//         }
//       }
//     }
//   }

//   return longestIndexes;
// }

const arr0 = [1, 'a', 1, 1, 1, 'a', 1, 'a', 'a'];
const arr1 = ['a', 1, 1, 1, 1, 'a', 1, 'a', 'a'];
const arr2 = ['a', 1, 1, 1, 1, 'a', 1, 'a', 1];

// console.log([1, 8], bruteForce(arr0));
// console.log([3, 8], bruteForce(arr1));
// console.log([4, 7], bruteForce(arr2));

console.log([1, 8], longestEqualSubarray(arr0));
console.log([3, 8], longestEqualSubarray(arr1));
console.log([4, 7], longestEqualSubarray(arr2));

// console.log(runningDifferences(arr0));