const hash = require("./HashFunction");
const { generateRandomArrayWithDuplicates } = require("./../input");

class LinearProbingHashTable {
  constructor(size) {
    this.keys = [];
    this.values = [];
    this.m = size * 2;
  }

  insert(key, value) {
    let i;
    for (
      i = hash(key, this.m);
      this.keys[i] !== undefined;
      i = (i + 1) % this.m
    ) {
      if (this.keys[i] === key) {
        this.values[i] = value;
        return;
      }
    }

    this.keys[i] = key;
    this.values[i] = value;
  }

  search(key) {
    for (
      let i = hash(key, this.m);
      this.keys[i] !== undefined;
      i = (i + 1) % this.m
    ) {
      if (this.keys[i] === key) return this.values[i];
    }
    return;
  }
}

function hashTest() {
  const size = 1000000;
  const input = generateRandomArrayWithDuplicates(size);
  const hashTable = new LinearProbingHashTable(size);

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
}
// hashTest();
module.exports = LinearProbingHashTable;
