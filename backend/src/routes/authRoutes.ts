import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Некоректний email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Мінімальна довжина пароля 6 символів"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Некоректний email"),
    body("password").notEmpty().withMessage("Пароль не може бути пустим"),
  ],
  login
);

export default router;
