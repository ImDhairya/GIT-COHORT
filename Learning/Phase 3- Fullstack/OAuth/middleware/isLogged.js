import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isLoggedIn = async (req, res, next) => {
  try {
    // const {token} = req.cookies.jwtToken;

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    console.log(token);

    if (!accessToken) {
      if (!refreshToken) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized access",
        });
      }

      //refresh token hai
      const refreshDecoded = jwt.verify(
        refreshToken,
        process.env.REFRESHTOKEN_SECRET
      );
      console.log(refreshDecoded.id);

      const user = await User.findOne({_id: refreshDecoded.id});
      console.log(user.email);

      if (!user) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized access",
        });
      }

      const newAccessToken = jwt.sign(
        {id: user._id},
        process.env.ACCESSTOKEN_SECRET,
        {
          expiresIn: process.env.ACCESSTOKEN_EXPIRY,
        }
      );
      const newRefreshToken = jwt.sign(
        {id: user._id},
        process.env.REFRESHTOKEN_SECRET,
        {
          expiresIn: process.env.REFRESHTOKEN_EXPIRY,
        }
      );

      user.refreshToken = newRefreshToken;
      await user.save();

      const cookieOptions = {
        httpOnly: true,
      };

      res.cookie("aceessToken", newAccessToken, cookieOptions);
      res.cookie("refreshToken", newRefreshToken, cookieOptions);
      req.user = refreshDecoded;
      next();
    } else {
      const accessDecoded = jwt.verify(
        accessToken,
        process.env.ACCESSTOKEN_SECRET
      );

      const user = await User.findOne({_id: accessDecoded.id});
      if (!user) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized access",
        });
      }

      const newAccessToken = jwt.sign(
        {id: user._id},
        process.env.ACCESSTOKEN_SECRET,
        {
          expiresIn: process.env.ACCESSTOKEN_EXPIRY,
        }
      );
      const newRefreshToken = jwt.sign(
        {id: user._id},
        process.env.REFRESHTOKEN_SECRET,
        {
          expiresIn: process.env.REFRESHTOKEN_EXPIRY,
        }
      );

      user.refreshToken = newRefreshToken;
      await user.save();

      const cookieOptions = {
        httpOnly: true,
      };

      res.cookie("aceessToken", newAccessToken, cookieOptions);
      res.cookie("refreshToken", newRefreshToken, cookieOptions);
      req.user = accessDecoded;
      next();
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Unable to verify logged in user",
    });
  }
};
export default isLoggedIn;
