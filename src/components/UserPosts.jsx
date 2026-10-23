import React from "react";
import PostCard from "./PostCard";

const UserPosts = ({ posts }) => {
  return (
    <div className="mt-8 w-full">
      <div className="flex items-center justify-between mb-6 border-b border-orange-500/30 pb-3">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Your <span className="text-orange-500">Posts</span>
        </h2>
        <span className="text-sm text-gray-400 bg-neutral-900 px-3 py-1 rounded-full border border-orange-500/20">
          {posts?.length || 0} Posts
        </span>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="text-center py-10 bg-neutral-900 rounded-lg border border-neutral-800">
          <p className="text-gray-400">No posts published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <PostCard
              key={post.id || post._id}
              id={post.id || post._id}
              title={post.title}
              content={post.content}
              date={post.date || post.createdAt}
              post={post} // <--- THIS IS REQUIRED FOR THE LINK STATE TO WORK
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;