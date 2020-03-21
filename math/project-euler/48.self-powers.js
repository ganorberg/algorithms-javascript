/*
The series, 1^1 + 2^2 + 3^3 + ... + 10^10 = 10405071317.

Find the last ten digits of the series, 1^1 + 2^2 + 3^3 + ... + 1000^1000.

THOUGHTS
- BigInt
*/

function selfPowers() {
  let sum = 0n;
  for (let n = 1n; n <= 1_000n; n += 1n) {
    let product = 1n;
    for (let i = 1; i <= Number(n); i++) {
      product *= n;
    }

    sum += product;
  }

  return sum.toString().slice(-10);
}

console.log(selfPowers());
