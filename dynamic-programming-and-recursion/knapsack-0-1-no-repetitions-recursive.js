/* Given a knapsack of size S and a collection of items each with a size and
 * value, return the maximum value that the knapsack can hold. Fractional
 * items are not allowed. Items can only be used once.
 *
 * Assumptions:
 * - valid inputs
 */
function knapsack(
  size = 0,
  items = [],
  index = 0,
  value = 0,
  optimalValue = {},
) {
  if (optimalValue.hasOwnProperty(size)) { return optimalValue[size]; }

  // Base case: successful value found
  if (size === 0 || index >= items.length) { return value; }

  // Use index to track item to avoid array slicing, which would take linear time
  const item = items[index];
  const NEXT_INDEX = index + 1;

  // Cannot pick items bigger than remaining size, so simply move to next item
  if (item.size > size) { return knapsack(size, items, NEXT_INDEX, value); }

  // Compare all possibilities of selecting or not selecting items
  return optimalValue[size] = Math.max(
    knapsack(size - item.size, items, NEXT_INDEX, value + item.value),
    knapsack(size, items, NEXT_INDEX, value),
  );
}

const items = [
  { size: 1, value: 10 },
  { size: 3, value: 1 },
  { size: 2, value: 5 },
  { size: 4, value: 2 },
  { size: 2, value: 8 },
  { size: 3, value: 8 },
  { size: 5, value: 7 },
  { size: 7, value: 4 },
  { size: 8, value: 3 },
  { size: 1, value: 9 },
  { size: 9, value: 6 },
];

const bag = [
  { size: 1, value: 1 },
  { size: 3, value: 4 },
  { size: 4, value: 5 },
  { size: 5, value: 7 },
];

const store = [
  { size: 6, value: 30 },
  { size: 3, value: 14 },
  { size: 4, value: 16 },
  { size: 2, value: 9 },
]

console.log(27, knapsack(5, items));
console.log(47, knapsack(15, items));
console.log(63, knapsack(1000, items));
console.log(9, knapsack(7, bag));
console.log(46, knapsack(10, store));
