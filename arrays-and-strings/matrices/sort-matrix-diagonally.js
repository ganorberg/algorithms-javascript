function sortMatrix(mat) {
  const diagonals = [];

  for (let columnIndex = 0; columnIndex < mat[0].length; columnIndex++) {
    let row = 0;
    let column = columnIndex;
    let diagonal = [];
    while (row < mat.length && column < mat[0].length) {
      diagonal.push(mat[row][column]);
      row++;
      column++;
    }

    diagonals.push(diagonal);
    diagonal = [];
  }

  for (let rowIndex = 1; rowIndex < mat.length; rowIndex++) {
    let row = rowIndex;
    let column = 0;
    let diagonal = [];
    while (row < mat.length && column < mat[0].length) {
      diagonal.push(mat[row][column]);
      row++;
      column++;
    }

    diagonals.push(diagonal);
    diagonal = [];
  }

  for (let i = 0; i < diagonals.length; i++) {
    const diagonal = diagonals[i];
    diagonal.sort((a, b) => {
      return a - b;
    });
  }

  let row = 0;
  for (let column = 0; column < mat[0].length; column++) {
    const diagonal = diagonals[column];
    let diagonalColumn = column;
    diagonal.forEach(digit => {
      mat[row][diagonalColumn] = digit;
      row++;
      diagonalColumn++;
    });

    row = 0;
  }

  let diagonalIndex = mat[0].length;
  let column = 0;
  for (let row = 1; row < mat.length; row++) {
    const diagonal = diagonals[diagonalIndex];
    let diagonalRow = row;
    diagonal.forEach(digit => {
      mat[diagonalRow][column] = digit;
      column++;
      diagonalRow++;
    });

    column = 0;
    diagonalIndex++;
  }

  return mat;
}

const mat = [
  [3, 3, 1, 1],
  [2, 2, 1, 2],
  [1, 1, 1, 2]
];

console.log(sortMatrix(mat));
// result should be [[1, 1, 1, 1], [1, 2, 2, 2], [1, 2, 3, 3]]
