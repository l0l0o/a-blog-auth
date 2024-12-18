import { useState, useEffect } from "react";

const useJwtToken = (
  storageType: "localStorage" | "sessionStorage" = "localStorage"
) => {
  const storage =
    storageType === "localStorage" ? localStorage : sessionStorage;

  // Lire le JWT initial depuis le stockage
  const getInitialToken = () => storage.getItem("jwtToken") || null;

  const [token, setToken] = useState<string | null>(getInitialToken());

  // Mettre à jour le stockage à chaque changement de token
  useEffect(() => {
    if (token) {
      storage.setItem("jwtToken", token);
    } else {
      storage.removeItem("jwtToken");
    }
  }, [token, storage]);

  // Fonction pour définir le token
  const saveToken = (newToken: string) => {
    setToken(newToken);
  };

  // Fonction pour supprimer le token
  const removeToken = () => {
    setToken(null);
  };

  return { token, saveToken, removeToken };
};

export default useJwtToken;
