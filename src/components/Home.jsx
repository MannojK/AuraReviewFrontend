import React from "react";
import LeftBar from "./LeftBar.jsx";
import MiddleSection from "./MiddleSection.jsx";
import apiClient from "../api/apiClient";
import { useLoaderData } from "react-router-dom";
import Posts from "./Posts.jsx";
import { useState, useEffect, useContext, createContext } from "react";
import { PostContext } from "../store/PostContext.jsx";

export default function Home() {
  // const posts = useLoaderData();

  // const [posts, setPosts] = useState([]); // for backend
  const { posts, setPosts, updateGlobalPost } = useContext(PostContext);
  const [loading, setLoading] = useState(true); // for loading screen message
  const [error, setError] = useState(null); // for error screen message

  //  const handlePostUpdate = (postId, updatedFields) => {
  //     setPosts((prevPosts) =>
  //       prevPosts.map((p) =>
  //         p.id === postId ? { ...p, ...updatedFields } : p
  //       )
  //     );
  //   };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  // // *** FETCH PRODUCTS
  // const fetchPosts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await apiClient.get("/posts"); // AXIOS GET Request
  //     setPosts(response.data); // Update products with fetched data
  //   } catch (error) {
  //     setError(
  //       error.response?.data?.message ||
  //         "Failed to fetch Products please try again ",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
 // 1. Grab the logged-in user's username!
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedInUser = storedUser.username || "";

  useEffect(() => {
    const fetchPosts = async () => {
      if (posts.length > 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await apiClient.get("/posts", {
          params: { 
            t: new Date().getTime(),
            username: loggedInUser // 2. SEND THE USERNAME TO SPRING BOOT!
          },
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        
        console.log("FRESH DATA FROM SPRING BOOT: ", response.data); 
        setPosts(response.data); 
      } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.message ||
            "Failed to fetch posts. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [posts.length, setPosts, loggedInUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className=" font-semibold text-2xl text-amber-50">
          Loading posts...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl text-red-500">Error: {error}</span>
      </div>
    );
  }
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0E1113] dark:bg-normalbg flex flex-col">
      <div className="flex flex-1 h-full min-h-0 divide-x divide-gray-700 overflow-hidden">
        {/* LEFT SIDEBAR - Stays visible longer (shows on tablets and desktops, hides on mobile) */}
        <div className="hidden md:block w-48 md:w-64 flex-shrink-0 text-white overflow-y-auto scrollbar-none ">
          <LeftBar />
        </div>

        {/* MIDDLE SECTION - Always visible, claims all leftover space */}
        <div className="flex-1 h-full overflow-y-auto text-white no-scrollbar min-w-0">
          <MiddleSection posts={posts} onPostUpdate={updateGlobalPost} />
        </div>

        {/* RIGHT SIDEBAR - Disappears FIRST when screen shrinks (only shows on large screens) */}
        <div className="hidden lg:block w-72 -shrink-0 text-white dark:text-black overflow-y-auto">
          <div className="text-center px-15 py-15">Right Section</div>
        </div>
      </div>
    </div>
  );
}
// export async function productsLoader() {
//   try {
//     const response = await apiClient.get("/posts");
//     return response.data; // Axios automatically parses JSON
//   } catch (error) {
//     console.error("Loader error:", error); // Log it so you can see it in the console!

//     // Extract proper status and message from Axios
//     const status = error.response?.status || 500;
//     const message = error.errorMessage || error.message || "Failed to fetch products.";

//     throw new Response(message, { status });
//   }
// }

//   return (
//     // <div className="bg-[#0E1113]">
//     //   <div class="flex h-screen  bg-[#0E1113] divide-x divide-gray-700">
//     //     <aside></aside>
//     //     <div class="flex-1 flex justify-center text-white">
//     //       <LeftBar />
//     //     </div>
//     //     <div class="flex-3 justify-center  text-white">
//     //       <MiddleSection posts={posts} />
//     //       {/* <MiddleSection  /> */}
//     //     </div>
//     //     <div class="flex-1 flex items-center justify-center text-white">
//     //       Right Section
//     //     </div>
//     //   </div>
//     // </div>
// <div className="h-screen w-screen overflow-hidden bg-[#0E1113] dark:bg-normalbg flex flex-col">
//   <div className="flex flex-1 h-full min-h-0 divide-x divide-gray-700 overflow-hidden">

//     {/* LEFT SIDEBAR - Stays visible longer (shows on tablets and desktops, hides on mobile) */}
//     <div className="hidden md:block w-48 md:w-64 flex-shrink-0 text-white overflow-y-auto scrollbar-none ">
//       <LeftBar />
//     </div>

//     {/* MIDDLE SECTION - Always visible, claims all leftover space */}
//     <div className="flex-1 h-full overflow-y-auto text-white no-scrollbar min-w-0">
//       <MiddleSection posts={posts} />
//     </div>

//     {/* RIGHT SIDEBAR - Disappears FIRST when screen shrinks (only shows on large screens) */}
//     <div className="hidden lg:block w-72 -shrink-0 text-white dark:text-black overflow-y-auto">
//       <div className="text-center px-15 py-15">Right Section</div>
//     </div>

//   </div>
// </div>
