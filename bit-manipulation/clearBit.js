/* At index, convert 1 to 0 or leave 0 as is.
 *
 * Main idea: AND with 1s in mask does nothing, while AND with 0 at index yields 0.
 *
 * Strategy: Shift 1 left to the proper index, creating a value like 00010000
 * for index = 4. Negate it to reverse values like 11101111. Perform an AND
 * operation with binary to clear the bit at the index and leave the rest.
 */
function clearBit(binary, index) {
  const mask = ~(1 << index);
  return binary & mask;
}

const bin = (10).toString(2);
console.log(bin); // 1010
console.log(10, clearBit(10, 0));
console.log(8, clearBit(10, 1));
console.log(10, clearBit(10, 2));
console.log(2, clearBit(10, 3));