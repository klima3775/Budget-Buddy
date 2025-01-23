import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User, { IUser } from "../model/user.js";

export const generateToken = (id: string): string =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

export const register = async (
  req: Request<{}, {}, IUser>,
  res: Response
): Promise<void> => {
  console.log("Request body:", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password, token } = req.body;
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Token:", token);

  try {
    let user = (await User.findOne({ email })) as IUser | null;
    if (user) {
      res.status(400).json({ message: "Користувач вже існує" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword, token }) as IUser;
    await user.save();
    const userId = (user._id as unknown as string).toString();
    res.status(201).json({ token, userId });
  } catch (error) {
    console.error("Помилка реєстрації:", error); // Логирование ошибки
    res.status(500).json({ message: "Помилка реєстрації", error });
  }
};

export const login = async (
  req: Request<{}, {}, IUser>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Невірний email або пароль" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Невірний email або пароль" });
      return;
    }

    const userId = (user._id as unknown as string).toString();
    res.json({ token: generateToken(userId), userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Помилка входу", error });
  }
};
