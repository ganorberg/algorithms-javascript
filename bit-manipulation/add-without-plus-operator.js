/* Add two unsigned numbers without using "+" or "++".
 */
function sum(a, b) {
  if (b === 0) { return a; }
  const numWithoutCarry = a ^ b;
  const carry = (a & b) << 1;
  return sum(numWithoutCarry, carry);
}

console.log(25, sum(10, 15));
console.log(1602, sum(102, 1500));
console.log(1010101, sum(1010100, 1));