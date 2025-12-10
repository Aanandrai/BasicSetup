import User from "../models/user.model.js";
import {asyncHandler} from "../utills/asyncHandler.js"

export const getUsers =asyncHandler( async (req, res) => {
  const users = await User.findAll();
  res.json(users);
})

export const createUser = async (req, res) => {
  const { name, email } = req.body;

  const newUser = await User.create({ name, email });
  res.json(newUser);
};
