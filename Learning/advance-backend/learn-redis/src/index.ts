import express from "express";
import axios from "axios";
import Redis from "ioredis";

const app = express();
const redis = new Redis({host: "localhost", port: Number(6379)});

const port = process.env.PORT || 3000;

interface CacheStore {
  totalPageCount: number;
}

const cacheStore: CacheStore = {
  totalPageCount: 0,
};

app.get("/", (req, res) => {
  console.log("This is app/get ");

  return res.status(200).json({
    message: "This is running at some port ",
    success: true,
  });
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
  if (value && Number(value) > 10) {
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

app.listen(port, () => {
  console.log("Server is running at port ", port);
});
