import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ArticleDetails from "./pages/ArticleDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateArticle from "./pages/CreateArticle";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:slug" element={<ArticleDetails />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
