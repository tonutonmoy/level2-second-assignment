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
exports.orderController = void 0;
const zodValidation_1 = require("../validation/zodValidation");
const orderServices_1 = require("../services/orderServices");
const userModel_1 = __importDefault(require("../model/userModel"));
const createOrderApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const info = req.body;
        const zod = zodValidation_1.OrderObject.parse(info);
        const checkUser = yield userModel_1.default.isUserExits(Number(userId));
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
        const result = yield orderServices_1.orderServices.createdOrder(Number(userId), zod);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "Order not created successfully!",
            data: error,
        });
    }
});
const getOrderApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const checkUser = yield userModel_1.default.isUserExits(Number(userId));
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
        const result = yield orderServices_1.orderServices.getOrder(Number(userId));
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "Order not fetched successfully!",
            data: error,
        });
    }
});
const getTotalPriceApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const checkUser = yield userModel_1.default.isUserExits(Number(userId));
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
        const result = yield orderServices_1.orderServices.getTotalPrice(Number(userId));
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "Total price calculated not successfully!",
            data: error,
        });
    }
});
exports.orderController = {
    createOrderApi,
    getOrderApi,
    getTotalPriceApi,
};
