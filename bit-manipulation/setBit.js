/* At index, convert 0 to 1 or leave 1 as is.
 *
 * Main idea: OR with 0s in mask does nothing, while OR with 1 in mask converts to 1.
 *
 * Strategy: Shift 1 left to the proper index, creating a value like 00010000
 * for index = 4. By performing an OR with binary, only the value at the index
 * will change. All other bits of the mask are zero and will not affect binary.
 */

function setBit(binary, index) {
  return binary | (1 << index);
}

const bin = (10).toString(2);
console.log(bin); // 1010
console.log(11, setBit(10, 0));
console.log(10, setBit(10, 1));
console.log(14, setBit(10, 2));
console.log(10, setBit(10, 3));