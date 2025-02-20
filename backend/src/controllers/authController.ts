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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password, token } = req.body;

  try {
    let user = (await User.findOne({ email })) as IUser | null;
    if (user) {
      res.status(400).json({ message: "Користувач вже існує" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedToken = token ? await bcrypt.hash(token, 10) : undefined;
    user = new User({
      email,
      password: hashedPassword,
      token: hashedToken,
    }) as IUser;
    await user.save();
    const userId = (user._id as unknown as string).toString();
    const newToken = generateToken(userId);
    res.status(201).json({ token: newToken, userId });
  } catch (error) {
    res.status(500).json({ message: "Помилка реєстрації", error });
  }
};

export const login = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = (await User.findOne({ email })) as IUser | null;
    if (!user) {
      res.status(400).json({ message: "Неправильний email або пароль" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Неправильний email або пароль" });
      return;
    }

    const userId = (user._id as unknown as string).toString();
    const token = generateToken(userId);
    res.status(200).json({ token, userId });
  } catch (error) {
    res.status(500).json({ message: "Помилка входу", error });
  }
};
