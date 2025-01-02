const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

class BSTNode extends Node {
  constructor(data) {
    super(data);
    this.parent = null;
  }
}

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BST {
  #root = null;

  static isNode(v) {
    return v instanceof BSTNode;
  }

  static isLeafNode(node) {
    return this.isNode(node) && !node.left && !node.right;
  }

  #isRootNode = (node) => {
    return BST.isNode(node) && !node.parent && node === this.#root;
  };

  #append = (parent, node) => {
    if (!BST.isNode(parent) || !BST.isNode(node)) {
      return;
    }
    const branch = parent.data > node.data ? 'left' : 'right';
    node.parent = parent;
    parent[branch] = node;
  };

  #findNode = (data, start = this.#root) => {
    for (let node = start; node; ) {
      if (node.data === data) {
        return node;
      }
      node = node.data > data ? node.left : node.right;
    }
    return null;
  };

  #addNode = (data) => {
    let parent;
    let node = this.#root;
    const newNode = new BSTNode(data);

    if (!node) {
      this.#root = newNode;
    }
    while (node) {
      if (node.data === data) {
        break;
      }
      parent = node;
      node = node.data > data ? node.left : node.right;
    }
    if (!node) {
      this.#append(parent, newNode);
    }
  };

  #removeLeafNode = (node) => {
    if (this.#isRootNode(node)) {
      this.#root = null;
      return;
    }
    const branch = node.parent.data > node.data ? 'left' : 'right';
    node.parent[branch] = null;
  };

  #removeNodeWithBothChildren = (node) => {
    const minRight = this.#getMin(node.right);
    const branch = minRight.parent.left === minRight ? 'left' : 'right';

    node.data = minRight.data;
    minRight.parent[branch] = minRight.right;

    // minRight is the minimum and cannot have a left node
    if (minRight.right) {
      minRight.right.parent = minRight.parent;
    }
  };

  #removeNodeWithOneChild = (node) => {
    const child = node.left ?? node.right;

    if (this.#isRootNode(node)) {
      this.#root = child;
      child.parent = null;
    } else {
      this.#append(node.parent, child);
    }
  };

  #removeNode = (node) => {
    if (!BST.isNode(node)) {
      return;
    }
    if (BST.isLeafNode(node)) {
      return this.#removeLeafNode(node);
    }
    return node.left && node.right
      ? this.#removeNodeWithBothChildren(node)
      : this.#removeNodeWithOneChild(node);
  };

  #getMin = (start = this.#root) => {
    return start?.left ? this.#getMin(start.left) : start;
  };

  #getMax = (start = this.#root) => {
    return start?.right ? this.#getMax(start.right) : start;
  };

  root() {
    return this.#root;
  }

  add(...args) {
    args.forEach(this.#addNode);
    return this;
  }

  remove(...args) {
    args.forEach((data) => this.#removeNode(this.find(data)));
    return this;
  }

  find(data) {
    return this.#findNode(data);
  }

  has(data) {
    return Boolean(this.find(data));
  }

  min() {
    return this.#getMin()?.data;
  }

  max() {
    return this.#getMax()?.data;
  }
}

module.exports = {
  BinarySearchTree: BST,
};
