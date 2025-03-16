import mongoose from "mongoose";
import crypto from "crypto";
import User from "../model/User.model.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  // steps for registering the user
  // 1) get the data
  // 2) verify the data
  // 3) check if data is already there in db
  // 4) create a user in db
  // 5) create a verification token
  // 6) save token in db
  // 7) send token to user in email

  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(401).json({
      message: "Please fill all the details",
      success: false,
    });
  }
  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(201).json({
        message: "User already exists",
        success: false,
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    await user.save();

    if (!user) {
      return res.status(400).json({
        message: "The user creation failed",
        success: false,
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email,
      subject: "Hello here's your token for verification",
      html: `Please click the below link so you can verify yourserlf ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
    };
    console.log(mailOptions, "FEE");

    await transporter.sendMail(mailOptions);
    return res.status(201).json({
      message: "Successfully sent mail ",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "The user registration failed",
      success: false,
    });
  }
};

const verifyUser = async (req, res) => {
  // get token from url
  // validate token
  // find user based on token
  // if not
  // set isVerified field to true
  // remove verificatino token
  // save
  // return response
  const {token} = req.params;

  if (!token) {
    return res.status(400).json({
      message: "Token not found",
      success: false,
    });
  }

  const user = await User.findOne({verificationToken: token});

  if (!user) {
    return res.status(200).json({
      message: "invalid token",
      success: false,
    });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  return res.status(200).json({
    message: "User verified successfully",
    success: true,
  });
};

const login = async (req, res) => {
  //1) email and password
  // here you give me email and password I will check it in db and see if they are correct if they are then I will connect or else I will not connect
  // password needs to be converted to the hashed version of it, which is btw stored in the db
  // ---
  // we used to create a value called sessiontoken in the user schema, we ask for the session token and match it with the db if it is there then we let the user have the access.
  // ---
  //2) stateless jwt
  // here we give a token to the

  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        message: "Imvalid email or passs",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Imvalid email or passs ",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "user is not verified, please verify your email",
        success: false,
      });
    }

    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // res.cookie("test", token)
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("test", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Unable to login",
      error,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("test", "", {
      expiresIn: new Date(0),
    });

    res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });

    console.log(req.cookie, "HELOW ORDDS");
  } catch (error) {
    return res.status(400).json({
      message: "Unable to logout",
      error,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const {id, role} = req.user;
    const user = await User.findById({_id: id}).select("-password");
    console.log(user);

    if (!user) {
      return res.status(401).json({
        message: "Unverified login attempt",
      });
    }

    return res.status(200).json({
      message: "The user details fetched successfullt",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Unable to get profile",
      error,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    // find user based on email,
    // reset token + reset expiry => Date.now()+ 10 * 60 * 1000
    // /user .save
    // send mail design url
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({
        message: "THe user is not present",
      });
    }

    const newToken = crypto.randomBytes(32).toString("hex");

    console.log(newToken, "FEEF");

    user.resetPasswordToken = newToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins from now
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email,
      subject: "Hello here's your token for forgetting the password",
      html: `Please click the below link ${process.env.BASE_URL}/api/v1/users/verify/${newToken}`,
    };

    const mailSent = await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: "User logged in successfully",
      success: true,
    });

    return res.status(200).json({
      message: "THis is working",
    });
  } catch (error) {
    console.log(error, "EFEFEFR");
    return res.status(400).json({
      message: "Unable to get profile",
      error,
    });
  }
};

const resetPassword = async (req, res) => {
  const {token} = req.params;
  const {password} = req.body;
  try {
    // collect token from params
    // password from req.body

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Unable to reset jui",
        success: false,
      });
    }

    // set password in user
    // resetToken field, resetExpiury => empty
    // save
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      message: "password reset successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Unable to get profile",
      success: false,
    });
  }
};

export {
  registerUser,
  verifyUser,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
};
