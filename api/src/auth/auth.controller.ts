import { Request, Response, Router } from "express";
import AuthService from "./auth.service";

const AuthController = Router();

AuthController.post("/signin", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const userDTO = { username, password, email };

  const access_token = await AuthService.signin(userDTO);

  if (access_token) {
    res.status(200).send({ access_token });
  } else {
    res.status(401).send({ message: "User not authenticated" });
  }
});

AuthController.post("/signup", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const userDTO = { username, password, email };
  const result = await AuthService.signup(userDTO);

  if (!result) {
    res.status(400).send({ message: "User not created" });
  }
  console.log("new user: ", userDTO);
  res.status(201).send({ message: "User created" });
});

export default AuthController;
