import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost } from "@/api/functions";
import { useAuth } from "@/providers/AuthProvider";
import { MdExitToApp } from "react-icons/md";

const Post = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const init = async () => {
    const { post } = await getPost(id);
    setPost(post[0]);
  };
  useEffect(() => {
    if (!user) return;
    init();
  }, [user]);

  useEffect(() => {
    if (post) setLoading(false);
    2;
  }, [post]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;
  return (
    <div className="flex flex-col gap-2 p-2 max-w-[500px] mx-auto">
      <div className=" text-center text-[32px] font-bold">
        [ {post.value.title} ]
      </div>
      <div className="relative border-2 pt-[100%]">
        <div className="absolute top-0 left-0 w-full h-full ">
          <img
            src={post.value.url}
            alt={post.value.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <i className="mt-4 text-center text-[24px]">{`"${post.value.description}"`}</i>
      <Link
        to="/"
        className="flex items-center justify-center mt-8 p-2 border-2 hover:bg-black hover:text-white transition-all duration-200 text-[32px]"
      >
        <MdExitToApp />
      </Link>
    </div>
  );
};

export default Post;
