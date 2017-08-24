// Using native method
function hexToDec(hex) {
  return parseInt(hex, 16);
}

// Manually
function hexToDec(hex) {
  // Make sure input is in string format for looping
  const hexa = String(hex);
  const table = {
    'A': '10',
    'B': '11',
    'C': '12',
    'D': '13',
    'E': '14',
    'F': '15'
  }

  let dec = 0;
  let power = 0;

  for (let i = hex.length - 1; i >= 0; i--, power++) {
    let hexDigit = hex[i];
    if (table.hasOwnProperty(hexDigit)) { hexDigit = table[hexDigit]; }
    dec += Number(hexDigit) * (16 ** power);
  }

  return dec;
}

console.log(15, hexToDec('F'));
console.log(32, hexToDec('20'));
console.log(63, hexToDec('3F'));
console.log(61453, hexToDec('F00D'));