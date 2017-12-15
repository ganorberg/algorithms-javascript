// Messy solution but it works. Would refactor for production.

/* Given a positive number x, print all Jumping Numbers smaller than or equal to
 * x. A number is called a Jumping Number if all adjacent digits in it differ by
 * 1. The difference between ‘9’ and ‘0’ is not considered to be 1. All single 
 * digit numbers are considered Jumping Numbers. 
 * 
 * For example 7, 8987 and 4343456 are Jumping numbers but 796 and 89098 are not.
 * 
 * Generate in increasing order of the most significant digit. 
 * 
 * EXAMPLE: 50 outputs 0 1 10 12 2 21 23 3 32 34 4 43 45 5 6 7 8 9
 * 
 * ASSUMPTIONS:
 * - safe positive integers only
 * - type of input is number, not string
 * - return array instead of printing line by line
 */
function jumpingNumbersLessThan(x) {
  const jumpingNumbers = [0];
  const numStr = String(x);

  const firstDigit = Number(numStr[0]);
  const maxLength = numStr.length;

  for (let digit = 1; digit <= 9; digit++) {
    let jumps;

    // Calculate same magnitude numbers first. e.g. 380 -> 1, 2, 3 up to 100s, 200s, 300s
    if (digit <= firstDigit) {
      jumps = generateJumpers(digit, maxLength);
    } else {
      // Reduce magnitude. e.g. 380 -> 4, 5, 6, 7, 8, 9 up to 40s, 50s, 60s, 70s, 80s, 90s
      jumps = generateJumpers(digit, maxLength - 1);
    }

    jumps.forEach(jump => jumpingNumbers.push(jump));
  }

  // Could also modify generateJumpers to avoid creating values larger than x.
  // This keeps code cleaner, including for single digits less than 9.
  return jumpingNumbers.filter(jump => jump <= x);
}

function generateJumpers(digit, maxLength) {
  const jumpers = [digit];

  // Store each place iteration
  let queue = [digit];

  for (let place = 1; place < maxLength; place++) {
    const temp = [];

    queue.forEach(num => {
      const numStr = String(num);
      const finalDigit = Number(numStr[numStr.length - 1]);

      if (finalDigit !== 0) {
        const jumpDown = Number(numStr + String(finalDigit - 1));
        temp.push(jumpDown);
      }

      if (finalDigit !== 9) {
        const jumpUp = Number(numStr + String(finalDigit + 1));
        temp.push(jumpUp);
      }
    });

    // Temp stores jumps for each place so queue can use those values next loop
    // e.g. [11, 13] -> 11 builds 110, 112 and 13 builds 132, 134
    queue = temp;
    temp.forEach(jump => jumpers.push(jump));
  }

  return jumpers;
}

console.log(jumpingNumbersLessThan(50)); // 0 1 10 12 2 21 23 3 32 34 4 43 45 5 6 7 8 9
console.log(jumpingNumbersLessThan(6)); // 0 1 2 3 4 5 6
console.log(jumpingNumbersLessThan(222)); // 0 1 10 12 101 121 123 2 21 23 210 212 3 32 34 4 43 45 5 54 56 6 65 67 7 76 78 8 87 89 9 98
// console.log(jumpingNumbersLessThan(6000));
