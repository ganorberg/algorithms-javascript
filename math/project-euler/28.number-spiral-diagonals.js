/*
Starting with the number 1 and moving to the right 
in a clockwise direction a 5 by 5 spiral is formed 
as follows:

21 22 23 24 25
20  7  8  9 10
19  6  1  2 11
18  5  4  3 12
17 16 15 14 13

It can be verified that the sum of the numbers on 
the diagonals is 101.

What is the sum of the numbers on the diagonals 
in a 1001 by 1001 spiral formed in the same way?

THOUGHTS
- seems like there is a mathematical way to calculate 
  instead of building a grid with ~1M values and summing diagonals
- looking at nested squares:
1
3, 5, 7, 9
13, 17, 21, 25
- always four values in corners separated by same distance
  - 1 moves right then down for first corner
  - 9 moves right then down 4 for next first corner
  - if we continued, 25 would move right then down 6 for next corner
- so pattern seems to be increase difference by 2, add that difference 4 times,
  repeat. each nested square increases overall square width and height by 2, so
  stop after 500 iterations to reach 1001 x 1001.
*/
function getNextFour(start, jump) {
  const first = start + jump;
  const second = first + jump;
  const third = second + jump;
  const fourth = third + jump;
  return [first, second, third, fourth];
}

function numberSpiralDiagonals() {
  let start = 1;
  let jump = 2;
  let sum = 1;
  for (let i = 0; i < 500; i++) {
    const [first, second, third, fourth] = getNextFour(start, jump);
    sum += first + second + third + fourth;
    start = fourth;
    jump += 2;
  }

  return sum;
}

console.log(numberSpiralDiagonals());
