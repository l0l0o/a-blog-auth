import { useState } from "react";
import { SignIn, SignUp } from "../api_calls/auth/auth.services";
import { IUserDTO } from "../types/user.types";
import Input from "../components/Input";
import Button from "../components/Button";
import useCustomNavigate from "../hooks/useCustomNavigate";
import useJwtToken from "../hooks/useJwtToken";

const AuthPage = () => {
  const [credentials, setCredentials] = useState<IUserDTO>({
    username: "",
    password: "",
    email: ""
  });

  const { token, saveToken, removeToken } = useJwtToken();

  const navigate = useCustomNavigate();

  const [isOnConnexion, setIsOnConnexion] = useState(true);

  const toggleIsOnConnexion = () => {
    if (isOnConnexion) {
      setIsOnConnexion(false)
    } else {
      setIsOnConnexion(true);
    }
  }

  const onSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await SignIn(credentials);
      const newToken = response.access_token;
      saveToken(newToken);
      navigate("/posts");
    }
    catch (error) {
      console.log("dommage", error)
    }
  }

    const onSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit")
    try {
      const response = await SignUp(credentials);
      console.log("🚀 ~ onSignUpSubmit ~ response:", response)
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
      <h1>{isOnConnexion? "Connexion" : "Inscription"}</h1>
      <form>
        <Input onChange={handleChange} value={credentials.username} name="username" type="text" placeholder="Username"/>
        <Input onChange={handleChange} value={credentials.email} name="email" type="email" placeholder="Email" />
        <Input onChange={handleChange} value={credentials.password} name="password" type="password" placeholder="Password" />
        <Button type="submit" onClick={isOnConnexion? onSignInSubmit : onSignUpSubmit} text={isOnConnexion? "Se connecter" : "S'inscrire"} />
      </form>
      <button onClick={toggleIsOnConnexion}>{isOnConnexion? "Inscription" : "Connexion"}</button>
    </>
  )
}
 
export default AuthPage;