import { Schema } from "mongoose";
import { IOrder } from "../interface/orderInterFace";

export const orderSchema = new Schema<IOrder>({
  productName: { type: String, required: [true, "Product name is required."] },
  price: { type: Number, required: [true, "Price is required."] },
  quantity: { type: Number, required: [true, "Quantity is required."] },
});
