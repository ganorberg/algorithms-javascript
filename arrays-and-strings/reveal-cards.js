/*
In a deck of cards, every card has a unique integer. You can order 
the deck in any order you want.

Initially, all the cards start face down (unrevealed) in one deck.

Now, you do the following steps repeatedly, until all cards are revealed:
Take the top card of the deck, reveal it, and take it out of the deck.
If there are still cards in the deck, put the next top card of the deck 
at the bottom of the deck. If there are still unrevealed cards, go back 
to step 1. Otherwise, stop.

Return an ordering of the deck that would reveal the cards in increasing order.

The first entry in the answer is considered to be the top of the deck.

CASES
- to output 1, 2, 3, 4, start with [1, 3, 2, 4]. 1 -> 3 in back -> 2 -> 4 
  in back -> 3 -> 4
- to output 1, 2, 3, 4, 5, 6, 7, start with [1, x, 2, x, 3, x, 4] then 
  think of [4, x, x, x]. so [4, x, 5, x] then [x, x] is even length, 
  so [6, 7]. which gives [1, 6, 2, 5, 3, 7, 4]

THOUGHTS
- smallest always first item, then second is 3rd, third is 5th, and so 
  on until reach end of array.
- assume unrevealed means face down, not never seen
- start by sorting deck in ascending order
- so recursively sort every other number. if odd length, assign odds. 
  if even length, assign evens in ascending order. repeat.
- create new array on every call, pass odd/even flag if needed, pass 
  rest of digits. so track digits used and unused.
*/
const isEven = n => n % 2 === 0;
function reveal(deck) {
  const sorted = deck.slice().sort((a, b) => a - b);
  const result = new Array(sorted.length).fill(null);

  let sortedIndex = 0;
  let resultIndex = 0;
  while (resultIndex < result.length) {
    const sortedValue = sorted[sortedIndex];
    result[resultIndex] = sortedValue;
    sortedIndex++;
    resultIndex += 2;
  }

  function assign(container) {
    if (container.length < 3) {
      firstNullIndex = result.indexOf(null);
      result[firstNullIndex] = container[0];
      firstNullIndex = result.indexOf(null);
      result[firstNullIndex] = container[1];
      return;
    }

    const assigning = [];
    for (let i = 0; i < container.length; i++) {
      const card = container[i];
      if (isEven(container.length)) {
        if (isEven(i)) {
          firstNullIndex = result.indexOf(null);
          result[firstNullIndex] = card;
        } else {
          assigning.push(card);
        }
      } else {
        if (isEven(i)) {
          assigning.push(card);
        } else {
          firstNullIndex = result.indexOf(null);
          result[firstNullIndex] = card;
        }
      }
    }

    assign(assigning);
  }

  assign(sorted.slice(sortedIndex));
  return result;
}

const deck = [17, 13, 11, 2, 3, 5, 7];
console.log(reveal(deck));
