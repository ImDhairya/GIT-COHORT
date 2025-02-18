// objects in js
// prototypes
// polyfil


const array = [1, 2, 3];
// array.prototype.abc = () => {
//   console.log("Hello world");
// };

const arr = [1, 2, 3, 4, 5, 6];

// polyfil function are used to give a safety net to the browsers who are not up to date
// polyfil function gives methods to the varioud datatypes to get a fucntion support if it is not already present in the version of the browser

arr.forEach((e, index) => {
  console.log(`Valu at index is ${index} is ${e}`);
});

const ret = arr.forEach((e, index) => {
  console.log(`Valu at index is ${index} is ${e}`);
});

console.log(`Returns...${ret}`);

// no returns, value, index call my function for every value

if (!Array.prototype.forEach) {
  // won't work cause we have the foreact cuntion
  // so we will use myForeach funciton
  Array.prototype.myForEach = function (userFn) {
    const originalArray = this;

    for (let i = 0; i < originalArray.length; i++) {
      // this is used for setting the current context
      // this points to the context of current object

      userFn(originalArray[i]);
    }
  };
}

const n = arr.map((e) => e * 2);

console.log(n);

if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (userFn) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
      const value = userFn(this[i], i);
      result.push(value);
    }

    return result;
  };
}

// filter
// signature:

const arrFilter = [1, 2, 3, 4, 5];

// input me user function and returns new array

// agar user ka function returns true
// toh current value is included in new array

const n3 = arrFilter((e) => e % 2 == 0);

console.log(n3);
