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
exports.userController = void 0;
const userServices_1 = require("../services/userServices");
const zodValidation_1 = require("../validation/zodValidation");
const userModel_1 = __importDefault(require("../model/userModel"));
const createUserAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const zod = zodValidation_1.UserZodValidation.parse(data);
        const result = yield userServices_1.userServices.createUser(zod);
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "User not created successfully!",
            data: error,
        });
    }
});
const getUserAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userServices_1.userServices.findAllUsers();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "Users not fetched successfully!",
            data: error,
        });
    }
});
const getSingleUserAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const checkUser = yield userModel_1.default.isUserExits(Number(id));
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const result = yield userServices_1.userServices.findUser(Number(id));
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "User not fetched successfully!",
            data: error,
        });
    }
});
const updateSingleUserAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const info = req.body;
        const checkUser = yield userModel_1.default.isUserExits(Number(id));
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const result = yield userServices_1.userServices.updateUser(Number(id), info);
        res.status(200).json({
            success: true,
            message: "User  updated successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "User not updated successfully!",
            data: error,
        });
    }
});
const deleteSingleUserAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const checkUser = yield userModel_1.default.isUserExits(Number(id));
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const result = yield userServices_1.userServices.deleteUser(Number(id));
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "User not deleted successfully!",
            data: error,
        });
    }
});
exports.userController = {
    createUserAPI,
    getUserAPI,
    getSingleUserAPI,
    updateSingleUserAPI,
    deleteSingleUserAPI,
};
