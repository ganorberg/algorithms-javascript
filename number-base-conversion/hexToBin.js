// Using native methods
function hexToBin(hex) {
  return parseInt(hex, 16).toString(2);
}

// Manually. Allow leading zeros on output for consistent number of bits per digit.
function hexToBin(hex) {
  const hexa = String(hex).toUpperCase();

  const table = {
    '0':'0000',
    '1':'0001',
    '2':'0010',
    '3':'0011',
    '4':'0100',
    '5':'0101',
    '6':'0110',
    '7':'0111',
    '8':'1000',
    '9':'1001',
    'A':'1010',
    'B':'1011',
    'C':'1100',
    'D':'1101',
    'E':'1110',
    'F':'1111'
  }

  let bin = '';
  for (let i = 0; i < hexa.length; i++) {
    const hexDigit = hexa[i];
    bin += table[hexDigit];
  }

  return bin;
}

console.log('00001111', hexToBin('0F'));
console.log('00101111', hexToBin('2F'));
console.log('10001111', hexToBin('8F'));
console.log('10100111', hexToBin('A7'));
console.log('011010100111', hexToBin('6A7'));
