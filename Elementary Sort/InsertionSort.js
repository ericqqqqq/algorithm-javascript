const { generateRandomArrayWithDuplicates } = require("./../input");

function excPos(arr, x, y) {
  const tp = arr[x];
  arr[x] = arr[y];
  arr[y] = tp;

  return arr;
}

function insertionSort(arr) {
  const len = arr.length;
  let result = arr;

  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (result[j - 1] > result[j]) result = excPos(result, j - 1, j);
      else break;
    }
  }

  return result;
}

function test() {
  const input = generateRandomArrayWithDuplicates(100);
  console.log(input);
  const sortedArr = insertionSort(input);
  console.log(sortedArr);
}

module.exports = insertionSort;
