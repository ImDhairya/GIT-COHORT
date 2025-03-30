import crypto from "crypto";

// generate a secre random state parameters for CSRF protection
export const generateState = async () => {
  return crypto.randomBytes(32).toString("hex");
};

//generate a nonce value to prevent reply attacks
export const generateNonce = async () => {
  return crypto.randomBytes(32).toString("hex");
};
