import useCustomNavigate from "../hooks/useCustomNavigate";
import { IPost } from "../types/post.types";
import Card from "./Card";

type PostListProps = {
    posts: IPost[],
}


const PostList = ({posts}: PostListProps) => {
    const navigate = useCustomNavigate();

    const handleClick = (id: number) => {
        navigate(`/post/${id}`)
    }
    return (
        <div>
            {posts.map((post) =>
                <Card
                    imageUrl={post.image_path}
                    title={post.title}
                    description={post.content}
                    onClick={() => handleClick(post.id)}
                />
            )}
        </div>
    )
}
 
export default PostList;