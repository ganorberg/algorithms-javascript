/*
 * A majority element is an element that makes up more than half of the items in
 * an array. Given a positive integers array, find the majority element. If 
 * there is no majority element, return -1. Do this in O(N) time and O(1) space.
 * 
 * ASSUMPTIONS
 * - valid input array with positive integers only
 * - O(N) time means we can make multiple passes
 * 
 * STRATEGY: O(N) time and O(1) space
 * At each element, look at next values to see if majority of that subarray. If
 * not majority, then no majority exists in that subarray, so ignore it and 
 * continue at next element after subarray ends. When majority is found in a
 * subarray, validate whole array against that value. If no majority is 
 * validated by last element, return -1.
 */
function findMajorityElement(arr) {
  let index = 0;
  let value;

  while (index < arr.length) {
    value = arr[index];
    index = whereMajorityEnds(arr, value, index);
  }

  return validate(arr, value);
}

function whereMajorityEnds(arr, value, index) {
  let counter = 0;

  for (let i = index; i < arr.length; i++) {
    arr[i] === value ? counter++ : counter--;
    if (counter <= 0) { return i; }
  }

  return arr.length;
}

function validate(arr, value) {
  let count = 0;

  arr.forEach(el => {
    if (el === value) { count++; }
  });

  return count > (arr.length / 2) ? value : -1;
}

const arr0 = [1, 2, 5, 9, 5, 9, 5, 5, 5];
const arr1 = [1, 2, 3, 4];
const arr2 = [1, 4, 1, 3, 1];
const arr3 = [1, 4, 1, 3];
const arr4 = [1, 1, 1, 2, 3]
console.log(5, findMajorityElement(arr0));
console.log(-1, findMajorityElement(arr1));
console.log(1, findMajorityElement(arr2));
console.log(-1, findMajorityElement(arr3));
console.log(1, findMajorityElement(arr4));