"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderSchema = new mongoose_1.Schema({
    productName: { type: String, required: [true, "Product name is required."] },
    price: { type: Number, required: [true, "Price is required."] },
    quantity: { type: Number, required: [true, "Quantity is required."] },
});
