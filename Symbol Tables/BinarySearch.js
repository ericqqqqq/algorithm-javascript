function BinarySearch(array, target) {
  const length = array.length;
  let s = 0;
  let e = length - 1;
  let m = Math.floor(e / 2);

  while (s <= e) {
    if (array[m] === target) {
      return m;
    } else if (target > array[m]) {
      s = m + 1;
    } else {
      e = m - 1;
    }
    m = Math.floor((e + s) / 2);
  }
}

module.exports = BinarySearch;
