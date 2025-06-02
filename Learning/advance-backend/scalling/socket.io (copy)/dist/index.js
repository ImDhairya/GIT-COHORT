"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const ioredis_1 = __importDefault(require("ioredis"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)(); // express
const httpServer = http_1.default.createServer(app); //http
const io = new socket_io_1.Server();
io.attach(httpServer);
const checkBoxState = new Array(50).fill(0);
const redis = new ioredis_1.default({ host: "localhost", port: Number(6379) });
const Publisher = new ioredis_1.default({ host: "localhost", port: Number(6379) });
const subscriber = new ioredis_1.default({ host: "localhost", port: Number(6379) });
redis.setnx("checkBoxState", JSON.stringify(new Array(50).fill(0)));
subscriber.subscribe("server:broker");
subscriber.on("message", (channel, message) => {
    const { event, index, value } = JSON.parse(message);
    checkBoxState[index] = value;
    io.emit(event, { index, value }); // relay
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
    socket.on("checkbox-update", (_a) => __awaiter(void 0, [_a], void 0, function* ({ index, value }) {
        const existingState = yield redis.get("checkBoxState");
        if (existingState) {
            JSON.parse(existingState);
            checkBoxState[index] = value;
            redis.set("checkBoxState", JSON.stringify(checkBoxState));
        }
        yield Publisher.publish("server:broker", JSON.stringify({ event: "checkbox-update", index, value }));
        // checkBoxState[index] = value;
        // io.emit("checkbox-update", {index, value});
    }));
    io.emit("checkbox-update", checkBoxState);
});
const port = process.env.PORT || 3001;
const cacheStore = {
    totalPageCount: 0,
};
app.get("/state", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const state = yield redis.get("checkBoxState");
    if (state) {
        const parsedState = JSON.parse(state);
        return res.json({ checkBoxState: parsedState });
    }
    else {
        return res.json({ checkBoxState: [] });
    }
    res.json({ checkBoxState });
}));
app.get("/get-books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://api.freeapi.app/api/v1/public/books");
    return res.status(200).json(response.data);
}));
app.get("/get-books-total", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (cacheStore.totalPageCount) {
        console.log("Cache hit");
        return res.status(200).json(Number(cacheStore["totalPageCount"]));
    }
    const response = yield axios_1.default.get("https://api.freeapi.app/api/v1/public/books");
    const bookData = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data;
    const totalPageCount = bookData.reduce((acc, curr) => {
        var _a;
        return !((_a = curr.volumeInfo) === null || _a === void 0 ? void 0 : _a.pageCount) ? 0 : curr.volumeInfo.pageCount + acc;
    }, 0);
    cacheStore.totalPageCount = Number(totalPageCount);
    console.log("Cache miss");
    return res.status(200).json(totalPageCount);
}));
app.use(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = "rate-limit";
        const value = yield redis.get(key);
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
                .json({ message: "Rate limit exceeded, too many request." });
        }
        redis.incr(key);
        next();
    });
});
app.get("/get-books-total-redis", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const cachedValue = yield redis.get("totalPageValue");
    if (cachedValue) {
        console.log("Cache hit redis");
        return res.status(200).json(Number(cachedValue));
    }
    const response = yield axios_1.default.get("https://api.freeapi.app/api/v1/public/books");
    const bookData = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data;
    const totalPageCount = bookData.reduce((acc, curr) => {
        var _a;
        return !((_a = curr.volumeInfo) === null || _a === void 0 ? void 0 : _a.pageCount) ? 0 : curr.volumeInfo.pageCount + acc;
    }, 0);
    yield redis.set("totalPageValue", totalPageCount);
    console.log("Cache miss redis");
    return res.status(200).json(totalPageCount);
}));
app.use(express_1.default.static("./public"));
httpServer.listen(port, () => console.log("Http server is runnin gon port", port));
