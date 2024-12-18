import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PostList from "./pages/Home";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Me connecter</Link>
        <Link to="/">M'inscrire</Link>
      </nav>

      <div className="container mx-auto mt-10">
        <Routes>
          <Route path="/" element={<AuthPage/>}/>
          <Route path="/posts" element={<PostList/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}