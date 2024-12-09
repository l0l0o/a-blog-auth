import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "../user/user.service";
dotenv.config();

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("authMiddleware");
  // Récupérer mon token
  const token = req.headers.authorization;

  // Vérifier si le token est valide
  if (!token) {
    throw new Error("Token not found");
  }

  // Extract token from header
  const tokenParts = token.split(" ");
  const access_token = tokenParts[1];
  console.log("access_token: ", access_token);

  // Vérifier si le token est valide
  jwt.verify(
    access_token,
    process.env.JWT_SECRET as string,
    async (err, decoded: any) => {
      if (err) {
        throw new Error("Invalid token");
      }

      console.log("decoded: ", decoded);

      // vérifier si le token a expiré
      if (decoded?.exp < Date.now() / 1000) {
        console.log("Token expiré");
        throw new Error("Token expired");
      }

      // Vérifier si l'utilisateur existe
      const user = await userService.getOneById(decoded.id);
      if (!user) {
        console.log("User not found");
        throw new Error("User not found");
      }

      (req as any).user = user;

      next();
    }
  );
};

export default authMiddleware;
