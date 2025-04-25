import { ApiError } from "../utils/api-errors.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  emailRegistrationMailgenContent,
  emailVerificationMailgenContent,
} from "../utils/mail.js";
import { sendEmail } from "../utils/mail.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role, fullname, name } = req.body;
  if (!email || !username || !password || !role || !fullname || !name) {
    throw new ApiError(400, "Please enter all from auth controllers details");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(409, "The user is already created.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    username,
    password: hashedPassword,
    role,
    fullname,
    name,
  });
  // console.log(newUser, "feef");

  sendEmail({
    email: email,
    subject: "Welcome to the application",
    mailGenContent: emailRegistrationMailgenContent(username),
  });

  // sendEmail({
  //   email: email,
  //   subject: "Welcome aboard please verify.",
  //   mailgenContent: emailVerificationMailgenContent(
  //     username,
  //     `process.env.BASEURL${"thelose"}`,
  //   ),
  // });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newUser,
        "User registered Successfully. Check your Email ",
      ),
    );

  //validation
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please enter all details");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "The user does not exists, create a user first.");
  }

  const isPasswordMatch = user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    throw new ApiError(400, "The passowrd does not matches.");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.accessToken = accessToken;
  user.refreshToken = refreshToken;
  // user.save()

  const isVerified = user.isEamilVerified;
  console.log(isVerified, "emailorverified");
  if (!isVerified) {
    const emailToken = user.generateTemporaryToken();
    const token = emailToken.hashedToken;
    const expiry = emailToken.tokenExpiry;
    sendEmail({
      email: email,
      subject: "Welcome to the application",
      mailGenContent: emailVerificationMailgenContent(
        user.username,
        `http://localhost:3000/api/v1/auth/verifyemail/${token}`,
      ),
    });

    user.emailVerificationToken = token;
    // user.isEamilVerified = true
    user.emailVerificationExpiry = expiry;
  }
  user.save();

  const cookieOptions = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
    secure: false,
  };

  res.cookie("mycookies", refreshToken, cookieOptions);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "Logged in successfully"));
  //validation
});

const logoutUser = asyncHandler(async (req, res) => {
  const token = req.signedCookies.mycookies;
  if (!token) {
    throw new ApiError(500, "Unable to find tokens");
  }

  res.clearCookie("mycookies", { expires: new Date() });

  return res.status(201).json(new ApiResponse(201, "Logged Out successfully"));

  //validation
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;
  console.log(token, "Tera token is mera");

  if (!token) {
    throw new ApiError(500, "Unable to verify user");
  }

  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    throw new ApiError(500, "Unable to find associated user.");
  }

  if (user) {
    user.isEamilVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save();
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "User verified Successfully "));
  // bcrypt.compare(verificationToken);

  //validation
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "The passowrd does not matches.");
  }
  const user = await User.findOne({ email });

  const { hashedToken, unHashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;

  user.emailVerificationExpiry = tokenExpiry;

  sendEmail({
    email: email,
    subject: "Resending email verification",
    mailGenContent: emailVerificationMailgenContent(
      user.username,
      `http://localhost:3000/api/v1/auth/verifyemail/${hashedToken}`,
    ),
  });
  user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "User email verification resent, check email "));
  // bcrypt.compare(verificationToken);

  //validation
});
const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(401, "You need to provide the email for resetting.");
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(500, "The user is not present with us");
  }

  //  forgotPasswordToken: {
  //   type: String,
  // },
  // forgotPasswordExpiry: {
  //   type: Date,
  // },
  const { hashedToken, unHashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;

  sendEmail({
    email: email,
    subject: "Resend forgot password tokken",
    mailGenContent: emailVerificationMailgenContent(
      user.username,
      `http://localhost:3000/api/v1/auth/verifyemail/${hashedToken}`,
    ),
  });
  user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User reset password successfully "));
  //validation
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "The user is not present for the access token.");
  }

  //validation
  const { accesstoken } = user.generateAccessToken();
  const { refreshtoken } = user.generateRefreshToken();
  user.accessToken = accesstoken;
  user.refreshToken = refreshtoken;
  user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, user, "The access token got new!!"));
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username } = req.body;
  if (!email || !username) {
    throw new ApiError(401, "You need to provide the email for resetting.");
  }
  // we will send the email from over here
  // later we will check the token and change the password
  const user = await User.findOne({ email, username });

  if (!user) {
    throw new ApiError(500, "Your user does not exists");
  }

  const { hashedToken, unHashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  sendEmail({
    email: email,
    subject: "Forgot password Request.",
    mailGenContent: forgotPasswordMailgenContent(user.name, hashedToken),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        201,
        user,
        "User forgot password request sent successfully.",
      ),
    );
  //validation
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, password, newPassword } = req.body;
  if (!email || !username || !password) {
    throw new ApiError(401, "You need to provide the email for resetting.");
  }

  const user = await User.findOne({ email, password });

  // user.password match with password.hash

  const checkIfCorrect = user.isPasswordCorrect(password);

  if (!checkIfCorrect) {
    throw new ApiError(500, "password didn't match");
  }

  user.password = newPassword;
  user.save();

  sendEmail({
    email: email,
    subject: "Reset password success.",
    mailGenContent: resetPasswordSuccessMailgenContent(user.name),
  });

  return res
    .status(200)
    .json(new ApiResponse(201, user, "User changed password correctly."));
  // verify that the user exists,
  // get the current password,
  // compare the password,
  // if matches then allow for the new password and hash the new password and save it.

  // Verify the user with email,
  // if user exists then generatea  token that is sent to the email address
  // if the token also exists and matches with the token in db we will let the user change pass
  // get the password and then hash it and store it in db
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;
  if (!username) {
    throw new ApiError(401, "The user is not present for the access token.");
  }
  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(401, "The user is not present for the access token.");
  }
  return res.status(201).json(new ApiResponse(201, user, "Your current user."));
  //validation
});

export {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
};
