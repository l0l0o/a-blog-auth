import { useState } from "react";
import { IUserCredentials } from "../types/user.types";

const useCredentials = () => {
  const [credentials, setCredentials] = useState<IUserCredentials>({
    username: "",
    id: 0,
  });

  // Mettre à jour le state à chaque changement de token
  const updateCredentials = (username: string, id: number) => {
    setCredentials({
      username: username,
      id: id,
    });
  };

  return { credentials, updateCredentials };
};

export default useCredentials;
