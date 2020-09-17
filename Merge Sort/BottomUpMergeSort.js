const { generateRandomArrayWithDuplicates } = require("./../input");

function merge(arr, l, m, h) {
  let aux = [];

  let j = l;
  let k = m + 1;

  for (let i = l; i <= h; i++) aux[i] = arr[i];

  for (let i = l; i < h + 1; i++) {
    if (j > m) arr[i] = aux[k++];
    else if (k > h) arr[i] = aux[j++];
    else if (aux[j] < aux[k]) arr[i] = aux[j++];
    else arr[i] = aux[k++];
  }
  return arr;
}

function mergeSort(arr) {
  const length = arr.length;
  let n = 1;
  let result = arr;

  while (n < length) {
    n = n * 2;
    for (let i = 0; i < length; i = i + n) {
      const l = i;
      let h = i + n - 1;

      result = merge(
        result,
        l,
        Math.floor((l + h) / 2),
        Math.min(h, length - 1)
      );
    }
  }
  return result;
}

function test() {
  const input = generateRandomArrayWithDuplicates(100000);
  console.log(input);
  console.log(mergeSort(input));
}

module.exports = mergeSort;
