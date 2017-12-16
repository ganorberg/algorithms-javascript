/* Given a directed graph, design an algorithm to find out whether there is a 
 * route between two nodes.
 * 
 * ASSUMPTIONS
 * - graph is represented as object-oriented adjacency list, like so:
 * { 
 *  v1: [adjacent vertices], 
 *  v2: [adjacent vertices],
 *  v3: [adjacent vertices] 
 * }
 * 
 * DFS STRATEGY
 * Use depth-first search and check if any node visited equals v2. If so, return
 * true. Else return false if all DFS calls complete without seeing v2.
 * 
 * BFS STRATEGY
 * Use breadth-first search and check if any node visited equals v2. If so, 
 * return true. Else return false if completes without seeing v2.
 */
function hasRoute(graph, vertex, destinationVertex, visited = new Set()) {
  visited.add(vertex);

  for (const adjacentVertex of graph[vertex]) {
    if (visited.has(adjacentVertex)) { continue; }
    if (adjacentVertex === destinationVertex) { return true; }
    if (hasRoute(graph, adjacentVertex, destinationVertex, visited) === true) {
      return true;
    }
  }

  return false;
}

const connected = {
  0: [],
  1: [],
  source: [0, 1, 3],
  3: [4, 5, 6],
  4: [],
  5: ["destination"],
  6: [],
  destination: [],
}

const notConnected = {
  0: [],
  1: [],
  source: [0, 1, 3],
  3: [4, 5, 6],
  4: [],
  5: [],
  6: [],
  destination: [],
}

console.log(true, hasRoute(connected, "source", "destination"));
console.log(false, hasRoute(notConnected, "source", "destination"));