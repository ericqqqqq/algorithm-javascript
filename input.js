function generateRandomArrayWithDuplicates(sz) {
  const result = [];
  for (let i = 0; i < sz; i++) result.push(Math.floor(Math.random() * sz));

  return result;
}

function generateSortedArray(sz) {
  const arr = [];
  for (let i = 0; i < sz; i++) arr.push(i);

  return arr;
}

module.exports = {
  generateRandomArrayWithDuplicates,
  generateSortedArray,
};
