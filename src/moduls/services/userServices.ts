import User from "../model/userModel";

// create user
const createUser = async (data: object) => {
  const createdUser = await User.create(data);
  const result = await User.findById(createdUser._id).select("-password");

  return result;
};

// find all users
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

// find single user
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

// update single user data
const updateUser = async (id: number, info: object) => {
  const {
    userId,
    username,
    password,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
  } = info;

  const result = await User.findOneAndUpdate(
    { userId: id },
    {
      $set: {
        userId,
        username,
        password,
        fullName,
        age,
        email,
        isActive,
        hobbies,
        address,
        orders: info?.orders,
      },
    },
    {
      new: true,
      projection: {
        username: 1,
        email: 1,
        fullName: 1,
        age: 1,
        address: 1,
        _id: 0,
        userId: 1,
        isActive: 1,
        hobbies: 1,
      },
    }
  );

  return result;
};

// delete user
const deleteUser = async (userId: number) => {
  const result = await User.deleteOne({ userId });

  return result;
};

export const userServices = {
  createUser,
  findAllUsers,
  findUser,
  updateUser,
  deleteUser,
};
