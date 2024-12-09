import { Request, Response, Router } from "express";
import { IPostDTO } from "./post.types";
import postService from "./post.service";
import authMiddleware from "../middleware/auth.middleware";

const PostController = Router();

PostController.get("/", async (req: Request, res: Response) => {
  const posts = await postService.getAll();
  res.status(201).send(posts);
});

PostController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await postService.getOneById(+id);
  if (!post) {
    res.status(404).send("post not found");
  }

  res.send(post);
});

PostController.post(
  "/",
  authMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;
    const { title, content, image_path } = req.body;
    const postDTO: IPostDTO = { title, content, image_path };
    const post = await postService.create(postDTO, user?.id);

    res.status(201).send(post);
  }
);

PostController.delete(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    const user = req.user;

    const { id } = req.params;
    const post = await postService.remove(Number(id));

    if (user?.id !== +id) {
      res.send("Vous n'avez pas le droit de supprimer ce poste");
    }
    if (!post) {
      res.status(404).send("Supression raté");
    }

    res.send(post);
  }
);

PostController.put(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    // PROTECT
    const user = req.user;
    const { id } = req.params;
    const updatedFields = req.body;
    const post = await postService.update(Number(id), updatedFields);

    if (user?.id !== +id) {
      res.send("Vous n'avez pas le droit de modifier ce poste");
    }
    if (!post) {
      res.status(404).send("Update raté");
    }

    res.send(post);
  }
);

export default PostController;
