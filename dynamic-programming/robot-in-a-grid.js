/* Imagine a robot sitting on the upper left corner of a grid with r rows and
 * c columns. The robot can only move in two directions, right and down, but
 * certain cells are "off limits" such that the robot cannot step on them.
 * Design an algorithm to find a path for the robot from the top left to the
 * bottom right.
 *
 * Assumptions:
 * - one input will be a properly structured grid, which means:
 *   - all elements in subarrays are booleans, where false represents "off limits"
 * - use recursion because each "move" is same problem but smaller
 * - use dynamic programming to cache results of recursive calls and avoid duplicate work
 * - first path returned is fine
 *   - return undefined if no viable path
 *   - does not need to be shortest path
 *   - don't need to collect all possible paths
 *   - path will be array of subarrays representing coordinates visited
 *     - coordinates returned will not be Cartesian (x, y) but rather (row, column)
 * - board cannot be so large that call stack size is exceeded (> 1500 is dangerous)
 *
 * Time complexity:
 * - O(2^(r+c)) without caching visits
 * - O(rc) by caching visits to avoid visiting cells whose paths have already been calculated
 */
function getGridPath(grid, row = 0, column = 0, path = [], visited = new Set()) {
  // Check edge cases to fast fail
  if (
    !Array.isArray(grid)
    || grid.map(row => Array.isArray(row)).includes(false)
    || row < 0
    || column < 0
    || !Array.isArray(path)
    || Object.prototype.toString.call(visited) !== '[object Set]'
  ) {
    return 'Please insert valid inputs';
  }

  // Store path info for answer
  path.push([row, column]);

  // Globally track history to avoid repeat visits and duplicate work
  visited.add([row, column]);

  const totalRows = grid.length;
  const totalColumns = grid[0].length;

  // Base case: reached bottom right of grid
  if (row === totalRows - 1 && column === totalColumns - 1) { return path; }
  
  // Continue building path by moving down
  if (
    grid[row + 1] !== undefined
    && grid[row + 1][column] === true
    && !visited.has([row + 1, column])
  ) {
    return getGridPath(grid, row + 1, column, path, visited);
  }
  
  // Continue building path by moving to the right
  if (
    grid[row][column + 1] === true
    && !visited.has([row, column + 1])
  ) {
    return getGridPath(grid, row, column + 1, path, visited);
  }
}

const T = true;
const F = false;
const testGrid0 = [
  [T, T, T],
  [T, F, T],
  [T, T, T],
];

const testGrid1 = [
  [T, F, T],
  [T, T, T],
  [F, F, T],
];

const testGrid2 = [
  [T, F, T, F, T, T, T, T],
  [T, T, T, T, F, T, F, T],
  [T, F, F, T, F, T, F, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, F, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T],
];

const testGrid3 = [];
for (let row = 0; row < 1500; row++) {
  testGrid3.push([]);

  for (let column = 0; column < 1500; column++) {
    testGrid3[row].push(T);
  }
}


console.log(getGridPath(testGrid0));
console.log(getGridPath(testGrid1));
console.log(getGridPath(testGrid2));
console.log(getGridPath(testGrid3));
console.log(getGridPath([[T]]));
console.log(getGridPath());
console.log(getGridPath([{}]));
