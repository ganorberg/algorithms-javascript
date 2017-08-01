// Write an algorithm to multiply two 2D matrices.

function multiplyMatrices(A, B) {
  // create output array to hold result
  const result = [];

  // reset to 0 after each dot product is fully summed
  let dotProductTemp = 0;

  // loop through first matrix where A[i] represents each row
  for (let i = 0; i < A.length; i++) {
    // each row of multiplication creates a row in the output
    result.push([]);

    // j is column pointer for B
    for (let j = 0; j < B[0].length; j++) {
      // k is row pointer for B, and also column pointer for A to keep dot product aligned
      for (let k = 0; k < B.length; k++) {
        // classic dot product calculation
        dotProductTemp += A[i][k] * B[k][j];

        // right before the innermost loop terminates...
        if (k === B.length - 1) {
          // store completed dotProduct -- i tracks row and push tracks column
          result[i].push(dotProductTemp);

          // reset
          dotProductTemp = 0;
        }
      }
    }
  }

  // output array should now represent AxB
  return result;
}

const A = [[1, 2], [3, 4]]
/*
  [ 1 2
    3 4 ]
*/

const B = [[5, 6, 7], [8, 9, 10]];
/*
  [ 5 6 7
    8 9 10 ]
*/

// 2x2 can multiply 2x3 and result will have shape 2x3
console.log(multiplyMatrices(A, B));
/*
  [ 21 24 27
    47 54 61 ]
*/

/* EXAMPLES
first dot product = A[i][k]*B[k][j] + A[i][k+1]*B[k+1][j]
first dot product =    (1) * (5)    +      (2) * (8)

second dot product = A[0][1]*B[0][1] + A[0][1]*B[1][1]
second dot product =    (1) * (6)    +    (2) * (9)
*/