import { useState } from "react";
import decodeJwtToken from "../functions/decodeToken";
import { IUserCredentials } from "../types/user.types";

const useCredentials = () => {
  const [credentials, setCredentials] = useState<IUserCredentials>({
    username: "",
    id: 0,
  });

  // Mettre à jour le state à chaque changement de token
  const updateCredentials = (token: string) => {
    if (token) {
      const decodedToken = decodeJwtToken(token);

      if (decodedToken)
        setCredentials({
          username: decodedToken.username,
          id: decodedToken.id,
        });
    }
  };

  return { credentials, updateCredentials };
};

export default useCredentials;
