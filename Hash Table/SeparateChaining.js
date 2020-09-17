const hash = require("./HashFunction");
const { generateRandomArrayWithDuplicates } = require("./../input");

function Node(key, value, next = null) {
  this.key = key;
  this.value = value;
  this.next = next;
}

class SeparateChainingHashTable {
  constructor(size) {
    this.m = Math.round(size / 5);
    this.table = [];
  }

  insert(key, value) {
    const i = hash(key, this.m);
    const chain = this.table[i];

    if (chain) {
      for (let node = chain; node !== null; node = node.next) {
        if (node.key === key) {
          node.value = value;
          return;
        }
      }

      this.table[i] = new Node(key, value, this.table[i]);
      return;
    }

    this.table[i] = new Node(key, value);
  }

  search(key) {
    const i = hash(key, this.m);
    const chain = this.table[i];

    if (chain) {
      for (let node = chain; node !== null; node = node.next) {
        if (node.key === key) return node.value;
      }
      return;
    }
    return;
  }
}

function hashTest() {
  const size = 1000000;
  const input = generateRandomArrayWithDuplicates(size);
  const hashTable = new SeparateChainingHashTable(size);

  let startInsert = new Date();
  input.forEach((i) => hashTable.insert(i.toString(), i));
  let endInsert = new Date();
  console.log(`inserting ${size} cost time: ${endInsert - startInsert}`);
  console.log("\n");

  const target = input[Math.floor(Math.random() * size)].toString();
  const startSearch = new Date();
  const value = hashTable.search(target);
  const endSearch = new Date();
  console.log(
    `found the value of ${target} is ${value}, cost time: ${
      endSearch - startSearch
    }`
  );
  console.log("\n");

  startInsert = new Date();
  hashTable.insert(target, "changed");
  endInsert = new Date();
  console.log(
    `replacing the value of ${target} cost time: ${endInsert - startInsert}`
  );

  if (hashTable.search(target) === "changed")
    console.log("sucessfully changed");
  console.log("\n");

  console.log("randomly check the length of a chain...");
  const randomIndex = Math.floor(Math.random() * hashTable.m);
  const randomChain = hashTable.table[randomIndex];

  let count = 0;
  for (let node = randomChain; node !== null; node = node.next) {
    count++;
  }
  console.log(`The length of the sample chain is ${count}`);
}
// hashTest();
module.exports = SeparateChainingHashTable;
