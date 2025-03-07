import { body } from "express-validator";

export const userValidationRules = [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];

export const loginValidationRules = [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password is required"),
];