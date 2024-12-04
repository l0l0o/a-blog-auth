import { Request, Response } from "express";
import pool from "../config/db.connect";
import userService from "../user/user.service";
import { IUserDTO } from "../user/user.types";

const signin = async (userDTO: IUserDTO) => {
  // Check if user exists
  const user = await userService.getOneByUsername(userDTO.username);

  if (!user) {
    return null;
  }

  if (user.password !== userDTO.password) {
    return null;
  }

  return user;
};

const signup = async (userDTO: IUserDTO) => {
  return userService.create(userDTO);
};

export default {
  signin,
  signup,
};
