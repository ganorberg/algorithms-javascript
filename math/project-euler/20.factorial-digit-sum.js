/*
n! means n × (n − 1) × ... × 3 × 2 × 1

For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
and the sum of the digits in the number 10! is 
3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

Find the sum of the digits in the number 100!

THOUGHTS
- too big for Number, but probably not for BigInt.
  That's probably cheating though, so I should manually
  multiply strings.
*/
// This got dirty quickly. Carry and operator logic is,
// surprisingly, heavily duplicated between addition and multiplication.
// Kinda makes sense since multiplication is just repeated addition.
// Could probably use that thought to combine multiply and add.
function add(s1, s2) {
  let result = "";
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1 === longer ? s2 : s1;
  const paddedShorter = shorter.padStart(longer.length, "0");
  let carry = 0;
  for (let i = longer.length - 1; i >= 0; i--) {
    const n1 = Number(longer[i]);
    const n2 = Number(paddedShorter[i]);
    let sum = n1 + n2;
    if (carry > 0) {
      sum += carry;
      carry = 0;
    }

    const sumString = String(sum);
    if (sumString.length > 1) {
      const onesPlace = sumString[1];
      const tensPlace = sumString[0];
      result += onesPlace;
      carry += Number(tensPlace);
    } else {
      result += sumString;
    }
  }

  if (carry > 0) {
    result += String(carry);
  }

  return result
    .split("")
    .reverse()
    .join("");
}

function multiplySingleDigit(digit, productString) {
  let result = "";
  let carry = 0;
  for (let i = productString.length - 1; i >= 0; i--) {
    const value = Number(productString[i]);
    let product = value * digit;
    if (carry > 0) {
      product += carry;
      carry = 0;
    }
    if (product > 9) {
      const str = product.toString();
      const tens = str[0];
      const singles = str[1];
      carry += Number(tens);
      result += singles;
    } else {
      result += product.toString();
    }
  }

  if (carry > 0) {
    result += carry;
  }

  return Array.from(result)
    .reverse()
    .join("");
}

function multiply(n, productString) {
  const reverseNum = n
    .toString()
    .split("")
    .reverse();
  const onesPlace = Number(reverseNum[0]);
  const tensPlace = Number(reverseNum[1]);
  const hundredsPlace = Number(reverseNum[2]);
  const onesPlaceProduct = multiplySingleDigit(onesPlace, productString);
  let result = onesPlaceProduct;

  let tensMultiplied;
  let hundredsMultiplied;
  if (!Number.isNaN(tensPlace)) {
    tensMultiplied = multiplySingleDigit(tensPlace, productString) + "0";
    result = add(result, tensMultiplied);
  }

  if (!Number.isNaN(hundredsPlace)) {
    hundredsMultiplied =
      multiplySingleDigit(hundredsPlace, productString) + "00";
    result = add(result, hundredsMultiplied);
  }

  return result;
}

function factorialDigitSum() {
  let product = "1";
  for (let n = 1; n <= 100; n++) {
    product = multiply(n, product);
  }

  return Array.from(product)
    .map(Number)
    .reduce((sum, num) => sum + num, 0);
}

console.log(factorialDigitSum());

// Kinda cheating w/ BigInt
// function factorialDigitSum() {
//   let product = 1n;
//   for (let n = 2n; n <= 100n; n++) {
//     product *= n;
//   }

//   return product
//     .toString()
//     .split("")
//     .map(Number)
//     .reduce((sum, num) => sum + num, 0);
// }

// console.log(factorialDigitSum());
