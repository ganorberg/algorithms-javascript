/* Given a string of characters of length less than 10, print all the 
 * alphanumeric abbreviations of the string. Numbers cannot be adjacent.
 * 
 * EXAMPLE:
 * Input: ABC
 * Output:
 * ABC
 * AB1
 * A1C
 * A2
 * 1BC
 * 1B1
 * 2C
 * 3
 * 
 * STRATEGY: O(2^N) time and space complexity
 * 2 versions below. First recursively splices until a full abbreviation is seen.
 * The second is more efficient and builds bottom-up from an empty string.
 */
function abbreviate(str, startIndex = 0, abbreviations = [String(str.length)]) {
  if (isFullyAbbreviated(str)) { return; }
  abbreviations.push(str);
  for (let digit = 1; digit <= str.length; digit++) {
    for (let index = startIndex; index < str.length; index++) {
      if (isValidSplice(str, index, digit)) {
        // Add 1 to index because that is next possible valid splice location.
        abbreviate(spliceDigit(str, index, digit), index + 1, abbreviations);
      }
    }
  }

  return abbreviations;
}

function isFullyAbbreviated(str) {
  if (str.length <= 1) { return true; }
  const lastCharacter = str[str.length - 1];
  const secondToLastCharacter = str[str.length - 2];
  if (isLetter(lastCharacter) && isLetter(secondToLastCharacter)) {
    return false;
  }
}

function spliceDigit(str, startIndex, digit) {
  return str.slice(0, startIndex) + String(digit) + str.slice(startIndex + digit);
}

function isValidSplice(str, index, digit) {
  return isLetter(str[index - 1]) && digitWithinLength(str, index, digit);
}

function isLetter(character) {
  return Number.isNaN(Number(character));
}

function digitWithinLength(str, index, digit) {
  return index - 1 + digit < str.length;
}

// console.log(abbreviate('ABC'));
// console.log(abbreviate('ABCD'));

function abbreviate2(str) {
  let abbreviations = [""];
  for (let index = 0; index < str.length; index++) {
    const letter = str[index];

    let newAbbreviations = [];
    abbreviations.forEach(abbreviation => {
      const useLetter = abbreviation + letter;
      const useNumber = buildNumber(abbreviation);
      newAbbreviations.push(useLetter);
      newAbbreviations.push(useNumber);
    });

    abbreviations = newAbbreviations;
  }

  return abbreviations;
}

function buildNumber(str) {
  if (str === "") { return "1"; }
  const lastCharacter = str[str.length - 1];
  if (lastCharacter.match(/\d/)) {
    const numberIncreased = Number(lastCharacter) + 1;
    return str.slice(0, str.length - 1) + numberIncreased;
  }

  return str + "1";
}

// console.log(buildNumber("ABC"));
// console.log(buildNumber("A1"));
// console.log(buildNumber(""));
console.log(abbreviate2("ABCD"));