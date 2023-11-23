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
exports.userServices = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
// create user
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield userModel_1.default.create(data);
    const result = yield userModel_1.default.findById(createdUser._id).select("-password");
    return result;
});
// find all users
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.find().select({
        username: 1,
        email: 1,
        fullName: 1,
        age: 1,
        address: 1,
        _id: 0,
    });
    return result;
});
// find single user
const findUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.find({ userId }).select({
        username: 1,
        email: 1,
        fullName: 1,
        age: 1,
        address: 1,
        _id: 0,
        userId: 1,
        isActive: 1,
        hobbies: 1,
    });
    return result;
});
// update single user data
const updateUser = (id, info) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, username, password, fullName, age, email, isActive, hobbies, address, orders, } = info;
    const result = yield userModel_1.default.findOneAndUpdate({ userId: id }, {
        $set: {
            userId,
            username,
            password,
            fullName,
            age,
            email,
            isActive,
            hobbies,
            address,
            orders: orders,
        },
    }, {
        new: true,
        projection: {
            username: 1,
            email: 1,
            fullName: 1,
            age: 1,
            address: 1,
            _id: 0,
            userId: 1,
            isActive: 1,
            hobbies: 1,
        },
    });
    return result;
});
// delete user
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.deleteOne({ userId });
    return result;
});
exports.userServices = {
    createUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteUser,
};
