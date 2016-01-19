'use strict';

let Queue = (() => {
  const empty = (new (class Empty {}));

  class QueueNode {
    constructor(value, prev) {
      this.value = value;
      this.prev = prev || empty;
    }

    push(value) {
      return (function push(value, node) {
        return node && new QueueNode(value, push(node.value, node.prev));
      })(value, this);
    }

    pop() {
      return (function pop(node) {
        return node.prev != empty && new QueueNode(node.value, pop(node.prev));
      })(this);
    }

    length() {
      return (function length(node, curSize) {
        return node.prev != empty && length(node.prev, curSize + 1) || curSize;
      })(this, 1);
    }
  }

  class Queue {
    constructor() {
      this.root = undefined;
    }

    enqueue(value) {
      if (this.root) (this.root = this.root.push(value));
      else this.root = new QueueNode(value);
      return this.root.value;
    }

    dequeue() {
      if (this.root) return (this.root = this.root.pop());
      return 0;
    }

    size() {
      if (this.root) return this.root.length();
      return 0;
    }
  }

  return Queue;
})();

var q = new Queue;
q.enqueue(1)

console.log(
  q.dequeue()
)