/* Given an image represented by an MxN matrix, where each pixel in the image is
 * 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in 
 * place?
 * 
 * ASSUMPTIONS:
 * - valid matrix input
 */

/* STRATEGY WITHOUT AUXILIARY SPACE (CLOCKWISE)
 * Swap corners, then swap rest of values in outer ring one by one. Repeat for 
 * inner rings. Assume NxN matrix.
 */
function rotateMatrixInPlace(matrix) {
  const n = matrix.length;
  const floor = Math.floor(n / 2);
  const ceil = Math.ceil(n / 2);

  for (let i = 0; i < floor; i++) {
    for (let j = 0; j < ceil; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[n - 1 - j][i];
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
      matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
      matrix[j][n - 1 - i] = temp;
    }
  }

  return matrix;
}

/* STRATEGY WITH AUXILIARY SPACE (COUNTERCLOCKWISE)
 * Need new matrix to store new rows
 * Outer loop per column backwards
 * Need row array to build
 * Inner loop per row
 * Append value to row building up
 * After inner loop finishes, append row to matrix
 */
function rotateMatrix(matrix) {
  const rotatedMatrix = [];
  const numberOfColumns = matrix[0].length;
  const numberOfRows = matrix.length;

  for (let column = numberOfColumns - 1; column >= 0; column--) {
    let rotatedRow = [];

    for (let row = 0; row < numberOfRows; row++) {
      const cell = matrix[row][column];
      rotatedRow.push(cell);
    }

    rotatedMatrix.push(rotatedRow);
  }

  return rotatedMatrix;
}

const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

console.log(rotateMatrix(matrix)); // top to bottom: 369, 258, 147
console.log(rotateMatrixInPlace(matrix)); // top to bottom: 741 852 963
