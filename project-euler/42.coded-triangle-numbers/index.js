/*
The nth term of the sequence of triangle numbers
is given by, tn = ½n(n+1); so the first ten
triangle numbers are:

1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

By converting each letter in a word to a number
corresponding to its alphabetical position and
adding these values we form a word value. For
example, the word value for SKY is 19 + 11 +
25 = 55 = t10. If the word value is a triangle
number then we shall call the word a triangle
word.

Using words.txt (right click and 'Save Link/Target
As...'), a 16K text file containing nearly
two-thousand common English words, how many are
triangle words?

THOUGHTS
- similar to #22
- convert words.txt into an array of words, create word
  alphabet values, generate triangle numbers up to max
  amount, check if words in triangle number set
- assume all strings uppercase, else use .toUpperCase()
- time complexity O(2K * length of longest word)
*/
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const filePath = path.resolve(__dirname, "./words.txt");

function generateAlphabetNumberMap() {
  const map = new Map();
  let letter;
  let count = 0;
  const UNICODE_A = 65;
  const UNICODE_Z = 90;
  for (let code = UNICODE_A; code <= UNICODE_Z; code++) {
    letter = String.fromCharCode(code);
    count++;
    map.set(letter, count);
  }

  return map;
}

function getWordValue(word, alphabetNumberMap) {
  return Array.from(word).reduce(
    (sum, letter) => sum + alphabetNumberMap.get(letter),
    0
  );
}

function generateTriangleNumbers(limit) {
  let triangleNumbers = new Set();
  let term = 1;
  for (let n = 2; term <= limit; n++) {
    triangleNumbers.add(term);
    term = (n * (n + 1)) / 2;
  }

  return triangleNumbers;
}

function codedTriangleNumbers(words) {
  const alphabetNumberMap = generateAlphabetNumberMap();
  const wordValues = words.map(word => getWordValue(word, alphabetNumberMap));
  const maxWordValue = Math.max(...wordValues);
  const triangleNumbers = generateTriangleNumbers(maxWordValue);
  return wordValues.filter(wordValue => triangleNumbers.has(wordValue)).length;
}

readFile(filePath).then(buffer => {
  const csv = buffer.toString();
  const words = csv.slice(1, csv.length - 1).split('","');
  const solution = codedTriangleNumbers(words);
  console.log(solution);
});
