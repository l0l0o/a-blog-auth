import { IUserDTO } from "../../types/user.types";

const API_URL = import.meta.env.VITE_API_URL;

export const SignIn = async (user: IUserDTO) => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const result = await response.json();
  return result;
};

export const SignUp = async (newUser: IUserDTO) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const result = await response.json();
  return result;
};
