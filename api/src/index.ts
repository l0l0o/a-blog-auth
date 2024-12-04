import express from "express";
import UserController from "./user/user.controller";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", UserController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
