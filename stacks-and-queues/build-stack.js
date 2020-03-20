/*
  Build a Stack data structure with methods push, pop, peek, and isEmpty.

  THOUGHTS
  - native array can be used for optimal time complexity
  - could use Class with constructor, functions, or objects. Let's try functions
    and objects.
*/
function createStack(capacity = Infinity) {
  return {
    capacity,
    storage: [],
    size: 0
  };
}

// Functions assume a certain shape
function push(stack, item) {
  if (stack.size < stack.capacity) {
    stack.storage.push(item);
    stack.size++;
  }
}

function pop(stack) {
  if (stack.size > 0) {
    stack.storage.pop();
    stack.size--;
  }
}

function peek(stack) {
  return stack.storage[stack.size - 1];
}

function isEmpty(stack) {
  return stack.size === 0;
}

// Usage
const stack = createStack(2);
push(stack, 1);
push(stack, 2);
push(stack, 3);
const peeked = peek(stack);
pop(stack);
const peekedAfterPop = peek(stack);
const isStackEmpty = isEmpty(stack);
pop(stack);
pop(stack);
const isStackEmptyNow = isEmpty(stack);

console.log("stack: ", stack);
console.log("peeked: ", peeked);
console.log("peekedAfterPop: ", peekedAfterPop);
console.log("isStackEmpty: ", isStackEmpty);
console.log("isStackEmptyNow: ", isStackEmptyNow);

// OLOO pattern
const Stack = {
  init(capacity = Infinity) {
    this.capacity = capacity;
    this.storage = [];
    this.size = 0;
  },
  push(item) {
    if (this.size >= this.capacity) {
      return;
    }

    this.storage.push(item);
    this.size++;
  },
  pop() {
    if (this.size === 0) {
      return;
    }

    this.storage.pop();
    this.size--;
  },
  peek() {
    return this.storage[this.size - 1];
  },
  isEmpty() {
    return this.size === 0;
  }
};

const stack1 = Object.create(Stack);
const stack2 = Object.create(Stack);
stack1.init();
stack2.init(2);

stack1.push(1);
stack1.push(2);
stack1.push(3);
const peek1 = stack1.peek();
stack1.pop();
const peek1AfterPop = stack1.peek();
const isStack1Empty = stack1.isEmpty();
stack1.pop();
stack1.pop();
const isStack1EmptyNow = stack1.isEmpty();

console.log("stack1: ", stack1);
console.log("peeked: ", peek1);
console.log("peekedAfterPop: ", peek1AfterPop);
console.log("isstack1Empty: ", isStack1Empty);
console.log("isstack1EmptyNow: ", isStack1EmptyNow);
