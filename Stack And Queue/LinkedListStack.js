const LinkedList = require("./linkedList/index");

class stack {
  init() {
    this.self = new LinkedList();
  }

  push(value) {
    this.self.addFirst(value);
  }

  pop() {
    this.self.popFirst();
  }

  get() {
    return this.self.get();
  }

  isEmpty() {
    return this.self.count === 0;
  }

  size() {
    return this.self.count;
  }
}

module.exports = stack;
