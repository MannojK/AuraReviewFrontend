import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import News from "./components/News.jsx";
import Popular from "./components/Popular.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Explore from "./components/Explore.jsx";
import Community from "./components/Community.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import PostDetail, { commentAction } from "./components/PostDetail.jsx";
import Login, { loginAction } from "./components/Login.jsx";
import { registerAction } from "./components/Register.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import CreatePost from "./components/CreatePost.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import { contactAction } from "./components/CreatePost.jsx";
import { AuthProvider } from "./store/auth-context.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NotificationsPage from "./components/NotificationsPage.jsx";
import { PostProvider } from "./store/PostContext.jsx";
// Combined and fixed the imports here:
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/popular" element={<Popular />} />
    <Route path="/createpost" element={<CreatePost />} action={contactAction} />
    <Route path="/news" element={<News />} />
    <Route path="/notificationsPage" element={<NotificationsPage />} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} action={registerAction} />
    {/* <Route path="/post/:id" element={<PostDetail />} /> */}
    {/* action={commentAction} */}
    <Route path="/community" element={<Community />} />
    <Route path="/profilepage" element={<ProfilePage />} />
    <Route path="/explore" element={<Explore />} />
    {/* <Route path="/postdetail" element={<PostDetail />} action={commentAction} /> */}
    <Route
      path="/posts/:postId"
      element={<PostDetail />}
      action={commentAction}
    />
  </Route>,
);
const appRouter = createBrowserRouter(routeDefinitions);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PostProvider>
        <RouterProvider router={appRouter} />
      </PostProvider>
    </AuthProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
      transition={Bounce}
    />
  </StrictMode>,
);
// Home , popular, news, explore, community
// creates, chats, notifications, profile
