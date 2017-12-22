/*
 * Write an algorithm to print all ways of arranging N queens on an NxN chess 
 * board so that none of them share the same row, column, or diagonal. In this
 * case, "diagonal" means all diagonals, not just the two that bisect the board.
 * 
 * STRATEGY: O(N^N) time complexity
 * Loop through every position and check if it is a valid position against all
 * of the current queens.
 * 
 * This implementation requires significant time after N=12.
 */
function NQueens(N, row = 1, queens = [], results = []) {
  if (queens.length === N) {
    // Can cut space in half by recognizing that index = row and only storing
    // column info. This will save time too by eliminating array creation and
    // copying.
    results.push([...queens]);
    return;
  }

  for (let column = 1; column <= N; column++) {
    const position = [row, column];

    if (isValidPosition(queens, position)) {
      queens.push(position);
      NQueens(N, row + 1, queens, results);
      queens.pop();
    }
  }

  return results;
}

function isValidPosition(queens, position) {
  for (let index = 0; index < queens.length; index++) {
    const queen = queens[index];

    // Row will always be unique, so no need to compare
    if (shareColumn(queen[1], position[1]) || shareDiagonal(queen, position)) {
      return false;
    }
  }

  return true;
}

function shareDiagonal(queen, position) {
  // Row will always be greater than all previous queens, so no need for abs
  return position[0] - queen[0] === Math.abs(position[1] - queen[1]);
}

function shareColumn(queenColumn, positionColumn) {
  return queenColumn === positionColumn;
}

// console.log(NQueens(12));
// console.log(NQueens(8));
console.log(NQueens(5));