const http = require("http");

let server;

exports.getCallPr = function (url, functionExecute) {
  console.log(url);

  console.log("Cheeje pauch gai hai");
  // const sercer = http.createServer()
  server = http.createServer((req, res) => {
    if (req.method === "GET") {
      functionExecute(req, res);
    } else {
      res.end("Nai hoga ");
    }
  });
};

exports.listen = function (port, func) {
  server.listen(port, func());
};
