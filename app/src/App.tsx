import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PostList from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import UserPosts from "./pages/UserPosts";
import SinglePage from "./pages/SinglePage";

export default function App() {
  return (
    <BrowserRouter>
        <nav>
          <Link to="/posts">Home</Link>
          <Link to="/user/posts">Mes posts</Link>
        </nav>

      <div className="container mx-auto mt-10">
        <Routes>
          <Route path="/" element={<AuthPage/>}/>
          <Route path="/posts" element={<PostList/>} />
          <Route path="/user/posts" element={<UserPosts/>} />
          <Route path="/post/:id" element={<SinglePage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}