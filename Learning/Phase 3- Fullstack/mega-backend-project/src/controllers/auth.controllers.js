import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler(async (req, res) => {
  registrationValidation(body);
});

export { registerUser };
