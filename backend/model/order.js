import mongoose from "mongoose";

const order = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      default: "Order placed",
      enum: ["Order placed", "Out for delievery", "Delievered", "Cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", order);
