/* New strategy: Sets are represented by array values, and index can be used to
 * remember original set. For union, merely change array values from one set
 * value to the other. Find function is super fast and easy because you simply
 * check array values at given indices.
*/

const values = [0, 1, 2];

function union(a, b) {
  // exit call because both values are already in the same set
  if (values[a] === values[b]) return;

  // need to store set value in variable because loop overwrites b values at match
  const valueB = values[b];

  // convert set b to set a
  values.forEach((value, idx) => {
    if (value === valueB) { values[idx] = values[a]; }
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