import { Request, Response } from "express";
import { OrderObject } from "../validation/zodValidation";
import { orderServices } from "../services/orderServices";
import { IOrder } from "../interface/orderInterFace";
import User from "../model/userModel";

const createOrderApi = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const info = req.body;

    const zod = OrderObject.parse(info);

    const checkUser = await User.isUserExits(Number(userId));
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

    const result = await orderServices.createdOrder(
      Number(userId),
      zod as unknown as IOrder
    );

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Order not created successfully!",
      data: error,
    });
  }
};

const getOrderApi = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const checkUser = await User.isUserExits(Number(userId));
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

    const result = await orderServices.getOrder(Number(userId));

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Order not fetched successfully!",
      data: error,
    });
  }
};
const getTotalPriceApi = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const checkUser = await User.isUserExits(Number(userId));
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

    const result = await orderServices.getTotalPrice(Number(userId));

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Total price calculated not successfully!",
      data: error,
    });
  }
};
export const orderController = {
  createOrderApi,
  getOrderApi,
  getTotalPriceApi,
};
