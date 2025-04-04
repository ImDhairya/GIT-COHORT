import { body } from "express-validator";

const userRegistrationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is not correct"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is requireed")
      .isLength({ min: "6" })
      .withMessage("Minimum 6 characters required")
      .isLength({ max: "30" })
      .withMessage("Max 20 characters allowed"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ];
};

export { userRegistrationValidator, userLoginValidator };
