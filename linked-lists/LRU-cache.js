/*
 * Design and build a "least recently used" cache, which evicts the least 
 * recently used item. The cache should map from keys to values (allowing you to 
 * insert and retrieve a value associated with a particular key) and be 
 * initialized with a max size. When it is full, it should evict the least 
 * recently used item.
 * 
 * ASSUMPTIONS
 * - input items are primitives (passed by value, not by reference). Otherwise
 *   need deep checks or different system.
 */
class Node {
  constructor(key, value) {
    this.parent = null;
    this.child = null;
    this.key = key;
    this.value = value;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addToHead(node) {
    this.length++;
    if (this.head === null) {
      this.head = this.tail = node;
      return;
    }

    this.head.parent = node;
    node.child = this.head;
    this.head = node;

    // Redundant if node was just created, but just in case parent is set
    node.parent = null;
  }

  destroyTail() {
    this.length--;
    this.tail.parent.child = null;
    this.tail = this.tail.parent;
  }

  makeHead(node) {
    if (node === this.head) { return; }
    node.parent.child = node.child;

    if (node === this.tail) {
      this.tail = node.parent;
    } else {
      node.child.parent = node.parent;
    }

    node.parent = null;
    node.child = this.head;
    this.head.parent = node;
    this.head = node;
  }
}

class LRUcache {
  // Arbitrary max size for testing. In production, calculate memory available.
  constructor(capacity = 3) {
    this.cache = {};
    this.capacity = capacity;
    this.list = new LinkedList();
  }

  get(key) {
    this.list.makeHead(this.cache[key]);
    return this.cache[key];
  }

  removeOldestFromCache() {
    const oldestKey = this.list.tail.key;
    delete this.cache[oldestKey];
  }

  set(key, value) {
    if (this.cache.hasOwnProperty(key)) {
      this.cache[key].value = value;
      this.list.makeHead(this.cache[key]);
    } else {
      this.cache[key] = new Node(key, value);
      this.list.addToHead(this.cache[key]);
      if (this.list.length > this.capacity) {
        this.removeOldestFromCache();
        this.list.destroyTail();
      }
    }
  }
}

const cache = new LRUcache();
cache.set('dog', 'woof');
cache.set('cat', 'meow');
cache.set('owl', 'coo');
cache.get('dog');
// console.log(cache);
// cache.set('overflow', 'replace woof');
// cache.set('overflow', 'replace meow')
console.log(cache);