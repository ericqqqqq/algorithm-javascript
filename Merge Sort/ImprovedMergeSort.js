const { generateRandomArrayWithDuplicates } = require("./../input");

class MergeSort {
  constructor(array) {
    this.array = array;
  }

  merge(h, m, l) {
    const aux = [];

    for (let i = l; i <= h; i++) {
      aux.push(this.array[i]);
    }

    const offsetM = m - l;
    const offsetH = h - l;
    let j = 0;
    let k = offsetM + 1;

    for (let i = 0; i < aux.length; i++) {
      if (j > offsetM) this.array[i + l] = aux[k++];
      else if (k > offsetH) this.array[i + l] = aux[j++];
      else if (aux[j] < aux[k]) this.array[i + l] = aux[j++];
      else this.array[i + l] = aux[k++];
    }
  }

  sort(h, l) {
    if (l >= h) return;

    const m = Math.floor((h + l) / 2);

    this.sort(m, l);
    this.sort(h, m + 1);
    this.merge(h, m, l);
  }

  run() {
    const length = this.array.length;
    this.sort(length - 1, 0);
  }

  getArray() {
    return this.array;
  }
}

function test() {
  function timeDuration(cb, exp, trial) {
    const start = new Date().getTime();

    for (let i = 0; i < trial; i++) {
      cb.apply(exp);
    }

    const end = new Date().getTime();
    console.log(`avg time: ${(end - start) / trial}ms`);
  }

  const sz = 1000000;
  const randomArray = generateRandomArrayWithDuplicates(sz);

  const mergesort = new MergeSort(randomArray);
  console.log(mergesort.getArray());
  timeDuration(mergesort.run, mergesort, 10);
}

// test();

module.exports = MergeSort;
