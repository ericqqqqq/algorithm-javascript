const LinkedList = require("./../Stack And Queue/LinkedList/linkedList.js");
const BinarySearch = require("./BinarySearch.js");

class UnsortedTable {
  constructor() {
    this.table = new LinkedList();
  }

  insert(key, value) {
    let isExist;

    this.table.forEach((item) => {
      if (key == item[0]) {
        item[1] = value;
        isExist = true;
      }
    });

    if (!isExist) this.table.addFirst([key, value]);
    // O(N)
  }

  search(key) {
    let r;
    this.table.forEach((item) => {
      if (key == item[0]) r = item[1];
    });

    return r; // O(N)
  }

  get() {
    return this.table.get();
  }
}

class SortedTable {
  constructor() {
    this.keys = [];
    this.values = [];
  }

  insert(key, value) {
    const r = this.search(key);

    if (r) {
      const { i } = r;

      this.values[i] = value;
      return;
    }

    let current = 0;
    while (key > this.keys[current]) {
      current++;
    }

    this.keys.splice(current, 0, key);
    this.values.splice(current, 0, value);
  }

  search(key) {
    const index = BinarySearch(this.keys, key);

    if (index !== undefined) {
      return { i: index, v: this.values[index] };
    }
  }
}

function UnsortedTableTest() {
  const ut = new UnsortedTable();

  ut.insert("Eric", 1);
  ut.insert("Jack", 2);
  ut.insert("Henry", 3);
  ut.insert("Frank", 1);
  ut.insert("Eric", 4);
}

function SortedTableTest() {
  const st = new SortedTable();

  st.insert("Eric", 1);
  st.insert("Jack", 2);
  st.insert("Henry", 3);
  st.insert("Frank", 1);
  st.insert("Eric", 4);
  st.insert("Henry", 100);
  console.log(st.search("Henry"));
}
