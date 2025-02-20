import mongoose, { Document, model, Schema } from "mongoose";

// Интерфейс для пользователя
export interface IUser extends Document {
  email: string;
  token?: string;
  password: string;
}

// Схема пользователя
const userSchema: Schema<IUser> = new mongoose.Schema({
  token: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
