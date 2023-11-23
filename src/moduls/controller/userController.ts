import { Request, Response } from "express";
import { userServices } from "../services/userServices";
import { UserZodValidation } from "../validation/zodValidation";
import User from "../model/userModel";
import { IUser } from "../interface/userInterFace";

const createUserAPI = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const zod = UserZodValidation.parse(data);

    const result = await userServices.createUser(zod as IUser);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "User not created successfully!",
      data: error,
    });
  }
};

const getUserAPI = async (req: Request, res: Response) => {
  try {
    const result = await userServices.findAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Users not fetched successfully!",
      data: error,
    });
  }
};

const getSingleUserAPI = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const checkUser = await User.isUserExits(Number(id));

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

    const result = await userServices.findUser(Number(id));

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "User not fetched successfully!",
      data: error,
    });
  }
};

const updateSingleUserAPI = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const info = req.body;

    const checkUser = await User.isUserExits(Number(id));

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

    const result = await userServices.updateUser(Number(id), info);

    res.status(200).json({
      success: true,
      message: "User  updated successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "User not updated successfully!",
      data: error,
    });
  }
};

const deleteSingleUserAPI = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const checkUser = await User.isUserExits(Number(id));

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

    const result = await userServices.deleteUser(Number(id));

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "User not deleted successfully!",
      data: error,
    });
  }
};

export const userController = {
  createUserAPI,
  getUserAPI,
  getSingleUserAPI,
  updateSingleUserAPI,
  deleteSingleUserAPI,
};
