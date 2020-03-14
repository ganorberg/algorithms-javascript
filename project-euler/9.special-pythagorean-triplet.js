/*
A Pythagorean triplet is a set of three natural 
numbers, a < b < c, for which,

a^2 + b^2 = c^2
For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

There exists exactly one Pythagorean triplet for
which a + b + c = 1000. Find the product abc.

THOUGHTS
- no digit can be larger than 997 (since 1 + 2 = 3), so 
  997^3 ~ 1,000,000,000 ops to brute force for all 
  possible triplets. Then quick check with helper and math.
*/
function getPythagoreanTriplet() {
  for (let i = 1; i <= 997; i++) {
    for (let j = 1; j <= 997; j++) {
      for (let k = 1; k <= 997; k++) {
        const isPythagTriplet = checkPythag(i, j, k);
        if (isPythagTriplet) {
          if (i + j + k === 1000) {
            return i * j * k;
          }
        }
      }
    }
  }
}

function checkPythag(n1, n2, n3) {
  const first = Math.pow(n1, 2);
  const second = Math.pow(n2, 2);
  const third = Math.pow(n3, 2);
  if (
    first + second === third ||
    first + third === second ||
    second + third === first
  ) {
    return true;
  }

  return false;
}

console.log(getPythagoreanTriplet());
