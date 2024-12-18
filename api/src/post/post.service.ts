import { Request, Response } from "express";
import pool from "../config/db.connect";
import { IPost, IPostDTO } from "./post.types";

const getAll = async () => {
  const query = "SELECT * FROM public.post ORDER BY id ASC";
  const result = await pool.query(query);

  const posts = result.rows;
  console.log("🚀 ~ getAll ~ posts:", posts);

  if (!posts) {
    return null;
  }

  return posts;
};

const getOneById = async (id: number): Promise<IPost | null> => {
  const query = "SELECT * FROM public.post WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    const post = result.rows[0];

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};

const create = async (postDTO: IPostDTO, user_id: number | undefined) => {
  const query =
    "INSERT INTO public.post (user_id, title, content, image_path) VALUES ($1, $2, $3, $4)";
  const values = [user_id, postDTO.title, postDTO.content, postDTO.image_path];

  try {
    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Error creating post:", error);
    return false;
  }
};

const update = async (
  id: number,
  updatedFields: IPostDTO
): Promise<boolean> => {
  const query = "SELECT * FROM public.post WHERE id = $1";
  const values = [id];

  try {
    const results = await pool.query(query, values);
    console.log("🚀 ~ results:", results.rows);

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      console.log("Aucun utilisateur");
      return false; // Si aucun post n'est trouvé, retourner false
    }

    if (Array.isArray(results.rows) && results.rows.length === 1) {
      const currentPost = results.rows[0];
      console.log("🚀 ~ currentPost:", currentPost);

      const newPost = {
        ...currentPost,
        ...updatedFields,
      };

      console.log("newPost: ", newPost);

      const sqlUpdate =
        "UPDATE public.post SET title = $1, content = $2, image_path = $3 WHERE id = $4";
      const values = [newPost.title, newPost.content, newPost.image_path, id];

      await pool.query(sqlUpdate, values);
      console.log("Post mis à jour avec succès");
      return true; // Retourner true si la mise à jour réussit
    }

    return false; // Retourner false si aucun post n'est mis à jour
  } catch (error) {
    console.log("error: ", error);
    return false; // En cas d'erreur, retourner false
  }
};

const remove = async (id: number) => {
  const query = "DELETE FROM public.post WHERE id = $1";
  const values = [id];

  try {
    await pool.query(query, values);

    console.log("Suppression réussi:");
    return true;
  } catch (error) {
    console.error("Suppression impossible:", error);
    return null;
  }
};

export default {
  getAll,
  getOneById,
  create,
  update,
  remove,
};
