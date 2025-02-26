import mongoose, { Document, model, Schema, ObjectId } from "mongoose";

// Интерфейс для пользователя
export interface IUser extends Document {
  _id: ObjectId;
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
