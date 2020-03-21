/* Given an adjacency matrix representing a directed graph, traverse from a 
 * source vertex using depth-first search.
 */
function DFS(matrix, vertex = 0, visited = new Set()) {
  console.log('visited vertex: ', vertex)
  visited.add(vertex);
  matrix[vertex].forEach((edge, adjacentVertex) => {
    if (visited.has(adjacentVertex)) { return; }
    if (edge === 1) { DFS(matrix, adjacentVertex, visited); }
  });
}

/*
Graph edge list: 
0 -> 3
1 -> 0
1 -> 2
2 -> 1
2 -> 2
3 -> 0
3 -> 1
3 -> 2
3 -> 3
*/
const matrix = [[0, 0, 0, 1], [1, 0, 1, 0], [0, 1, 1, 0], [1, 1, 1, 1]];
console.log(DFS(matrix, 0));

