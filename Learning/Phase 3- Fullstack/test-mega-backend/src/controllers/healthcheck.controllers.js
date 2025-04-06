import { ApiResponse } from "../utils/api-response.js";

const healthcheck = (req, res) => {
  console.log(`logic to connect to db`);

  res.status(200).json(200, {
    message: "Server is rugging",
  });
};

export { healthcheck };
