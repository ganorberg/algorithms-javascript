/* Determine if a number x is a Jumping Number. A number is called a Jumping 
 * Number if all adjacent digits in it differ by 1. The difference between ‘9’ 
 * and ‘0’ is not considered to be 1. All single digit numbers are considered 
 * Jumping Numbers. 
 * 
 * For example 7, 8987 and 4343456 are Jumping numbers but 796 and 89098 are not.
 * 
 * ASSUMPTIONS:
 * - safe positive integers only
 * - input is in number format, not string
 */
function isJumpingNumber(x) {
  const numStr = String(x);
  let checkJump;

  for (let i = 0; i < numStr.length; i++) {
    const digit = Number(numStr[i]);

    if (i === 0) {
      checkJump = digit;
      continue;
    }

    // Keep looping if jumping assertion is true and remember last digit for check
    if (checkJump === digit + 1 || checkJump === digit - 1) {
      checkJump = digit;
    } else {
      return false;
    }
  }

  return true;
}

console.log(true, isJumpingNumber(7));
console.log(true, isJumpingNumber(8987));
console.log(true, isJumpingNumber(4343456));
console.log(false, isJumpingNumber(796));
console.log(false, isJumpingNumber(89098));
