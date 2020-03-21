/* Given an adjacency matrix representing a directed graph, traverse from a 
 * source vertex using breadth-first search.
 */
function BFS(matrix, sourceVertex = 0) {
  let queue = [sourceVertex];
  const visited = new Set([sourceVertex]);

  while (true) {
    const children = [];
    queue.forEach(vertex => {
      matrix[vertex].forEach((edge, adjacentVertex) => {
        if (visited.has(adjacentVertex)) { return; }
        if (edge === 1) {
          console.log('visiting vertex: ', adjacentVertex);
          visited.add(adjacentVertex);
          children.push(adjacentVertex);
        }
      });
    });

    if (children.length === 0) { return; }
    queue = children;
  }
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
console.log(BFS(matrix, 0));

