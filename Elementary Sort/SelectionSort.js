// no matter if the input is already sorted or insorted,
// the time complexity takes quadratic time ~ N^2/2
// the exchange takes linear time ~ N

const { generateRandomArrayWithDuplicates } = require("./../input");

function excPos(arr, x, y) {
  const tp = arr[x];
  arr[x] = arr[y];
  arr[y] = tp;

  return arr;
}

function selectionSort(arr) {
  const len = arr.length;
  let result = arr;

  for (let i = 0; i < len; i++) {
    let min = result[i];
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (result[j] < min) {
        min = result[j];
        minIndex = j;
      }
    }
    result = excPos(result, i, minIndex);
  }

  return result;
}

function test() {
  const input = generateRandomArrayWithDuplicates(100);

  console.log(input);
  console.log(selectionSort(input));
}

module.exports = selectionSort;
