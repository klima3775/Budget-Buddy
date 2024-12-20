import mongoose from "mongoose";

// Define the schema for a transaction
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the user
  amount: {
    type: Number,
    required: true,
  }, // Transaction amount
  category: {
    type: String,
    required: true,
  }, // Category (e.g., Food, Transport)
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  }, // Type: income or expense
  date: {
    type: Date,
    default: Date.now,
  }, // Transaction date
});

// Export the transaction model
export default mongoose.model("Transaction", transactionSchema);
