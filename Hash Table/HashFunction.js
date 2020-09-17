// A hashCode Horner Method Implementation.
// We can use https://nodejs.org/api/crypto.html (crypto)
function stringHashCode(value) {
  if (typeof value !== "string") {
    console.error("expect type: string");
    return;
  }

  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value[i].charCodeAt(0) + 31 * hash;
  }

  return hash;
}

function stringHashFunction(value, arrSize) {
  return stringHashCode(value) % arrSize;
}

module.exports = stringHashFunction;
