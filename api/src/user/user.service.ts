import { Request, Response } from "express";
import pool from "../config/db.connect";
import { IUser, IUserDTO } from "./user.types";

const getAll = async () => {
  const query = "SELECT * FROM public.user";
  const result = await pool.query(query);

  const users = result.rows;
  console.log("🚀 ~ getAll ~ users:", users);

  if (!users) {
    return null;
  }

  return users;
};

const getOneByUsername = async (username: string): Promise<IUser | null> => {
  const query = "SELECT * FROM public.user WHERE username = $1";
  const values = [username];

  const result = await pool.query(query, values);
  const user = result.rows[0];

  if (!user) {
    return null;
  }

  return user;
};

const getOneById = async (id: number): Promise<IUser | null> => {
  const query = "SELECT * FROM public.user WHERE id = $1";
  const values = [id];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const create = async (userDTO: IUserDTO) => {
  const query =
    "INSERT INTO public.user (username, password, email) VALUES ($1, $2, $3)";
  const values = [userDTO.username, userDTO.password, userDTO.email];

  try {
    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

const update = async (
  id: number,
  updatedFields: IUserDTO
): Promise<boolean> => {
  const query = "SELECT * FROM public.user WHERE id = $1";
  const values = [id];

  try {
    const results = await pool.query(query, values);
    console.log("🚀 ~ results:", results.rows);

    if (Array.isArray(results.rows) && results.rows.length === 0) {
      console.log("Aucun utilisateur");
      return false; // Si aucun post n'est trouvé, retourner false
    }

    if (Array.isArray(results.rows) && results.rows.length === 1) {
      const currentUser = results.rows[0];
      console.log("🚀 ~ currentUser:", currentUser);

      const newUser = {
        ...currentUser,
        ...updatedFields,
      };

      console.log("newUser: ", newUser);

      const sqlUpdate =
        "UPDATE public.user SET username = $1, password = $2, email = $3 WHERE id = $4";
      const values = [newUser.username, newUser.password, newUser.email, id];

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
  const query = "DELETE FROM public.user WHERE id = $1";
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
  getOneByUsername,
};
