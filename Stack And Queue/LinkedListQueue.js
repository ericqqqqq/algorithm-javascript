const LinkedList = require("./LinkedList/index");

class queue {
  init() {
    this.self = new LinkedList();
  }

  enqueue(value) {
    this.self.addLast(value);
  }

  dequeue() {
    this.self.popFirst();
  }

  isEmpty() {
    return this.self.count === 0;
  }

  size() {
    return this.self.count;
  }

  get() {
    return this.self.get();
  }
}

module.exports = queue;
