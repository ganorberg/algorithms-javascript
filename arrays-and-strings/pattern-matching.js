/*
 * You are given two strings, pattern and value. The pattern string consists of 
 * just the letters a and b, describing a pattern within a string. For example, 
 * the string catcatgocatgo matches the pattern aabab (where cat is a and go is 
 * b). It also matches patterns like a, ab, and b. Write a method to determine 
 * if value matches pattern.
 * 
 * ASSUMPTIONS
 * - valid inputs
 * - pattern cannot be longer than value
 * - no surrogate pairs, like emojis
 * 
 * STRATEGY: O(N^2) time and O(N) space
 * Try all substrings for a. For each a, we know its length, and therefore we 
 * know how many characters a takes up in the string and thus how many b takes 
 * up. Calculate these lengths, then iterate through value to see if the pattern
 * holds. If not, try the next substring until a match is found. Return false at
 * end if no pattern matches.
 */
function matchPattern(pattern, value) {
  if (pattern === "") { return value === ""; }

  // Normally I frown upon reassigning parameters, but it makes sense for two
  // arbitrary letters in this case to maintain code logic that a comes before b.
  if (pattern[0] === 'b') { pattern = invertPattern(pattern); }

  const aCount = countCharacter(pattern, 'a');
  const bCount = pattern.length - aCount;

  if (bCount === 0) { return true; }

  // Slice is exclusive, so i=1 gives first character and i=len gives whole string
  for (let i = 1; i <= value.length; i++) {
    const possibleA = value.slice(0, i);
    const bLength = (value.length - (possibleA.length * aCount)) / bCount;
    if (isMatch(pattern, value, possibleA, bLength)) { return true; }
  }

  return false;
}

function invertPattern(pattern) {
  return Array.from(pattern).map(letter => letter === 'a' ? 'b' : 'a').join("");
}

function countCharacter(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) { count++; }
  }

  return count;
}

function isMatch(pattern, value, a, bLength) {
  if (!Number.isInteger(bLength) || bLength < 0) { return false; }

  let b = findB(pattern, value, a, bLength);
  if (b === "") { return false; }
  let valueIndex = 0;
  const getPattern = {
    'a': a,
    'b': b,
  }

  // Assume substr method operates in O(j - i) time. Otherwise build custom method.
  for (let i = 0; i < pattern.length; i++) {
    const letter = pattern[i];
    const letterPattern = getPattern[letter];
    if (letterPattern !== value.substr(valueIndex, letterPattern.length)) {
      return false;
    }

    valueIndex += letterPattern.length;
  }

  return true;
}

function findB(pattern, value, a, bLength) {
  let valueIndex = 0;

  for (let i = 0; i < pattern.length; i++) {
    const letter = pattern[i];
    if (letter === 'a') { valueIndex += a.length; }
    else { return value.substr(valueIndex, bLength); }
  }
}

console.log(true, matchPattern('aabab', 'catcatgocatgo'));
console.log(true, matchPattern('a', 'catcatgocatgo'));
console.log(true, matchPattern('ab', 'catcatgocatgo'));
console.log(true, matchPattern('aba', 'dogmoondog'));
console.log(true, matchPattern('abababa', 'abababa'));
console.log(true, matchPattern('b', 'catcatgocatgo'));
console.log(true, matchPattern('bbaba', 'catcatgocatgo'));
console.log(false, matchPattern('aaabb', 'catcatgocatgo'));
console.log(false, matchPattern('abababa', 'abababab'));
console.log(false, matchPattern('aba', 'dogcatdogcat'));
console.log(false, matchPattern('aba', 'catcatgocatgo'));
// console.log(countCharacter('aabab', 'a'));
// console.log('aabab', invertPattern('bbaba'));
