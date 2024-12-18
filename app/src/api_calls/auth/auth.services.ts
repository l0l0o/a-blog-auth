import { IUserDTO } from "../../types/user.types";

const API_URL = import.meta.env.VITE_API_URL;

export const SignIn = async () => {
  const response = await fetch(`${API_URL}/auth/signin`);
  const data = await response.json();
  return data;
};

export const SignUp = async (newUser: IUserDTO) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const data = await response.json();
  return data;
};
