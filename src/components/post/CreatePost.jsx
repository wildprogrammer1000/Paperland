import { addPost } from "@/api/functions";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";

const CreatePost = () => {
  const fileRef = useRef();
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    let id = null;
    let response = null;
    try {
      response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/image/upload`,
        data: formData,
      });
      const { uniqueId, url } = response.data;
      id = uniqueId;

      response = await addPost({ ...form, uniqueId: id, url });

      console.log("success: ", uniqueId);
      console.log("url: ", url);
    } catch (err) {
      if (id) {
        const response = await axios({
          method: "post",
          url: `${import.meta.env.VITE_API_URL}/image/delete`,
          data: {
            id,
          },
        });
        console.log("upload failed: ", response);
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result);
      reader.readAsDataURL(file);
    }
  }, [file]);
  return (
    <form
      className="flex flex-col gap-2 p-2 max-w-[500px] mx-auto"
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className="flex items-center justify-center w-32 h-32 mx-auto border-2"
        onClick={() => fileRef.current.click()}
      >
        {file ? (
          <img
            src={imageUrl}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <CiImageOn className="text-[80px]" />
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        required
        className="p-2 border-2"
        placeholder="title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="p-2 border-2"
        placeholder="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button
        className="p-2 border-2 hover:bg-black hover:text-white transition-all duration-200"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default CreatePost;
