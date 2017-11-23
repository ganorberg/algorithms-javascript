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
  value = 0
) {
  // Base case: successful value found
  if (size === 0 || index >= items.length) { return value; }

  // Use index to track item to avoid array slicing, which would take linear time
  const item = items[index];

  // Cannot pick items bigger than remaining size, so simply move to next item
  if (item.size > size) { return knapsack(size, items, index + 1, value); }

  // Compare all possibilities of selecting or not selecting items
  return Math.max(
    knapsack(size - item.size, items, index + 1, value + item.value),
    knapsack(size, items, index + 1, value),
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

console.log(27, knapsack(5, items));
console.log(47, knapsack(15, items));
console.log(63, knapsack(1000, items));
console.log(9, knapsack(7, bag));
