import jwt from "jsonwebtoken";
import {generateNonce, generateState} from "../utils/authUtils";
import axios from "axios";
import User from "../models/user.model";

const getJWKsClient = () => {
  return getJWKsClient({
    jwksUri: process.env.GOOGLE_JWKS_URL,
    cache: true,
    rateLimit: true,
  });
};

const getSigningKey = async (kid) => {
  const client = getJWKsClient();
  return new Promise((resolve, reject) => {
    client.getSigningKey(kid, (err, Key) => {
      if (err) {
        return reject(err);
      }
      const signingKey = Key.getPublicKey();
      resolve(signingKey);
    });
  });
};
const verifyGoogleToken = async (token) => {
  try {
    const decoded = jwt.decoded(token, {completed: true});
    if (!decoded) {
      throw new Error("Invalid error");
    }

    const kid = decoded.header.kid;

    const signinKey = await getSigningKey(kid);

    const verificationToken = jwt.verify(token, signinKey, {
      algorithms: ["RS256"],
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    return verificationToken;
  } catch (error) {
    throw new Error("Token verification failed");
  }
};
const googleLogin = async (req, res) => {
  //  generate security and add into params
  // store in cookies
  // build auth url
  // redirect google

  const state = await generateState();

  const nonce = await generateNonce();

  res.cookie("oauth_state", state, {
    httpOnly: true,
    maxAge: 600000,
    sameSite: "lax",
  });

  res.cookie("oauth_nonce", nonce, {
    httpOnly: true,
    maxAge: 600000,
    sameSite: "lax",
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&response_type=code&scope=email%20profile%20openid&state=${state}&nonce=${nonce}`;

  res.redirect(googleAuthUrl);
};

const googleCallback = async (req, res) => {
  // extract code  and state from query params
  //
  try {
    const {code, state} = req.query;
    const savedState = req.cookies.oauth.state;

    const savedNonce = req.cookie.oauth.nonce;

    res.clearCookie("oauth_state");

    res.clearCookie("oauth_nonce");

    if (!state || !savedState || state !== savedState) {
      return res.status(401).json({
        message: "Invalid state",
      });
    }

    // exchange of google tokens

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          code,
          grant_type: "authorization_code",
        },
      }
    );

    const {id_token, access_token, refresh_token} = tokenResponse.data;

    if (!id_token || !refresh_token) {
      return res.state(401).json({
        message: "invalid Id token",
      });
    }

    //verify id token

    const decodedToken = await verifyGoogleToken(id_token);

    // check noence matches with stored cookie

    if (!decodedToken.nonce || decodedToken.nonce !== savedNonce) {
      return res.state(401).json({
        message: "Invalid nonce parameter",
      });
    }

    // find or create user in db

    let user = await User.findOne({googleId: decodedToken.sub});

    if (!user) {
      user = await User.create({
        googleId: decodedToken,
        email: decodedToken.email,
        name: decodedToken.name,
        refreshToken: refresh_token || null,
      });
    } else if (refresh_token) {
      // update refresh token if it is chagned

      user.refreshToken = refresh_token;
      await user.save();
    }

    // generate own jwt token for user

    const aaccessToken = jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("access_token", aaccessToken, {
      httpOnly: true,
      maxAge: "3600000",
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Authenticartion failed",
    });
  }
};
const getProfile = async (req, res) => {};
