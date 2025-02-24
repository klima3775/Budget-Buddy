import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User, { IUser } from "../model/user.js";
import { encryptToken } from "../utils/encription.js";

export const generateAccessToken = (id: string): string =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "15m" });

export const generateRefreshToken = (id: string): string =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "1d",
  });

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
    const encryptedToken = token ? encryptToken(token) : undefined;

    user = new User({
      email,
      password: hashedPassword,
      token: encryptedToken,
    }) as IUser;

    await user.save();
    const userId = (user._id as unknown as string).toString();
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ userId });
  } catch (error) {
    console.error("Registration error:", error);
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
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ userId });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Помилка входу", error });
  }
};
