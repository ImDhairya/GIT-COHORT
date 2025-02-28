// Throteling of the requests, only 1 will be served

const ptaNhi = (fn, delay) => {
  let myId = null;

  return (...args) => {
    console.log(args);
    if (myId === null) {
      fn(...args);
      myId = setTimeout(() => {
        myId = null;
      }, delay);
    }
  };
};

const sachmeNhiPata = ptaNhi(() => greet("Throtelling"), 2000);
function greet(name) {
  console.log("Hello", name);
}
sachmeNhiPata("BHAISAABV");
sachmeNhiPata();
sachmeNhiPata();
