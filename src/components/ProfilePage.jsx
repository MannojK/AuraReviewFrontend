import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient.js"; // your existing client
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // 1. Authentication Check
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProfileData();
  }, [navigate]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // Get the logged-in user from local storage
      const userStorage = localStorage.getItem("user");
      const loggedInUser = userStorage ? JSON.parse(userStorage) : null;
      
      if (!loggedInUser || !loggedInUser.username) {
        throw new Error("User information not found in local storage.");
      }

      const [userResponse, postsResponse] = await Promise.all([
        apiClient.get("/users"), 
        apiClient.get("/posts")  
      ]);

      // Filter to find the specific logged-in user's details
      // Handles cases where the backend returns an array of all users
      let currentUser = userResponse.data;
      if (Array.isArray(userResponse.data)) {
        currentUser = userResponse.data.find(u => u.username === loggedInUser.username);
      }
      
      // Fallback to local storage username if the API doesn't return the email/name
      setUserData(currentUser || { username: loggedInUser.username, email: "Email not provided by API" });

      // Filter to find only posts created by the logged-in user
      const allPosts = postsResponse.data;
      const myPosts = allPosts.filter(post => {
        // Matches the post's author/username field to the logged-in username
        const postAuthor = post.username || post.author || (post.user && post.user.username);
        return postAuthor === loggedInUser.username;
      });

      setPosts(myPosts); 
      
    } catch (error) {
      setError(
        error.response?.data?.message || error.message ||
        "Failed to fetch profile data please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <span className="font-semibold text-2xl text-orange-500">
          Loading profile...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <span className="text-xl text-red-500">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans text-gray-100 p-4 md:p-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-8">
        {userData && (
          <UserInfo
            name={userData.name || userData.firstName || userData.username}
            username={userData.username}
            email={userData.email}
          />
        )}
        <UserPosts posts={posts} />
      </div>
    </div>
  );
};

export default ProfilePage;