/*
A palindromic number reads the same both ways. 
The largest palindrome made from the product 
of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the 
product of two 3-digit numbers.

THOUGHTS
- brute force: multiply all 3-digit numbers (999*999 options is reasonable), sort descending, 
  convert to strings, then return first palindrome found
*/

// Assumes n1 and n2 have 3 digits each
function getLargestPalindromeProduct(n1, n2) {
  const products = [];
  for (let i = 100; i <= n1; i++) {
    for (let j = 100; j <= n2; j++) {
      products.push(i * j);
    }
  }

  products.sort((a, b) => b - a);
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (isPalindrome(product)) {
      return product;
    }
  }
}

function isPalindrome(n) {
  const str = n.toString();
  return (
    Array.from(str)
      .reverse()
      .join("") === str
  );
}

console.log(isPalindrome(5005));
console.log(isPalindrome(5004));
console.log(getLargestPalindromeProduct(999, 999));
