/*
If the numbers 1 to 5 are written out in words: 
one, two, three, four, five, then there are 
3 + 3 + 5 + 4 + 4 = 19 letters used in total.

If all the numbers from 1 to 1000 (one thousand) 
inclusive were written out in words, how many 
letters would be used?


NOTE: Do not count spaces or hyphens. For example, 
342 (three hundred and forty-two) contains 23 
letters and 115 (one hundred and fifteen) contains 
20 letters. The use of "and" when writing out 
numbers is in compliance with British usage.

THOUGHTS
- convert input number to string, then count string length (assumes only letters)
- map unique values
  - each single digit to word (object or Map)
  - tens like ten, twenty, thirty, etc.
  - teens. Could use pattern for some in 14-19 but not worth extra logic
  - hundreds
  - thousand (or treat as special case since 1000 is used once)
- "and" needs to be appended after every "hundred" is used except at 100, 200... 900
- how map tens and hundreds? just use base value as key and calculate?
- perhaps could also just count number of times each word is used and multiply by 
  number of letters for that word. e.g. "hundred" will be used from 100 -> 999
  which is 900 times. "hundred" has length 7, so contributes 7 * 900 letters to total.
  Repeat for all words and add them up to get the answer.

CASES
- 132 = one hundred and thirty two
- 45 = forty five
- 8 = eight
- 19 = nineteen
- 1000 = one thousand
*/
function countLetters(words, frequency) {
  return words
    .map(word => word.length * frequency)
    .reduce((sum, letters) => sum + letters, 0);
}

function countNumberLetters() {
  // calculate how many times ones, teens, tens, hundreds + and, 1000 used
  // One is used in 1, 21, 31... 91, 101-199, etc.
  // So from 1-100 1 is used 9 times
  // 101-200: 1 is used 9 times
  // up to 901-1000. so 10 hundreds times 9 times = 90 times for single digits
  // in front of hundreds: one hundred one, one hundred two, etc. add 100 per
  const onesPlace = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
  ];

  const countOnesPlace = countLetters(onesPlace, 9 * 10);
  const countHundredsPrefix = countLetters(onesPlace, 100);

  // once each in 1-100, once each in other hundreds. so 10 times each
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen"
  ];

  const countTeens = countLetters(teens, 10);

  // 20, 21... 29 is 10 times per hundred, so 10 * 10
  const tensPlace = [
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety"
  ];

  const countTensPlace = countLetters(tensPlace, 10 * 10);

  // "hundred" happens 100-199, 200-299... 900-999, so 100 * 9
  const countHundred = countLetters(["hundred"], 100 * 9);

  // "and" happens 101-199, 201-299... 901-999, so 99 times 9
  const countAnd = countLetters(["and"], 99 * 9);
  return (
    countOnesPlace +
    countHundredsPrefix +
    countTeens +
    countTensPlace +
    countHundred +
    countAnd +
    "onethousand".length
  );
}

console.log(countNumberLetters());
