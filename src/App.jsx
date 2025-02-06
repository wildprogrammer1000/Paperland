import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import CreatePost from "./components/post/CreatePost.jsx";
import Post from "./components/post/Post.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/post/add" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
      </Route>
    </Routes>
  );
}

export default App;
