/* From index to most significant bit, turn 1s to 0s (and leave 0s as they are).
 *
 * Main idea: -1 is a series of 1s in binary, so by subtracting 1, we add a
 * series of 1s to our mask. Because 1 + 1 at index carries the 1, and this
 * carried 1 will add to the next 1 from the -1 series, and so on, the mask
 * becomes 0s after the index (inclusive) but remains 1s before the index.
 * AND with 1s leaves bits as is, while AND with 0s clears the bits.
 *
 * EXAMPLE MASK CALCULATIONS: 
 * (1 << 2) => 0010
 * -1 => 1111
 * 0100 + 1111 = 0011
 * Notice how all values after (and including) the index are 0, and before are 1s.
 *
 * Strategy: To clear all bits from the index (inclusive) to the most
 * significant bit, create a mask with a 1 at the index. Then, subtract 1 from
 * it to yield a sequence of 0s followed by 1s. AND binary with this mask to
 * leave just the bits before the index.
 */
function clearBitsToEnd(binary, index) {
  const mask = (1 << index) - 1;
  return binary & mask;
}

const bin = (10).toString(2);
console.log(bin); // 1010
console.log(0, clearBitsToEnd(10, 0));
console.log(0, clearBitsToEnd(10, 1));
console.log(2, clearBitsToEnd(10, 2));
console.log(2, clearBitsToEnd(10, 3));