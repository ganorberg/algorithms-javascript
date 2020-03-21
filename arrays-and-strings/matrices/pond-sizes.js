/*
 * You have an integer matrix representing a plot of land, where the value at 
 * that location represents the height above sea level. A value of zero 
 * indicates water. A pond is a region of water connected vertically, 
 * horizontally, or diagonally. The size of the pond is the total number of 
 * connected water cells. Write a method to compute the sizes of all ponds in 
 * the matrix.
 * 
 * EXAMPLE
 * Input: [
 *   [0, 2, 1, 0],
 *   [0, 1, 0, 1],
 *   [1, 1, 0, 1],
 *   [0, 1, 0, 1]
 * ]
 * Output: [2, 4, 1] (in any order)
 * 
 * ASSUMPTIONS
 * - valid matrix input with rectangular shape
 * - prefer extra space over mutating input. Otherwise make value -1 on visit.
 * 
 * STRATEGY: O(N^2) time and space
 * Loop all values. On 0, DFS and check neighbors. Use Visited Set with ID as 
 * row | column to avoid repeat work. For each 0 visited, add 1 to size and 
 * return size at end of DFS. Push pond size to array after each root DFS call 
 * finishes.
 */

const POND = 0;

function getPondSizes(matrix) {
  const pondSizes = [];
  const visited = new Set();

  matrix.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      const position = stringify(rowIndex, columnIndex);
      if (value !== POND || visited.has(position)) { return; }

      const pondSize = visitPond(
        matrix,
        position,
        rowIndex,
        columnIndex,
        visited,
      );

      pondSizes.push(pondSize);
    });
  });

  return pondSizes;
}

function visitPond(
  matrix,
  position,
  rowIndex,
  columnIndex,
  visited,
  size = 0,
) {
  visited.add(position);
  let currentSize = size + 1;

  // Check all surrounding cells for 0. Out of bounds avoided by conditional.
  for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
    for (let column = columnIndex - 1; column <= columnIndex + 1; column++) {
      const adjacentPosition = stringify(row, column);
      if (visited.has(adjacentPosition)) { continue; }
      if (matrix[row] && matrix[row][column] === POND) {
        currentSize = visitPond(
          matrix,
          adjacentPosition,
          row,
          column,
          visited,
          currentSize,
        );
      }
    }
  }

  return currentSize;
}

function stringify(a, b) {
  return `${a}|${b}`;
}

const land = [
  [0, 2, 1, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 1],
  [0, 1, 0, 1],
];

const land2 = [
  [0, 0, 0, 0],
  [0, 1, 0, 1],
  [1, 1, 0, 1],
  [0, 1, 2, 0],
];

console.log([2, 4, 1], getPondSizes(land));
console.log([8, 1], getPondSizes(land2));