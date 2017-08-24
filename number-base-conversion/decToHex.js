// Using native method
function decToHex(dec) {
  return dec.toString(16);
}

// Manually
function decToHex(dec) {
  const table = {
    '10': 'A',
    '11': 'B',
    '12': 'C',
    '13': 'D',
    '14': 'E',
    '15': 'F'
  }

  let hex = '';
  let quotient = dec;

  // Remainder represents each digit to prepend
  while (quotient > 0) {
    let remainder = quotient % 16;
    if (remainder > 9) { remainder = table[remainder]; }
    hex = String(remainder) + hex;
    quotient = Math.floor(quotient / 16);
  }

  return hex;
}

console.log('F', decToHex(15));
console.log('20', decToHex(32));
console.log('3F', decToHex(63));
console.log('F00D', decToHex(61453));
