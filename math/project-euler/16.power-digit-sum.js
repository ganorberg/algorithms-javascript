/*
2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

What is the sum of the digits of the number 2^1000?

THOUGHTS
- gigantic number, might log as Infinity
- if in memory, would still be in scientific notation
- assuming need to actually calculate result then add its digits
- might have to manually multiply by 2 and store digits as string
- alternatively, maybe formula for counting digits. Like 0-4 doubled
  stay as 1 digit, while 5-9 doubled add 1 to an adjacent digit.
  but I still need to track each number's value, so this is just
  multiplication...
*/
function powerDigitSum(power) {
  let result = "1";
  for (let i = 1; i <= power; i++) {
    result = multiplyBy2(result);
  }

  return Array.from(result).reduce((acc, val) => acc + Number(val), 0);
}

// loop digits backwards
// if >= 10, carry. use carry and replace carry w/ 0.
function multiplyBy2(n) {
  let result = "";
  let carry = 0;
  Array.from(n)
    .reverse()
    .forEach(num => {
      let multiplied = Number(num) * 2;
      if (carry === 1) {
        multiplied++;
        carry--;
      }

      if (multiplied >= 10) {
        carry++;
        result += String(multiplied)[1];
      } else {
        result += String(multiplied);
      }
    });

  if (carry === 1) {
    result += "1";
  }

  return Array.from(result)
    .reverse()
    .join("");
}

// console.log(multiplyBy2("6789"));
console.log(powerDigitSum(1000));
