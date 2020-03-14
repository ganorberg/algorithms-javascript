/*
By starting at the top of the triangle below and 
moving to adjacent numbers on the row below, the 
maximum total from top to bottom is 23.

   3
  7 4
 2 4 6
8 5 9 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom of the triangle below:

                     75
                   95 64
                  17 47 82
                 18 35 87 10
               20 04 82 47 65
             19 01 23 75 03 34
            88 02 77 73 07 63 67
          99 65 04 28 06 16 70 92
        41 41 26 56 83 40 80 70 33
       41 48 72 33 47 32 37 16 94 29
      53 71 44 65 25 43 91 52 97 51 14
    70 11 33 28 77 73 17 78 39 68 17 57
   91 71 52 38 17 14 91 43 58 50 27 29 48
  63 66 04 68 89 53 67 30 73 16 69 87 40 31
 04 62 98 27 23 09 70 98 73 93 38 53 60 04 23

NOTE: As there are only 16384 routes, it is possible to solve 
this problem by trying every route. However, Problem 67, is 
the same challenge with a triangle containing one-hundred rows; 
it cannot be solved by brute force, and requires a clever 
method! ;o)

THOUGHTS
- hey, if brute force works, I'll use it and worry about the 
  clever solution when I get to #67 :)
- how to represent this triangle in memory? it's a tree, so 
  probably start at root and assign children. it's a
  binary tree with shared children since you can only move
  to adjacent numbers, so there are exactly 2 children for each
  node until you reach the leaves which have 0 children.
- I really don't want to manually type out this tree, and #67 will
  be even bigger, so let's parse this as a sequence of strings and
  build a tree with that data
- Once we have a tree, we can DFS and track all sums, then return highest.
- Could probably also just use math to traverse number subarrays
*/
const triangleStrings = [
  "75",
  "95 64",
  "17 47 82",
  "18 35 87 10",
  "20 04 82 47 65",
  "19 01 23 75 03 34",
  "88 02 77 73 07 63 67",
  "99 65 04 28 06 16 70 92",
  "41 41 26 56 83 40 80 70 33",
  "41 48 72 33 47 32 37 16 94 29",
  "53 71 44 65 25 43 91 52 97 51 14",
  "70 11 33 28 77 73 17 78 39 68 17 57",
  "91 71 52 38 17 14 91 43 58 50 27 29 48",
  "63 66 04 68 89 53 67 30 73 16 69 87 40 31",
  "04 62 98 27 23 09 70 98 73 93 38 53 60 04 23"
];

const parseTriangle = triangle =>
  triangle.map(row => row.split(" ").map(Number));

class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }

  addChildren(leftChild, rightChild) {
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

const convertToNodes = triangle =>
  triangle.map(row => row.map(el => new Node(el)));

function buildTree(triangleStrings) {
  const triangleNumbers = parseTriangle(triangleStrings);
  const triangleNodes = convertToNodes(triangleNumbers);

  // Stop before nextRow becomes undefined
  for (let rowIndex = 0; rowIndex < triangleNodes.length - 1; rowIndex++) {
    const row = triangleNodes[rowIndex];
    const nextRow = triangleNodes[rowIndex + 1];
    for (let i = 0; i < row.length; i++) {
      const parent = row[i];
      const leftChild = nextRow[i];
      const rightChild = nextRow[i + 1];
      parent.addChildren(leftChild, rightChild);
    }
  }

  return triangleNodes[0][0];
}

function maxPathSum(triangleStrings) {
  const binaryTree = buildTree(triangleStrings);
  let highestSum = -Infinity;
  function DFS(node, sum = 0) {
    const newSum = node.value + sum;

    // Can pick either child since leaf nodes have no children
    if (node.leftChild === null) {
      highestSum = Math.max(highestSum, newSum);
      return;
    }

    DFS(node.leftChild, newSum);
    DFS(node.rightChild, newSum);
  }

  DFS(binaryTree);
  return highestSum;
}
const binaryTree = console.log(maxPathSum(triangleStrings));
