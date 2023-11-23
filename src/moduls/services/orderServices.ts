import { IOrder } from "../interface/orderInterFace";
import User from "../model/userModel";

const createdOrder = async (userId: number, order: IOrder) => {
  const result = await User.updateOne({ userId }, { $push: { orders: order } });
  return result;
};

const getOrder = async (userId: number) => {
  const result = await User.findOne({ userId }).select({
    _id: 0,
    orders: {
      productName: 1,
      price: 1,
      quantity: 1,
    },
  });

  if (result?.orders?.length === 0) {
    return "user have no orders";
  }
  return result;
};

export const orderServices = {
  createdOrder,
  getOrder,
};
