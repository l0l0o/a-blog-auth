import express from "express";
import UserController from "./user/user.controller";
import dotenv from "dotenv";
import logger from "./middleware/logger.middleware";

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", UserController);

app.get("/private", (req, res) => {
  res.send("Private route");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
