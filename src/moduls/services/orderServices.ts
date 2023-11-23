import { IOrder } from "../interface/orderInterFace";
import User from "../model/userModel";

const createdOrder = async (userId: number, order: IOrder) => {
  const result = await User.updateOne({ userId }, { $push: { orders: order } });
};

export const orderServices = {
  createdOrder,
};
