const insertionSort = require("./../Elementary Sort/InsertionSort");
const mergeSort = require("./MergeSort");
const { generateRandomArrayWithDuplicates } = require("./../input");

function countTime(array, testor, trials) {
  const start = new Date().getTime();

  for (let i = 0; i < trials; i++) {
    testor(array);
  }
  const end = new Date().getTime();

  return end - start;
}

function main(mode) {
  const trials = 1;
  if (mode === "non-sorted") {
    const input1 = generateRandomArrayWithDuplicates(100000);
    const input2 = [];
    input1.forEach((item) => input2.push(item));

    console.log("start comparing...");
    if (input1.length === input2.length) {
      console.log("merge", countTime(input1, mergeSort, trials));
      console.log("insertion", countTime(input2, insertionSort, trials));
    }
  } else {
    const input = generateRandomArrayWithDuplicates(100000);
    const sortedInput = mergeSort(input);

    console.log("start comparing...");

    console.log("merge", countTime(sortedInput, mergeSort, trials));
    console.log("insertion", countTime(sortedInput, insertionSort, trials));
  }
}

main("sorted");
main("non-sorted");
