class MyClass {
  static staticProperty = "This is a static property";

  static staticMethod() {
    console.log("This is a static method");
  }

  constructor(instanceProperty) {
    this.instanceProperty = instanceProperty;
  }

  instanceMethod() {
    console.log("This is an instance method");
  }
}

// Accessing static members:
console.log(MyClass.staticProperty); // Output: This is a static property
MyClass.staticMethod(); // Output: This is a static method

// Accessing instance members:
const myInstance = new MyClass("Instance value");
console.log(myInstance.instanceProperty); // Output: Instance value
myInstance.instanceMethod(); // Output: This is an instance method


// static properties are accesses with the instance of the class not the 