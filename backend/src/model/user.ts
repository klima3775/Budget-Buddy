import mongoose, { Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Интерфейс для пользователя
export interface IUser extends Document {
  email: string;
  token?: string;
  password: string;
}

// Схема пользователя
const userSchema: Schema<IUser> = new mongoose.Schema({
  token: { type: String, required: true }, // Токен пользователя
  email: { type: String, required: true, unique: true }, // Email пользователя
  password: { type: String, required: true }, // Пароль пользователя
});

// Хэширование пароля
userSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

const User = model<IUser>("User", userSchema);

export default User;
