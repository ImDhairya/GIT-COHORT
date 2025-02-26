class Life {
  constructor() {
    // Example: this.alive = true;
    // COnstructor is a method that is automatically called when you initialized the new instance of the class its purpose is to initialized properties
    // JS defines an empyt default constructor if it's not already defined
  }
}

// THe extends sets up the relationship between the parent and child class
// the super keyword is called in the constructor of the child class so it gives inherited members accesss.

// extends calls the parent's constructor and makes the inherited methods accessable.

class Animal extends Life {
  constructor(props) {
    super(props);
    this.props = props;
  }
}

// Sample question
// You need to implement the Counter constructor function and its prototype methods

function Counter() {
  // Initialize count property
  this.count = 0;
}

// Define increment method on Counter's prototype
Counter.prototype.increment = function () {
  this.count = this.count + 1;
};

// Define decrement method on Counter's prototype

Counter.prototype.decrement = function () {
  this.count = this.count - 1;
};

const count = new Counter();

count.increment();
count.increment();
count.increment();
count.increment();
console.log(count);
count.decrement();
console.log(count);
