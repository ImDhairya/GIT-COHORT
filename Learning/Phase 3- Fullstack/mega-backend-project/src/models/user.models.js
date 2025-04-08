import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: `https://placehold.co/600x400`,
        localpath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isEamilVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    emailVerificationToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified(this.password)) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESSTOKEN_SECRET,
    {
      expiresIn: "1d",
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESHTOKEN_SECRET,
    {
      expiresIn: "10m",
    },
  );
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 10 * 60 * 1000;

  return { hashedToken, unHashedToken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
