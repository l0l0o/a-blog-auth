import { Request, Response, Router } from "express";
import AuthService from "./auth.service";

const AuthController = Router();

AuthController.post("/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userDTO = { username, password };

  const result = await AuthService.signin(userDTO);

  if (result) {
    res.status(200).send({ message: "User authenticated" });
  } else {
    res.status(401).send({ message: "User not authenticated" });
  }
});
AuthController.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userDTO = { username, password };
  const result = await AuthService.signup(userDTO);

  if (result) {
    res.status(201).send({ message: "User created" });
  } else {
    res.status(400).send({ message: "User not created" });
  }
});

export default AuthController;
