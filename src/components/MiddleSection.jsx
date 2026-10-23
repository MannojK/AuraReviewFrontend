import React from "react";
import Posts from "./Posts.jsx";
export default function MiddleSection({ posts,onPostUpdate }) {
  return (
    <>
      <div className=" mx-auto dark:bg-normalbg">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Posts key={post.id} post={post} onPostUpdate={onPostUpdate} />
          ))
        ) : (
          <p className="text-center font-primary font-bold text-lg text-primary">
            No posts found
          </p>
        )}
      </div>
    
    </>
  );
}
// grid, and flexbox
// SHOULD LEARN THE FLEXBOX AND GRID FOR THE GOOD PLACEMENT OF THE CSS COMPONENTS
