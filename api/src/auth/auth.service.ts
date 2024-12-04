import { Request, Response } from "express";
import pool from "../config/db.connect";
import userService from "../user/user.service";

const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // const user = await userService.getOne(req, res);
  // console.log(user);

  res.send("signin");
};

const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password);

  return userService.create(req, res);
};

export default {
  signin,
  signup,
};
