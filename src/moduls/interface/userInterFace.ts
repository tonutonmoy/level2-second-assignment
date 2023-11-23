import { Model } from "mongoose";
import { IOrder } from "./orderInterFace";

type FullName = {
  firstName: string;
  lastName: string;
};

type Address = {
  street: string;
  city: string;
  country: string;
};

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders?: IOrder[];
}

export interface userCheckingInterface extends Model<IUser> {
  isUserExits(id: number): Promise<IUser | null>;
}
