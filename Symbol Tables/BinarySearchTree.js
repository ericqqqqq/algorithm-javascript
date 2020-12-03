const {
  knuthShuffle,
  generateSortedArray,
} = require("./../Elementary Sort/knuthShuffle");
// new item sinks in BST

function NODE(key, value) {
  this.key = key;
  this.value = value;
}

class BST {
  put(key, value) {
    this.root = this.putInNode(this.root, key, value);
  }

  putInNode(node, key, value) {
    if (node === undefined) {
      const node = new NODE(key, value);
      node.count = 1;

      return node;
    }

    if (key > node.key) node.right = this.putInNode(node.right, key, value);
    else if (key < node.key) node.left = this.putInNode(node.left, key, value);
    else node.value = value;

    node.count = this.size(node.left) + this.size(node.right) + 1;

    return node;
    // O(logN)
  }

  get(key) {
    let node = this.root;

    while (node !== undefined) {
      if (key > node.key) {
        node = node.right;
      } else if (key < node.key) {
        node = node.left;
      } else return node.value;
    }

    return undefined;
    // O(logN)
  }

  min(node = this.root) {
    let cn = node;
    let r;

    while (cn !== undefined) {
      r = cn;
      cn = cn.left;
    }

    return r;
  }

  max(node = this.root) {
    let cn = node;
    let r;

    while (cn !== undefined) {
      r = cn;
      cn = cn.right;
    }

    return r;
  }

  floor(key) {
    return this.floorWithNode(key, this.root);
  }

  floorWithNode(key, node) {
    const ck = node;

    if (ck === undefined) return undefined;
    if (ck.key === key) return ck;
    if (ck.key > key) return this.floorWithNode(key, ck.left);

    const r = this.floorWithNode(key, ck.right);
    if (r) return r;
    return ck;
  }

  ceiling(key) {
    return this.ceilingWithNode(key, this.root);
  }

  ceilingWithNode(key, node) {
    const ck = node;

    if (ck === undefined) return undefined;
    if (ck.key === key) return ck;
    if (ck.key < key) return this.ceilingWithNode(key, ck.right);

    const r = this.ceilingWithNode(key, ck.left);
    if (r) return r;
    return ck;
  }

  rank(key) {
    return this.rankWithNode(key, this.root);
  }

  rankWithNode(key, node) {
    // how many keys < key
    // if key > ck, + all left subtree + itself; go right
    // if key < ck, go left
    // if key = ck, + all left subtree; go right
    if (node === undefined) return 0;

    // console.log(node.key);
    if (key < node.key) {
      return this.rankWithNode(key, node.left);
    }

    if (key > node.key) {
      return this.size(node.left) + 1 + this.rankWithNode(key, node.right);
    }

    return this.size(node.left);
  }

  size(node) {
    if (node === undefined) return 0;

    return node.count;
  }

  delete(key) {
    this.deleteWithNode(key, this.root);
  }

  deleteWithNode(key, node) {
    if (node === undefined) return undefined;
    // search for the node
    if (key > node.key) {
      node.right = this.deleteWithNode(key, node.right);
    } else if (key < node.key) {
      node.left = this.deleteWithNode(key, node.left);
    } else {
      // found the node
      if (node.left === undefined) return node.right;
      if (node.right === undefined) return node.left;

      const updatedSubTree = this.deleteMinWithNode(node.right);
      const minFromSubTree = this.min(node.right);

      node.key = minFromSubTree.key;
      node.value = minFromSubTree.value;
      node.right = updatedSubTree;
    }

    node.count = this.size(node.right) + this.size(node.left) + 1;

    return node;
    // case disucssion
  }

  deleteMinWithNodeR(node) {
    if (node.left === undefined) return node.right; // this node is the min.

    node.left = this.deleteMinWithNodeR(node.left);
    node.count = this.size(node.right) + this.size(node.left) + 1;

    return node;
  }

  deleteMinWithNode(node) {
    if (!node) return;
    this.root = this.deleteMinWithNodeR(node);

    return this.root;
  }

  foreach(cb) {
    let q = [];

    q = this.preOrderTraversal(this.root, q);
    q.forEach((i) => cb(i));

    return q;
    //O(N)
  }

  inOrderTraversal(node, queue) {
    if (node === undefined) return queue;

    let q = queue;

    q = this.inOrderTraversal(node.left, q);
    q.push(node);
    q = this.inOrderTraversal(node.right, q);

    return q;
  }

  preOrderTraversal(node, queue) {
    if (node === undefined) return queue;

    let q = queue;

    q.push(node);
    q = this.preOrderTraversal(node.left, q);
    q = this.preOrderTraversal(node.right, q);

    return q;
  }

  postOrderTraversal(node, queue) {
    if (node === undefined) return queue;

    let q = queue;

    q = this.preOrderTraversal(node.left, q);
    q = this.preOrderTraversal(node.right, q);
    q.push(node);

    return q;
  }
}

function BSTTest() {
  const sz = 1000000;
  const bst = new BST();
  const array = knuthShuffle(generateSortedArray(sz));

  /*------------------------------------------
  Put Test
  --------------------------------------------*/
  console.log(`putting ${sz} items in BST...`);
  const startPut = new Date().getTime();
  array.forEach((v) => {
    // inserting N items in BST, N*log(N)
    // inserting each item in BST, log(N)
    // therefore, BST is preferred in dynamic fashions.
    // Searching an item in a non-dynamic array, BST doesn't have
    // advantage over (sorting + Binary Search)
    bst.put(v, v);
  });
  const endPut = new Date().getTime();
  console.log("put method took time: ", endPut - startPut);
  console.log("the root count is ", bst.root.count);

  console.log("\n");
  /*------------------------------------------
  Get Test
  --------------------------------------------*/
  const target = 10000;
  console.log(`getting the value of ${target}`);
  const startGet = new Date().getTime();
  console.log(`the value of ${target} is ${bst.get(target)}`);
  const endGet = new Date().getTime();
  console.log("get method took time: ", endGet - startGet);

  console.log("\n");
  /*------------------------------------------
  Floor Test
  --------------------------------------------*/
  const floorTarget = 10000.5;
  console.log(`floor of the ${floorTarget}`);
  const startFloor = new Date().getTime();
  console.log(`the floor of ${floorTarget} is ${bst.floor(floorTarget).key}`);
  const endFloor = new Date().getTime();
  console.log("floor method took time: ", endFloor - startFloor);

  console.log("\n");
  /*------------------------------------------
  Ceiling Test
  --------------------------------------------*/
  const ceilTarget = 10000.5;
  console.log(`ceil of the ${ceilTarget}`);
  const startCeil = new Date().getTime();
  console.log(`the ceil of ${ceilTarget} is ${bst.ceiling(ceilTarget).key}`);
  const endCeil = new Date().getTime();
  console.log("ceil method took time: ", endCeil - startCeil);

  console.log("\n");
  /*------------------------------------------
  Min
  --------------------------------------------*/
  const startMin = new Date().getTime();
  console.log(
    `the min and the max of are ${bst.min().value}, ${bst.max().value}`
  );
  const endMin = new Date().getTime();
  console.log("min method took time: ", endMin - startMin);

  console.log("\n");
  /*------------------------------------------
  Rank
  --------------------------------------------*/
  const startRank = new Date().getTime();
  const randomTarget = Math.floor(Math.random() * array.length);
  console.log(
    `There are ${bst.rank(randomTarget)} are smaller than ${randomTarget}`
  );
  const endRank = new Date().getTime();
  console.log("rank method took time: ", endRank - startRank);

  console.log("\n");
  /*------------------------------------------
  forEach
  --------------------------------------------*/
  const startIterate = new Date().getTime();
  bst.foreach((i) => {
    console.log(i.value);
  });
  const endIterate = new Date().getTime();

  console.log(`iterate ${sz} items finished: `, endIterate - startIterate);

  console.log("\n");

  /*------------------------------------------
  delete randomTarget
  ------------------------------------------*/
  console.log(`the value of the randomTarget is ${bst.get(randomTarget)}`);
  console.log(`deleting the ${randomTarget}...`);
  const startDelete = new Date().getTime();
  bst.delete(randomTarget);
  const endDelete = new Date().getTime();

  console.log(`deleting item finished in ${endDelete - startDelete}`);
  console.log(`the value of the randomTarget is ${bst.get(randomTarget)} now`);
  if (!bst.get(randomTarget)) console.log("deletion succeed");
  else {
    console.log("deletion failed");
  }
}

BSTTest();
module.exports = BST;
