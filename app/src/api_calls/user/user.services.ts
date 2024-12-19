import { IUserDTO } from "../../types/user.types";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response;
};

export const getOneByIdUser = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  return response;
};

export const removeUser = async (id: number, token: string) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  return result;
};

export const updateUser = async (id: number, user: IUserDTO, token: string) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();
  return result;
};
