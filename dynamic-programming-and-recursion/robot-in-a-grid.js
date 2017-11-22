/* Imagine a robot sitting on the upper left corner of a grid with r rows and
 * c columns. The robot can only move in two directions, right and down, but
 * certain cells are "off limits" such that the robot cannot step on them.
 * Design an algorithm to find a path for the robot from the top left to the
 * bottom right.
 *
 * Assumptions:
 * - one input will be a properly structured grid, which means:
 *   - all elements in subarrays are booleans, where false represents "off limits"
 *   - all rows are the same length
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
  // Test for invalid inputs
  if (
    !Array.isArray(grid)
    || grid.length === 0
    || grid.map(row => Array.isArray(row)).includes(false)
    || row < 0
    || column < 0
    || !Number.isSafeInteger(row)
    || !Number.isSafeInteger(column)
    || !Array.isArray(path)
    || Object.prototype.toString.call(visited) !== '[object Set]'
  ) {
    return 'Please insert valid inputs';
  }

  const totalRows = grid.length;
  const totalColumns = grid[0].length;

  // Base cases: out of bounds, hit an "off limit" cell, or already visited this cell
  if (
    row >= totalRows
    || column >= totalColumns
    || grid[row][column] === false
    || visited.has(`${row},${column}`)
  ) { return null; }

  // Copy path to avoid all routes sharing same array
  const localPath = [...path, [row, column]];

  // Globally track history to avoid repeat visits and duplicate work
  visited.add(`${row},${column}`);

  // Base case: reached bottom right of grid
  if (row === totalRows - 1 && column === totalColumns - 1) { return localPath; }
  
  // Move down or to the right in all possible combinations until hit base cases
  return getGridPath(grid, row + 1, column, localPath, visited) ||
         getGridPath(grid, row, column + 1, localPath, visited);
}

const T = true;
const F = false;
const testGrid0 = [
  [T, T, T],
  [T, F, T],
  [F, T, T],
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
