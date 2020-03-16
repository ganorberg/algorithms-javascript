/*
The Fibonacci sequence is defined by the recurrence relation:

Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
Hence the first 12 terms will be:

F1 = 1
F2 = 1
F3 = 2
F4 = 3
F5 = 5
F6 = 8
F7 = 13
F8 = 21
F9 = 34
F10 = 55
F11 = 89
F12 = 144
The 12th term, F12, is the first term to contain three digits.

What is the index of the first term in the Fibonacci sequence to contain 1000 digits?

THOUGHTS
- I don't think JS can hold a number with 1,000 digits in memory, so we need to
  manually add strings
- Stop when string length is 1,000
- Iterative should be faster than recursion since avoids call stack and new execution 
  contexts
- Helper to add
*/
function add(a, b) {
  let sum = "";
  const shorter = a.length < b.length ? a : b;
  const longer = shorter === a ? b : a;
  const zeroPadded = shorter.padStart(longer.length, "0");
  let carry = 0;
  for (let i = longer.length - 1; i >= 0; i--) {
    const n1 = Number(longer[i]);
    const n2 = Number(zeroPadded[i]);
    let added = (n1 + n2 + carry).toString();
    if (carry > 0) {
      carry = 0;
    }

    if (added.length > 1) {
      carry++;
      const onesPlace = added[1];
      sum += onesPlace;
    } else {
      sum += added;
    }
  }

  if (carry > 0) {
    sum += String(carry);
  }

  return Array.from(sum)
    .reverse()
    .join("");
}

function fibonacciDigits() {
  let n1 = "1";
  let n2 = "1";
  let index = 2;
  while (n2.length < 1000) {
    const sum = add(n1, n2);
    n1 = n2;
    n2 = sum;
    index++;
  }

  return index;
}

console.log(fibonacciDigits());
