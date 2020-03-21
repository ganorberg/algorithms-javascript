// Using native method
// function binToDec(binary) {
//   return parseInt(binary, 2);
// }

// Most efficient version
function binToDec(binary) {
  let decimal = 0;
  let mask = 1;

  for (let i = 0; i < 32; i++) {
    const bit = Number((binary & mask) !== 0);
    decimal += (2 ** i) * bit;
    mask <<= 1;
  }

  return decimal;
}

// Manually with some duplicated work in getBit
// function binToDec(binary) {
//   let decimal = 0;

//   for (let i = 0; i < 32; i++) {
//     const bit = getBit(binary, i);
//     decimal += (2 ** i) * bit;
//   }

//   return decimal;
// }

// function getBit(binary, index) {
//   return Number((binary & (1 << index)) !== 0);
// }

// Slow manually with binary string
// function binToDec(binary) {
//   // Make sure binary value is in string format for looping
//   const bin = String(binary);

//   let dec = 0;
//   let power = 0;

//   for (let i = bin.length - 1; i >= 0; i-- , power++) {
//     dec += (2 ** power) * Number(bin[i]);
//   }

//   return dec;
// }

console.log(0, binToDec(0 & 0));
console.log(3, binToDec(3 & 3));
console.log(4, binToDec(4 & 4));
console.log(5, binToDec(5 & 5));
console.log(64, binToDec(64 & 64));