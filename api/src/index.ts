import express from "express";
import UserController from "./user/user.controller";
import logger from "./middleware/logger.middleware";
import AuthController from "./auth/auth.controller";
import authMiddleware from "./middleware/auth.middleware";

const app = express();
const port = 8000;

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", AuthController);
app.use("/users", UserController);

app.get("/private", authMiddleware, (req, res) => {
  res.send("Private route");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
