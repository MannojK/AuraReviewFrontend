import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Bookmark, Trash2 } from "lucide-react";
import { useFetcher } from "react-router-dom"; // or "@remix-run/react"
import apiClient from "../api/apiClient.js"; // your existing client
import PostActions from "./PostActions.jsx";
import { PostContext } from "../store/PostContext.jsx";

export default function PostDetail() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const loggedInUser = storedUser
    ? JSON.parse(storedUser).username
    : "anonymous";
  // Safely grab the post
  const post = location.state?.post;
  const { id } = useParams();
  
  // Local state for the detail page
const [postDetail, setPostDetail] = useState(location.state?.post || null);

  // Bring in the global update function
  const { updateGlobalPost } = useContext(PostContext);

  // We fall back to an empty array [] so .length and .map() never crash the app
  const [comments, setComments] = useState(post?.comments || []);
  const [upvotes, setUpvotes] = useState(post?.likeCount || 0);
  const [voted, setVoted] = useState(null);
  const isSubmitting = fetcher.state === "submitting";
  // const [postDetail, setPostDetail] = useState(null);

  // Create a reference to the form so we can clear it later
  const formRef = useRef(null);

useEffect(() => {
    if (!postDetail) {
      const fetchPost = async () => {
        try {
          // Add the username to the request so the backend knows who is looking at the post!
          const response = await apiClient.get(`/posts/${id}?username=${loggedInUser}`);
          setPostDetail(response.data);
        } catch (error) {
          console.error("Failed to fetch post", error);
        }
      };
      fetchPost();
    }
    window.scrollTo(0, 0);
  }, [id]);

const handleDetailUpdate = (postId, updatedFields) => {
    // 1. Update the local detail screen immediately
    if (postDetail && postDetail.id === postId) {
      setPostDetail((prev) => ({
        ...prev,
        ...updatedFields,
      }));
    }
    
    // 2. Update the Global Context so the Home page stays synced!
    updateGlobalPost(postId, updatedFields);
  };

  // if (!postDetail) return <div>Loading...</div>;
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // INSTANTLY UPDATE THE LIST WHEN A NEW COMMENT IS ADDED
  useEffect(() => {
    if (
      fetcher.state === "idle" &&
      fetcher.data?.success &&
      fetcher.data?.comment
    ) {
      const newComment = fetcher.data.comment;

      // Check to prevent duplicate UI additions if fetcher data persists
      if (!comments.some(c => c.id === newComment.id)) {
        
        // 1. Add the new comment to the local array
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);

        // 2. UPDATE THE GLOBAL CONTEXT so the Home page syncs immediately!
        // Note: Change 'commentCount' if your backend uses a different property name (like 'commentsCount')
        handleDetailUpdate(post.id, {
          comments: updatedComments,
          commentCount: updatedComments.length 
        });
      }

      // 3. Clear the textarea
      formRef.current?.reset();
    }
  }, [fetcher.state, fetcher.data, comments, post.id]); // Added missing dependencies
  // Prevent crashing if someone navigates here directly without a post
  if (!post) return <div className="p-10 text-white">No post found.</div>;

  return (
    <div className="min-h-screen max-w-3xl mx-auto pt-6 pb-24 px-4 overflow-hidden">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 px-3 py-1.5 bg-gray-900 text-sm font-semibold text-gray-100 hover:bg-gray-800 rounded-lg transition-all"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back
      </button>

      {/* Detail Card Container */}
      <div className="bg-[#0E1113] dark:bg-lighter border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        {/* HEADER SECTION */}
        <div className="flex items-start justify-between p-4 pb-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center font-bold text-white dark:text-black text-sm uppercase">
                {post.categoryType?.slice(0, 2) || "R"}
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2 text-sm text-white dark:text-dark">
                <span className="font-bold hover:underline cursor-pointer">
                  r/{post.category}
                </span>
                {post.createdAt && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </>
                )}
              </div>

              <div className="text-xs text-gray-600 dark:text-gray-500 flex items-center gap-1">
                <span>Posted by</span>
                <span className="font-medium hover:underline cursor-pointer text-gray-200 dark:text-gray-700">
                  u/{post.username || "anonymous"}
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 dark:text-black hover:text-gray-700 p-1 rounded-full transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-gray-200 p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-900 z-50 transition-all duration-200">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                >
                  <Bookmark className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span>Saved</span>
                </button>
                <div className="my-1 border-t border-gray-150 dark:border-gray-800" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors duration-150"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
        {/* POST CONTENT */}
        <div className="px-4 pt-1 text-white dark:text-black">
          <h1 className="text-xl font-bold text-white dark:text-black leading-snug">
            {post.title}
          </h1>
        </div>
        <div className="px-4 py-4 text-sm md:text-base text-gray-500 dark:text-black whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
        <PostActions post={postDetail} onPostUpdate={handleDetailUpdate} />

      {/* COMMENTS SECTION */}
       <div className="mt-6 bg-[#0E1113] dark:bg-lighter border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <h2 className="text-lg font-bold text-white dark:text-black mb-4">
          Comments
        </h2>

        <fetcher.Form method="post" ref={formRef} className="mb-6">
          <input type="hidden" name="postId" value={post.id} />
          {/* Change this value to your actual logged-in user variable */}
          <input type="hidden" name="username" value={loggedInUser} />
          <textarea
            name="text"
            placeholder="What are your thoughts?"
            rows={1}
            required
            className="w-full bg-[#1A1F24] text-white dark:bg-gray-100 dark:text-black border border-gray-700 dark:border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none placeholder-gray-500"
          />

          {fetcher.data?.errors?.text && (
            <p className="text-red-500 text-xs mt-1">
              {fetcher.data.errors.text}
            </p>
          )}

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-xs rounded-full transition-colors"
            >
              {isSubmitting ? "Posting..." : "Comment"}
            </button>
          </div> 
        </fetcher.Form>

        {/* 2. FIXED: Actually render the existing comments here */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-800 dark:border-gray-200 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-2 mb-1.5 text-xs text-gray-400 dark:text-gray-500">
                  <span className="font-semibold text-gray-200 dark:text-gray-700 hover:underline cursor-pointer">
                    u/{comment.username}
                  </span>
                  <span>•</span>
                  <span>
                    {/* Fallback to 'Just now' if createdAt isn't valid yet */}
                    {comment.createdAt
                      ? formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })
                      : "Just now"}
                  </span>
                </div>
                <p className="text-sm text-gray-300 dark:text-black whitespace-pre-wrap pl-1">
                  {comment.text}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
export async function commentAction({ request }) {
  const formData = await request.formData();

  // Grab the fields from the form
  const postId = formData.get("postId");
  const username = formData.get("username");
  const text = formData.get("text"); // The actual comment content

  // SAFETY CHECKS
  if (!username) {
    return {
      success: false,
      errors: { username: "Username is missing. Please log in again." },
    };
  }

  if (!text || text.trim() === "") {
    return {
      success: false,
      errors: { text: "Comment cannot be empty." },
    };
  }

  // Structure the payload (Matches your CommentDTO)
  const payload = {
    text: text,
    username: username,
  };

  try {
    // Injecting the postId dynamically into the URL you provided
    const response = await apiClient.post(
      `/comments/${postId}/comments`,
      payload,
    );
    // Return success and the newly created comment data so the UI can update
    return {
      success: true,
      comment: response.data,
    };
  } catch (error) {
    console.error("Backend comment creation error:", error);

    // Grab backend validation errors if any
    const backendErrors = error.response?.data;

    return {
      success: false,
      errors: backendErrors || {
        text: "Internal Server Error. Could not post comment.",
      },
    };
  }
}

/*


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;

  // 1. FIXED: Restored and safely initialized states
  // We fall back to an empty array [] so .length and .map() never crash the app
  // const [comments, setComments] = useState(post?.comments || []);
  const [newCommentText, setNewCommentText] = useState("");
  const [upvotes, setUpvotes] = useState(post?.likeCount || 0);
  const [voted, setVoted] = useState(null); 


// 2. FIXED: Added backend integration workflow
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const temporaryText = newCommentText.trim();
    setNewCommentText(""); // Optimistically clear input tracking
try {
  const response = await fetch(`/api/v1/posts/${post.id}/comments`, { // Verified endpoint base match
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${localStorage.getItem("token")}` 
    },
    body: JSON.stringify({ text: temporaryText }), // Changed 'content' to 'text' to match your Java DTO
  });

  if (!response.ok) throw new Error("Failed to save comment");
  const savedCommentFromServer = await response.json();
  
  // Update state with the exact item returned from your backend
  setComments([savedCommentFromServer, ...comments]);

  // --- LOCAL FALLBACK REMOVED ---
  // The code that created `newComment` has been deleted so it no longer causes duplicates.

} catch (error) {
  console.error("Error posting comment:", error);
  alert("Could not post comment. Please try again.");
  setNewCommentText(temporaryText); // Restore user text on failure
}
  };
*/
