/*
The decimal number, 585 = 1001001001base2 (binary), 
is palindromic in both bases.

Find the sum of all numbers, less than one million, 
which are palindromic in base 10 and base 2.

(Please note that the palindromic number, in either 
  base, may not include leading zeros.)

THOUGHTS
- when checking reverse, trim leading zeros first. might
  be able to skip with number conversion from string, like
  Number(n.toString(2))
- brute force is 1M * length of binary at 1M, which is ~log(1M),
  which is ~20. so 20M ops worst case.
- could also generate all palindromes up to 1M in base10 and
  then compare values
- to generate all palindromes, start with single digits then grow.
  all same digit is palindrome, so we can generate those as seeds
  to grow others by appending and prepending same digit.
- then, append and prepend other digits until length will exceed 6
- once have all palindromes from 1-1M, simply filter those that pass
  double base palindrome check and sum
- could cut time complexity by precomputing palindromes, so time is
  n where n is number of palindromes from 1-1M
*/
function buildSeeds() {
  const seeds = new Set();
  // 1, 11, ... up to 111,111. so largest values have length 6.
  // Repeat for 2-9 and 0, since 0s can be in middle and pure 0s won't affect sum.
  // Largest values won't have anything appended + prepended, but they themselves
  // might be double base palindromes, so include for check.
  for (let digit = 0; digit <= 9; digit++) {
    let value = String(digit);
    while (value.length <= 6) {
      seeds.add(value);
      value += String(digit);
    }
  }

  return seeds;
}

function checkPalindrome(numString) {
  if (Number(numString) === 0) {
    return false;
  }

  // Can use loop instead to cut time in half and short-circuit many numbers
  return (
    Array.from(numString)
      .reverse()
      .join("") === numString
  );
}

function checkDoublePalindrome(numString) {
  const n = Number(numString);
  const base10 = n.toString();
  const base2 = n.toString(2);
  return checkPalindrome(base10) && checkPalindrome(base2);
}

function buildPalindromes() {
  const seeds = buildSeeds();
  const palindromes = new Set(seeds);
  function build(seed) {
    // Base case: appending 2 more digits would make number > 1M
    if (seed.length >= 5) {
      return;
    }

    for (let n = 0; n <= 9; n++) {
      // Could make prepending and appending constant time with LinkedList
      const palindrome = n.toString() + seed + n.toString();
      palindromes.add(palindrome);
      build(palindrome);
    }
  }

  seeds.forEach(build);
  return palindromes;
}

function sumDoubleBasePalindromes() {
  const palindromes = buildPalindromes();
  return [...palindromes]
    .filter(checkDoublePalindrome)
    .reduce((total, num) => total + Number(num), 0);
}

console.log(sumDoubleBasePalindromes());

// function bruteForce() {
//   let palindromeSum = 0;
//   for (let n = 1; n < 1_000_000; n++) {
//     const hasDoublePalindrome = checkDoublePalindrome(n.toString());
//     if (hasDoublePalindrome) {
//       palindromeSum += n;
//     }
//   }

//   return palindromeSum;
// }

// console.log(bruteForce());
