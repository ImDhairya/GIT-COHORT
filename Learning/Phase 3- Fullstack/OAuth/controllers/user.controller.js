import User from "../models/user.model.js";
import sendVerificationEmail from "../utils/sendMail.utils.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Register user controller
const registerUser = async (req, res) => {
  // 1. Get user data from request body
  const {name, email, password} = req.body;

  // 2. validate the inputs
  if (!email || !name || !password) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
    });
  }

  // password validation
  if (password.length < 6) {
    return res.status(400).json({
      status: false,
      message: "Password must be at least 6 characters long",
    });
  }

  try {
    // 3. Check if user already exists in DB
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    // 4. hashing of password is done in the User model using pre-save hook middleware

    // 5. generate a verification token and expiry time
    const token = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = Date.now() + 10 * 60 * 1000;

    // 6. now create a new user
    const user = await User.create({
      name,
      email,
      password,
      verificationToken: token,
      verificationTokenExpiry: verificationTokenExpiry,
    });

    // 6. check if user is created
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User registration failed",
      });
    }

    // 7. verify the user email address by sending a token to the user's email address
    await sendVerificationEmail(user.email, user.verificationToken);

    // 8. send response
    return res.status(201).json({
      status: true,
      message: "User registered successfully, please verify your email address",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("User registration failed", error);
    return res.status(500).json({
      status: false,
      message: "User registration failed",
    });
  }
};

const verify = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: {$gt: Date.now()},
    });

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Token invalid",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User account is verified ",
    });
  } catch (error) {
    console.error("User registration failed", error);
    return res.status(500).json({
      status: false,
      message: "User registration failed",
    });
  }
};

const login = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User not verified please verify first",
      });
    }

    const isPasswordMathc = await user.comparePassword(password);
    console.log(isPasswordMathc);

    if (!isPasswordMathc) {
      return res.status(400).json({
        success: false,
        message: "User invalid email or password",
      });
    }

    // const jwtToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
    // expiresIn: "10m",
    // });
    // ACCESS_TOKEN_KEY = "ISJFISEFSF";
    // REFRESH_TOKEN_KEY;

    const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "process.env.ACCESS_TOKEN_EXPIRY",
    });
    const refreshToken = jwt.sign(
      {id: user._id},
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "process.env.REFRESH_TOKEN_EXPIRY",
      }
    );

    user.refreshToken = refreshToken;

    await user.save();

    // set cookie
    const cookieOptions = {
      expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    // res.cookie("jwtToken", jwtToken, cookieOptions);
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "login successfull",
    });
  } catch (error) {
    console.error("User registration failed", error);
    return res.status(500).json({
      status: false,
      message: "User login failed",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    // get user id from the request object
    const {userId} = req.user.id;

    const user = await User.findOne({_id: userId}).select("-password");

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "The user profile not there",
      });
    }

    return res.json({
      successs: true,
      message: "User profile got",
      user,
    });
  } catch (error) {
    return res.json({
      message: "Failed in getting profile",
      success: false,
    });
  }
};

const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized access",
    });
  }

  try {
    // // 1. check if user is logged in
    // if (!req.user) {
    //   return res.status(401).json({
    //     status: false,
    //     message: "Unauthorized access",
    //   });
    // }
    const refreshDecoded = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    const user = await User.findOne({_id: refreshDecoded.id});

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized access",
      });
    }
    user.refreshToken = null;
    // 2. clear cookie
    res.cookie("accessToken", "", {
      httpOnly: true,
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
    });

    // 3. send response
    return res.status(200).json({
      status: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("User logout failed", error);
    return res.status(500).json({
      status: false,
      message: "User logout failed",
    });
  }
};

export {registerUser, verify, login, getProfile, logout};
