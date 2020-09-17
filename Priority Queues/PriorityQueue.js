const { knuthShuffle } = require("./../Elementary Sort/KnuthShuffle");

class PQ {
  constructor() {
    this.pq = [null];
  }

  swim(n) {
    let pNode = Math.floor(n / 2);
    let cNode = n;

    while (this.pq[pNode] < this.pq[cNode] && pNode > 0) {
      this.exchange(pNode, cNode);

      cNode = pNode;
      pNode = Math.floor(cNode / 2);
    }
  }

  sink(n) {
    if (n === this.pq.length - 1) return;

    let cNode = 2 * n;
    let pNode = n;

    while (cNode < this.pq.length) {
      if (this.pq[cNode] < this.pq[cNode + 1] && this.pq[cNode + 1]) cNode++;

      if (this.pq[cNode] <= this.pq[pNode]) break;

      this.exchange(cNode, pNode);

      pNode = cNode;
      cNode = pNode * 2;
    }
  }

  /*
  because of the way we implemented the insert method:
  the latest inserted item is always at the end of the array.
  No skipping.
  Therefore, binary heap grows from the left to the right side.
  */
  insert(value) {
    this.pq.push(value);
    this.swim(this.pq.length - 1);
  }

  insertMultiple(arr) {
    arr.forEach((value) => this.insert(value));
  }

  pop() {
    if (this.pq.length > 1) {
      const r = this.pq[1];

      this.exchange(1, this.pq.length - 1);
      this.pq.pop();
      this.sink(1);

      return r;
    }
  }

  exchange(i, j) {
    const temp = this.pq[i];

    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }
}

/*
runtime cost: O(n*logn)
*/
function heapSort(arr) {
  const pq = new PQ();
  const r = [];

  pq.insertMultiple(arr);
  while (pq.pq.length > 1) {
    r.push(pq.pop()); // sortdown
  }

  return r;
}

/*
test for the heap sort, if heap sort works;
binary heap works.
*/
function test() {
  let arr = [];

  for (let i = 0; i < 1000000; i++) arr.push(i);
  arr = knuthShuffle(arr);

  console.log(heapSort(arr));
}

// test();

module.exports = PQ;
