/*
Starting in the top left corner of a 2×2 grid, and 
only being able to move to the right and down, there 
are exactly 6 routes to the bottom right corner.

How many such routes are there through a 20×20 grid?

THOUGHTS
- branching recursion: choose to move either right or down
- no 2 paths will be the same, so increment a counter when
  each path is completed
- input can be grid in memory or just coordinates
- if just coordinates, then moving right means adding 1 to
  column coordinate and moving down means adding 1 to row
- if going out of bounds, don't recurse
- way too slow. size 17 takes 100 seconds to calculate.
  each digit increase multiplies time by 4. estimating
  100 minutes for 20. need to cache somehow.
- it's a square, so paths are mirrored. can cut time in half.
- might need dynamic programming
- can build paths by starting from endpoint. at 20,19 and 19,20
  there is only 1 path to end. moving along edge of grid, stays
  as 1. if move diagonally from end, we know there is one path
  to right and one path to left, so we can just add 1 + 1 = 2.
  so any points that want to know how many paths are left if they
  choose that diagonal path now just need to add 2. can build 
  entire grid like this up to starting point. 
- 20x20 grid has 21x21 points
*/
// In retrospect, should have seeded bottom and right edges with 1
// to avoid conditional checks in loop
function latticePaths() {
  // start with 21x21 lattice of 0s
  // seed bottom right corner with 1
  // loop rest of grid one point up or left at a time
  // add number to right and below. if undefined, add 0 for that direction.
  // return first value in lattice (top left)

  const GRID_SIZE = 20;
  const POINTS = GRID_SIZE + 1;
  const row = new Array(POINTS).fill(0);

  // Cannot fill with row or row.slice() because same array in memory gets filled
  const lattice = new Array(POINTS).fill(0).map(_ => row.slice());

  // Seed
  lattice[GRID_SIZE][GRID_SIZE] = 1;
  for (let row = GRID_SIZE; row >= 0; row--) {
    for (let column = GRID_SIZE; column >= 0; column--) {
      if (row === 20 && column === 20) {
        continue;
      }

      const rowBelow = lattice[row + 1];
      let pathsBelow = 0;
      if (rowBelow !== undefined) {
        pathsBelow = rowBelow[column];
      }

      const columnRight = lattice[row][column + 1];
      const pathsRight = columnRight || 0;
      const totalPaths = pathsBelow + pathsRight;
      lattice[row][column] = totalPaths;
    }
  }

  return lattice[0][0];
}

console.log(latticePaths());

// Too slow beyond grid size of 14 :(
// function latticePaths() {
//   let count = 0;
//   const GRID_SIZE = 4;
//   function move(coordinates = [0, 0]) {
//     const row = coordinates[0];
//     const column = coordinates[1];
//     if (row === GRID_SIZE && column === GRID_SIZE) {
//       count++;
//       return;
//     }

//     if (row < GRID_SIZE) {
//       move([row + 1, column]);
//     }

//     if (column < GRID_SIZE) {
//       move([row, column + 1]);
//     }
//   }

//   move();
//   return count;
// }
