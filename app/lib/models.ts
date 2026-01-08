import mongoose from "mongoose";
import { SalesRecord, DashboardUser } from "@/app/data/salesTypes";

// Sales Schema
const salesSchema = new mongoose.Schema<SalesRecord>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
      index: true,
    },
    time: {
      type: String,
      required: true,
    },
    breadSize: {
      type: String,
      enum: ["Jumbo", "Family", "Family-Mini", "Solo"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    debtor: {
      type: String,
      required: true,
    },
    customerType: {
      type: String,
      required: true,
      index: true,
    },
    dispatcher: String,
    notes: String,
    createdAt: {
      type: String,
      default: () => new Date().toISOString(),
      index: true,
    },
  },
  { timestamps: false }
);

// Dashboard User Schema
const dashboardUserSchema = new mongoose.Schema<DashboardUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["sales_rep", "admin"],
      default: "sales_rep",
    },
  },
  { timestamps: true }
);

// Create models
export const Sales =
  mongoose.models.Sales || mongoose.model<SalesRecord>("Sales", salesSchema);
export const DashboardUserModel =
  mongoose.models.DashboardUser ||
  mongoose.model<DashboardUser>("DashboardUser", dashboardUserSchema);
