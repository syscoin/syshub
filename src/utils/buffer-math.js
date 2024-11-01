// Swap endianness for a new array
export function swapEndianness(array) {
  return array.slice().reverse();
}

// Swap endianness in-place
export function swapEndiannessInPlace(array) {
  for (let i = 0, j = array.length - 1; i < j; i++, j--) {
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
