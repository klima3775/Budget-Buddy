import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import User, { IUser } from "../model/user.js";

const router = express.Router();

// генерация токена
const generateToken = (id: string): string =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

// регистрация
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Некоректний email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Мінімальна довжина пароля 6 символів"),
  ],
  async (req: Request<{}, {}, IUser>, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    try {
      let user = (await User.findOne({ email })) as IUser | null;
      if (user) {
        res.status(400).json({ message: "Користувач вже існує" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({ email, password: hashedPassword }) as IUser;
      await user.save();

      // Приведение типа user._id к строке
      const userId = (user._id as unknown as string).toString();

      res.json({ token: generateToken(userId), userId });
    } catch (error) {
      res.status(500).json({ message: "Помилка реєстрації", error });
    }
  }
);

export default router;
