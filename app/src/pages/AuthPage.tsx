import { useState } from "react";
import { SignUp } from "../api_calls/auth/auth.services";
import { IUserDTO } from "../types/user.types";

const AuthPage = () => {
  const [credentials, setCredentials] = useState<IUserDTO>({
    username: "",
    password: "",
    email: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit")
    try {
      const response = await SignUp(credentials);
      console.log("🚀 ~ handleSubmit ~ response:", response)
      return await response.json();
    }
    catch (error) {
      console.log("dommage", error)
    }
  }

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target;
    
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <>
      <h1>My little memories</h1>
      <form action="">
        <input onChange={handleChange} value={credentials.username} name="username" type="text" placeholder="Username" />
        <input onChange={handleChange} value={credentials.email} name="email" type="email" placeholder="Email" />
        <input onChange={handleChange} value={credentials.password} name="password" type="password" placeholder="Password" />
        <button type="submit" onClick={handleSubmit}>Se connecter</button>
      </form>
      <button>S'inscrire</button>
    </>
  )
}
 
export default AuthPage;