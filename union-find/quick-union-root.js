// Union-find: Given a set of N objects, create two functions: one that dynamically connects two objects from that set and one that checks if two objects are already connected.

// Much cleaner with root abstracted b/c allows use in both union and connected functions and avoids double hard-coded while loop

const values = [0, 1, 2, 3, 4];

function union(a, b) {
  if (!connected(a, b)) {
    // assign first root to second root
    const rootA = root(a);
    const rootB = root(b);
    values[rootA] = rootB;
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
