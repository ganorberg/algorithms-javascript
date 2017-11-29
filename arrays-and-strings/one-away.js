/* There are three types of edits that can be performed on strings: insert a
 * character, remove a character, or replace a character. Given two strings, 
 * write a function to check if they are one edit (or zero edits) away.
 * 
 * EXAMPLE
 * pale, ple -> true
 * pales, pale -> true
 * pale, bale -> true
 * pale, bake -> false
 * 
 * STRATEGY 1
 * Calculate edit distance and see if equals 0 or 1. Requires O(nm) time and 
 * space with dynamic programming.
 * 
 * STRATEGY 2
 * Return false if length differs by more than 1.
 * Check replacement by counting difference and returning true if count <= 1.
 * Check remove/insert by removing one character at a time from longer string
 * and comparing to smaller string. Return true if match.
 */
function oneAway(A, B) {
  if (Math.abs(A.length - B.length) > 1) {
    return false;
  }

  // Could optimize by only running replace on equal length and remove on different length
  const length = Math.max(A.length, B.length);
  return checkReplace(A, B, length) || checkRemove(A, B, length);
}

function checkReplace(A, B, length) {
  let countDiffer = 0;

  for (let i = 0; i < length; i++) {
    const letterA = A[i];
    const letterB = B[i];

    if (letterA !== letterB) {
      countDiffer++;
    }

    if (countDiffer > 1) {
      return false;
    }
  }

  return true;
}

// Same as checking insert but in other direction
function checkRemove(A, B, maxLength) {
  const longerWord = A.length > B.length ? A : B;
  const otherWord = A === longerWord ? B : A;

  for (let i = 0; i < maxLength; i++) {
    const letterA = A[i];
    const letterB = B[i];

    if (letterA !== letterB) {
      // Could optimize this from O(n^2) to O(n) by using index pointers instead
      // of rebuilding string every time
      const oneRemoval = longerWord.slice(0, i) + longerWord.slice(i + 1);
      if (oneRemoval === otherWord) {
        return true;
      }
    }
  }

  return false;
}

console.log(true, oneAway("pale", "ple"));
console.log(true, oneAway("pales", "pale"));
console.log(true, oneAway("pale", "bale"));
console.log(false, oneAway("pale", "bake"));
