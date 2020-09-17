const BST = require("./BinarySearchTree");
const {
  knuthShuffle,
  generateSortedArray,
} = require("./../Elementary Sort/knuthShuffle");

function NODE(key, value) {
  this.key = key;
  this.value = value;
}

class RBBST extends BST {
  putInNode(node, key, value) {
    if (node === undefined) {
      const n = new NODE(key, value);
      n.count = 1;
      n.color = "RED";

      return n;
    }

    if (key > node.key) node.right = this.putInNode(node.right, key, value);
    else if (key < node.key) node.left = this.putInNode(node.left, key, value);
    else node.value = value;

    if (this.isRED(node.right) && !this.isRED(node.left))
      node = this.leftRotate(node);
    if (this.isRED(node.left) === "RED" && this.isRED(node.left.left))
      node = this.rightRotate(node);
    if (this.isRED(node.left) && this.isRED(node.right))
      node = this.flipColor(node);

    node.count = this.size(node.right) + this.size(node.left) + 1;

    return node;
  }

  isRED(node) {
    if (node) {
      return node.color === "RED";
    }

    return false;
  }

  flipColor(node) {
    node.color = "RED";
    node.right.color = "BLACK";
    node.left.color = "BLACK";
    // no need to update the count...

    return node;
  }

  rightRotate(node) {
    const h = node;
    const x = h.left;
    h.left = x.right;
    x.color = h.color;
    h.color = "RED";
    x.right = h;

    h.count = this.size(h.left) + this.size(h.right) + 1;
    x.count = this.size(x.left) + this.size(x.right) + 1;

    return x;
  }

  leftRotate(node) {
    const h = node; // h is parent right now.
    const x = h.right; // x will be h's parent.
    h.right = x.left;
    x.color = h.color;
    h.color = "RED";
    x.left = h;

    // update the counts after rotation.
    h.count = this.size(h.left) + this.size(h.right) + 1; // update the child first
    x.count = this.size(x.left) + this.size(x.right) + 1; // then update the parent.

    return x;
  }

  // override the delete...
  // do not use Hibbard deletion, as it creates very unbalanced tree.
  delete() {}
  deleteWithNode() {}
  deleteMinWithNode() {}
  deleteMinWithNodeR() {}
}

function RBBSTTest() {
  const sz = 1000000;
  const rbbst = new RBBST();
  const array = knuthShuffle(generateSortedArray(sz));

  /*------------------------------------------
    Put Test
    --------------------------------------------*/
  console.log(`putting ${sz} items in rbbst...`);
  const startPut = new Date().getTime();
  array.forEach((v) => {
    rbbst.put(v, v);
  });
  const endPut = new Date().getTime();
  console.log("put method took time: ", endPut - startPut);
  console.log("the root count is ", rbbst.root.count);

  console.log("\n");
  /*------------------------------------------
    Get Test
    --------------------------------------------*/
  const target = 10000;
  console.log(`getting the value of ${target}`);
  const startGet = new Date().getTime();
  console.log(`the value of ${target} is ${rbbst.get(target)}`);
  const endGet = new Date().getTime();
  console.log("get method took time: ", endGet - startGet);

  console.log("\n");
  /*------------------------------------------
    Floor Test
    --------------------------------------------*/
  const floorTarget = 10000.5;
  console.log(`floor of the ${floorTarget}`);
  const startFloor = new Date().getTime();
  console.log(`the floor of ${floorTarget} is ${rbbst.floor(floorTarget).key}`);
  const endFloor = new Date().getTime();
  console.log("floor method took time: ", endFloor - startFloor);

  console.log("\n");
  /*------------------------------------------
    Ceiling Test
    --------------------------------------------*/
  const ceilTarget = 10000.5;
  console.log(`ceil of the ${ceilTarget}`);
  const startCeil = new Date().getTime();
  console.log(`the ceil of ${ceilTarget} is ${rbbst.ceiling(ceilTarget).key}`);
  const endCeil = new Date().getTime();
  console.log("ceil method took time: ", endCeil - startCeil);

  console.log("\n");
  /*------------------------------------------
    Min
    --------------------------------------------*/
  const startMin = new Date().getTime();
  console.log(
    `the min and the max of are ${rbbst.min().value}, ${rbbst.max().value}`
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
    `There are ${rbbst.rank(randomTarget)} are smaller than ${randomTarget}`
  );
  const endRank = new Date().getTime();
  console.log("rank method took time: ", endRank - startRank);

  console.log("\n");
  /*------------------------------------------
    forEach
    --------------------------------------------*/
  const startIterate = new Date().getTime();
  rbbst.foreach((i) => {});
  const endIterate = new Date().getTime();

  console.log(`iterate ${sz} items finished: `, endIterate - startIterate);

  console.log("\n");
}

// RBBSTTest();
module.exports = RBBST;
