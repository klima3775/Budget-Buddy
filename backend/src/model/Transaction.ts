import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  account: { type: String, required: true },
  id: { type: String, required: true, unique: true }, // Уникальный ID транзакции
  time: { type: Number, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
});

export default mongoose.model("Transaction", transactionSchema);
