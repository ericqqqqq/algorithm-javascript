// A priority queue that takes key/value pairs or a set of numbers
// then sort the incoming sets based on one of the values from the set.
// For example,
// You can have sets with 3 values: {name: "Eric", age: 21, hobby: "Paint"}
// And you can have another set {name: "Becky", age: 20, hobby: "Paint"}
// You can tell the PQE to sort based on the age.
// If PQ is larger-first order. Eric set will be popped first.

// If each set have `s` values. And `n` sets
// insert takes

class PQE {
  constructor(size) {
    this.pq = [];
    for (let i = 0; i < size; i++) {
      this.pq[i] = [null];
    }
  }

  push(...values) {
    for (let i = 0; i < values.length; i++) this.pq[i].push(values[i]);
    this.swim(this.pq[0].length - 1);
  }

  pop() {
    if (this.pq[0].length > 1) {
      const r = [];

      for (let i = 0; i < this.pq.length; i++) {
        r.push(this.pq[i][1]);

        this.exchange(i, 1, this.pq[i].length - 1);
        this.pq[i].pop();
      }

      this.sink(1);
      return r;
    }
  }

  swim(n) {
    let pNode = Math.floor(n / 2);
    let cNode = n;

    while (this.pq[0][pNode] < this.pq[0][cNode] && pNode > 0) {
      for (let i = 0; i < this.pq.length; i++) this.exchange(i, cNode, pNode);

      cNode = pNode;
      pNode = Math.floor(cNode / 2);
    }
  }

  sink(n) {
    if (n === this.pq[0].length - 1) return;

    let cNode = 2 * n;
    let pNode = n;

    while (cNode < this.pq[0].length) {
      if (this.pq[0][cNode] < this.pq[0][cNode + 1] && this.pq[0][cNode + 1])
        cNode++;

      if (this.pq[0][cNode] <= this.pq[0][pNode]) break;

      for (let i = 0; i < this.pq.length; i++) this.exchange(i, cNode, pNode);

      pNode = cNode;
      cNode = pNode * 2;
    }
  }

  exchange(i, x, y) {
    const temp = this.pq[i][x];

    this.pq[i][x] = this.pq[i][y];
    this.pq[i][y] = temp;
  }
}

function PQETest() {
  const pqe = new PQE(3);
  pqe.push(21, "Eric", "Paint");
  pqe.push(20, "Becky", "Paint");
  pqe.push(23, "Jack", "SkateBoard");
  pqe.push(25, "Amy", "Code");
  pqe.push(18, "John", "Photography");

  console.log(pqe.pop());
  console.log(pqe.pop());
  console.log(pqe.pop());
  console.log(pqe.pop());
  console.log(pqe.pop());
}

// PQETest();

module.exports = PQE;
