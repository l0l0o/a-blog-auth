import { useState } from "react";
import { SignIn, SignUp } from "../api_calls/auth/auth.services";
import { IUserDTO } from "../types/user.types";
import Input from "../components/Input";
import Button from "../components/Button";
import useCustomNavigate from "../hooks/useCustomNavigate";
import useJwtToken from "../hooks/useJwtToken";
import useCredentials from "../hooks/useCredentials";
import checkJwtToken from "../functions/checkToken";
import toast from "../functions/toast";

const AuthPage = () => {
  const [credentials, setCredentials] = useState<IUserDTO>({
    username: "",
    password: "",
    email: ""
  });

  const { saveToken } = useJwtToken();

  const navigate = useCustomNavigate();

  const {updateCredentials} = useCredentials();

  const [isOnSignIn, setIsOnSignIn] = useState(true);

  const toggleIsOnSignIn = () => {
    if (isOnSignIn) {
      setIsOnSignIn(false);
    } else {
      setIsOnSignIn(true);
    }
  }

  const onSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await SignIn(credentials);
      const newToken = response.access_token;
      const decodedToken = checkJwtToken(newToken);

      if (decodedToken) updateCredentials(decodedToken.username, decodedToken?.id);
      saveToken(newToken);
      navigate("/posts");
    }
    catch (error) {
      console.log("Erreur: ", error);
      toast("Un problème a eu lieu lors de la connexion", "danger");
    }
  }

  const onSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit")
    try {
      await SignUp(credentials);
      toast("Compte créé avec succès", "success");

      setCredentials({
        username: "",
        password: "",
        email: ""
      });
    }
    catch (error) {
      console.log("Erreur", error)
      toast("Un problème a eu lieu lors de la création du compte", "danger");
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
      <h1>{isOnSignIn? "Connexion" : "Inscription"}</h1>
      <form>
        <Input onChange={handleChange} value={credentials.username} name="username" type="text" placeholder="Username"/>
        <Input onChange={handleChange} value={credentials.email} name="email" type="email" placeholder="Email" />
        <Input onChange={handleChange} value={credentials.password} name="password" type="password" placeholder="Password" />
        <Button type="submit" onClick={isOnSignIn? onSignInSubmit : onSignUpSubmit} text={isOnSignIn? "Se connecter" : "S'inscrire"} />
      </form>
      <button onClick={toggleIsOnSignIn}>{isOnSignIn? "Inscription" : "Connexion"}</button>
    </>
  )
}
 
export default AuthPage;