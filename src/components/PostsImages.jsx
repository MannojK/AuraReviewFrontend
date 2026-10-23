import React from 'react';
import PostActions from './PostActions.jsx';

export default function PostsImages() {
  return (
    <div className="m-4 ">
      {/* For the home Section  */}
      <div className="my-4 border-2 border-gray-700 rounded-xl">
        {/* For the title of the posts  */}
        <div class="flex flex-row  gap-4 my-3">
          <div className=" px-2 m-2">
            <img
              className="w-11 h-11 rounded-full"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
              alt="Avatar"
              width={350}
              height={350}
            />
          </div>
          <div className="  m-2 flex-row ">r/RelationShipAdvice</div>
          <div className="p-2 m-2 ml-auto font-bold">. . .</div>
        </div>

        {/* Title */}
        <div className="my-4 mx-4 text-2xl">
          <h1> Images should be seen </h1>
        </div>
        <div className = "p-19 m-9 border-2 border-gray-700 rounded-2xl" >
           <center> <img src="./assets/m.jpg" alt="scenery"  width={350}
              height={350} /></center>
        </div>
<div>
    <PostActions/>
</div>
      </div>

    </div>
  )
}
