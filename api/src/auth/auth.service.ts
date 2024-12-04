import { Request, Response } from "express";
import pool from "../config/db.connect";

const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  res.send("signin");
};

const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  res.send("signup");
};

export default {
  signin,
  signup,
};
