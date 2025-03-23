// const http = require("http");

// const server = http.createServer(function (req, res) {
//   console.log(req.method);

//   switch (req.url) {
//     case "/user":
//       return res.end("EE hai ji todda user");

//     case "/login":
//       return res.end("EE ji ho gaye login");

//     case "/logout":
//       return res.end("EE hai todda logout");

//     default:
//       return res.end("E kii kitta jee");
//   }

//   res.end("Ye lo ji server se return ho gyae");
// });

// server.listen(3000, () => {
//   console.log("The server is listening to 3000");
// });

/////

const coh = require("./cohort.js");

coh.getCallPr("/user", function (req, res) {

   res.writeHead(200, {"Content-Type": "text/plain"});
   res.end("Hello from GET request!");
});

coh.listen(4000, () => {
  console.log("Listening to port 4000");
});
