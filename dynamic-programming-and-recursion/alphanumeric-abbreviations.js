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

console.log(abbreviate('ABC'));
console.log(abbreviate('ABCD'));