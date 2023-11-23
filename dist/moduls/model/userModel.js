"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const orderModel_1 = require("./orderModel");
const userSchema = new mongoose_1.Schema({
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
        type: [orderModel_1.orderSchema],
        default: [],
        required: [true, "Orders are required."],
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(user.password, saltRounds);
        user.password = hashedPassword;
        return next();
    });
});
userSchema.static("isUserExits", function isUserExits(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield User.findOne({ userId });
        return existingUser;
    });
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
