import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies?.test;
    console.log(req.cookies.test);

    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // let isVerified = await jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log("TOKEN", isVerified);

    // next();
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("decoded data: ", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Auth middleware failure", error);
    return res.status(400).json({
      message: "Unable to find user",
      success: false,
    });
  }
};
