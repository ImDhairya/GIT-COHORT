import express from "express";
import axios from "axios";
import Redis from "ioredis";
import http from "http";
import {Server} from "socket.io";

const app = express(); // express
const httpServer = http.createServer(app); //http
const io = new Server();

io.attach(httpServer);
const checkBoxState = new Array(50).fill(0);

const redis = new Redis({host: "localhost", port: Number(6379)});
const Publisher = new Redis({host: "localhost", port: Number(6379)});
const subscriber = new Redis({host: "localhost", port: Number(6379)});

redis.setnx("checkBoxState", JSON.stringify(new Array(50).fill(0)));

subscriber.subscribe("server:broker");
subscriber.on("message", (channel, message) => {
  const {event, index, value} = JSON.parse(message);
  checkBoxState[index] = value;

  io.emit(event, {index, value}); // relay
});

io.on("connection", (socket) => {
  console.log("A connection is established ", socket.id);

  socket.emit("Hello");
  socket.on("message", (data) => {
    io.emit("server-message", data); //broadcast
  });
  // setInterval(() => {
  //   socket.emit(`Hello after ${Date.now().toString()}`);
  // }, 1000);
  socket.on("checkbox-update", async ({index, value}) => {
    const existingState = await redis.get("checkBoxState");
    if (existingState) {
      JSON.parse(existingState);
      checkBoxState[index] = value;
      redis.set("checkBoxState", JSON.stringify(checkBoxState));
    }

    await Publisher.publish(
      "server:broker",
      JSON.stringify({event: "checkbox-update", index, value})
    );
    // checkBoxState[index] = value;
    // io.emit("checkbox-update", {index, value});
  });
  io.emit("checkbox-update", checkBoxState);
});

const port = process.env.PORT || 3001;

interface CacheStore {
  totalPageCount: number;
}

const cacheStore: CacheStore = {
  totalPageCount: 0,
};

app.get("/state", async (req, res) => {
  const state = await redis.get("checkBoxState");
  if (state) {
    const parsedState = JSON.parse(state);
    return res.json({checkBoxState: parsedState});
  } else {
    return res.json({checkBoxState: []});
  }
  res.json({checkBoxState});
});

app.get("/get-books", async (req, res) => {
  const response = await axios.get(
    "https://api.freeapi.app/api/v1/public/books"
  );
  return res.status(200).json(response.data);
});

app.get("/get-books-total", async (req, res) => {
  if (cacheStore.totalPageCount) {
    console.log("Cache hit");
    return res.status(200).json(Number(cacheStore["totalPageCount"]));
  }
  const response = await axios.get(
    "https://api.freeapi.app/api/v1/public/books"
  );

  const bookData = response.data?.data?.data;
  const totalPageCount = bookData.reduce(
    (acc: number, curr: {volumeInfo?: {pageCount?: number}}) => {
      return !curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo.pageCount + acc;
    },
    0
  );
  cacheStore.totalPageCount = Number(totalPageCount);
  console.log("Cache miss");
  return res.status(200).json(totalPageCount);
});

app.use(async function (req, res, next) {
  const key = "rate-limit";
  const value = await redis.get(key);

  if (!value) {
    redis.set(key, 0); // if value is not set

    // we are setting this rate limit at the time of creation only, so every time when the value is not present we will assing an time bomb like a thing to it, which will expire in 1 min

    // so like everytime we are creating or distributing a value in here, which we will have to do, we are also setting the time to live for it.
    // ye loo redis ka expire ka time set karenge to 1 min. We are not concerned to disable the key because we do it lik this is already expiring in 1 min toh we just give and forget.

    redis.expire(key, 60);
  }
  if (value && Number(value) > 100) {
    return res
      .status(429)
      .json({message: "Rate limit exceeded, too many request."});
  }

  redis.incr(key);
  next();
});

app.get("/get-books-total-redis", async (req, res) => {
  const cachedValue = await redis.get("totalPageValue");
  if (cachedValue) {
    console.log("Cache hit redis");
    return res.status(200).json(Number(cachedValue));
  }
  const response = await axios.get(
    "https://api.freeapi.app/api/v1/public/books"
  );

  const bookData = response.data?.data?.data;
  const totalPageCount = bookData.reduce(
    (acc: number, curr: {volumeInfo?: {pageCount?: number}}) => {
      return !curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo.pageCount + acc;
    },
    0
  );
  await redis.set("totalPageValue", totalPageCount);
  console.log("Cache miss redis");
  return res.status(200).json(totalPageCount);
});

app.use(express.static("./public"));

httpServer.listen(port, () =>
  console.log("Http server is runnin gon port", port)
);
