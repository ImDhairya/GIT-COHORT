function removePassword(user) {
  if (user.hasOwnProperty("password")) {
    delete user.password;
  }
  return user;
}

// You just need to implement the countProperties function
function countProperties(user) {
  // Return the number of properties in user
  return Object.keys.length;
}

// To merge multiple arrays to a single array for one or many source to a single target.

// The Object.assign(target, source1, soure2, ...)

// You just need to implement the objectToArray function
function objectToArray(obj) {
  // Convert the object into an array of key-value pairs
  Object.keys(obj);
}

// You just need to implement the objectToArray function
function objectToArray(obj) {
  // Convert the object into an array of key-value pairs
  const entries = Object.entries(obj);
  return entries;
}

// You just need to implement the cleanObject function
function cleanObject(obj) {
  // Remove all properties with null or undefined values
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      cleanedObj[key] = obj[key];
    }
  }
}

// You just need to implement the getNestedValue function
function getNestedValue(obj, keyPath) {
  // Return the value from the nested object based on keyPath
  let keys = keyPath.split(".");
  let current = obj;

  for (let key in keys) {
    if (current[key] === undefined) {
      return "Key not found.";
    }
    current = current[key];
  }
  return current;
}

let movieRatings = [
  {title: "Movie A", ratings: [4, 5, 3]},
  {title: "Movie B", ratings: [5, 5, 4]},
  {title: "Movie C", ratings: [3, 4, 2]},
];

movieRatings.forEach((movie) => {
  let add = 0;

  movie.ratings.forEach((rating) => {
    add += rating;
  });

  let avg = add / movie.ratings.length;
  movie.ratings = avg.toFixed(2);
  console.log(movie);
});

// ---------------------------------------------------------------------------

let person1 = {
  name: "ravi",
  greet: function () {
    console.log(`Hello ${this.name}`);
  },
};

let person2 = {
  name: "hitesh",
};

person1.greet.call(person2); // call return function
person1.greet.bind(person2); // bind returns new function

// we will have to store the new function, and call the function

// difference between call and bind, also apply is used for apply
// this is how to get the function running
const bindGreet = person1.greet.bind(person2);
bindGreet();
