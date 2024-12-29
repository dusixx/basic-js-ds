const { NotImplementedError, ListNode } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  #first;
  #last;
  #length = 0;

  constructor(iterable) {
    if (iterable?.[Symbol.iterator]) {
      this.enqueue(...iterable);
    }
  }

  #addNode = (v) => {
    this.#length += 1;

    if (!this.#first) {
      this.#first = new ListNode(v);
      this.#last = this.#first;
      return;
    }
    this.#last.next = new ListNode(v);
    this.#last = this.#last.next;
  };

  #removeTopNode = () => {
    if (!this.#first) {
      return;
    }
    const { value } = this.#first;
    this.#first = this.#first.next;
    this.#length -= 1;

    return value;
  };

  enqueue(...args) {
    args.forEach(this.#addNode);
  }

  dequeue(count = 1) {
    const res = Array.from(
      { length: Math.min(this.#length, count) },
      this.#removeTopNode
    );
    return res.length === 1 ? res[0] : res;
  }

  values() {
    const res = [];
    let p = this.#first;

    while (p) {
      res.push(p.value);
      p = p.next;
    }
    return res;
  }

  get length() {
    return this.#length;
  }

  getUnderlyingList() {
    return this.#first;
  }
}

module.exports = {
  Queue,
};
