sum(2, 6, (result) => {
  console.log(result);
  return result;
});

function sum(a, b, cb) {
  cb(a + b);
}

console.log(332 + 32);

// -- promises ka polyfil(custom promise)

//1 read file
//2 write file
//3 unlink
// there are all legacy codes, lets get promisified version

function readFileWithPromise(filepat, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepat, encoding, (err, content) => {
      if (err) {
        reject(); // user ke catch function ko call kar do
      } else {
        resolve("Piyush"); // user ke then function ko call kar do
      }
    });
  });
}


