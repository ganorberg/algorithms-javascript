/*
 * Given an integer array, find the sum of all subarrays.
 * 
 * ASSUMPTIONS
 * - valid input
 */
function sumSubarrays(arr) {
  let sum = 0;

  for (let start = 0; start < arr.length; start++) {
    for (let end = start; end < arr.length; end++) {
      for (let index = start; index <= end; index++) {
        sum += arr[index];
      }
    }
  }

  return sum;
}

console.log(20, sumSubarrays([1, 2, 3]));
console.log(50, sumSubarrays([1, 2, 3, 4]));