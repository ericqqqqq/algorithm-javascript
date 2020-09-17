class WeightedUnionFindCompression {
  constructor(N) {
    this.id = [];
    this.sz = [];
    for (let i = 0; i < N; i++) {
      this.id.push(i);
      this.sz.push(1);
    }
  }

  root(n) {
    // while the node id is not equal to its parent id(not a root), traverse to parent node.
    while (n !== this.id[n]) {
      this.id[n] == this.id[this.id[n]];
      n = this.id[n];
    }
    // when the node id is the root id, it breaks the while loop.
    return n;
  }

  union(p, q) {
    const proot = this.root(p);
    const qroot = this.root(q);

    if (proot === qroot) return;

    if (this.sz[p] < this.sz[q]) {
      this.id[proot] = qroot;
      this.sz[q] += this.sz[p];

      return;
    }

    this.id[qroot] = proot;
    this.sz[p] += this.sz[q];
  }
  connected(p, q) {
    return this.root(p) === this.root(q);
  }
}

module.exports = WeightedUnionFindCompression;

// const myUnionFind = new WeightedUnionFindCompression(10);

// myUnionFind.union(0, 1);
// myUnionFind.union(2, 3);
// myUnionFind.union(4, 5);
// myUnionFind.union(1, 2);
// console.log(myUnionFind);
// console.log(myUnionFind.connected(1, 2));
// console.log(myUnionFind.connected(2, 4));
