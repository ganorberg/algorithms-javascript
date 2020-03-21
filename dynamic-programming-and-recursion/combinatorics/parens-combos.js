/*
 * Implement an algorithm to print all valid (e.g., properly opened and closed)
 * combinations of n pairs of parentheses.
 * 
 * EXAMPLE
 * Input: 3
 * Output: ((())), (()()), (())(), ()(()), ()()()
 * 
 * ASSUMPTIONS
 * - output is array
 * - input is positive safe integer
 * - compiler makes string concatenation constant time, like array pushing.
 *   Otherwise use array then join at end.
 * 
 * STRATEGY: O(n * Cat(n)), where Cat(n) is the nth Catalan number
 * The input n represents how many open parentheses we must use. When we add
 * an open parens, we get a closed parens to play with. Use multiple recursion
 * to build a tree of all possible combinations with the closed parens path
 * gated by whether or not any closed parens exist (that is, whether a 
 * corresponding open parens has been used.) At base case, use remaining closed
 * parens and push to global output array. Could use params or outer function
 * for globals like output, open bracket and closed bracket.
 */
function getValidParensCombos(
  openAmount,
  closedAmount = 0,
  perm = "",
  output = [],
  OPEN_PARENS = "(",
  CLOSED_PARENS = ")"
) {
  if (openAmount === 0) {
    perm += leftoverClosedBrackets(closedAmount, CLOSED_PARENS);
    output.push(perm);
    return;
  }

  const USE_OPEN = openAmount - 1;
  const ADD_CLOSED = closedAmount + 1;
  getValidParensCombos(USE_OPEN, ADD_CLOSED, perm + OPEN_PARENS, output);

  if (closedAmount > 0) {
    const USE_CLOSED = closedAmount - 1;
    getValidParensCombos(openAmount, USE_CLOSED, perm + CLOSED_PARENS, output);
  }

  return output;
}

function leftoverClosedBrackets(amount, closingBracket) {
  let result = "";
  for (let i = 0; i < amount; i++) { result += closingBracket; }
  return result;
}

/*
1: ()
open close
2: ()(), (())
open open close close
3: ()()(), ((())), (())(), ()(()), (()())
open open close close open close, open open close open close close

RULES
- close cannot come before open
- must start with open, then can choose to open or close
- if all opens used, then close all
- each open adds one possible close
*/

console.log(getValidParensCombos(1));
console.log(getValidParensCombos(2));
console.log(getValidParensCombos(3));
console.log(getValidParensCombos(4).length);
console.log(getValidParensCombos(5).length);

// OLD SOLUTION
// // To avoid global scope, can include these in parent function that uses 
// // recursive helper.
// const OPEN_PARENS = "(";
// const CLOSED_PARENS = ")";

// function parensCombos(num, closed = [], perm = "", output = []) {
//   if (num === 0) {
//     // All open parens are used up, so now use any remaining closed parens
//     closed.forEach(closedParens => perm += closedParens);
//     output.push(perm);
//     return;
//   }

//   // Using an open parentheses means we have one less open and one more closed
//   const USE_OPEN = num - 1;
//   closed.push(CLOSED_PARENS);
//   parensCombos(USE_OPEN, closed, perm + OPEN_PARENS, output);

//   // Backtrack so this context does not get undeserved closed parentheses
//   closed.pop();

//   // Now give closed parens a chance to be selected, if there are any available
//   if (closed.length > 0) {
//     closed.pop();
//     parensCombos(num, closed, perm + CLOSED_PARENS, output);

//     // Backtrack
//     closed.push(CLOSED_PARENS);
//   }

//   return output;
// }