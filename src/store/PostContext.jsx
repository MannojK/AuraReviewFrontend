import { createContext, useState } from "react";

// 1. Create the Context
export const PostContext = createContext();

// 2. Create the Provider Component
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  // This is the EXACT SAME function you had in Home, but now it's global!
  const updateGlobalPost = (postId, updatedFields) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId ? { ...p, ...updatedFields } : p
      )
    );
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, updateGlobalPost }}>
      {children}
    </PostContext.Provider>
  );
}