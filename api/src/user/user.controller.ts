import { Request, Response, Router } from "express";
import UserService from "./user.service";

const UserController = Router();

UserController.get("/", async (req: Request, res: Response) => {
  const users = await UserService.getAll();
  res.status(201).send(users);
});

UserController.get(
  "/username/:username",
  async (req: Request, res: Response) => {
    const { username } = req.params;
    const user = await UserService.getOneByUsername(username);
    if (!user) {
      res.status(404).send("User not found");
    }

    res.send(user);
  }
);

UserController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getOneById(+id);
  if (!user) {
    res.status(404).send("User not found");
  }

  res.send(user);
});

UserController.post("/", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const userDTO = { username, password, email };
  const user = await UserService.create(userDTO);

  res.status(201).send(user);
});

UserController.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.remove(Number(id));

  if (!user) {
    res.status(404).send("Supression raté");
  }

  res.send(user);
});

UserController.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedFields = req.body;
  const user = await UserService.update(Number(id), updatedFields);

  if (!user) {
    res.status(404).send("Update raté");
  }

  res.send(user);
});

export default UserController;
