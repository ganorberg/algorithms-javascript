// Using native methods
function binToHex(binary) {
  return parseInt(binary, 2).toString(16)
}

// Manually. Allow leading zeros on result to indicate leading bit zeros.
function binToHex(binary) {
  const table = {
    '0000': '0',
    '0001': '1',
    '0010': '2',
    '0011': '3',
    '0100': '4',
    '0101': '5',
    '0110': '6',
    '0111': '7',
    '1000': '8',
    '1001': '9',
    '1010': 'A',
    '1011': 'B',
    '1100': 'C',
    '1101': 'D',
    '1110': 'E',
    '1111': 'F'
  }

  // Make sure binary is manipulated in string format
  const bin = String(binary);

  // Break binary up into groups of four for later translation to hex using table
  const groupsOfFour = [];
  let hex = '';

  // Final index tracks leftovers at beginning if not perfectly divisible by 4
  // Could alternatively pad binary to always be divisible by 4.
  let finalIndex;
  for (let i = bin.length - 1; i >= 3; i -= 4) {
    const group = bin.slice(i - 3, i + 1);
    groupsOfFour.push(group);
    finalIndex = i;
  }

  // Handle leftover bits at beginning of binary, if any
  if (finalIndex > 3) {
    const leftovers = bin.slice(0, finalIndex - 3);
    const zeroPadded = leftovers.padStart(4, '0');
    hex += table[zeroPadded];
  }

  for (let i = groupsOfFour.length - 1; i >= 0; i--) {
    const key = groupsOfFour[i];
    hex += table[key];
  }

  return hex;
}

console.log('0F', binToHex('00001111'));
console.log('2F', binToHex('00101111'));
console.log('8F', binToHex('10001111'));
console.log('A7', binToHex('10100111'));
console.log('6A7', binToHex('11010100111'));