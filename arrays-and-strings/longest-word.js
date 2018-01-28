/*
 * Given a list of words, write a program to find the longest word made of other 
 * words in the list.
 * 
 * EXAMPLE
 * Input: cat, banana, dog, nana, walk, walker, dogwalker
 * Output: dogwalker
 */
function longestWord(dictionary) {
  const wordSet = dictionary.reduce((set, word) => set.add(word), new Set());
  const descendingWordLength = dictionary.sort((a, b) => a.length < b.length);

  for (let i = 0; i < descendingWordLength.length; i++) {
    const word = descendingWordLength[i];
    if (hasMatches(word, wordSet, word)) { return word; }
  }

  return null;
}

function hasMatches(word, wordSet, originalWord) {
  if (word === "") { return true; }

  for (let i = 1; i <= word.length; i++) {
    const substringA = word.slice(0, i);
    const substringB = word.slice(i);
    if (wordSet.has(substringA)
      && substringA !== originalWord
      && hasMatches(substringB, wordSet, originalWord)
    ) {
      return true;
    }
  }
}

const arr = ['cat', 'banana', 'dog', 'nana', 'walk', 'walker', 'dogwalker'];
const arr2 = ['cat', 'banana', 'dog', 'wordtoolongyes', 'walkcatdog', 'nana', 'walk', 'walker'];
console.log('dogwalker', longestWord(arr));
console.log('walkcatdog', longestWord(arr2));