import mongoose from "mongoose";

import { asyncHandler } from "../utils/async-handler";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  // registrationValidation(body);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  // registrationValidation(body);
});

const logoutUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  // registrationValidation(body);
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  // registrationValidation(body);
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  // registrationValidation(body);
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;
});

const getProfile = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;
});

export { registerUser };
