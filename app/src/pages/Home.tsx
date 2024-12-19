import { getAllPosts } from "../api_calls/post/post.services";
import Button from "../components/Button";
import PostList from "../components/postList";
import useCustomNavigate from "../hooks/useCustomNavigate";

const posts = await getAllPosts();

const Home = () => {
    const navigate = useCustomNavigate();
    const onClickNavigation = () => {
        navigate("/user/posts");
    }

    return (
        <div>
            <h1>Home</h1>
            <Button onClick={onClickNavigation} text="Voir mes posts"/>
            <p>PostList</p>
            <PostList posts={posts} />
        </div>
    );
}
 
export default Home;