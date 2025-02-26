let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(arr[-1]);

const user = {
  name: "dhairya",
  age: 30,
  password: "123",
};

const proxyUser = new Proxy(user, {
  get(target, prop) {
    console.log(target, "T", prop, "P");
    // This means that target 'T' is all the properties that are there in the user  and porperty "P" will be accessed at time of execution

    if (prop == "password") {
      throw new Error("Access Denied");
    }
    return target[prop];
  },

  set(target, prop, user) {},
});

// console.log(proxyUser.password);

function negativeIndex() {
  return new Proxy(arr, {
    get(target, prop) {
      const index = Number(prop);
      if (index < 0) {
        return target[target.length + index];
      }
      return target[index];
    },

    set(target, prop, value) {
      const index = Number(prop);
      if (index < 0) {
        target[target.length + index] = value;
      } else {
        target[index] = value;
      }
      return true;
    },
  });
}

let newArr = negativeIndex(arr);
console.log(newArr[-3]);
newArr[-1] = 22;
console.log(newArr)
console.log(arr)

