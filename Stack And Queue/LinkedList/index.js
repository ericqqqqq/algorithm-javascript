function node(value, next) {
  this.value = value;
  this.next = next;
}

class LinkedList {
  constructor() {
    this.count = 0;
  }

  forEach(cb) {
    let current = this.first;

    while (current) {
      cb(current.value);
      current = current.next;
    }
  }

  addLast(value) {
    const item = new node(value, null);

    this.count++;

    if (!this.first) {
      this.first = item;
      return;
    }

    let current = this.first;

    while (current.next !== null) {
      current = current.next;
    }

    current.next = item;
  }

  addFirst(value) {
    const item = new node(value, null);

    this.count++;
    if (!this.first) {
      this.first = item;
      return;
    }

    const oldFirst = this.first;

    item.next = oldFirst;
    this.first = item;
  }

  popFirst() {
    const target = this.first;

    this.count--;
    this.first = target.next;
  }

  printInString() {
    let current = this.first;
    if (!current) {
      return "[]";
    }

    let result = "[";

    while (current.next !== null) {
      result += `${current.value}, `;
      current = current.next;
    }

    result += `${current.value}, `;

    result = result.substr(0, result.length - 2);
    result += "]";

    return result;
  }

  get() {
    return this.first;
  }
}

module.exports = LinkedList;
