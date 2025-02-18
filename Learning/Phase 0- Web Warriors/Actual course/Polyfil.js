const numbers = [1, 2, 3, 4, 5];

Array.prototype.polyfillMap = function (mapLogicFn) {
  let output = [];
  // can also be called as the original array
  let arr = this;

  for (let i = 0; i < arr.length; i++) {
    output.push(mapLogicFn(arr[i], i));
  }
  return output;
};

////////////////////////////////////////////

Array.prototype.polyfillFilter = function (filterLogicFn) {
  let output = [];

  array = this;
  for (let i = 0; i < arr.length; i++) {
    if (!filterLogicFn(arr[i], i)) {
      output.push(arr[i]);
    }
  }
  return output;
};

const numbers1 = [1, 2, 3, 4, 5, 6, 7];

Array.prototype.polyfillReduce = function (reduceFn, initialValue) {
  let output = initialValue,
    arr = this;

  for (let i = 0; i < arr.length; i++) {
    output = reduceFn(output, arr[i], i);
  }
  return output;
};
