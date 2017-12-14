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
 * 
 * STRATEGY: 
 */

// To avoid global scope, can include these in parent function that uses 
// recursive helper.
const OPEN_PARENS = "(";
const CLOSED_PARENS = ")";

function parensCombos(num, closed = [], perm = "", output = []) {
  if (num === 0) {
    // All open parens are used up, so now use any remaining closed parens
    closed.forEach(closedParens => perm += closedParens);
    output.push(perm);
    return;
  }

  // Using an open parentheses means we have one less open and one more closed
  const USE_OPEN = num - 1;
  closed.push(CLOSED_PARENS);
  parensCombos(USE_OPEN, closed, perm + OPEN_PARENS, output);

  // Backtrack so this context does not get undeserved closed parentheses
  closed.pop();

  // Now give closed parens a chance to be selected, if there are any available
  if (closed.length > 0) {
    closed.pop();
    parensCombos(num, closed, perm + CLOSED_PARENS, output);

    // Backtrack
    closed.push(CLOSED_PARENS);
  }

  return output;
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

console.log(parensCombos(1));
console.log(parensCombos(2));
console.log(parensCombos(3));
console.log(parensCombos(5));