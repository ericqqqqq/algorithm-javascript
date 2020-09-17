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

function sort(arr, l, h) {
  let result = [];
  const m = Math.floor((l + h) / 2);

  if (l >= h) return arr;

  result = sort(arr, l, m);
  result = sort(result, m + 1, h);

  return merge(result, l, m, h);
}

function mergeSort(arr) {
  return sort(arr, 0, arr.length - 1);
}

function test() {
  const input = generateRandomArrayWithDuplicates(1000000);
  console.log(mergeSort(input));
}

module.exports = mergeSort;
