/*
145 is a curious number, as 
1! + 4! + 5! = 1 + 24 + 120 = 145.

Find the sum of all numbers which are 
equal to the sum of the factorial of their digits.

Note: as 1! = 1 and 2! = 2 are not sums 
they are not included.

THOUGHTS
- similar to #32 except factorial much more expensive to
  compute than products
- let's see limit by looking at factorials for each single digit
9! = 362880
8! = 40320
7! = 5040
6! = 720
5! = 120
- so if we have 9! + anything, going to produce a huge number. possible
  that many 9! added together can equal a large number since adding digits
  is like multiplying by 10 while adding 9! takes ~3 to increase by a factor
  of 10.
- we can store hash map of digit factorials so we don't have to recompute
- if we brute force check all digits, what is the limit?
9! * 10 = 3.6M, so already too many digits
9! * 7 = 2.5M, which is 7 digits on each side, so let's try 9,999,999 as limit.
- starting cannot be single digits, since no sum, so start with 10.
- brute force worst time would be ~10M * 7 = 70M ops. takes 2.6 seconds.
*/
function digitFactorials() {
  const factorials = [
    ["0", 1],
    ["1", 1],
    ["2", 2],
    ["3", 6],
    ["4", 24],
    ["5", 120],
    ["6", 720],
    ["7", 5_040],
    ["8", 40_320],
    ["9", 362_880]
  ];
  const factorialMap = new Map(factorials);
  let result = 0;
  for (let n = 10; n <= 9_999_999; n++) {
    const str = n.toString();
    const factorialSum = Array.from(str)
      .map(num => factorialMap.get(num))
      .reduce((total, num) => total + num, 0);
    if (factorialSum === n) {
      result += n;
    }
  }

  return result;
}

console.log(digitFactorials());
