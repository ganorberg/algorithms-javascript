/**
 * Interface:
 * - addWord
 * - containsWord
 * - getAllWords
 * - autocomplete
 * - deleteWord
 * - hasPrefix
 *
 * Assumptions:
 * - methods only accept non-empty strings
 *
 * Thoughts:
 * - use $ as special symbol to denote the end of a word
 */
class PrefixTree {
  constructor() {
    this.tree = {};
  }

  addWord(word) {
    let node = this.tree;
    Array.from(word).forEach(letter => {
      if (node.hasOwnProperty(letter)) {
        node = node[letter];
      } else {
        node[letter] = {};
        node = node[letter];
      }
    });

    node["$"] = true;
  }

  autocomplete(str) {
    if (this.tree === null) {
      return;
    }

    let node = this.tree;
    let prefix = "";
    for (let i = 0; i < str.length; i++) {
      const letter = str[i];
      if (node.hasOwnProperty(letter) === false) {
        return [];
      }

      prefix += letter;
      node = node[letter];
    }

    const suffixes = this.getAllWords(node);
    return suffixes.map(suffix => prefix + suffix);
  }

  containsWord(word) {
    let node = this.tree;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (node.hasOwnProperty(letter) === false) {
        return false;
      }

      node = node[letter];
    }

    return node.hasOwnProperty("$");
  }

  deleteWord(word) {
    if (this.hasPrefix(word) === false) {
      return;
    }

    function dfs(node, letterIndex = 0) {
      if (letterIndex >= word.length) {
        delete node.$;
        return;
      }

      const letter = word[letterIndex];
      const nextNode = node[letter];
      dfs(nextNode, letterIndex + 1);
      const children = Object.keys(nextNode);
      if (children.length === 0) {
        delete node[letter];
      }
    }

    dfs(this.tree);
  }

  getAllWords(start = this.tree) {
    const words = [];

    function dfs(node, word = "") {
      if (node == undefined) {
        return;
      }

      const letters = Object.keys(node);
      if (letters.length === 1 && letters["$"] === true) {
        return;
      }

      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        const appended = word + letter;
        if (node[letter].hasOwnProperty("$")) {
          words.push(appended);
        }

        dfs(node[letter], appended);
      }
    }

    dfs(start);
    return words;
  }

  hasPrefix(prefix) {
    if (this.tree === null) {
      return false;
    }

    let node = this.tree;
    for (let i = 0; i < prefix.length; i++) {
      const letter = prefix[i];
      if (node.hasOwnProperty(letter) === false) {
        return false;
      }

      node = node[letter];
    }

    return true;
  }
}

const trie = new PrefixTree();
trie.addWord("dog");
trie.addWord("doggy");
trie.addWord("dad");
trie.addWord("buzz");
// console.log(trie.containsWord("dog"));
// console.log(trie.containsWord("dad"));
// console.log(trie.containsWord("doggy"));
// console.log(trie.containsWord("do"));
// console.log(trie.containsWord("hot"));
// console.log(trie.getAllWords());
// console.log(trie.autocomplete("d"));
// console.log(trie.autocomplete("do"));
// console.log(trie.autocomplete("b"));
// console.log(trie.autocomplete(""));
// console.log(trie.autocomplete("e"));
// console.log(trie.hasPrefix("d"));
// console.log(trie.hasPrefix("do"));
// console.log(trie.hasPrefix(""));
// console.log(trie.hasPrefix("e"));
// console.log(trie.hasPrefix("doggy"));
// console.log(trie.hasPrefix("doggyy"));
// console.log(trie.deleteWord("buzz"));
// console.log(trie.deleteWord("dad"));
// console.log(trie.deleteWord("doggy"));
// console.log(trie.deleteWord("dog"));
console.log(JSON.stringify(trie.tree, null, 2));
