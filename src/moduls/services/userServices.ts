import User from "../model/userModel";

const createUser = async (data: object) => {
  const createdUser = await User.create(data);
  const result = await User.findById(createdUser._id).select("-password");

  return result;
};

const findAllUsers = async () => {
  const result = await User.find().select({
    username: 1,
    email: 1,
    fullName: 1,
    age: 1,
    address: 1,
    _id: 0,
  });

  return result;
};

const findUser = async (userId: number) => {
  const result = await User.find({ userId }).select({
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
};

export const userServices = {
  createUser,
  findAllUsers,
  findUser,
};
