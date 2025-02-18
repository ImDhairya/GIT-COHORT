const target = {a: 1, b: 2};
const source = {b: 4, c: 5};

const returnedTarget = Object.assign(target, source);

console.log(returnedTarget);

// Cloning an object

const obj = {a: 1};
const copy = Object.assign({}, obj);

console.log(copy);

const o1 = {a: 1};
const o2 = {b: 2};
const o3 = {c: 3};

const obj1 = Object.assign(o1, o2, o3);
console.log(obj1);

const target1 = Object.defineProperty({}, "foo", {
  value: 1,
  writable: false,
});

const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);
me.name = "Hello";
me.isHuman = true;

const object1 = {
  a: "somestring",
  b: 42,
};

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

