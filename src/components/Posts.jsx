import React from "react";
import PostActions from "./PostActions.jsx";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { Trash2, Bookmark } from "lucide-react"; // Or your preferred icon library
import { useState } from "react";

export default function Posts({ post,onPostUpdate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  // Inside your individual Post component:
  const [isExpanded, setIsExpanded] = useState(false);

  // Define your character limit (e.g., ~400 characters roughly equals 10 lines of text)
  const CHARACTER_LIMIT = 800;
  const isLongText = post.content.length > CHARACTER_LIMIT;

  // Determine what text to display
  const displayedContent = isExpanded
    ? post.content
    : `${post.content.substring(0, CHARACTER_LIMIT)}...`;
  // console.log(post.postId);

 
  return (
    <div className="block max-w-3.4xl mx-auto my-3 px-4 mb-5 last:mb-24">
      {/* Post Card Container */}
      <div className="dark:bg-normalbg  border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm ">
        {/* Post Header (Avatar, Category, Time, Menu) */}
        <div className="flex items-center justify-between p-4 pb-2 ">
          <div className="flex items-center gap-3">
            {/* Avatar Container */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center font-bold text-white text-sm uppercase">
                {post.category?.slice(0, 2) || "R"}
              </div>
            </div>

            {/* Meta Text Info */}
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 dark:text-black text-black dark:text-black">
              <span>r/{post.category}</span>
              <span className="text-gray-400 dark:text-black">•</span>
              <span className="text-xs font-normal text-gray-500 dark:text-gray-600">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>

          {/* Context Menu Button */}

          <div className="relative">
            {/* Context Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 dark:text-black hover:text-gray-700 p-1 rounded-full transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl  border border-gray-200 bg-gray-200 p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-900 z-50 transition-all duration-200">
                {/* Saved Option */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                >
                  <Bookmark className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span>Saved</span>
                </button>

                {/* Divider line for visual separation */}
                <div className="my-1 border-t border-gray-150 dark:border-gray-800" />

                {/* Delete Option */}
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
        <Link to={`/posts/${post.id}`} state={{ post }} className="">
          {/* Post Title */}
          <div className="px-4 pt-2">
            <h1 className="text-xl font-bold text-white dark:text-black leading-snug ">
              {post.title}
            </h1>
          </div>

          {/* Post Content */}
          <div className="px-4 py-3 text-sm md:text-base text-gray-500 dark:text-black whitespace-pre-wrap">
            {isLongText ? displayedContent : post.content}

            {isLongText && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-amber-50 dark:text-black hover:underline ml-1 font-semibold block mt-1"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </div>
        </Link>
        {/* Post Actions (Upvotes, Comments, Share) */}
        <div className=" border-gray-100 dark:border-gray-700/50  dark:bg-black/5 px-4 py-2 text-black dark:text-black">
<PostActions post={post} onPostUpdate={onPostUpdate} />       
 </div>
      </div>
    </div>
  );
}
/*
 private Long id;
    private String username;
    private String title;
    private String content;
    private String imageUrl;
    private Long likesCount;
    private Long commentsCount;
    private String categoryType;
    private LocalDateTime createdAt;
*/
/*
import { formatDistanceToNow } from "date-fns";

// export default function Posts({ post }) {
//   return (
//     <div className="m-4 dark:bg-normalbg ">
//       <div className="my-4 border-2 border-gray-700 rounded-xl dark:bg-normalbg">
//         {
//         <div class="flex flex-row  gap-4 my-3 dark:bg-normalbg">
//           <div className=" px-1 m-2 dark:bg-normalbg">
//             <img
//               className="w-11 h-11 rounded-full"
//               src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
//               alt="Avatar"
//               width={350}
//               height={350}
//             />
//           </div>
//          
//           <div className="  m-2 flex-row dark:bg-normalbg dark:text-black">r/{post.categoryType}</div>
//           <div className="  m-2 flex-row dark:text-black ">•</div>
//           <div className="m-2 flex-row dark:text-black">
//             {formatDistanceToNow(new Date(post.createdAt), {
//               addSuffix: true,
//             })}
//           </div>{" "}
//           <div className="p-2 m-2 ml-auto font-bold">. . .</div>
//         </div>

//       

//         <div className="my-4 mx-4 text-2xl dark:text-black">
//           <h1>{post.title}</h1>
//         </div>

//         

//         <div className=" p-2 m-2 dark:text-black">{post.content}</div>

//         

//         
//         <div>
//           <PostActions post={post} />
//         </div>
//       </div>
//     </div>
//   );
// }
*/
