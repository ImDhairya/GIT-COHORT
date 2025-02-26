const o = {
  a: 1,
  b: 2,
  // __proto__ sets the [[prototype]] as another object literal
  __proto__: {
    b: 3,
    c: 4,
  },
};

// o.[[Prototype]] has properties b and c.
// o.[[Prototype]].[[Prototype]] is Object.prototype (we will see it later)
// Finally, o.[[Prototype]].[[Prototype]].[[Prototype]] is null.

console.log(o.a); //1
console.log(o.b); //2
// we didn't got 3 as we were looking for b in the own property, we got it so we didn't look for its prototype property

// Is there a 'b' own property on o? Yes, and its value is 2.
// The prototype also has a 'b' property, but it's not visited.
// This is called Property Shadowing


console.log(o.d); // undefined
// Is there a 'd' own property on o? No, check its prototype.
// Is there a 'd' own property on o.[[Prototype]]? No, check its prototype.
// o.[[Prototype]].[[Prototype]] is Object.prototype and
// there is no 'd' property by default, check its prototype.
// o.[[Prototype]].[[Prototype]].[[Prototype]] is null, stop searching,
// no property found, return undefined.

// Setting an property creates an OWN property 