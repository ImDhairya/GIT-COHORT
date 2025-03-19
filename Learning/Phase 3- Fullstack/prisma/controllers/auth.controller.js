import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  const {email, name, phone, password} = req.body;

  if (!email || !password || !name || !phone) {
    return res.status(401).json({
      message: "Please enter all details",
      success: false,
    });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(401).json({
        message: "user already exists",
        success: false,
      });
    }

    const verificationToken = await crypto.randomBytes(34).toString("hex");

    const HashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        verificationToken,
        password: HashedPassword,
      },
    });

    // send mail

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

    return res.status(200).json({
      message: "user created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: "unable to register ",
      success: false,
    });
  }
  // await prisma.user.findFirst({
  //   where: {email},
  // });
};

export const loginUser = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return res.status(401).json({
        message: "user not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "login failed",
      });
    }

    const token = jwt.sign({id: user.id, role: user.role}, "shhhhh", {
      expiresIn: "24h",
    });

    const cookieOptions = {
      httpOnly: true,
    };

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: "login succeed",
    });
  } catch (error) {
    return res.status(401).json({
      message: "login failed",
    });
  }
};
