const MyArray = require("./Array/index.js");
// LIFO
class Stack {
  constructor() {
    this.self = new MyArray(1);
    this.N = 0;
  }

  push(value) {
    if (this.N === this.self.max) {
      // if stack reaches the max capacity, the array size got doubled
      this.resize(2 * this.self.max);
    }
    this.N++;

    this.self.addLast(value);
  }

  pop() {
    this.self.removeLast();
    if (this.N > 0) {
      this.N--;
    }

    if (this.N > 0 && this.N === this.self.max / 4) {
      // if stack capacity usage is 25%, shrink the size in half.
      this.resize(this.self.max / 2);
    }
  }

  resize(length) {
    const arr = new MyArray(length);

    for (let i = 0; i < this.self.max; i++) {
      if (this.self[i]) {
        arr.set(i, this.self[i]);
      }
    }
    arr.count = this.self.count;

    this.self = arr;
  }

  isEmpty() {
    return this.self.get().length === 0;
  }

  get() {
    return this.self.get();
  }
}
