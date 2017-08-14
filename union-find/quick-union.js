/* Next strategy: create trees of components. Each tree will have a root to
 * identify that set. Union function will take first tree and attach to
 * root of second tree (assuming unconnected) by changing first * value to second.
 *
 * This turned out mangled and gross in terms of modularity... cleaned up in
 * quick-union-root file by abstracting root search and connect logic.
 */
const values = [0, 1, 2, 3, 4];

function union(a, b) {
  const [connected, rootA, rootB] = find(a, b);
  if (!connected) {
    // assign first root to second root
    values[rootA] = rootB;
  }
}

function find(a, b) {
  // travel up tree until find root for each
  let rootA = values[a];
  let rootB = values[b];

  // root occurs where value is equivalent to index
  while (rootA !== values[rootA]) {
    console.log('rootA: ', rootA);
    rootA = values[rootA];
  }

  while (rootB !== values[rootB]) {
    rootB = values[rootB];
  }

  // return comparison of roots as well as both roots for union call
  return [rootA === rootB, rootA, rootB];
}

console.log('pre-union: ', values);
union(2, 4);
// values: [0, 1, 4, 3, 4]
console.log(values);
union(3, 1);
console.log(values);
// values: [0, 1, 4, 1, 4]
union(1, 0);
console.log(values);
// values: [0, 0, 4, 1, 4];
