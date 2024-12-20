import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Интерфейс для пользователя
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Схема пользователя
const userSchema: Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true }, // Имя пользователя
  email: { type: String, required: true, unique: true }, // Email пользователя
  password: { type: String, required: true }, // Хэшированный пароль
});

// Хэширование пароля перед сохранением
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Экспорт модели пользователя
export default mongoose.model<IUser>("User", userSchema);
