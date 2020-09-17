// use Javascript to mimic Java's Array Implementation
// Could NOT add more items than reserved size.
class MyArray {
  constructor(size) {
    if (typeof size === "number") {
      this.self = [];
      this.count = 0;
      this.max = size;
      return;
    }

    throw new Error("Only Take Number Type as Argument");
  }

  addLast(item) {
    const count = this.count;

    if (count < this.max) {
      this.self[count] = item;
      this[count] = this.self[count];

      this.count++;

      return this.self;
    }

    throw new Error("Reached Capacity");
  }

  removeLast() {
    if (this.count > 0) {
      this.count--;
    }
    this[this.count] = undefined;

    return this.self.pop();
  }

  set(index, value) {
    if (index < this.max) {
      this.self[index] = value;
      this[index] = this.self[index];

      return this.self;
    }

    throw new Error("Reached Capacity");
  }

  remove(index) {
    if (index < this.max) {
      this.self[index] = undefined;
      this[index] = this.self[index];

      return this.self;
    }
  }

  get() {
    return this.self;
  }
}

function test() {
  function DoNotExceedCapacity() {
    const capacity = 3;
    const arr = new MyArray(capacity);
    try {
      for (let i = 0; i < capacity + 1; i++) {
        arr.addLast("item");
      }
    } catch (err) {
      if (err.message === "Reached Capacity") {
        console.log(`DoNotExceedCapacity Test Passed`);
        return;
      }
    }

    console.log("DoNotExceedCapacity Test Not Passed");
  }

  function ReadValueByIndexCorrectly() {
    const capacity = 3;
    const arr = new MyArray(capacity);
    for (let i = 0; i < capacity; i++) {
      arr.addLast(i);
    }

    for (let j = 0; j < capacity; j++) {
      if (arr[j] !== j) {
        console.log("ReadValueByIndexCorrectly Test Not Passed");
        return;
      }
    }

    console.log("ReadValueByIndexCorrectly Test Passed");
  }

  function SetValueByIndexCorrectly() {
    const capacity = 3;
    const arr = new MyArray(capacity);

    arr.set(2, 3);
    if (arr[2] !== 3) {
      console.log("SetValueByIndexCorrectly Test Not Passed");
    }

    console.log("SetValueByIndexCorrectly Test Passed");
  }

  function SetValueWithinCapacity() {
    const capacity = 3;
    const arr = new MyArray(capacity);

    try {
      arr.set(4, "item");
    } catch (err) {
      if (err.message === "Reached Capacity") {
        console.log(`SetValueWithinCapacity Test Passed`);
        return;
      }
    }

    console.log(`SetValueWithinCapacity Test Not Passed`);
  }

  function RemoveValueByIndexCorrectly() {
    const capacity = 3;
    const arr = new MyArray(capacity);

    for (let i = 0; i < capacity; i++) {
      arr.addLast(i);
    }

    arr.remove(2);

    if (!arr[2] && arr[0] !== undefined && arr[1]) {
      console.log("RemoveValueByIndexCorrectly Test Passed");
      return;
    }

    console.log(`RemoveValueByIndexCorrectly Test Not Passed`);
  }

  function RemoveTheLastOneCorrectly() {
    const capacity = 3;
    const arr = new MyArray(capacity);

    for (let i = 0; i < capacity; i++) {
      arr.addLast(i);
    }

    arr.removeLast();

    if (!arr[2] && arr[0] !== undefined && arr[1]) {
      console.log("RemoveValueByIndexCorrectly Test Passed");
      return;
    }

    console.log(`RemoveValueByIndexCorrectly Test Not Passed`);
  }

  DoNotExceedCapacity();
  ReadValueByIndexCorrectly();
  SetValueByIndexCorrectly();
  SetValueWithinCapacity();
  RemoveValueByIndexCorrectly();
  RemoveTheLastOneCorrectly();
}

module.exports = MyArray;
