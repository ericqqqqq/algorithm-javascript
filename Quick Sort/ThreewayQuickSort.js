class ThreeWayQuicksort {
  constructor(arr) {
    this.arr = arr;
  }

  knuthShuffle(lo, hi) {
    for (let i = lo; i <= hi; i++) {
      const r = Math.floor(lo + Math.random() * (i - lo));
      this.exchange(i, r);
    }
  }

  partition(lo, hi) {
    let i = lo + 1;
    let lt = lo; // paritioning item arr[lt]
    let gt = hi;

    while (i <= gt) {
      if (this.arr[i] < this.arr[lt]) {
        this.exchange(i, lt);
        i++;
        lt++;
      } else if (this.arr[i] > this.arr[lt]) {
        this.exchange(i, gt);
        gt--;
      } else i++;
    }
    // arr[gt] > arr[lt]; while arr[lt] is the paritioning item
    return { gt, lt };
  }

  exchange(i, j) {
    const temp = this.arr[i];

    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }

  sort(lo, hi) {
    if (lo >= hi) return;

    this.knuthShuffle(lo, hi);
    const { gt, lt } = this.partition(lo, hi);

    this.sort(lo, lt - 1);
    this.sort(gt + 1, hi);
    // this line is important:
    // 1. gt is either 1) enclosed between i and lt, 2) or equal to lt.
    // 2. therefore, at the end, gt and lt both points to paritioning item.
    // 3. when partition for the next two sub arrays. the range should be [lo, lt - 1]
    // and [gt + 1, hi]
  }

  run() {
    this.sort(0, this.arr.length - 1);
  }
}

// const threeWayQuicksort = new ThreeWayQuicksort([6, 5, 4, 3, 2, 1]);
// threeWayQuicksort.run();
// console.log(threeWayQuicksort.arr);
module.exports = ThreeWayQuicksort;
