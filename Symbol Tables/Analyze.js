const RBBST = require("./RedBlackBST");
const BST = require("./BinarySearchTree");
const { generateSortedArray } = require("./../Elementary Sort/knuthShuffle");

// When design the client API,
// We never know user input order.
// Comparing to BST, RBBST guarantee the performance.
// For BST, The worst case happens when user put the items in order.
// For RBBST, the runtime will not exceed 2*logN. The worst case is not sorted input.

const array = generateSortedArray(1000000);
const bst = new BST();
const rbbst = new RBBST();

array.forEach((v) => rbbst.put(v, v));
console.log("complete the rbbst");
array.forEach((v) => bst.put(v, v));
// bst will exceed the stack size.
