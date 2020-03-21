// Using native method
function decToBin(dec) {
  return dec.toString(2);
}

// Manually
function decToBin(dec) {
  if (dec == 0) { return '0'; }
  let bin = '';
  let quotient = dec;

  // Each digit in binary represents remainder when divided by 2 (built right to left)
  while (quotient > 0) {
    const remainder = quotient % 2;
    bin = String(remainder) + bin;
    quotient = Math.floor(quotient / 2);
  }

  return bin;
}

// ALTERNATE SOLUTION
// function decToBin(dec) {
//   let bin = '';
//   let value = dec;

//   // grab exponent of 2 that exceeds our value
//   let exponent = 0;
//   while (true) {
//     if (2 ** ++exponent >= dec) { break; }
//   }

//   // chop off largest power of 2 until exponent decrements to 0
//   while (exponent >= 0) {
//     let raised = 2 ** exponent;
//     if (value >= raised) {
//       bin += '1';
//       value -= raised;

//     // only append zeros 
//     } else if (bin[0] === '1' || exponent === 0) {
//       bin += '0';
//     }

//     exponent--;
//   }

//   return bin;
// }

console.log('0', decToBin(0));
console.log('11', decToBin(3));
console.log('100', decToBin(4));
console.log('101', decToBin(5));
console.log('1010', decToBin(10));
console.log('1000000', decToBin(64));