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
exports.orderServices = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const createdOrder = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.updateOne({ userId }, { $push: { orders: order } });
    return result;
});
const getOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield userModel_1.default.findOne({ userId }).select({
        _id: 0,
        orders: {
            productName: 1,
            price: 1,
            quantity: 1,
        },
    });
    if (((_a = result === null || result === void 0 ? void 0 : result.orders) === null || _a === void 0 ? void 0 : _a.length) === 0) {
        return "user have no orders";
    }
    return result;
});
const getTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userModel_1.default.aggregate([
        {
            $match: {
                userId: userId,
            },
        },
        {
            $unwind: "$orders",
        },
        {
            $addFields: {
                totalQuantity: { $multiply: ["$orders.quantity", "$orders.price"] },
            },
        },
        {
            $group: {
                _id: "$userId",
                totalPrice: { $sum: "$totalQuantity" },
            },
        },
    ]);
    if (data.length === 0) {
        return "user have no orders";
    }
    console.log(data);
    const totalPrice = data[0].totalPrice;
    console.log(totalPrice);
    const result = { totalPrice };
    return result;
});
exports.orderServices = {
    createdOrder,
    getOrder,
    getTotalPrice,
};
