// Using native method
function binToDec(binary) {
  return parseInt(binary, 2);
}

// Manually
function binToDec(binary) {
  // Make sure binary value is in string format for looping
  const bin = String(binary);

  let dec = 0;
  let power = 0;

  for (let i = bin.length - 1; i >= 0; i--, power++) {
    dec += (2 ** power) * Number(bin[i]);
  }

  return dec;
}

console.log(0, binToDec('0'));
console.log(3, binToDec('11'));
console.log(4, binToDec('100'));
console.log(5, binToDec('101'));
console.log(5, binToDec('0101'));
console.log(64, binToDec('1000000'));