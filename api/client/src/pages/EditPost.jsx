import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { userContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "./url";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCategories(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: categories,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      //image Upload
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [postId]);

  const addCategory = () => {
    let updatedArray = [...categories];
    updatedArray.push(category);
    // console.log(categories);
    // console.log(category);
    setCategory("");
    setCategories(updatedArray);
  };

  const deleteCategory = (i) => {
    let updatedArray = [...categories];
    updatedArray.splice(i);
    setCategories(updatedArray);
  };

  return (
    <div>
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold text-2xl">Update a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="file"
            className="px-4"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {categories?.map((cat, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{cat}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button
            onClick={handleUpdate}
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
