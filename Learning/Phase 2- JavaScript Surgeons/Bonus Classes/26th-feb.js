function ptaNhi(fn, delay) {
  // console.log(arguments);
  //[Arguments] { '0': 'Dhairya', '1': 2 }
  // ptaNhi("Dhairya", 2);

  let myId;

  // If a function is returned, it forms a closure,
  // meaning it retains access to variables declared in the outer function
  return function (...args) {
    // console.log(args, "Hello JI");
    clearTimeout(myId);
    myId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const sachMeNahiPata = ptaNhi(() => greet("Dhairya"), 2000); // here we are giving function expression that is yet to be called

sachMeNahiPata();
sachMeNahiPata();
sachMeNahiPata();

// ptaNhi(greet("Dhairya"), 2000); // here we are calling the greet function and passing the return statement of the greet function that is returned

function greet(name) {
  console.log("Hello", name);
}
// 1️⃣ call()
// Invokes the function immediately with a given this value and arguments passed individually.

// 2️⃣ apply()
// Works like call(), but takes arguments as an array instead of individual values.
// Example:
// greet.apply(person, ["Hi", "."]); // Output: "Hi, Dhairya."

// 3️⃣ bind()
// Does NOT execute the function immediately.
// Instead, returns a new function with a bound this value, which can be executed later.
