import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import { Outlet } from "react-router-dom";
import { PostProvider } from "./store/PostContext.jsx";
function App() {
  return (
    <>
    <PostProvider>
      {/* <App /> */}
       <Navbar />
      <Outlet />
    </PostProvider>
      {/* <Navbar />
      <Outlet />
      <PostProvider/> */}
      {/* <Home /> */}
    </>
  );
}

export default App;
