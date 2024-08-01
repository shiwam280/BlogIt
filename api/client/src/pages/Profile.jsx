import { useContext, useEffect, useState } from "react";
import ProfilePosts from "../components/ProfilePosts";
import { userContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "./url";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(userContext);
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();
  // console.log(user);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      // setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email },
        { withCredentials: true }
      );
      setUpdated(true);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="px-8 mt-8 md:px-[200px] flex flex-col-reverse md:flex-row">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your posts:</h1>
          {posts?.map((p) => {
            <ProfilePosts key={p._id} p={p} />;
          })}
        </div>
        <div className="flex flex-col space-y-4 md:w-[30%] w-full md:items-end md:sticky md:top-12">
          <div className="flex flex-col space-y-4">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              type="text"
              placeholder="Your username"
              className="outline-none px-4 py-2 text-gray-500"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="email"
              placeholder="Your email"
              className="outline-none px-4 py-2 text-gray-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {/* <input
              type="password"
              placeholder="Your password"
              className="outline-none px-4 py-2 text-gray-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            /> */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User is updated Successfully!!
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
