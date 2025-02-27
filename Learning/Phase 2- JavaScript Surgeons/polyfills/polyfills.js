// polyfill for promise

class MyPromise {
  constructor(executorFn) {
    this._state = "pending";
    this._successCallbacks = [];
    this._errorCallbacks = [];
    this._finallyCallbacks = [];

    this.value = undefined;

    executorFn(
      this.resolverFunction.bind(this),
      this.rejectorFunction.bind(this)
    );
  }

  then(cb) {
    if (this._state == "fulfilled") {
      // promise already fulfilled so run it already
      cb(this.value);
      return this;
    }
    // then doesnot run the function on the spot it just registers it.
    this._successCallbacks.push(cb);
    return this;
  }

  catch(cb) {
    if (this._state == "rejected") {
      // promise already rejected so run it already
      cb();
      return this;
    }
    // then doesnot run the function on the spot it just registers it.
    this._errorCallbacks.push(cb);
    return this;
  }

  finally(cb) {
    if (this._state !== "pending") {
      cb();
      return this;
    }
    this._finallyCallbacks(cb);
    return this;
  }

  resolverFunction(value) {
    console.log(
      `Fullfilling promise, Running ${this._successCallbacks.length} callbacks`
    );
    this.value = value;
    this._state = "fulfilled";
    this._successCallbacks.forEach((cb) => cb(value));
    this._finallyCallbacks.forEach((cb) => cb());
  }
  rejectorFunction(err) {
    this._state = "rejected";
    this._errorCallbacks.forEach((cb) => cb(err));
    this._finallyCallbacks.forEach((cb) => cb());
  }
}

function wait(seconds) {
  const p = new Promise((resolve, reject) => {
    // setTimeout(() => resolve(), seconds * 1000);
    setTimeout(() => reject("Hahaha"), seconds * 1000);
  });
  return p;
}

// wait(10)
//   .then((e) => console.log(`Promise resolved after`, e))
//   .catch(() => console.log(`Rejected after 10 sec`))
//   .finally(() => console.log(`Mei toh chalunga`));

const p = wait(5);

p.then((e) => console.log(`V1 Promise Resolved After 5 sec`, e))
  .catch(() => console.log(`Rejected after 10 sec`))
  .finally(() => console.log(`Mei toh chalunga`));
