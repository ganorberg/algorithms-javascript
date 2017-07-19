// Union-find: Given a set of N objects, create two functions: one that dynamically connects two objects from that set and one that checks if two objects are already connected.

// This is an absolutely disgusting solution but it's how I first thought about solving the problem. Each value begins in a Set, and we create/destroy sets to connect our components.

const components = [new Set([0]), new Set([1]), new Set([2])];

function union(a, b) {
  // create two sets of two variables, each will point to components and indices
  let setA;
  let indexA;
  let setB;
  let indexB;

  // loop through components assigning four variables
  components.forEach((component, idx) => {
    if (component.has(a)) {
      setA = component;
      indexA = idx;
    }

    if (component.has(b)) {
      setB = component;
      indexB = idx;
    }
  });

  // check if components are the same for early exit
  if (setA === setB) return;

  // merge to replace first set then destroy second set
  const merged = new Set([...setA, ...setB]);
  components[indexA] = merged;
  components.splice(indexB, 1);
}

function find(a, b) {
  // loop through components
  for (let i = 0; i < components.length; i++) {
    const component = components[i];

    // if component has both, return true
    if (component.has(a) && component.has(b)) return true;

    // if component has one but not the other, return false
    if (component.has(a) && !component.has(b)) return false;
    if (component.has(b) && !component.has(a)) return false;
  }
}

console.log('components pre-union: ', components);
console.log(find(0, 2));
union(0, 2);
console.log(components);
console.log(find(0, 2));
console.log(find(1, 2));
union(1, 2);
console.log(components);
union(0, 1);
console.log(components);