/*
Using names.txt (right click and 'Save Link/Target As...'), 
a 46K text file containing over five-thousand first names, 
begin by sorting it into alphabetical order. Then working 
out the alphabetical value for each name, multiply this 
value by its alphabetical position in the list to obtain 
a name score.

For example, when the list is sorted into alphabetical 
order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, 
is the 938th name in the list. So, COLIN would obtain a 
score of 938 × 53 = 49714.

What is the total of all the name scores in the file?

THOUGHTS
- need to read file with relative path, so need fs and path modules
- write out alphabet scores manually or use unicode. Probably faster
  just to type it out and makes logic cleaner.
- sort is most expensive piece as O(nlogn)
*/
const fs = require("fs");
const path = require("path");

// Avoid callback hell
const util = require("util");
const readFile = util.promisify(fs.readFile);

const alphabetScores = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26
};

function alphabetize(names) {
  return names.slice().sort();
}

function calculateAlphabeticalValue(name) {
  return Array.from(name).reduce((total, character) => {
    // Assume all characters uppercase. Otherwise, use .toUpperCase()
    return total + alphabetScores[character];
  }, 0);
}

function namesScores(names) {
  const alphabetized = alphabetize(names);

  // In retrospect, this is unnecessary. Just use index value in next loop.
  const alphabetizedWithRank = alphabetized.reduce((map, name, index) => {
    // Offset 0-based index for alphabetical rank
    map[name] = index + 1;
    return map;
  }, {});

  return Object.entries(alphabetizedWithRank).reduce(
    (nameScoresTotal, [name, rank]) => {
      return calculateAlphabeticalValue(name) * rank + nameScoresTotal;
    },
    0
  );
}

const filePath = path.resolve(__dirname, "./names.txt");
readFile(filePath).then(data => {
  const stringOfNames = data.toString();

  // Strip double quotes, otherwise each name looks like '"AARON"'
  const arrayOfNames = stringOfNames
    .slice(1, stringOfNames.length - 1)
    .split('","');
  console.log(namesScores(arrayOfNames));
});

// With callback structure:
// fs.readFile(filePath, function(err, data) {
//   const stringOfNames = data.toString();

//   // Strip double quotes, otherwise each name looks like '"AARON"'
//   const arrayOfNames = stringOfNames
//     .slice(1, stringOfNames.length - 1)
//     .split('","');
//   console.log(namesScores(arrayOfNames));
// });
