import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  id: number;
  username: string;
}

const decodeJwtToken = (token: string): CustomJwtPayload | null => {
  try {
    const decoded = jwtDecode<CustomJwtPayload>(token); // Utiliser le type personnalisé
    console.log("Contenu du JWT :", decoded);
    return decoded;
  } catch (error) {
    console.error("Erreur lors du décodage du JWT :", error);
    return null;
  }
};

export default decodeJwtToken;
