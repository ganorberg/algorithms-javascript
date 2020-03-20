class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addToHead(value) {
    const node = new Node(value);
    this.size++;
    if (this.head === null && this.tail === null) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head = node;
  }

  addToTail(value) {
    const node = new Node(value);
    this.size++;
    if (this.head === null) {
      this.head = this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  remove(value) {
    if (this.head.value === value) {
      const head = this.head;
      this.head = this.head.next;
      head.next = null;
      this.size--;
      if (this.size === 0) {
        this.tail = null;
      }

      return;
    }

    let nextNode = null;
    for (let node = this.head; node !== null; node = node.next) {
      nextNode = node.next;
      if (nextNode === null || nextNode.value !== value) {
        continue;
      }

      this.size--;
      node.next = nextNode.next;
      if (nextNode === this.tail) {
        this.tail = node;
      }
    }
  }
}

// 1 -> 3 -> 7
const LL = new LinkedList();
LL.addToHead(1);
LL.addToTail(3);
LL.addToTail(7);
// LL.remove(1);

console.log(JSON.stringify(LL, null, 2));
