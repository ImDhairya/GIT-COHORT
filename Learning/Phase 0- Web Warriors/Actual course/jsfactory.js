function gradeCalculator(score) {
  if (score >= 90) {
    return "a";
  } else if (score >= 80) {
    return "b";
  } else if (score >= 70) {
    return "c";
  } else if (score >= 60) {
    return "d";
  } else {
    return "f";
  }
}

numbers = [2, 34, 42, 11];

numbers.map((e) => {
  console.log(e * e);
});

// Faviourate 10 array methods

abc = numbers.filter((e) => e < 40 && e > 10);

console.log(abc);

for (let i = 0; i < 10; i++) {
  for (let k = 10; k > i; k--) {
    process.stdout.write(" "); // Correct way to print spaces inline
  }
  for (let j = 0; j <= i; j++) {
    process.stdout.write(j + " "); // Print numbers inline
  }
  console.log();
}

let myArray = [1, 4, 2, 3, 5, 6];

function sumArray(myArray) {
  sum = 0;
  for (let i = 0; i < myArray.length; i++) {
    sum = sum + myArray[i];
  }
  return sum;
}

// console.log(sumArray(myArray));
// array.push
// array.pop
// array.lenght
// array.splice
// array.sort
// array.reverse
// array.concat
// array.map
// array.filter
// array.includes
let superheros = ["batman", "superman", "ironman", "spiderman"];
// to add arrays
superheros.push("saktiman");
console.log(superheros);
// to remove last superhero
superheros.pop();
console.log(superheros);
// to calculate how many heros are there
console.log(superheros.length);
// addinging  into  teams
const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Venom");
// Inserts at index 1
console.log(months);

// arranging all heros to ascending order
superheros.sort();
console.log(superheros);

// slice
const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(2, 4));
console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

// sorting arrays
const array1 = [1, 30, 4, 21, 100000];
array1.sort();
// boostup for heros
const score = [10, 33, 2, 12, 4, 55, 23];
a = score.filter((e) => e > 20);
console.log(a);

vals = animals.filter((e) => e !== "ant");
console.log(vals);

// 1. Focus on what matters (start with this)
// 2. Jackie Chan Biography (Recommended)
// 3. Shaolin
// 4. The Art of Thinking Clearly
// 5. Boundaries = freedom
// 6.  Byran Tracy Success
// 7.  365 Ways to have a Good Day
// 8. Who mood my cheese (Recommended)

const teas = {
  name: "Lemon tea",
  type: "Green",
  caffine: "low",
};

console.log(teas.name);

teas.origin = "China";
console.log(teas);

teas.caffine = "Medium";

delete teas.type;

console.log(teas);

console.log("origin" in teas);

for (let tea in teas) {
  console.log(tea + ": " + teas[tea]);
}

nested = {
  Greemn: {
    name: "Green Tea",
  },
  blackTeas: {
    name: "Black Tea",
  },
};

const teaCopy = {...nested};
console.log(teaCopy);
// A shallow copy creates a new object, but nested objects inside it are still referenced rather than cloned. This means modifications to nested objects will affect both copies.

Object.prototype.chai = function () {
  console.log("Chai aur code");
};

const tea = {
  name: "Ice tea lemon",
  type: "cool",
};

tea.chai();

// Object.prototype will give us a way of add a property to all the objects that are present in js

const myTeas = ["leamon tea", "orange tea"];
console.log("first");
