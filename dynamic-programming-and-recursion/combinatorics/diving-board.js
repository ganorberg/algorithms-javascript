/*
 * You are building a diving board by placing a bunch of planks of wood 
 * end-to-end. There are two types of planks, one of length shorter and one of 
 * length longer. You must use exactly K planks of wood. Write a method to 
 * generate all possible lengths for the diving board.
 * 
 * STRATEGY: O(K) time and space.
 * Recognize that can have K short pieces and 0 long pieces, K long pieces and
 * 0 short pieces, or any combination therein that sums to K. So simply create
 * all possible combinations from 0 to K that add to K.
 * 
 * BRUTE FORCE STRATEGY: O(2^K) time and O(P) space where P is possible lengths.
 * Use multiple recursion to create all possible permutations. Have counter 
 * start at 0. Pick short or long piece, increment counter, and recurse. When
 * counter matches K, store result in a Set. This Set will automatically account
 * for dupes.
 */
function divingBoard(short, long, K) {
  // Use Set instead of Array for edge case where long and short are the same
  const boardLengths = new Set();

  for (let numberOfLong = 0; numberOfLong <= K; numberOfLong++) {
    const numberOfShort = K - numberOfLong;
    const boardLength = short * numberOfShort + long * numberOfLong;
    boardLengths.add(boardLength);
  }

  return boardLengths;
}

console.log(new Set([4, 5, 6, 7, 8]), divingBoard(1, 2, 4));
console.log(new Set([8]), divingBoard(2, 2, 4));