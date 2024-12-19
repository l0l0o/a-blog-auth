import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPostDTO } from "../types/post.types";
import { getOneById } from "../api_calls/post/post.services";

const SinglePage = () => {
    
    const {id} = useParams<{id: string}>();
    const [post, setPost] = useState<IPostDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const result = await getOneById(+id); // Convertir `id` en nombre
                    setPost(result); // Stocker les données dans l'état
                } catch (err) {
                    setError("Une erreur s'est produite lors de la récupération des données.",);
                } finally {
                    setLoading(false); // Fin du chargement
                }
            }
        };

    fetchData();
    }, [id]); // L'effet s'exécute à chaque changement de `id`

    if (loading) {
        return <p>Chargement...</p>;
    }

      // Affichage en cas d'erreur
    if (error) {
        return <p>{error}</p>;
    }

      // Affichage du post si trouvé
    if (post) {
        return (
        <div>
            <img src={post.image_path} alt={post.title} />
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
        );
    }

    // Affichage si aucun post n'est trouvé
    return <p>Aucun post trouvé.</p>;
}

export default SinglePage;