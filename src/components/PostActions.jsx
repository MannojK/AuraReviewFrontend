import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../api/apiClient.js";

export default function PostActions({ post, onPostUpdate }) {
  const [upvotes, setUpvotes] = useState(post.likeCount || 0);
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);
  const [voted, setVoted] = useState(post.userVoteStatus || null);

  const navigate = useNavigate();
  const location = useLocation();

  // Keep local state in sync if the parent data changes
  useEffect(() => {
    setUpvotes(post.likeCount || 0);
    setCommentCount(post.commentCount || 0);
    setVoted(post.userVoteStatus || null);
  }, [post.likeCount, post.commentCount, post.userVoteStatus]);

  // Safely grab the logged-in user
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUsername = storedUser.username;

  // Unified vote handler with Error Rollback
  const toggleVote = async (action) => {
    if (!currentUsername) {
      alert("You must be logged in to vote!");
      return;
    }

    // Save previous state in case the API call fails
    const previousVote = voted;
    const previousUpvotes = upvotes;

    let nextVoteType;
    let newUpvotes = upvotes;

    // Calculate new vote states
    if (action === "up") {
      if (voted === "up") {
        newUpvotes -= 1;
        nextVoteType = null;
      } else {
        newUpvotes += voted === "down" ? 2 : 1;
        nextVoteType = "up";
      }
    } else if (action === "down") {
      if (voted === "down") {
        newUpvotes += 1;
        nextVoteType = null;
      } else {
        newUpvotes -= voted === "up" ? 2 : 1;
        nextVoteType = "down";
      }
    }

    // 1. Optimistic Update (UI updates instantly)
    setVoted(nextVoteType);
    setUpvotes(newUpvotes);

    try {
      // 2. Send to Database
      await apiClient.post(`/likes/${post.id}/vote`, {
        voteType: nextVoteType,
        username: currentUsername,
      });

      // 3. Update global context ONLY if database succeeds
      if (onPostUpdate) {
        onPostUpdate(post.id, {
          userVoteStatus: nextVoteType,
          likeCount: newUpvotes,
        });
      }
    } catch (error) {
      console.error("Error saving vote to database:", error);
      
      // 4. ROLLBACK UI on failure so it doesn't desync with the database
      setVoted(previousVote);
      setUpvotes(previousUpvotes);
      
      // Show the backend error so you can debug why it's not saving!
      alert(`Database failed to save vote: ${error.response?.data?.message || "Internal Server Error"}`);
    }
  };

  return (
    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium select-none">
      {/* Vote Section */}
      <div className="flex items-center bg-[#272729] hover:bg-[#333335] transition-colors rounded-full p-1 gap-1">
        <button
          onClick={() => toggleVote("up")}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            voted === "up"
              ? "text-orange-500 bg-orange-500/10"
              : "hover:text-orange-500 hover:bg-white/5"
          }`}
          aria-label="Upvote"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-base" />
        </button>

        <span
          className={`px-1 font-semibold min-w-[1.5rem] text-center transition-colors ${
            voted === "up"
              ? "text-orange-500"
              : voted === "down"
              ? "text-blue-500"
              : "text-gray-200"
          }`}
        >
          {upvotes}
        </span>

        <button
          onClick={() => toggleVote("down")}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            voted === "down"
              ? "text-blue-500 bg-blue-500/10"
              : "hover:text-blue-500 hover:bg-white/5"
          }`}
          aria-label="Downvote"
        >
          <FontAwesomeIcon icon={faArrowDown} className="text-base" />
        </button>
      </div>

      {/* Comments */}
      <button
        onClick={() => navigate(`/posts/${post.id}`)}
        className="flex items-center gap-2 bg-[#272729] hover:bg-[#333335] text-gray-300 transition-colors px-4 py-2 rounded-full font-medium"
      >
        <FontAwesomeIcon icon={faComment} className="text-gray-400" />
        <span>{commentCount} Comments</span>
      </button>

      {/* Share */}
      <button className="flex items-center gap-2 bg-[#272729] hover:bg-[#333335] text-gray-300 transition-colors px-4 py-2 rounded-full font-medium">
        <FontAwesomeIcon icon={faShare} className="text-gray-400" />
        <span>Share</span>
      </button>
    </div>
  );
}
//  <div className="flex items-center gap-4 text-gray-400 text-sm">
//       {/* 🔹 Vote Section */}
//       <div className="flex items-center bg-[#272729] rounded-full  p-2 m-2 gap-3">
//         <button
//           onClick={() => {
//             if (voted === "up") {
//               setUpvotes((u) => u - 1);
//               setVoted(null);
//             } else {
//               setUpvotes((u) => u + (voted === "down" ? 2 : 1));
//               setVoted("up");
//             }
//           }}
//           className={`p-1.5 rounded-full transition-colors ${voted === "up" ? "text-orange-500 bg-orange-50" : "hover:bg-gray-200"}`}
//         >
//           <FontAwesomeIcon
//             icon={faArrowUp}
//             className="hover:text-orange-500 cursor-pointer"
//           />
//         </button>

//         <span className="font-semibold text-white">{upvotes} </span>

//         <button
//           onClick={() => {
//             if (voted === "down") {
//               setUpvotes((u) => u + 1);
//               setVoted(null);
//             } else {
//               setUpvotes((u) => u - (voted === "up" ? 2 : 1));
//               setVoted("down");
//             }
//           }}
//         >
//           <FontAwesomeIcon
//             icon={faArrowDown}
//             className="hover:text-blue-500 cursor-pointer"
//           />
//         </button>
//       </div>

//       {/* 🔹 Comments */}
//       <div className="flex items-center gap-2 hover:bg-[#272729] px-3 py-1 rounded-full cursor-pointer">
//         <FontAwesomeIcon icon={faComment} />
//         <span>{post.commentsCount} Comments</span>
//       </div>

//       {/* 🔹 Share */}
//       <div className="flex items-center gap-2 hover:bg-[#272729] px-3 py-1 rounded-full cursor-pointer">
//         <FontAwesomeIcon icon={faShare} />
//         <span>Share</span>
//       </div>
//     </div>
