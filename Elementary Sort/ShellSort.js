// very similar to insertion sort.
// we will use 3x+1 as sequence here.
const { generateRandomArrayWithDuplicates } = require("./../input");

function excPos(arr, x, y) {
  const tp = arr[x];
  arr[x] = arr[y];
  arr[y] = tp;

  return arr;
}

function shellSort(arr) {
  const len = arr.length;

  let co = Math.floor((len - 1) / 3);
  let result = arr;

  for (let i = co; i > -1; i--) {
    const h = i * 3 + 1;

    for (let j = h; j < len; j++) {
      for (let k = j; k - h > -1; k--) {
        if (result[k - h] > result[k]) result = excPos(result, k - h, k);
        else break;
      }
    }
  }

  return result;
}

function ifSorted(arr) {
  let result = true;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) result = false;
  }

  return result;
}

function test() {
  const input = generateRandomArrayWithDuplicates(100);
  console.log("array sorted:", ifSorted(input));
  const sortedArr = shellSort(input);
  console.log("array sorted:", ifSorted(sortedArr));
}

module.exports = shellSort;
