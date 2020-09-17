const BST = require("./../Symbol Tables/RedBlackBST");
class OneD extends BST {
  rangeSearch(p1, p2) {
    let hi = p1 > p2 ? p1 : p2;
    let lo = p1 > p2 ? p2 : p1;

    if (this.get(hi)) {
      return this.rank(hi) - this.rank(lo) + 1;
    }
    return this.rank(hi) - this.rank(lo);
  }
}

module.exports = OneD;
