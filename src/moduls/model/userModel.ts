import { Schema, model } from "mongoose";
import { IUser, userCheckingInterface } from "../interface/userInterFace";
import bcrypt from "bcrypt";
import { orderSchema } from "./orderModel";

const userSchema = new Schema<IUser, userCheckingInterface>({
  userId: {
    type: Number,
    required: [true, "User ID is required."],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
  password: { type: String, required: [true, "Password is required."] },
  fullName: {
    firstName: { type: String, required: [true, "First name is required."] },
    lastName: { type: String, required: [true, "Last name is required."] },
  },
  age: { type: Number, required: [true, "Age is required."] },
  email: { type: String, required: [true, "Email is required."], unique: true },
  isActive: { type: Boolean, default: true },
  hobbies: {
    type: [String],
    default: [],
    required: [true, "Hobbies are required."],
  },
  address: {
    street: { type: String, required: [true, "Street is required."] },
    city: { type: String, required: [true, "City is required."] },
    country: { type: String, required: [true, "Country is required."] },
  },
  orders: {
    type: [orderSchema],
    default: [],
    required: [true, "Orders are required."],
  },
});

userSchema.pre("save", async function (next) {
  const user = this as IUser;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;

  return next();
});

userSchema.static("isUserExits", async function isUserExits(userId) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
});

const User = model<IUser, userCheckingInterface>("User", userSchema);

export default User;
