import { useEffect, useState } from "react";
import { getPosts } from "@/api/functions";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";
const Posts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { posts } = await getPosts();
      setPosts(posts);
    })();
  }, [user]);
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <Link to={`/post/${post.uniqueId}`}>
            {post.title}
            {JSON.stringify(post)}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
