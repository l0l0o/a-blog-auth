import { IPostDTO } from "../../types/post.types";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return response;
};

export const getOneByIdPost = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  return response;
};

export const createPost = async (post: IPostDTO, token: string) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  const result = await response.json();
  return result;
};

export const removePost = async (id: number, token: string) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  return result;
};

export const updatePost = async (id: number, post: IPostDTO, token: string) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  const result = await response.json();
  return result;
};
