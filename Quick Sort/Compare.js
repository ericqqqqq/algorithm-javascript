const ThreeWayQuickSort = require("./ThreewayQuickSort.js");
const QuickSort = require("./QuickSort.js");
const {
  generateRandomArrayWithDuplicates,
  generateSortedArray,
} = require("./../input");

function duplicatedArray(sz) {
  const r = [];
  for (let i = 0; i < sz; i++) r.push(0);

  return r;
}

function sorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] < arr[i]) return false;
  }
  return true;
}

let array = duplicatedArray(1000);
// console.log(array);

let threeWayQuickSort = new ThreeWayQuickSort(array);
let quickSort = new QuickSort(array);

const start1 = new Date().getTime();
threeWayQuickSort.run();
const end1 = new Date().getTime();
console.log(
  "size: 1000 three way, duplicates:",
  end1 - start1,
  "ms",
  "| sorted:",
  sorted(threeWayQuickSort.arr)
);
// console.log(threeWayQuickSort.arr);

const start2 = new Date().getTime();
quickSort.run();
const end2 = new Date().getTime();
console.log(
  "size: 1000 normal, duplicates:",
  end2 - start2,
  "ms",
  "| sorted:",
  sorted(quickSort.arr)
);
//console.log(quickSort.arr);

array = generateRandomArrayWithDuplicates(1000000);

threeWayQuickSort = new ThreeWayQuickSort(array);
quickSort = new QuickSort(array);

const start3 = new Date().getTime();
threeWayQuickSort.run();
const end3 = new Date().getTime();
console.log(
  "size: 1000000 three way, random:",
  end3 - start3,
  "ms",
  "| sorted:",
  sorted(threeWayQuickSort.arr)
);

const start4 = new Date().getTime();
quickSort.run();
const end4 = new Date().getTime();
console.log(
  "size: 1000000 normal, random:",
  end4 - start4,
  "ms",
  "| sorted:",
  sorted(quickSort.arr)
);
//console.log(quickSort.arr);

array = generateSortedArray(1000000);
// console.log(array);

threeWayQuickSort = new ThreeWayQuickSort(array);
quickSort = new QuickSort(array);

const start5 = new Date().getTime();
threeWayQuickSort.run();
const end5 = new Date().getTime();
console.log(
  "size: 1000000 three way, sorted:",
  end5 - start5,
  "ms",
  "| sorted:",
  sorted(threeWayQuickSort.arr)
);
// console.log(threeWayQuickSort.arr);

const start6 = new Date().getTime();
quickSort.run();
const end6 = new Date().getTime();
console.log(
  "size: 1000000 normal, sorted:",
  end6 - start6,
  "ms",
  "| sorted:",
  sorted(quickSort.arr)
);
//console.log(quickSort.arr);
