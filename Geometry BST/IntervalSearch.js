function NODE(lo, hi) {
  this.lo = lo;
  this.hi = hi;
}

class IntervalSearch {
  put(lo, hi) {
    this.root = this.putInNode(this.root, lo, hi);
  }

  putInNode(node, lo, hi) {
    if (node === undefined) {
      const node = new NODE(lo, hi);
      node.highest = hi;
      return node;
    }

    if (lo > node.lo) node.right = this.putInNode(node.right, lo, hi);
    else node.left = this.putInNode(node.left, lo, hi);

    if (node.left && node.left.highest > node.highest)
      node.highest = node.left.highest;

    if (node.right && node.right.highest > node.highest)
      node.highest = node.right.highest;

    return node;
  }

  getIntersection(lo, hi) {}

  isIntersection(l1, h1, l2, h2) {
    if (l1 >= h2 || l2 >= h1) return false;
    return false;
  }
}

// if intersect with the current one, return it.
// if the left subtree is null, go right.
// if the left subtrees' mostright value is larger than the lo, go left.
// otherwise, go right.
// when go right, if your hi is less than current left, return null.
