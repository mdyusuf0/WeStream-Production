import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hashed with bcrypt
  role: { type: String, enum: ["SYSTEM_ADMIN"], default: "SYSTEM_ADMIN" },
  createdBy: { type: String, default: null }, // email of the admin who created this account, null for seed
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
