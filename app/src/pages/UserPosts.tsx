import { useEffect, useState } from "react";
import { getAllByUserId } from "../api_calls/post/post.services";
import { IPost } from "../types/post.types";
import useCredentials from "../hooks/useCredentials";
import PostList from "../components/postList";


const UserPosts = () => {
    const {credentials} = useCredentials()
    const [posts, setPosts] = useState<IPost[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            if (credentials) {
                try {
                    const result = await getAllByUserId(credentials.id); // Convertir `id` en nombre
                    setPosts(result); // Stocker les données dans l'état
                } catch (err) {
                    setError("Une erreur s'est produite lors de la récupération des données.",);
                } finally {
                    setLoading(false); // Fin du chargement
                }
            }
        };

    fetchData();
    }, [credentials]); // L'effet s'exécute à chaque changement de `credentials`

    if (loading) {
        return <p>Chargement...</p>;
    }

      // Affichage en cas d'erreur
    if (error) {
        return <p>{error}</p>;
    }

      // Affichage du post si trouvé
    if (posts) {
        return (
            <PostList posts={posts}/>
        );
    }

    // Affichage si aucun post n'est trouvé
    return <p>Aucun post trouvé.</p>;
}
 
export default UserPosts;