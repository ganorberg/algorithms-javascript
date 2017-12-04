/* You are given a list of projects and a list of dependencies (which is a list 
 * of pairs of projects, where the second project is dependent on the first 
 * project). All of a project's dependencies must be built before the project 
 * is. Find a build order that will allow the projects to be built. If there is 
 * no valid build order, return an error.
 * 
 * EXAMPLE
 * Input:
 *   projects: [a, b, c, d, e, f]
 *   dependencies: [[a, d], [f, b], [b, d], [f, a], [d, c]]
 * Output: [f, e, a, b, d, c]
 * 
 * ASSUMPTIONS
 * - graph may not be connected, so need to search from all vertices
 */
function getBuildOrder(projects, dependencies) {
  const graph = buildDirectedGraph(projects, dependencies);
  if (hasCycle(graph)) { throw new Error('No valid build order'); }
  return topologicalSort(graph);
}

function buildDirectedGraph(projects, dependencies) {
  const graph = {};

  projects.forEach(project => graph[project] = []);

  dependencies.forEach(pair => {
    const vertex = pair[0];
    const edge = pair[1];
    graph[vertex].push(edge);
  });

  return graph;
}

function hasCycle(graph) {
  const doneVisiting = new Set();
  const callStack = new Set();

  for (const vertex in graph) {
    if (doneVisiting.has(vertex)) { continue; }
    if (hasCycleFromVertex(graph, vertex, doneVisiting, callStack)) { return true; }
  }

  return false;
}

function hasCycleFromVertex(graph, vertex, doneVisiting, callStack) {
  callStack.add(vertex);

  for (const adjacentVertex of graph[vertex]) {
    if (doneVisiting.has(adjacentVertex)) { continue; }
    if (callStack.has(adjacentVertex)) { return true; }
    if (hasCycleFromVertex(graph, adjacentVertex, doneVisiting, callStack)) { return true; }
  }

  callStack.delete(vertex);
  doneVisiting.add(vertex);
  return false;
}

function topologicalSort(graph) {
  const sorted = [];
  const visited = new Set();

  function DFS(graph, vertex) {
    visited.add(vertex);
    graph[vertex].forEach(adjacentVertex => {
      if (visited.has(adjacentVertex)) { return; }
      DFS(graph, adjacentVertex);
    });

    sorted.push(vertex);
  }

  for (const vertex in graph) {
    if (!visited.has(vertex)) { DFS(graph, vertex); }
  }

  return sorted.reverse();
}

const projects = ["a", "b", "c", "d", "e", "f"];
const dependencies = [["a", "d"], ["f", "b"], ["b", "d"], ["f", "a"], ["d", "c"]];
// const dependencies2 = [["a", "d"], ["f", "b"], ["b", "d"], ["d", "a"], ["d", "c"]];
const dependenciesERROR = [["a", "d"], ["c", "a"], ["b", "d"], ["f", "a"], ["d", "c"]];
const graph = {
  a: ['d'],
  b: ['d'],
  c: ['a'],
  d: ['c'],
  e: ['e'],
  f: ['b', 'a']
}

console.log("[f, e, b, a, d, c]", getBuildOrder(projects, dependencies));
// console.log("error", getBuildOrder(projects, dependencies2));
console.log("ERROR MESSAGE", getBuildOrder(projects, dependenciesERROR));
// console.log(true, hasCycle('e', graph));
// console.log(true, hasCycle('f', graph));
// console.log(true, hasCycle('a', graph));
// console.log(true, hasCycle('b', graph));
// console.log(true, hasCycle('c', graph));
// console.log(true, hasCycle('d', graph));