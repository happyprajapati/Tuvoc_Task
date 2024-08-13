import { body } from "express-validator";

export const UserDeailsValidator = () => {
  return [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be of 3 characters")
      .isLength({ max: 20 })
      .withMessage("Name cannot exceed 20 characters")
      .notEmpty()
      .withMessage("Name cannot be empty"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid Email")
      .exists(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 5 chars long")
      .isLength({ max: 30 })
      .withMessage("password must be at max 30 chars long")
      .matches(/\d/)
      .withMessage("password must contain a number")
      .exists(),
  ];
};




