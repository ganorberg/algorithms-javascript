class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * Interface:
 * - add value
 * - contains value
 * - dfs (pre, in, post order)
 * - bfs
 *
 * Thoughts:
 * - assume no duplicates
 * - assume not balanced like red-black tree
 */
class BST {
  constructor() {
    this.tree = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (this.tree === null) {
      this.tree = newNode;
      return;
    }

    let node = this.tree;
    while (node.value !== null) {
      if (value > node.value) {
        if (node.right === null) {
          node.right = newNode;
          return;
        }

        node = node.right;
      }

      if (value < node.value) {
        if (node.left === null) {
          node.left = newNode;
          return;
        }

        node = node.left;
      }
    }
  }

  bfs(callback) {
    if (this.tree === null) {
      return;
    }

    let q = [this.tree];
    while (q.length > 0) {
      const children = [];
      q.forEach(node => {
        callback(node.value);
        if (node.left !== null) {
          children.push(node.left);
        }

        if (node.right !== null) {
          children.push(node.right);
        }
      });

      q = children;
    }
  }

  contains(value, node = this.tree) {
    if (node === null) {
      return false;
    }

    if (value === node.value) {
      return true;
    }

    if (value < node.value) {
      return this.contains(value, node.left);
    } else {
      return this.contains(value, node.right);
    }
  }

  // left, root, right
  dfsInOrder(callback, node = this.tree) {
    if (node === null) {
      return;
    }

    this.dfsInOrder(callback, node.left);
    callback(node.value);
    this.dfsInOrder(callback, node.right);
  }

  // left, right, root
  dfsPostOrder(callback, node = this.tree) {
    if (node === null) {
      return;
    }

    this.dfsPostOrder(callback, node.left);
    this.dfsPostOrder(callback, node.right);
    callback(node.value);
  }

  // root, left, right
  dfsPreOrder(callback, node = this.tree) {
    if (node === null) {
      return;
    }

    callback(node.value);
    this.dfsPreOrder(callback, node.left);
    this.dfsPreOrder(callback, node.right);
  }
}

const tree = new BST();
tree.add(10);
tree.add(5);
tree.add(1);
tree.add(3);
tree.add(31);
tree.add(7);
/*
      10
     / \
    5  31
   / \
  1   7
   \
    3
*/
// console.log(tree.contains(10));
// console.log(tree.contains(31));
// console.log(tree.contains(1));
// console.log(tree.contains(7));
// console.log(tree.contains(70));
// console.log(JSON.stringify(tree, null, 2));
const callback = value => console.log(value);
// tree.dfsPreOrder(callback); // 10 5 1 3 7 31
// tree.dfsInOrder(callback); // 1 3 5 7 10 31
// tree.dfsPostOrder(callback); // 3 1 7 5 31 10
tree.bfs(callback); // 10 5 31 1 7 3
