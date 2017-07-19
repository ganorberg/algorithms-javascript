/* Union-find: Given a set of N objects, create two functions: one that dynamically connects two objects from that set and one that checks if two objects are already connected.
*/

// New strategy: set each index to value where each value represents a set. For union, merely change array values from one set value to the other. Find function is super fast and easy b/c you just check array values at given indices.

const values = [0, 1, 2];

function union(a, b) {
  // if same value, return early b/c already same set
  if (values[a] === values[b]) return;

  // values[b] will be updated, so store set value in variable
  const valueB = values[b];

  // if different values, loop through array changing elements matching second value to first value
  values.forEach((value, idx) => {
    if (value === valueB) {
      values[idx] = values[a];
    }
  });
}

function find(a, b) {
  return values[a] === values[b];
}

console.log('pre-unions: ', values);
console.log(find(0, 2));
union(0, 2);
console.log(values);
console.log(find(0, 2));
union(1, 0);
console.log(values);