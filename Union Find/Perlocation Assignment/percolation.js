const UnionFind = require("./../WeightedUnionFindCompression");

class Percolation {
  constructor(n) {
    if (n > 0) {
      this.openedArr = [];
      this.n = n;
      this.maxID = n * n - 1;
      this.maxSize = n * n;
      this.unionFind = new UnionFind(this.maxSize + 2);

      for (let i = 0; i < n; i++) this.unionFind.union(this.maxID + 1, i);
      for (let j = n * (n - 1); j < n * n; j++) {
        this.unionFind.union(this.maxID + 2, j);
      }
    } else {
      throw new Error("the grid number should be larger than 0");
    }
  }

  getRow(id) {
    if (id < this.maxID) return Math.floor((id + 1) / this.n) + 1;
  }

  getColumn(id) {
    if (id >= this.maxID) return;

    const reminder = (id + 1) % this.n;
    if (reminder === 0) {
      return this.n;
    }

    return reminder;
  }

  open(id) {
    if (id < this.maxID && !this.isOpen(id)) {
      this.openedArr.forEach((item) => {
        if (this.isNeighbour(item, id)) {
          this.unionFind.union(item, id);
        }
      });

      this.openedArr.push(id);
    }
  }

  isOpen(id) {
    return this.openedArr.findIndex((item) => item === id) !== -1;
  }

  isNeighbour(a, b) {
    const rowA = this.getRow(a);
    const rowB = this.getRow(b);
    const columnA = this.getColumn(a);
    const columnB = this.getColumn(b);

    if (rowA === rowB && (columnA - 1 === columnB || columnB - 1 === columnA))
      return true;
    if (columnA === columnB && (rowA - 1 === rowB || rowB - 1 === rowA))
      return true;

    return false;
  }

  isPercolated() {
    return this.unionFind.connected(this.maxID, this.maxID + 1);
  }

  numberOfOpenSites() {
    return this.openedArr.length;
  }
}

module.exports = Percolation;
