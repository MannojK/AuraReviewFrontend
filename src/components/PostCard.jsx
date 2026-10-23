import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const PostCard = ({ id, title, content, date, post }) => {
  // Safety check: ensure date is valid before trying to format it
  const formattedDate = date 
    ? formatDistanceToNow(new Date(date), { addSuffix: true }) 
    : "Unknown date";

  return (
    <Link to={`/posts/${id}`} state={{ post }} className="block h-full">
      <div className="bg-neutral-900 p-5 rounded-lg border border-orange-500/20 hover:border-orange-500 transition-colors duration-300 cursor-pointer flex flex-col justify-between h-full">
        <div>
          <h3 className="text-orange-500 font-bold text-xl mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
            {content}
          </p>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500 font-semibold mt-4">
          <span>{formattedDate}</span>
          <span className="text-orange-500 hover:text-orange-400 transition-colors">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;