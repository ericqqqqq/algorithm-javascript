class QuickSort {
  constructor(arr) {
    this.arr = arr;
    this.perform = 0;
  }

  partition(lo, hi) {
    const arr = this.arr;
    let i = lo + 1,
      j = hi;
    while (i <= j) {
      while (arr[lo] >= arr[i]) i++;
      while (arr[lo] < arr[j]) j--;
      if (i < j) this.exchange(i, j);
    }
    this.exchange(j, lo);

    return j;
  }

  exchange(i, j) {
    const temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }

  knuthShuffle(lo, hi) {
    for (let i = lo; i <= hi; i++) {
      const r = Math.floor(lo + Math.random() * (i - lo));
      this.exchange(i, r);
    }
  }

  sort(lo, hi) {
    this.perform++;

    if (lo >= hi) return;
    this.knuthShuffle(lo, hi);
    const i = this.partition(lo, hi);
    this.sort(lo, i - 1);
    this.sort(i + 1, hi);
  }

  run() {
    const lo = 0;
    const hi = this.arr.length - 1;

    this.sort(lo, hi);
  }

  select(target) {
    let lo = 0;
    let hi = this.arr.length - 1;

    this.knuthShuffle(lo, hi);

    while (lo < hi) {
      const i = this.partition(lo, hi);

      if (target > i) lo = i + 1;
      else if (target < i) hi = i - 1;
      else return this.arr[i];
    }

    return -1;
  }
}

function testQuickSort() {
  function generateInverseArray(sz) {
    const result = [];
    for (let i = 0; i < sz; i++) result.push(sz - i);

    return result;
  }
  const worstCaseArray = generateInverseArray(1000000);
  const quicksort = new QuickSort(worstCaseArray);
  quicksort.run();
  console.log(`${quicksort.perform} counts`);
}

function testQuickSelection() {
  const arr = [];
  for (let i = 0; i < 10000; i++) arr.push(10000 - i);
  const quicksort = new QuickSort(arr);
  console.log(quicksort.select(999));
}

// testQuickSelection();
module.exports = QuickSort;
