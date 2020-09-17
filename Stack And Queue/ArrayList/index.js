const MyArray = require("../Array/index");

class ArrayList {
  constructor() {
    this.max = 16;
    this.count = 0;
    this.self = new MyArray(16);
  }

  push(value) {
    if (this.count >= this.max) {
      this.expand();
    }

    this.self.addLast(value);
    this.count++;
  }

  pop() {
    if (this.count <= this.max / 4) {
      this.shrink();
    }

    this.self.removeLast();
    this.count--;
  }

  expand() {
    this.max = this.max * 2;

    this.self = this.clone(this.max);

    return this.self;
  }

  shrink() {
    this.max = this.max / 2;

    this.self = this.clone(this.max);

    return this.self;
  }

  clone(sz) {
    const newArray = new MyArray(sz);
    const oldArray = this.self.get();

    if (sz >= this.count) {
      for (let i = 0; i < oldArray.length; i++) {
        newArray.addLast(oldArray[i]);
      }

      return newArray;
    }
    throw new Error("cannot clone due to limited size");
  }

  get() {
    return this.self.get();
  }
}

function test(sz) {
  const al = new ArrayList();
  for (let i = 0; i < sz; i++) {
    al.push(i);
  }
  const largeArrayLength = al.self.max;

  for (let i = 0; i < (3 * sz) / 4; i++) {
    al.pop();
  }
  const smallArrayLength = al.self.max;

  if (largeArrayLength / 2 === smallArrayLength) console.log("pass");
  else console.log("fail");
}

test(10000);
module.exports = ArrayList;
