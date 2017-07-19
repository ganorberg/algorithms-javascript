// Union-find: Given a set of N objects, create two functions: one that dynamically connects two objects from that set and one that checks if two objects are already connected.

// Quick union makes trees too deep, so let's weigh each tree and assign smaller tree to larger tree at union. Requires size array to track number of objects at root of each tree.

const values = [0, 1, 2, 3, 4];
const size = [1, 1, 1, 1, 1];

function union(a, b) {
  if (!connected(a, b)) {
    const rootA = root(a);
    const rootB = root(b);

    if (rootA === rootB) { return; }
    if (size[rootA] < size[rootB]) {
      values[rootA] = rootB;
      size[rootB] += size[rootA];
    } else {
      values[rootB] = rootA;
      size[rootA] += size[rootB];
    }
  }
}

function root(el) {
  let idx = values[el];

  while (idx !== values[idx]) {
    idx = values[idx];
  }

  return idx;
}

function connected(a, b) {
  return root(a) === root(b);
}

console.log('pre-union values: ', values);
union(2, 4);
// values: [0, 1, 2, 3, 2]
// size: [1, 1, 2, 1, 1]
console.log(values);
union(3, 1);
console.log(values);
// values: [0, 3, 2, 3, 2]
// size: [1, 1, 2, 2, 1]
union(3, 0);
console.log(values);
console.log('size: ', size);
// values: [3, 3, 2, 3, 2];
// size: [1, 1, 2, 3, 1]
