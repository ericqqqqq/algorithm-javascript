const { generateSortedArray } = require("./../input");

function excPos(arr, x, y) {
  const tp = arr[x];
  arr[x] = arr[y];
  arr[y] = tp;

  return arr;
}

function knuthShuffle(arr) {
  const len = arr.length;
  let result = arr;

  for (let i = 0; i < len; i++) {
    const r = Math.floor(Math.random() * (i + 1));
    result = excPos(result, i, r);
  }

  return result;
}

function myShuffle(arr) {
  // uniformly shuffle the array.
  const input = arr;
  const result = [];
  while (arr.length !== 0) {
    const r = Math.floor(Math.random() * arr.length);

    result.push(input[r]);
    input.splice(r, 1);
  }

  return result;
}

function sortShuffle(arr) {
  function shellSort(arr) {
    const len = arr.length;

    let co = Math.floor((len - 1) / 3);
    let result = arr;

    for (let i = co; i > -1; i--) {
      const h = i * 3 + 1;

      for (let j = h; j < len; j++) {
        for (let k = j; k - h > -1; k--) {
          if (result[k - h][1] > result[k][1])
            result = excPos(result, k - h, k);
          else break;
        }
      }
    }

    return result;
  }

  const myArray = arr.map((item) => [item, Math.random()]);
  const shuffledArray = shellSort(myArray);

  return shuffledArray.map((item) => item[0]);
}

function test() {
  const input = generateSortedArray(53);
  // console.log(knuthShuffle(input));
  // console.log(myShuffle(input));
  console.log(sortShuffle(input));
}

module.exports = { knuthShuffle, generateSortedArray };
