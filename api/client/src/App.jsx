import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./components/AppLayout";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/UserContext";
import MyBlogs from "./pages/MyBlogs";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/posts/post/:id",
          element: <PostDetails />,
        },
        {
          path: "/write",
          element: <CreatePost />,
        },
        {
          path: "/edit/:id",
          element: <EditPost />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/myblogs/:id",
          element: <MyBlogs />,
        },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;
