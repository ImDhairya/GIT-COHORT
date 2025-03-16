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
    console.log("WORKIBG HEF");
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
  // verify token
  // clear the cookies from the browser

  // send response

  const {token} = res.cookieOptions;
  console.log(token);
};

export {registerUser, verifyUser, login, logout};
